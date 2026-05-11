"use client";

import { tiktokVideoIdFromUrl } from "./tiktok-utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export type TikTokCarouselItem = {
  label: string;
  url: string;
};

type TikTokVideoCarouselProps = {
  items: TikTokCarouselItem[];
};

export function TikTokVideoCarousel({ items }: TikTokVideoCarouselProps) {
  const withIds = items.map((item) => ({
    ...item,
    videoId: tiktokVideoIdFromUrl(item.url),
  }));
  const embeddable = withIds.filter((x) => x.videoId != null);
  const fallback = withIds.filter((x) => x.videoId == null);

  if (embeddable.length === 0 && fallback.length === 0) return null;

  return (
    <div className="space-y-4">
      {embeddable.length > 0 ? (
        <div className="relative mx-auto w-full max-w-[360px] px-2 sm:px-10">
          <Carousel opts={{ loop: embeddable.length > 1 }} className="w-full">
            <CarouselContent className="-ml-2 sm:-ml-3">
              {embeddable.map((item) => (
                <CarouselItem
                  key={`${item.url}-${item.videoId}`}
                  className="basis-full pl-2 sm:pl-3"
                >
                  <div className="flex flex-col items-center gap-2 px-1 py-2">
                    {item.label ? (
                      <p className="text-center text-sm font-medium text-primary">
                        {item.label}
                      </p>
                    ) : null}
                    <div className="relative w-full overflow-hidden rounded-md border border-zinc-700 bg-black shadow-lg">
                      <iframe
                        title={item.label || "TikTok video"}
                        src={`https://www.tiktok.com/embed/v2/${item.videoId}`}
                        className="block h-[min(70vh,740px)] w-full max-w-[325px] mx-auto"
                        allow="encrypted-media; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {embeddable.length > 1 ? (
              <>
                <CarouselPrevious
                  className={cn(
                    "h-9 w-9 border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white",
                    "left-0 top-1/2 -translate-y-1/2",
                  )}
                />
                <CarouselNext
                  className={cn(
                    "h-9 w-9 border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white",
                    "right-0 top-1/2 -translate-y-1/2",
                  )}
                />
              </>
            ) : null}
          </Carousel>
        </div>
      ) : null}
      {fallback.length > 0 ? (
        <ul className="flex flex-col items-center gap-2 text-sm">
          {fallback.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                {item.label?.trim() || "Open on TikTok"}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
