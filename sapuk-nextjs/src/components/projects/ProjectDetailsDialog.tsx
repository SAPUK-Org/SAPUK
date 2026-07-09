"use client";

import { useState } from "react";
import type {
  Event,
  EventGalleryImage,
} from "@/components/dashboard/events/types";
import {
  formatEventDateTime,
  formatEventLocations,
  unifiedEventGalleryImages,
} from "@/components/dashboard/events/events-utils";
import { EventProjectMedia } from "@/components/projects/embeds/EventProjectMedia";
import { Badge } from "@/components/ui/badge";
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
import { getEventCoverImage, isProjectType } from "./projects-utils";

type ProjectDetailsDialogProps = {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProjectDetailsDialog({
  event,
  open,
  onOpenChange,
}: ProjectDetailsDialogProps) {
  const [lightbox, setLightbox] = useState<EventGalleryImage | null>(null);

  if (!event) return null;

  const coverImage = getEventCoverImage(event);
  const unifiedSlides = unifiedEventGalleryImages(event);
  const isProject = isProjectType(event.type);
  const typeLabel =
    event.type?.trim() || (isProject ? "Project" : "Community Event");

  return (
    <>
      <Dialog open={lightbox != null} onOpenChange={(next) => !next && setLightbox(null)}>
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

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "max-h-[92vh] w-[min(96vw,900px)] max-w-[min(96vw,900px)] overflow-y-auto",
            "border-zinc-200 bg-white p-0 sm:rounded-xl",
          )}
        >
          <DialogHeader className="space-y-3 border-b border-zinc-100 px-6 pb-4 pt-6 text-left">
            <div className="flex flex-wrap items-start justify-between gap-3 pr-8">
              <DialogTitle className="text-2xl font-bold text-zinc-900">
                {event.title}
              </DialogTitle>
              <Badge
                className={cn(
                  "border-0 px-2.5 py-0.5 text-xs font-semibold",
                  isProject
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-purple-card/25 text-link",
                )}
              >
                {typeLabel}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-zinc-600">
              <p>{formatEventDateTime(event)}</p>
              <p>
                {formatEventLocations(event.location)}
                {event.max_volunteers != null
                  ? ` · Up to ${event.max_volunteers} attendees`
                  : null}
              </p>
            </div>
          </DialogHeader>

          <div className="space-y-6 px-6 py-6">
            <div className="relative mx-auto aspect-video w-full max-w-2xl overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
              <Image
                src={coverImage}
                alt={event.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {event.description ? (
              <p className="text-sm leading-relaxed text-zinc-700 md:text-base">
                {event.description}
              </p>
            ) : (
              <p className="text-sm text-zinc-500">No description provided.</p>
            )}

            <EventProjectMedia event={event} />

            {unifiedSlides.length > 0 ? (
              <div className="border-t border-zinc-100 pt-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-700">
                  Gallery
                </h3>
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
                                "group relative mx-auto block h-72 w-full max-w-xl overflow-hidden rounded-md border border-zinc-200 bg-zinc-50",
                                "cursor-zoom-in transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-blue focus-visible:ring-offset-2",
                                "hover:shadow-lg",
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
                        <CarouselPrevious className="left-0 top-1/2 h-9 w-9 -translate-y-1/2 border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100" />
                        <CarouselNext className="right-0 top-1/2 h-9 w-9 -translate-y-1/2 border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100" />
                      </>
                    ) : null}
                  </Carousel>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
