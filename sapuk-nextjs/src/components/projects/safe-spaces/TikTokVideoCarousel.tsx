"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { useEffect } from "react";

interface TikTokCarouselProps {
  tiktokUrls: string[];
}

function extractTiktokEmbedUrl(shareUrl: string) {
  // TikTok share links look like:
  //   https://www.tiktok.com/@username/video/VIDEO_ID
  // We want: https://www.tiktok.com/embed/VIDEO_ID
  try {
    const url = new URL(shareUrl);
    // If path is "/@username/video/VIDEO_ID"
    const segments = url.pathname.split("/");
    const videoIndex = segments.findIndex((s) => s === "video");
    if (videoIndex !== -1 && segments.length > videoIndex + 1) {
      const videoId = segments[videoIndex + 1];
      return `https://www.tiktok.com/embed/${videoId}`;
    }
  } catch {
    // If URL parsing fails, just return it unchanged
  }
  return shareUrl;
}

export default function TikTokCarousel({ tiktokUrls }: TikTokCarouselProps) {
  // Optional: TikTok recommends loading their embed script once,
  // so that responsive resizing / "play on hover" etc. all work.
  // If you want to use the official TikTok "script embed" (blockquote style),
  // you could inject their script dynamically. For a plain <iframe>, it's not strictly required.
  useEffect(() => {
    if (typeof document !== "undefined") {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src="https://www.tiktok.com/embed.js"]'
      );
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      variant="video"
      className="w-full"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {tiktokUrls?.map((url, idx) => {
          const embedUrl = extractTiktokEmbedUrl(url);

          return (
            <CarouselItem
              key={idx}
              className="p-2 flex items-center justify-center"
            >
              <div className="relative w-full max-w-md aspect-[9/16] flex items-center justify-center rounded-lg overflow-hidden">
                <iframe
                  src={embedUrl}
                  allow="autoplay; fullscreen"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  className="w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="bg-zinc-800 text-white w-12 h-12 -left-6 hover:bg-zinc-700 transition-colors" />
      <CarouselNext className="bg-zinc-800 text-white w-12 h-12 -right-6 hover:bg-zinc-700 transition-colors" />
    </Carousel>
  );
}
