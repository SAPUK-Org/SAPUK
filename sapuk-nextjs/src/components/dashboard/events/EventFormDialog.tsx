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
      <DialogContent className="bg-zinc-200">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
