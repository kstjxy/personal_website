import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ImageItem = { src: string; alt?: string; caption?: string };

import type { CarouselApi } from "@/components/ui/carousel";

interface GalleryProps {
  images?: ImageItem[];
  className?: string;
  children?: React.ReactNode;
  ui?: {
    // dots default to true on mobile; set to false to hide
    dots?: boolean;
    // show a peek of the next slide on mobile
    peek?: boolean;
    // optional mobile arrows
    mobileArrows?: boolean;
  };
}

const Gallery: React.FC<GalleryProps> = ({ images, className, children, ui }) => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [selected, setSelected] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);
  // no hint mode anymore

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    setSlideCount(api.scrollSnapList().length);
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const itemBasis = ui?.peek
    ? "basis-[85%] md:basis-3/4 lg:basis-2/3"
    : "md:basis-3/4 lg:basis-2/3";

  return (
    <div className={cn("relative my-6", className)}>
      <Carousel className="relative" setApi={setApi} opts={{ align: "start" }}>
        <CarouselContent>
          {images
            ? images.map((img, idx) => (
                <CarouselItem key={idx} className={itemBasis}>
                  <figure>
                    <div className="overflow-hidden rounded-lg bg-muted">
                      <img
                        src={img.src}
                        alt={img.alt ?? ""}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='18'%3EImage%20Unavailable%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="mt-2 text-xs text-muted-foreground">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                </CarouselItem>
              ))
            : React.Children.map(children, (child, idx) => (
                <CarouselItem key={idx} className={itemBasis}>
                  {child as React.ReactElement}
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className={ui?.mobileArrows ? "flex sm:flex" : "hidden md:flex"} />
        <CarouselNext className={ui?.mobileArrows ? "flex sm:flex" : "hidden md:flex"} />
      </Carousel>

      {/* dots for mobile (default on) */}
      {ui?.dots !== false && slideCount > 1 && (
        <div className="mt-2 flex justify-center gap-2 sm:hidden" aria-label="Slide indicators">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i === selected ? "bg-foreground" : "bg-muted/70",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
