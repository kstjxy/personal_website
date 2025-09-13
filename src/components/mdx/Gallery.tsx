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

interface GalleryProps {
  images?: ImageItem[];
  className?: string;
  children?: React.ReactNode;
}

const Gallery: React.FC<GalleryProps> = ({ images, className, children }) => {
  return (
    <div className={cn("my-6", className)}>
      <Carousel className="relative">
        <CarouselContent>
          {images
            ? images.map((img, idx) => (
                <CarouselItem key={idx} className="md:basis-3/4 lg:basis-2/3">
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
                <CarouselItem key={idx} className="md:basis-3/4 lg:basis-2/3">
                  {child as React.ReactElement}
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default Gallery;
