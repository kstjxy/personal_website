# XJ Portfolio — Vite + React + MDX

This is a small personal portfolio site built as a single‑page app. Project content is authored in MDX and compiled into React components at build/dev time. The UI uses Tailwind and shadcn (Radix UI primitives) for a clean, component‑driven setup.

## Tech Stack

- Vite 5 + React 18 + TypeScript 5 (SWC plugin)
- Tailwind CSS 3 (+ Typography + tailwindcss-animate)
- shadcn/ui components built on Radix UI
- MDX v3 with remark plugins for frontmatter
- React Router v6 for SPA routing

## How Content Flows

1. Author MDX with frontmatter

- Each project lives in `content/projects/*.mdx` and starts with YAML frontmatter:

---

title: "AR Museum Experience"
slug: "ar-museum-experience"
date: "2023-08-05"
role: ["AR Developer", "UX Designer"]
cover: "/images/ar-museum-experience/cover.jpg"
summary: "Immersive AR application for museum exhibits."
tags: ["Unity", "ARKit", "Android", "iOS"]
highlight: false

---

Then write Markdown with optional JSX components.

2. Compile MDX during dev/build

- Vite runs `@mdx-js/rollup` with `remark-frontmatter` and `remark-mdx-frontmatter` (`vite.config.ts:1`).
- Frontmatter is exported as a named ESM export `frontmatter`. The MDX body becomes the module default export (a React component).

3. Load all projects as modules

- `src/lib/content.ts:1` uses `import.meta.glob('/content/projects/*.mdx', { eager: true })` to import every MDX file at startup.
- It shapes metadata (slug, month/year labels) and exposes:
  - `allProjects`: array of project metadata + component reference
  - `getProjectBySlug(slug)` / `getProjectsByView(view)` helpers

4. Render lists and details

- `src/pages/Work.tsx:1` lists projects using `allProjects` and a simple view toggle.
- `src/pages/ProjectDetail.tsx:1` looks up a project by slug and renders its MDX via `<MDXProvider><project.MDXContent /></MDXProvider>` with Tailwind Typography prose styles.

## Dev & Build

- Dev server with HMR: `npm run dev`
  - Editing `.mdx` files hot‑reloads impacted routes.
  - Adding/removing `.mdx` files triggers a refresh; they’re auto‑discovered by the glob import.
- Production build: `npm run build` and `npm run preview`
  - MDX is compiled once and bundled. With `eager: true`, all project content is included in the client bundle.

## Repo Layout

- `vite.config.ts`: Vite + React SWC + MDX + remark frontmatter setup
- `tailwind.config.ts`: Tailwind theme, tokens, plugins
- `src/index.css`: CSS variables (design tokens) and Tailwind layers
- `content/projects/*.mdx`: Project entries (content + metadata)
- `src/lib/content.ts`: MDX loading and metadata shaping
- `src/pages/*`: Routes (Work index, Project detail, etc.)
- `src/components/ui/*`: shadcn/Radix UI components

## Notes

- Tailwind classes inside MDX: if you add Tailwind classes directly in `.mdx`, also include `./content/**/*.{md,mdx}` in `content` globs in `tailwind.config.ts` so classes aren’t purged.
- All MDX is imported eagerly for simplicity. If bundle size becomes a concern, switch to lazy `import.meta.glob` and load project pages on demand.
