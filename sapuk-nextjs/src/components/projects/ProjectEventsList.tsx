"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type {
  Event,
  EventGalleryImage,
} from "@/components/dashboard/events/types";
import {
  formatEventDateTime,
  unifiedEventGalleryImages,
} from "@/components/dashboard/events/events-utils";
import { EventProjectMedia } from "@/components/projects/embeds/EventProjectMedia";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ProjectEventsListProps = {
  events: Event[];
  emptyLabel?: string;
};

export default function ProjectEventsList({
  events,
  emptyLabel = "No public events right now.",
}: ProjectEventsListProps) {
  const [openById, setOpenById] = useState<Record<number, boolean>>({});
  const [lightbox, setLightbox] = useState<EventGalleryImage | null>(null);
  const firstOpenSeeded = useRef(false);

  useEffect(() => {
    if (events.length === 0) {
      firstOpenSeeded.current = false;
      return;
    }
    if (firstOpenSeeded.current) return;
    firstOpenSeeded.current = true;
    const firstId = events[0].id;
    setOpenById((prev) => ({ ...prev, [firstId]: true }));
  }, [events]);

  if (events.length === 0) {
    return <p className="text-sm text-zinc-500">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Dialog
        open={lightbox != null}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent
          className={cn(
            "max-h-[92vh] w-[min(96vw,1200px)] max-w-[min(96vw,1200px)] translate-x-[-50%] translate-y-[-50%]",
            "gap-0 border-zinc-700 bg-zinc-950 p-2 sm:p-4",
            "overflow-hidden",
          )}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>
              {lightbox?.file_name?.trim() || "Gallery image"}
            </DialogTitle>
          </DialogHeader>
          {lightbox ? (
            <div className="flex max-h-[85vh] w-full items-center justify-center overflow-auto p-2">
              {/* Native img: works for any host (UploadThing + arbitrary URL images). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.url}
                alt={lightbox.file_name || "Image"}
                className="max-h-[85vh] w-auto max-w-full object-contain"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
      {events.map((event) => {
        const isOpen = openById[event.id] ?? false;
        const hasCover = Boolean(event.cover_image?.trim());
        const unifiedSlides = unifiedEventGalleryImages(event);
        return (
          <section key={event.id} className="mb-10 last:mb-0">
            <Collapsible
              open={isOpen}
              onOpenChange={(next) =>
                setOpenById((prev) => ({ ...prev, [event.id]: next }))
              }
            >
              <CollapsibleTrigger className="w-full bg-transparent p-0 text-left hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-sm">
                <h2
                  className={cn(
                    "mx-auto flex max-w-4xl items-center justify-center gap-3",
                    "border-b border-zinc-600 pb-4 text-center md:pb-6",
                    "text-2xl font-bold text-primary transition-colors md:text-3xl lg:text-4xl",
                    "cursor-pointer hover:text-primary/80",
                  )}
                >
                  <span className="min-w-0">{event.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-6 w-6 shrink-0 text-zinc-400 transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </h2>
              </CollapsibleTrigger>

              <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                <Card
                  className={cn(
                    "mx-auto mt-4 max-w-4xl border-zinc-700/80 shadow-md md:mt-6",
                  )}
                >
                  <CardContent className="space-y-6 p-6 pt-6 md:p-8 md:pt-8">
                    {hasCover ? (
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                        <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
                          {event.type ? (
                            <p className="text-xs font-medium uppercase tracking-wide text-primary">
                              {event.type}
                            </p>
                          ) : null}
                          <p className="text-sm text-primary md:text-base">
                            {formatEventDateTime(event)}
                          </p>
                          <p className="text-sm text-primary md:text-base">
                            {event.location}
                            {event.max_volunteers != null
                              ? ` · Max ${event.max_volunteers} volunteers`
                              : null}
                          </p>
                        </div>
                        <div className="relative mx-auto h-44 w-full max-w-[280px] shrink-0 overflow-hidden rounded-md border border-zinc-700 sm:mx-0 sm:h-40 sm:w-44 md:h-44 md:w-52">
                          <Image
                            src={event.cover_image!}
                            alt={event.title}
                            className="h-full w-full object-cover"
                            fill
                            unoptimized
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-center">
                        {event.type ? (
                          <p className="text-xs font-medium uppercase tracking-wide text-primary">
                            {event.type}
                          </p>
                        ) : null}
                        <p className="text-sm text-primary md:text-base">
                          {formatEventDateTime(event)}
                        </p>
                        <p className="text-sm text-primary md:text-base">
                          {event.location}
                          {event.max_volunteers != null
                            ? ` · Max ${event.max_volunteers} volunteers`
                            : null}
                        </p>
                      </div>
                    )}
                    {event.description ? (
                      <p
                        className={cn(
                          "text-sm leading-relaxed text-primary md:text-base",
                          hasCover &&
                            "border-t border-zinc-700/60 pt-6 text-left sm:pt-6",
                          !hasCover && "text-center sm:text-left",
                        )}
                      >
                        {event.description}
                      </p>
                    ) : (
                      <p
                        className={cn(
                          "text-sm text-primary",
                          hasCover &&
                            "border-t border-zinc-700/60 pt-6 text-left sm:pt-6",
                          !hasCover && "text-center sm:text-left",
                        )}
                      >
                        No description provided.
                      </p>
                    )}
                    <EventProjectMedia event={event} />
                    {unifiedSlides.length > 0 ? (
                      <div className="pt-6 text-center">
                        <div className="relative mx-auto w-full max-w-xl px-2 sm:px-10">
                          <Carousel
                            opts={{ loop: unifiedSlides.length > 1 }}
                            className="w-full"
                          >
                            <CarouselContent className="-ml-2 sm:-ml-3">
                              {unifiedSlides.map((img, idx) => (
                                <CarouselItem
                                  key={`${event.id}-${img.url}-${idx}`}
                                  className="basis-full pl-2 sm:pl-3"
                                >
                                  <div className="flex justify-center px-1 py-2">
                                    <button
                                      type="button"
                                      className={cn(
                                        "group relative mx-auto block h-80 w-full max-w-xl overflow-hidden rounded-md border border-zinc-700 bg-zinc-950",
                                        "cursor-zoom-in transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                                        "hover:shadow-lg hover:shadow-zinc-950/40",
                                      )}
                                      title="View larger"
                                      aria-label={`Enlarge image: ${img.file_name || "gallery photo"}`}
                                      onClick={() =>
                                        setLightbox({
                                          url: img.url,
                                          file_name: img.file_name,
                                        })
                                      }
                                    >
                                      <Image
                                        width={1000}
                                        height={1000}
                                        src={img.url}
                                        alt={img.file_name || "Event image"}
                                        className="h-full w-full object-contain"
                                      />
                                      <span className="sr-only">
                                        {img.file_name || "Event image"}
                                      </span>
                                      <span
                                        className={cn(
                                          "pointer-events-none absolute inset-0 flex items-end justify-center rounded-md bg-gradient-to-t from-black/50 to-transparent pb-2",
                                          "opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
                                        )}
                                      >
                                        <span className="rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
                                          Click to enlarge
                                        </span>
                                      </span>
                                    </button>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            {unifiedSlides.length > 1 ? (
                              <>
                                <CarouselPrevious
                                  className={cn(
                                    "h-9 w-9 border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white",
                                    "left-0 top-1/2 -translate-y-1/2 sm:left-0",
                                  )}
                                />
                                <CarouselNext
                                  className={cn(
                                    "h-9 w-9 border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white",
                                    "right-0 top-1/2 -translate-y-1/2 sm:right-0",
                                  )}
                                />
                              </>
                            ) : null}
                          </Carousel>
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </section>
        );
      })}
    </div>
  );
}
