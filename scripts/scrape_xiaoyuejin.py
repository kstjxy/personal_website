#!/usr/bin/env python3
"""
Scrape projects from https://xiaoyuejin.com and generate MDX files under content/projects/.

Best-effort extractor for WordPress + Elementor structure. Does not commit changes.
"""
from __future__ import annotations

import argparse
import os
import re
import textwrap
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import List, Optional

import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md


BASE_URL = "https://xiaoyuejin.com"
PUBLIC_ASSET_ROOT = Path("public/projects")

# Optional slug overrides if you want to align with existing slugs
SLUG_OVERRIDES = {
    "nomster-truck": "nomester-truck",
}


@dataclass
class ProjectDoc:
    title: str
    slug: str
    date: str
    summary: str
    cover: Optional[str]
    links: List[dict]
    sections: List[dict]
    body_markdown: str


def normalize_ws(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
})


def fetch(url: str) -> str:
    r = session.get(url, timeout=20)
    r.raise_for_status()
    return r.text


def head_last_modified(url: str) -> Optional[str]:
    try:
        r = session.head(url, timeout=15, allow_redirects=True)
        lm = r.headers.get("last-modified") or r.headers.get("Last-Modified")
        if lm:
            try:
                # Example: 'Wed, 13 Sep 2023 10:34:56 GMT'
                from email.utils import parsedate_to_datetime

                dt = parsedate_to_datetime(lm)
                return dt.date().isoformat()
            except Exception:
                return None
    except Exception:
        return None
    return None


def discover_project_urls(base_url: str) -> List[str]:
    html = fetch(base_url)
    soup = BeautifulSoup(html, "html.parser")
    urls = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if not href.startswith(base_url):
            continue
        # Keep top-level paths like /slug/
        try:
            path = re.sub(r"https?://[^/]+", "", href)
        except Exception:
            continue
        if not path.startswith("/"):
            continue
        # Filter out obvious non-project paths
        segs = [p for p in path.split("/") if p]
        if not segs:
            continue
        first = segs[0].lower()
        if first in {"about", "contact", "feed", "comments", "wp-json", "xmlrpc.php"}:
            continue
        # Heuristic: accept single-segment pages or simple posts
        if len(segs) == 1:
            urls.add(base_url.rstrip("/") + "/" + first + "/")
    return sorted(urls)


def extract_meta(soup: BeautifulSoup, url: str) -> dict:
    meta = {}
    def first_content(selector, attr="content"):
        el = soup.select_one(selector)
        return el.get(attr) if el and el.has_attr(attr) else None

    meta["og:title"] = first_content('meta[property="og:title"]')
    meta["og:image"] = first_content('meta[property="og:image"]')
    meta["description"] = first_content('meta[name="description"]')
    meta["article:published_time"] = first_content('meta[property="article:published_time"]')
    # Fallback to <title>
    if not meta["og:title"] and soup.title:
        meta["og:title"] = normalize_ws(soup.title.text)
    # Clean title suffixes (e.g., “ – My WordPress”)
    if meta["og:title"]:
        meta["og:title"] = re.sub(r"\s*[–|-]\s*My WordPress\s*$", "", meta["og:title"])  # type: ignore
    # Published date fallback
    if not meta["article:published_time"]:
        # Try to guess from WordPress classes or leave empty
        time = soup.find("time")
        if time and time.has_attr("datetime"):
            meta["article:published_time"] = time["datetime"]
    return meta


def extract_sections(soup: BeautifulSoup) -> List[dict]:
    # Detect nav anchors like #overview, #game-details, #my-duties
    section_ids = []
    for a in soup.select("a[href^='#']"):
        frag = a.get("href", "").lstrip("#")
        if frag and frag not in section_ids:
            section_ids.append(frag)
    # Map to labels by finding headings with matching IDs
    sections = []
    for sid in section_ids:
        target = soup.find(id=sid)
        label = sid.replace("-", " ").title()
        if target:
            # If the target itself is a heading or contains a heading
            h = target if target.name in {"h1", "h2", "h3"} else target.find(["h1", "h2", "h3"])  
            if h:
                label = normalize_ws(h.get_text())
        # Normalize common ids to nicer labels
        if sid == "overview":
            label = "Overview"
        if sid == "game-details":
            label = "Game Details"
        if sid == "my-duties":
            label = "My Duties"
        if sid == "content":
            # skip generic container id
            continue
        sections.append({"id": sid, "label": label})
    # De-dup and keep order
    seen = set()
    uniq = []
    for s in sections:
        if s["id"] in seen:
            continue
        seen.add(s["id"])
        uniq.append(s)
    return uniq


