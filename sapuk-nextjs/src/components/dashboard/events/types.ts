import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

/** `resources.attachable_type` for event gallery images */
export const EVENT_ATTACHABLE_TYPE = "event" as const;

export type EventExternalLinkKind = "web" | "tiktok" | "image";

export type EventExternalLink = {
  label: string;
  url: string;
  kind: EventExternalLinkKind;
};

export type EventStudioSocialLink = {
  network: string;
  url: string;
};

export type EventStudioPartner = {
  name: string;
  location?: string | null;
  imageSrc?: string | null;
  description?: string | null;
  socialLinks?: EventStudioSocialLink[];
};

export type EventGalleryResource = {
  id: number;
  url: string;
  file_name: string;
  mime_type: string;
};

/** Extra images from `resources` (public list/detail). */
export type EventGalleryImage = {
  url: string;
  file_name: string;
};

export type EventScheduleSlot = {
  starts_at: string;
  ends_at: string;
};

export type EventScheduleMode = "single" | "multiple" | "prose";

export type Event = {
  id: number;
  title: string;
  description: string;
  cover_image?: string | null;
  dates_description?: string | null;
  schedule_slots?: EventScheduleSlot[];
  starts_at?: string | null;
  ends_at?: string | null;
  location: string[];
  type?: string | null;
  max_volunteers?: number | null;
  /** False = hidden from public projects page. */
  is_active?: boolean;
  /** Ordered outbound links / embeds (TikTok, web, image URLs). */
  external_links?: EventExternalLink[] | null;
  /** Structured partner studios (cards on the public projects page). */
  studio_partners?: EventStudioPartner[] | null;
  /** Image attachments for gallery / carousel (from public API). */
  gallery?: EventGalleryImage[];
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

const eventStudioSocialRowSchema = z.object({
  network: z.string(),
  url: z.string(),
});

const eventStudioPartnerFormSchema = z.object({
  name: z.string(),
  location: z.string().optional(),
  imageSrc: z.string().optional(),
  description: z.string().optional(),
  socialLinks: z.array(eventStudioSocialRowSchema),
});

const eventExternalLinkFormSchema = z.object({
  label: z.string(),
  url: z.string(),
  kind: z.enum(["web", "tiktok", "image"]),
});

const eventScheduleSlotFormSchema = z.object({
  starts_at: z.string(),
  ends_at: z.string(),
});

type ScheduleModeInput = {
  schedule_mode: EventScheduleMode;
  dates_description?: string;
  starts_at: string;
  ends_at: string;
  schedule_slots: { starts_at: string; ends_at: string }[];
};

/** Align validation/payload with the schedule UI the user actually filled in. */
export function resolveEffectiveScheduleMode(
  data: ScheduleModeInput,
): EventScheduleMode {
  if (data.schedule_mode === "prose") return "prose";
  if (data.schedule_mode === "multiple") return "multiple";

  const desc = (data.dates_description ?? "").trim();
  const hasSingle =
    (data.starts_at ?? "").trim() !== "" || (data.ends_at ?? "").trim() !== "";
  const hasSlots = (data.schedule_slots ?? []).some(
    (s) => (s.starts_at ?? "").trim() !== "" || (s.ends_at ?? "").trim() !== "",
  );

  if (desc && !hasSingle && !hasSlots) return "prose";

  return "single";
}

export const eventSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    cover_image: z.string().optional(),
    /** UI-only — not sent to API. */
    schedule_mode: z.enum(["single", "multiple", "prose"]),
    /** Prose / recurring schedule (prose mode only). */
    dates_description: z.string().optional(),
    /** Single session — datetime-local (single mode). */
    starts_at: z.string(),
    ends_at: z.string(),
    /** Multiple sessions (multiple mode). */
    schedule_slots: z.array(eventScheduleSlotFormSchema),
    location: z
      .array(z.string().min(1, "Location cannot be empty"))
      .min(1, "At least one location is required"),
    type: z.string().optional(),
    max_volunteers: z
      .number()
      .int("Max volunteers must be a whole number")
      .min(1, "Max volunteers must be at least 1")
      .optional(),
    /** When true, event appears on the public projects page. */
    is_active: z.boolean(),
    external_links: z.array(eventExternalLinkFormSchema),
    studio_partners: z.array(eventStudioPartnerFormSchema),
  })
  .superRefine((data, ctx) => {
    if (
      data.max_volunteers !== undefined &&
      (typeof data.max_volunteers !== "number" || Number.isNaN(data.max_volunteers))
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Max volunteers must be a whole number",
        path: ["max_volunteers"],
      });
    }

    data.external_links.forEach((link, i) => {
      const label = link.label.trim();
      const url = link.url.trim();
      if (!label && !url) return;
      if (!label) {
        ctx.addIssue({
          code: "custom",
          message: "Label is required for each link row you started",
          path: ["external_links", i, "label"],
        });
      }
      if (!url) {
        ctx.addIssue({
          code: "custom",
          message: "URL is required for each link row you started",
          path: ["external_links", i, "url"],
        });
      }
    });

    data.studio_partners.forEach((p, pi) => {
      const name = p.name.trim();
      const loc = (p.location ?? "").trim();
      const img = (p.imageSrc ?? "").trim();
      const desc = (p.description ?? "").trim();
      const hasSocial = (p.socialLinks ?? []).some(
        (s) => s.network.trim() || s.url.trim(),
      );
      const ghost = !name && !loc && !img && !desc && !hasSocial;
      if (ghost) return;
      if (!name) {
        ctx.addIssue({
          code: "custom",
          message: "Studio name is required once you add details",
          path: ["studio_partners", pi, "name"],
        });
        return;
      }
      (p.socialLinks ?? []).forEach((s, si) => {
        const n = s.network.trim();
        const u = s.url.trim();
        if ((n && !u) || (!n && u)) {
          ctx.addIssue({
            code: "custom",
            message: "Provide both network name and URL for each social link",
            path: ["studio_partners", pi, "socialLinks", si, n ? "url" : "network"],
          });
        }
      });
    });

    const scheduleMode = resolveEffectiveScheduleMode(data);

    if (scheduleMode === "prose") {
      const desc = (data.dates_description ?? "").trim();
      if (!desc) {
        ctx.addIssue({
          code: "custom",
          message: "Dates description is required for recurring or TBC schedules",
          path: ["dates_description"],
        });
      }
      return;
    }

    if (scheduleMode === "single") {
      const start = data.starts_at?.trim() ?? "";
      const end = data.ends_at?.trim() ?? "";
      if (!start) {
        ctx.addIssue({
          code: "custom",
          message: "Start date/time is required",
          path: ["starts_at"],
        });
      }
      if (!end) {
        ctx.addIssue({
          code: "custom",
          message: "End date/time is required",
          path: ["ends_at"],
        });
      }
      if (start && end) {
        const s = new Date(start);
        const e = new Date(end);
        if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e < s) {
          ctx.addIssue({
            code: "custom",
            message: "End must be on or after start",
            path: ["ends_at"],
          });
        }
      }
      return;
    }

    if (scheduleMode === "multiple") {
      if (data.schedule_slots.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Add at least one session",
          path: ["schedule_slots"],
        });
        return;
      }
      data.schedule_slots.forEach((slot, i) => {
        const start = slot.starts_at?.trim() ?? "";
        const end = slot.ends_at?.trim() ?? "";
        if (!start) {
          ctx.addIssue({
            code: "custom",
            message: "Start date/time is required",
            path: ["schedule_slots", i, "starts_at"],
          });
        }
        if (!end) {
          ctx.addIssue({
            code: "custom",
            message: "End date/time is required",
            path: ["schedule_slots", i, "ends_at"],
          });
        }
        if (start && end) {
          const s = new Date(start);
          const e = new Date(end);
          if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e < s) {
            ctx.addIssue({
              code: "custom",
              message: "End must be on or after start",
              path: ["schedule_slots", i, "ends_at"],
            });
          }
        }
      });
      return;
    }
  });

export type EventFormValues = z.output<typeof eventSchema>;
