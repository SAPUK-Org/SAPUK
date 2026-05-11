"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EventFormValues, EventGalleryResource } from "./types";
import type { UseFormReturn } from "react-hook-form";
import { EventForm } from "./EventForm";

type EventFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  form: UseFormReturn<EventFormValues>;
  onSubmit: (values: EventFormValues) => Promise<void>;
  actionError: string | null;
  actionLoading: boolean;
  onCancel: () => void;
  pendingImageFiles: File[];
  onPendingImageFilesChange: (files: File[]) => void;
  galleryResources: EventGalleryResource[];
  galleryLoading?: boolean;
  onRemoveGalleryImage?: (resourceId: number) => void | Promise<void>;
  galleryRemovingId?: number | null;
};

export function EventFormDialog({
  open,
  onOpenChange,
  title,
  description,
  form,
  onSubmit,
  actionError,
  actionLoading,
  onCancel,
  pendingImageFiles,
  onPendingImageFilesChange,
  galleryResources,
  galleryLoading,
  onRemoveGalleryImage,
  galleryRemovingId,
}: EventFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[min(90vh,900px)] w-full max-w-2xl grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden bg-zinc-200 p-0 sm:rounded-lg">
        <DialogHeader className="space-y-1.5 border-b border-zinc-300/80 px-6 pb-4 pt-6 pr-14 text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="min-h-0 overflow-y-auto overscroll-y-contain px-6 py-4">
          <EventForm
            form={form}
            onSubmit={onSubmit}
            actionError={actionError}
            actionLoading={actionLoading}
            onCancel={onCancel}
            pendingImageFiles={pendingImageFiles}
            onPendingImageFilesChange={onPendingImageFilesChange}
            galleryResources={galleryResources}
            galleryLoading={galleryLoading}
            onRemoveGalleryImage={onRemoveGalleryImage}
            galleryRemovingId={galleryRemovingId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
