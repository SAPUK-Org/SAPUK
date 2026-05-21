"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DEWSBURY_GALLERY_SLIDES } from "./dewsbury-gallery-data";

/** Image card width inside the full-width carousel track. */
const SLIDE_FRAME_CLASS =
  "mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg";

/** Fixed frame so every slide matches regardless of source image dimensions. */
const SLIDE_IMAGE_HEIGHT = "h-64 sm:h-72 md:h-80";
const SLIDE_CAPTION_MIN_HEIGHT = "min-h-[4.5rem]";

/** Embla slide: full track width; overrides default CarouselItem centering. */
const CAROUSEL_SLIDE_CLASS =
  "min-w-0 w-full max-w-full shrink-0 grow-0 basis-full !flex-[0_0_100%] !basis-full !pl-0 !items-stretch !justify-start";

const CAROUSEL_TRACK_CLASS = "!ml-0";

function GallerySlideFrame({
  slide,
  index,
  onOpen,
}: {
  slide: (typeof DEWSBURY_GALLERY_SLIDES)[number];
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <figure
      className={cn(
        SLIDE_FRAME_CLASS,
        "flex min-w-0 flex-col overflow-hidden rounded-xl border border-zinc-100 bg-zinc-100",
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        className={cn(
          "group relative block w-full min-w-0 max-w-full shrink-0 overflow-hidden text-left",
          SLIDE_IMAGE_HEIGHT,
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2",
        )}
        aria-label={`View full size: ${slide.alt}`}
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 85vw, 512px"
          priority={slide.id === DEWSBURY_GALLERY_SLIDES[0].id}
        />
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20"
          aria-hidden
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-white/90 text-zinc-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
            <ZoomIn className="size-5" />
          </span>
        </span>
      </button>
      <figcaption
        className={cn(
          "flex w-full shrink-0 items-center border-t border-zinc-100 bg-zinc-50/80 px-4 py-3",
          SLIDE_CAPTION_MIN_HEIGHT,
        )}
      >
        <p className="line-clamp-2 w-full text-sm leading-snug text-zinc-700">
          {slide.caption}
        </p>
      </figcaption>
    </figure>
  );
}

export function DewsburyGalleryCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(DEWSBURY_GALLERY_SLIDES.length);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxApi, setLightboxApi] = useState<CarouselApi>();
  const [lightboxCurrent, setLightboxCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!lightboxApi) return;

    const onSelect = () =>
      setLightboxCurrent(lightboxApi.selectedScrollSnap() + 1);
    onSelect();
    lightboxApi.on("select", onSelect);
    return () => {
      lightboxApi.off("select", onSelect);
    };
  }, [lightboxApi]);

  useEffect(() => {
    if (!lightboxOpen || !lightboxApi) return;
    lightboxApi.scrollTo(lightboxIndex, true);
    setLightboxCurrent(lightboxIndex + 1);
  }, [lightboxOpen, lightboxIndex, lightboxApi]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        lightboxApi?.scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        lightboxApi?.scrollNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, lightboxApi]);

  const openLightbox = useCallback(
    (index: number) => {
      setLightboxIndex(index);
      setLightboxCurrent(index + 1);
      setLightboxOpen(true);
      api?.scrollTo(index);
    },
    [api],
  );

  const lightboxSlide =
    DEWSBURY_GALLERY_SLIDES[lightboxCurrent - 1] ??
    DEWSBURY_GALLERY_SLIDES[lightboxIndex];

  return (
    <section
      aria-label="Photos from Dewsbury programmes"
      className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm"
    >
      <div className="border-b border-zinc-100 px-5 py-4 md:px-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Community in Dewsbury
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          A glimpse of our local programmes — tap a photo to view full size.
        </p>
      </div>

      <div className="relative w-full min-w-0 px-3 py-4 sm:px-12 sm:py-6">
        <div className="w-full min-w-0 overflow-hidden">
          <Carousel
            setApi={setApi}
            className="w-full max-w-full"
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent className={CAROUSEL_TRACK_CLASS}>
              {DEWSBURY_GALLERY_SLIDES.map((slide, index) => (
                <CarouselItem
                  key={slide.id}
                  className={cn(CAROUSEL_SLIDE_CLASS, "flex justify-center")}
                >
                  <GallerySlideFrame
                    slide={slide}
                    index={index}
                    onOpen={openLightbox}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 top-[38%] -translate-y-1/2 sm:left-3" />
            <CarouselNext className="right-1 top-[38%] -translate-y-1/2 sm:right-3" />
          </Carousel>
        </div>

        <div
          className="mt-4 flex items-center justify-center gap-2"
          aria-live="polite"
        >
          {DEWSBURY_GALLERY_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index + 1 ? "true" : undefined}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                current === index + 1
                  ? "w-6 bg-zinc-800"
                  : "w-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
          <span className="sr-only">
            Slide {current} of {count}
          </span>
        </div>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="flex max-h-[95vh] w-[calc(100%-2rem)] max-w-5xl flex-col gap-0 overflow-hidden p-0 sm:max-w-6xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{lightboxSlide?.alt ?? "Gallery photo"}</DialogTitle>
            <DialogDescription>
              Image {lightboxCurrent} of {DEWSBURY_GALLERY_SLIDES.length}. Use
              arrow keys or the buttons to change image.
            </DialogDescription>
          </DialogHeader>

          <div className="relative w-full min-w-0 bg-zinc-950 px-10 py-4 sm:px-14">
            <div className="w-full min-w-0 overflow-hidden">
              <Carousel
                setApi={setLightboxApi}
                className="w-full max-w-full"
                opts={{
                  loop: true,
                  align: "start",
                  startIndex: lightboxIndex,
                }}
              >
                <CarouselContent className={CAROUSEL_TRACK_CLASS}>
                  {DEWSBURY_GALLERY_SLIDES.map((slide) => (
                    <CarouselItem
                      key={slide.id}
                      className={CAROUSEL_SLIDE_CLASS}
                    >
                      <div className="relative block h-[min(70vh,720px)] w-full min-w-0 max-w-full">
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 1152px) 100vw, 1152px"
                          priority
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2 border-zinc-700 bg-zinc-800/90 text-white hover:bg-zinc-700 hover:text-white" />
                <CarouselNext className="right-0 top-1/2 -translate-y-1/2 border-zinc-700 bg-zinc-800/90 text-white hover:bg-zinc-700 hover:text-white" />
              </Carousel>
            </div>
          </div>

          <div className="border-t border-zinc-200 bg-white px-6 py-4">
            <p className="text-sm font-medium text-zinc-900">
              {lightboxSlide?.caption}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {lightboxCurrent} of {DEWSBURY_GALLERY_SLIDES.length}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
