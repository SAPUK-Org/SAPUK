"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type EnlargeableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Width of the enlarged image. Defaults to `width * 2`. */
  enlargedWidth?: number;
  /** Height of the enlarged image. Defaults to `height * 2`. */
  enlargedHeight?: number;
  /** Accessible label for the enlarge trigger button. */
  enlargeLabel?: string;
  /** Dialog title announced to screen readers. Defaults to `alt`. */
  dialogTitle?: string;
  /** Dialog description announced to screen readers. */
  dialogDescription?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  enlargedSizes?: string;
  priority?: boolean;
};

export default function EnlargeableImage({
  src,
  alt,
  width,
  height,
  enlargedWidth,
  enlargedHeight,
  enlargeLabel = "Enlarge image",
  dialogTitle,
  dialogDescription = "Enlarged image. Scroll if the image is taller than the screen.",
  className,
  imageClassName,
  sizes = "(max-width: 1024px) 100vw, 400px",
  enlargedSizes = "(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 896px",
  priority = false,
}: EnlargeableImageProps) {
  const dialogImageWidth = enlargedWidth ?? width * 2;
  const dialogImageHeight = enlargedHeight ?? height * 2;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "group relative cursor-zoom-in overflow-hidden rounded-md border border-zinc-200 text-left outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className,
          )}
          aria-label={enlargeLabel}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn("w-full select-none", imageClassName)}
            sizes={sizes}
            priority={priority}
          />
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/15 group-focus-visible:bg-black/15"
            aria-hidden
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-white/95 text-zinc-800 opacity-90 shadow-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
              <ZoomIn className="size-5" />
            </span>
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[95dvh] w-[calc(100%-1.5rem)] max-w-3xl flex-col gap-0 overflow-hidden p-0 sm:w-[calc(100%-2rem)] sm:max-w-4xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{dialogTitle ?? alt}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <div className="max-h-[95dvh] overflow-auto overscroll-contain touch-pan-y">
          <div className="flex min-h-full items-center justify-center bg-zinc-50 p-3 pt-12 sm:p-6 sm:pt-14">
            <Image
              src={src}
              alt={alt}
              width={dialogImageWidth}
              height={dialogImageHeight}
              className="h-auto w-full max-w-full select-none rounded-sm"
              sizes={enlargedSizes}
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
