import React from "react";

interface HeroHeaderProps {
  title: string;
  image: string;
  alt?: string;
  meta?: React.ReactNode;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ title, image, alt = "", meta }) => {
  return (
    <div className="relative w-full h-[220px] md:h-[360px] bg-muted overflow-hidden">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='360' viewBox='0 0 1600 360'%3E%3Crect width='1600' height='360' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='28'%3EProject Hero%3C/text%3E%3C/svg%3E";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
      <div className="absolute bottom-6 left-6 right-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-sm">{title}</h1>
        {meta && <div className="mt-2 text-white/90">{meta}</div>}
      </div>
    </div>
  );
};

export default HeroHeader;

