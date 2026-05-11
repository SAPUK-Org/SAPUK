"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Loader2, Pencil, Trash2 } from "lucide-react";
import type { Event } from "./types";
import { formatEventDateTime, unifiedEventGalleryImages } from "./events-utils";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PREVIEW_THUMB_LIMIT = 6;

type EventCardProps = {
  event: Event;
  onToggleActive: (event: Event) => void | Promise<void>;
  isToggleLoading?: boolean;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
};

export function EventCard({
  event,
  onToggleActive,
  isToggleLoading = false,
  onEdit,
  onDelete,
}: EventCardProps) {
  const previews = unifiedEventGalleryImages(event);
  const shown = previews.slice(0, PREVIEW_THUMB_LIMIT);
  const overflow = previews.length - shown.length;
  const isPublic = event.is_active !== false;
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    file_name?: string;
  } | null>(null);

  return (
    <Card className="overflow-hidden border-zinc-200 bg-zinc-50/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-1">
            <CardTitle className="text-lg leading-tight">
              {event.title}
            </CardTitle>
            {!isPublic ? (
              <span className="w-fit rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                Hidden from public site
              </span>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={isToggleLoading}
              onClick={() => onToggleActive(event)}
              aria-label={
                isPublic
                  ? "Hide event from public projects page"
                  : "Show event on public projects page"
              }
              title={isPublic ? "Hide from public site" : "Show on public site"}
            >
              {isToggleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : isPublic ? (
                <EyeOff className="h-4 w-4 text-primary" />
              ) : (
                <Eye className="h-4 w-4 text-primary" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(event)}
              aria-label="Edit event"
            >
              <Pencil className="h-4 w-4 text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-500"
              onClick={() => onDelete(event)}
              aria-label="Delete event"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {event.cover_image && (
          <div className="relative h-32 w-full overflow-hidden rounded-lg shadow-lg sm:h-40">
            <Image
              src={event.cover_image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          </div>
        )}
        <div className="flex flex-col gap-2 pt-2">
          <Label>{formatEventDateTime(event)}</Label>
          <p className="text-sm text-muted-foreground">
            {event.location} • {event.type}
            {event.max_volunteers != null
              ? ` • Max ${event.max_volunteers} volunteers`
              : " • Volunteers: TBC"}
          </p>
        </div>
      </CardHeader>
      <Separator className="mx-6 w-auto" />
      <CardContent className="space-y-3 pt-4">
        <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        {shown.length > 0 ? (
          <GalleryScroller shownCount={shown.length} overflow={overflow}>
            {shown.map((img, i) => (
              <button
                key={`${event.id}-${img.url}-${i}`}
                type="button"
                role="listitem"
                className="group relative h-56 w-56 shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-zoom-in"
                title={img.file_name || "View image"}
                aria-label={`Enlarge image: ${img.file_name || "event image"}`}
                onClick={() =>
                  setSelectedImage({ url: img.url, file_name: img.file_name })
                }
              >
                <Image
                  width={500}
                  height={500}
                  src={img.url}
                  alt={img.file_name || "Event image"}
                  className="h-full w-full object-cover"
                />
                <span className="sr-only">
                  {img.file_name || "Event image"}
                </span>
                <span
                  className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-md bg-gradient-to-t from-black/50 to-transparent pb-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                    Click to enlarge
                  </span>
                </span>
              </button>
            ))}
          </GalleryScroller>
        ) : null}
      </CardContent>
      <Dialog
        open={selectedImage != null}
        onOpenChange={(open) => {
          if (!open) setSelectedImage(null);
        }}
      >
        <DialogContent className="max-w-4xl border-zinc-700 bg-zinc-950 p-3">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedImage?.file_name || "Event image"}
            </DialogTitle>
          </DialogHeader>
          {selectedImage ? (
            <div className="flex max-h-[80vh] items-center justify-center overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.url}
                alt={selectedImage.file_name || "Event image"}
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

type GalleryScrollerProps = {
  children: React.ReactNode;
  shownCount: number;
  overflow: number;
};

function GalleryScroller({ children, shownCount, overflow }: GalleryScrollerProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = viewportRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    const delta = direction === "left" ? -amount : amount;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  if (shownCount === 0) return null;

  return (
    <div className="relative mt-1">
      <div
        ref={viewportRef}
        className="flex items-center gap-2 overflow-x-auto pb-1 pr-10"
        role="list"
        aria-label="Gallery and linked images"
      >
        {children}
        {overflow > 0 ? (
          <span
            className="flex h-24 min-w-20 items-center justify-center rounded-md border border-dashed border-zinc-300 px-3 text-xs font-medium text-muted-foreground"
            title={`${overflow} more not shown`}
          >
            +{overflow}
          </span>
        ) : null}
      </div>
      {shownCount > 1 ? (
        <>
          <button
            type="button"
            aria-label="Scroll images left"
            className="absolute inset-y-0 left-0 flex w-10 items-center justify-start bg-gradient-to-r from-background/95 to-transparent pl-1 text-zinc-500 transition hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            onClick={() => scrollByAmount("left")}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/85 text-xs font-semibold text-white">
              ‹
            </span>
          </button>
          <button
            type="button"
            aria-label="Scroll images right"
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-end bg-gradient-to-l from-background/95 to-transparent pr-1 text-zinc-500 transition hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            onClick={() => scrollByAmount("right")}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/85 text-xs font-semibold text-white">
              ›
            </span>
          </button>
        </>
      ) : null}
    </div>
  );
}
