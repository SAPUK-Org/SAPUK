import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

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
};

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  cover_image: z.string().optional(),
  starts_at: z.string().min(1, "Start date/time is required").optional(),
  ends_at: z.string().min(1, "End date/time is required").optional(),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  max_volunteers: z.number().int().min(1, "Must be at least 1").optional(),
});

export type EventFormValues = z.infer<typeof eventSchema>;