def extract_body_markdown(soup: BeautifulSoup) -> str:
    # Try to isolate main content area
    main = soup.select_one("main#content") or soup.select_one(".page-content") or soup.body
    html = str(main) if main else soup.prettify()
    # Remove header/nav/footer blocks common to Elementor
    for sel in [
        "div[data-elementor-type='header']",
        "div[data-elementor-type='footer']",
        "nav",
        "header",
        "footer",
        "script",
        "style",
    ]:
        for el in soup.select(sel):
            el.decompose()
    # Remove top-of-page anchor nav lists if present
    for ul in soup.select("ul"):  # heuristic: list of local hash links
        links = [a.get("href", "") for a in ul.select("a[href^='#']")]
        if any(h in links for h in ["#overview", "#game-details", "#my-duties"]):
            ul.decompose()
    # Replace YouTube iframes with placeholders to convert to MDX later
    for iframe in soup.select("iframe"):
        src = iframe.get("src", "")
        if any(host in src for host in ["youtube.com", "youtu.be"]):
            placeholder = f"<p>__YOUTUBE__:{src}</p>"
            iframe.replace_with(BeautifulSoup(placeholder, "html.parser"))

    # Convert remaining HTML to Markdown
    md_text = md(html, heading_style="ATX", strip="script|style")
    # Light cleanup
    md_text = re.sub(r"\n{3,}", "\n\n", md_text).strip()
    return md_text


def extract_roles(soup: BeautifulSoup) -> List[str]:
    # Look for a concise line with slashes/bullets like "Programmer / Level Designer"
    text_candidates: List[str] = []
    # Top header containers first
    for sel in [
        "div[data-elementor-type='header']",
        ".elementor-location-header",
    ]:
        for el in soup.select(sel):
            text_candidates.append(el.get_text(" ", strip=True))
    # Fallback to first 2k chars of page text
    body_text = soup.get_text(" ", strip=True)
    text_candidates.append(body_text[:2000])
    for t in text_candidates:
        # common separators
        if any(sep in t for sep in ("/", "•", "|")):
            raw = re.split(r"[•/|]", t)
            roles = [normalize_ws(s) for s in raw if any(k in s.lower() for k in ["programmer", "designer", "developer", "engineer", "artist"])]
            out: List[str] = []
            for r_ in roles:
                if 1 < len(r_) <= 40 and r_ not in out:
                    out.append(r_)
            if out:
                return out[:3]
    return []


KEYWORD_TAGS = {
    "unity": "Unity",
    "unreal": "Unreal",
    "libgdx": "LibGDX",
    "java": "Java",
    "c#": "C#",
    "c++": "C++",
    "python": "Python",
    "ray tracing": "Ray Tracing",
    "path tracing": "Path Tracing",
    "vr": "VR",
    "ar": "AR",
    "ai": "AI",
    "minecraft": "Minecraft",
    "pac-man": "Pac-Man",
}


def infer_tags(text: str) -> List[str]:
    t = text.lower()
    tags: List[str] = []
    for k, v in KEYWORD_TAGS.items():
        if k in t and v not in tags:
            tags.append(v)
    return tags[:8]


