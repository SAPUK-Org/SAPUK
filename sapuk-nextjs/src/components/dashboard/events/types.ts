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

export const eventSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    cover_image: z.string().optional(),
    /** Free text for recurring dates, multiple sessions, or TBC. */
    dates_description: z.string().optional(),
    /** Optional single session — use datetime-local (YYYY-MM-DDTHH:mm). Leave both blank if unknown. */
    starts_at: z.string(),
    ends_at: z.string(),
    location: z.string().min(1, "Location is required"),
    type: z.string().min(1, "Type is required"),
    max_volunteers: z.number().int().min(1, "Max volunteers must be at least 1"),
    /** When true, event appears on the public projects page. */
    is_active: z.boolean(),
    external_links: z.array(eventExternalLinkFormSchema),
    studio_partners: z.array(eventStudioPartnerFormSchema),
  })
  .superRefine((data, ctx) => {
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

    const start = data.starts_at?.trim() ?? "";
    const end = data.ends_at?.trim() ?? "";
    if (!start && !end) return;
    if (!start) {
      ctx.addIssue({
        code: "custom",
        message: "Add a start date/time, or clear both fields",
        path: ["starts_at"],
      });
    }
    if (!end) {
      ctx.addIssue({
        code: "custom",
        message: "Add an end date/time, or clear both fields",
        path: ["ends_at"],
      });
    }
  });

export type EventFormValues = z.infer<typeof eventSchema>;
