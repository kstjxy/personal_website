import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type YouTubeProps = {
  id?: string;
  url?: string;
  title?: string;
  className?: string;
};

function extractId(input?: string): string | null {
  if (!input) return null;
  // If already an ID-like string (11 chars common), accept
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  try {
    const u = new URL(input);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.split("/").filter(Boolean).pop() || null;
    }
    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }
    const parts = u.pathname.split("/");
    const embedIndex = parts.findIndex((p) => p === "embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) {
      return parts[embedIndex + 1];
    }
    return null;
  } catch {
    return null;
  }
}

const YouTube: React.FC<YouTubeProps> = ({ id, url, title = "YouTube video", className }) => {
  const resolvedId = id || extractId(url || "");
  if (!resolvedId) return null;
  const src = `https://www.youtube.com/embed/${resolvedId}?rel=0`;

  return (
    <div className={className}>
      <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden bg-muted">
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </AspectRatio>
    </div>
  );
};

export default YouTube;