def transform_markdown(md_text: str) -> str:
    lines = md_text.splitlines()
    out_lines: List[str] = []
    buffer_imgs: List[str] = []

    def flush_gallery():
        nonlocal buffer_imgs, out_lines
        if len(buffer_imgs) >= 2:
            # Build a Gallery images prop
            items = ",\n    ".join([f"{{ src: '{u}', alt: '' }}" for u in buffer_imgs])
            out_lines.append(f"<Gallery images={[{items}]}/>\n")
        else:
            out_lines.extend(buffer_imgs)
        buffer_imgs = []

    for line in lines:
        s = line.strip()
        # Canonicalize link-wrapped images [![alt](img)](link) -> ![alt](img)
        mwrap = re.match(r"^\!\[[^\]]*\]\([^\)]+\)$", s)
        if s.startswith("[") and "](" in s and ")" in s and "![" in s:
            try:
                inner = re.search(r"!\[[^\]]*\]\(([^\)]+)\)", s)
                if inner:
                    s = f"![img]({inner.group(1)})"
            except Exception:
                pass
        # Convert YouTube placeholders to MDX component
        if s.startswith("__YOUTUBE__:") or s.startswith("<p>__YOUTUBE__:"):
            url = s.split(":", 1)[1].strip().strip("</p>")
            out_lines.append(f"<YouTube url=\"{url}\" />")
            continue

        # Collect consecutive pure image markdown lines: ![alt](url)
        m = re.match(r"^!\[[^\]]*\]\(([^\)]+)\)$", s)
        if m:
            buffer_imgs.append(s)
            continue
        else:
            if buffer_imgs:
                flush_gallery()
        out_lines.append(line)

    if buffer_imgs:
        flush_gallery()

    return "\n".join(out_lines)


def download_images(slug: str, html: str) -> dict:
    # Save images into public/projects/<slug>/
    dest_dir = PUBLIC_ASSET_ROOT / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    urls = set(re.findall(r"https?://[^\s'\"]+\.(?:png|jpe?g|gif|webp)", html, re.IGNORECASE))
    mapping = {}
    for url in urls:
        try:
            fn = os.path.basename(url.split("?")[0])
            # Avoid very small thumbnails like -150x150
            base_no_size = re.sub(r"-\d+x\d+(?=\.)", "", fn)
            target = dest_dir / base_no_size
            # Unique filename if collision
            i = 1
            while target.exists():
                stem, ext = os.path.splitext(base_no_size)
                target = dest_dir / f"{stem}-{i}{ext}"
                i += 1
            with session.get(url, timeout=25, stream=True) as resp:
                resp.raise_for_status()
                with open(target, "wb") as f:
                    for chunk in resp.iter_content(8192):
                        f.write(chunk)
            mapping[url] = "/projects/" + slug + "/" + target.name
        except Exception:
            continue
    return mapping


def rewrite_image_urls(md_text: str, mapping: dict) -> str:
    # Replace occurrences of downloaded URLs with local static paths
    for src, local in mapping.items():
        md_text = md_text.replace(src, local)
    return md_text


def extract_summary(soup: BeautifulSoup) -> str:
    # Prefer the first substantial paragraph within #overview if present
    overview = soup.find(id="overview")
    search_roots = [overview] if overview else []
    main = soup.select_one("main#content")
    if main:
        search_roots.append(main)
    search_roots.append(soup)
    for root in search_roots:
        if not root:
            continue
        for p in root.find_all("p"):
            text = normalize_ws(p.get_text())
            if len(text) >= 60:
                return text[:280]
    return ""


def build_doc(url: str) -> ProjectDoc:
    html = fetch(url)
    soup = BeautifulSoup(html, "html.parser")
    meta = extract_meta(soup, url)
    sections = extract_sections(soup)
    body_md = extract_body_markdown(soup)
    body_md = transform_markdown(body_md)
    title = meta.get("og:title") or "Untitled"
    # Slug from URL path
    slug = re.sub(r"/$", "", re.sub(r"https?://[^/]+/", "", url))
    slug = SLUG_OVERRIDES.get(slug, slug)
    date_iso = ""
    if meta.get("article:published_time"):
        try:
            date_iso = datetime.fromisoformat(meta["article:published_time"].replace("Z", "+00:00")).date().isoformat()
        except Exception:
            pass
    if not date_iso:
        # try HTTP Last-Modified
        lm = head_last_modified(url)
        date_iso = lm or datetime.now().date().isoformat()
    summary = extract_summary(BeautifulSoup(html, "html.parser"))
    cover = meta.get("og:image")
    roles = extract_roles(soup)
    tags = infer_tags(soup.get_text(" ", strip=True))
    links = [{"label": "Original Page", "href": url}]
    if not sections:
        sections = [
            {"id": "overview", "label": "Overview"},
        ]
    return ProjectDoc(
        title=title,
        slug=slug,
        date=date_iso,
        summary=summary,
        cover=cover,
        links=links,
        sections=sections,
        body_markdown=body_md,
    )


