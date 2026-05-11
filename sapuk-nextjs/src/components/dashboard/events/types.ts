import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

/** `resources.attachable_type` for event gallery images */
export const EVENT_ATTACHABLE_TYPE = "event" as const;

export type EventGalleryResource = {
  id: number;
  url: string;
  file_name: string;
  mime_type: string;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  cover_image?: string | null;
  dates_description?: string | null;
  starts_at?: string;
  ends_at?: string;
  location: string;
  type: string;
  max_volunteers?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
};

export type EventFormProps = {
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

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  cover_image: z.string().optional(),
  /** Required by API — use datetime-local values (YYYY-MM-DDTHH:mm). */
  starts_at: z.string().min(1, "Start date/time is required"),
  ends_at: z.string().min(1, "End date/time is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  max_volunteers: z.number().int().min(1, "Max volunteers must be at least 1"),
});

export type EventFormValues = z.infer<typeof eventSchema>;