def write_mdx(doc: ProjectDoc, out_dir: Path, html_for_assets: Optional[str] = None) -> Path:
    folder = out_dir
    folder.mkdir(parents=True, exist_ok=True)
    fp = folder / f"{doc.slug}.mdx"

    # Download images to public and rewrite md to local paths
    if html_for_assets:
        mapping = download_images(doc.slug, html_for_assets)
        new_md = rewrite_image_urls(doc.body_markdown, mapping)
        doc.body_markdown = new_md
        # If cover URL was downloaded, point to local
        if doc.cover and doc.cover in mapping:
            doc.cover = mapping[doc.cover]
    # Frontmatter
    frontmatter = {
        "title": doc.title,
        "slug": doc.slug,
        "date": doc.date,
        "role": extract_roles(BeautifulSoup(html_for_assets, "html.parser")) if html_for_assets else [],
        "summary": doc.summary or f"Imported from {BASE_URL}/{doc.slug}/",
        "tags": infer_tags(doc.body_markdown),
        "highlight": False,
        "cover": doc.cover or "",
        "links": doc.links,
        "sections": doc.sections,
    }
    def yaml_list(arr):
        return "[" + ", ".join(f'"{x}"' for x in arr) + "]"
    def yaml_links(arr):
        inner = ",\n  ".join(f"{{ label: \"{i['label']}\", href: \"{i['href']}\" }}" for i in arr)
        return f"[\n  {inner}\n]"

    fm_lines = ["---"]
    for k, v in frontmatter.items():
        if k == "role" or k == "tags":
            fm_lines.append(f"{k}: {yaml_list(v)}")
        elif k == "links":
            fm_lines.append(f"{k}: {yaml_links(v)}")
        elif k == "sections":
            fm_lines.append("sections:")
            for s in v:
                fm_lines.append(f"  - {{ id: \"{s['id']}\", label: \"{s['label']}\" }}")
        else:
            # escape quotes in strings
            sv = str(v).replace('"', '\\"') if v is not None else ""
            fm_lines.append(f"{k}: \"{sv}\"")
    fm_lines.append("---\n")

    # Inject imports for MDX components we may have used
    prelude = "import YouTube from \"@/components/mdx/YouTube\";\nimport Gallery from \"@/components/mdx/Gallery\";\n\n"
    body = doc.body_markdown
    if "<YouTube" in body or "<Gallery" in body:
        content = "\n".join(fm_lines) + prelude + body + "\n"
    else:
        content = "\n".join(fm_lines) + body + "\n"
    fp.write_text(content, encoding="utf-8")
    return fp


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base-url", default=BASE_URL)
    ap.add_argument("--out-dir", default="content/projects")
    ap.add_argument("--only", nargs="*", help="optional list of slugs to import")
    args = ap.parse_args()

    out_dir = Path(args.out_dir)
    urls = discover_project_urls(args.base_url)
    if args.only:
        urls = [u for u in urls if any(u.rstrip("/").endswith("/" + s.strip("/")) for s in args.only)]
    if not urls:
        print("No project URLs discovered.")
        return

    print("Discovered:")
    for u in urls:
        print(" -", u)

    written = []
    for u in urls:
        try:
            doc = build_doc(u)
            path = write_mdx(doc, out_dir, html_for_assets=fetch(u))
            written.append(path)
            print(f"Wrote {path}")
        except Exception as e:
            print(f"Failed to import {u}: {e}")

    print("\nDone. Files:")
    for p in written:
        print(" -", p)


if __name__ == "__main__":
    main()
