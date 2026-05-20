import type {
  Event,
  EventFormValues,
  EventGalleryImage,
  EventScheduleMode,
  EventScheduleSlot,
} from "./types";
import { resolveEffectiveScheduleMode } from "./types";

function isValidDate(value: string | null | undefined): value is string {
  if (value == null || String(value).trim() === "") return false;
  const d = new Date(value);
  return !isNaN(d.getTime());
}

export function toDatetimeLocal(iso: string): string {
  if (!isValidDate(iso)) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!isValidDate(dateStr)) return "Date TBC";
  const d = new Date(dateStr as string);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTimeRange(
  starts: string | null | undefined,
  ends: string | null | undefined,
): string {
  if (!isValidDate(starts) || !isValidDate(ends)) return "Time TBC";
  const s = new Date(starts);
  const e = new Date(ends);
  return `${s.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} – ${e.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
}

export function inferScheduleMode(event: Event): EventScheduleMode {
  const slots = event.schedule_slots ?? [];
  if (slots.length > 0) return "multiple";
  if ((event.dates_description ?? "").trim()) return "prose";
  if (isValidDate(event.starts_at ?? undefined)) return "single";
  return "prose";
}

export function eventEarliestStart(event: Event): number | null {
  if (isValidDate(event.starts_at ?? undefined)) {
    return new Date(event.starts_at as string).getTime();
  }
  const slots = event.schedule_slots ?? [];
  let min: number | null = null;
  for (const slot of slots) {
    if (!isValidDate(slot.starts_at)) continue;
    const t = new Date(slot.starts_at).getTime();
    if (min === null || t < min) min = t;
  }
  return min;
}

export function formatScheduleSlot(slot: EventScheduleSlot): string {
  if (!isValidDate(slot.starts_at) || !isValidDate(slot.ends_at)) {
    return "Date TBC";
  }
  return `${formatDate(slot.starts_at)}, ${formatTimeRange(slot.starts_at, slot.ends_at)}`;
}

export function formatEventDateTime(event: Event): string {
  const slots = event.schedule_slots ?? [];
  if (slots.length > 0) {
    return slots.map(formatScheduleSlot).join(" · ");
  }

  const hasStart = isValidDate(event.starts_at ?? undefined);
  const hasEnd = isValidDate(event.ends_at ?? undefined);
  if (!hasStart && !hasEnd) {
    const desc = event.dates_description?.trim();
    return desc || "Date TBC";
  }
  if (hasStart && hasEnd) {
    return `${formatDate(event.starts_at)}, ${formatTimeRange(event.starts_at, event.ends_at)}`;
  }
  if (hasStart) {
    const d = new Date(event.starts_at!);
    const hasTime = d.getHours() !== 0 || d.getMinutes() !== 0;
    return hasTime
      ? `${formatDate(event.starts_at)}, ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`
      : formatDate(event.starts_at);
  }
  return "Date TBC";
}

/**
 * Uploaded gallery images first, then `external_links` with `kind: "image"`,
 * excluding duplicates against each other and the cover image URL.
 */
export function unifiedEventGalleryImages(event: Event): EventGalleryImage[] {
  const hasCover = Boolean(event.cover_image?.trim());
  const coverTrimmed = event.cover_image?.trim() ?? "";
  const raw = event.gallery ?? [];
  const base =
    hasCover && coverTrimmed
      ? raw.filter((g) => g.url.trim() !== coverTrimmed)
      : raw;
  const seen = new Set<string>();
  for (const g of base) {
    seen.add(g.url.trim());
  }
  if (hasCover && coverTrimmed) {
    seen.add(coverTrimmed);
  }
  const fromLinks: EventGalleryImage[] = [];
  for (const link of event.external_links ?? []) {
    if (link.kind !== "image") continue;
    const url = link.url.trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    fromLinks.push({
      url,
      file_name: link.label?.trim() || "Image",
    });
  }
  return [...base, ...fromLinks];
}

/** Normalize API location (array or legacy string) to string[]. */
export function normalizeEventLocations(
  locations: string[] | string | null | undefined,
): string[] {
  if (Array.isArray(locations)) {
    return locations.map((l) => String(l).trim()).filter(Boolean);
  }
  if (typeof locations === "string" && locations.trim()) {
    return [locations.trim()];
  }
  return [];
}

export function formatEventLocations(
  locations: string[] | string | null | undefined,
): string {
  const list = normalizeEventLocations(locations);
  if (list.length === 0) return "Location TBC";
  return list.join(" · ");
}

/** Convert datetime-local value to ISO string for the API; returns null if empty/invalid. */
export function toEventIsoTimestamp(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

/** Build POST/PUT body — only known API fields (avoids leaking form-only keys). */
export function toEventApiBody(values: EventFormValues) {
  const external_links = values.external_links
    .filter((l) => l.label.trim() && l.url.trim())
    .map((l) => ({
      label: l.label.trim(),
      url: l.url.trim(),
      kind: l.kind,
    }));

  const studio_partners = values.studio_partners
    .filter((p) => {
      const name = p.name.trim();
      const loc = (p.location ?? "").trim();
      const img = (p.imageSrc ?? "").trim();
      const desc = (p.description ?? "").trim();
      const hasSocial = (p.socialLinks ?? []).some(
        (s) => s.network.trim() && s.url.trim(),
      );
      return name || loc || img || desc || hasSocial;
    })
    .map((p) => ({
      name: p.name.trim(),
      location: (p.location ?? "").trim() || null,
      imageSrc: (p.imageSrc ?? "").trim() || null,
      description: (p.description ?? "").trim() || null,
      socialLinks: (p.socialLinks ?? [])
        .filter((s) => s.network.trim() && s.url.trim())
        .map((s) => ({
          network: s.network.trim(),
          url: s.url.trim(),
        })),
    }));

  const location = values.location.map((l) => l.trim()).filter(Boolean);
  const type = (values.type ?? "").trim() || null;
  const max_volunteers =
    values.max_volunteers != null && !Number.isNaN(values.max_volunteers)
      ? values.max_volunteers
      : null;

  const cover_image = values.cover_image?.trim() || null;

  const base = {
    title: values.title.trim(),
    description: values.description.trim(),
    cover_image,
    location,
    type,
    max_volunteers,
    is_active: values.is_active,
    external_links,
    studio_partners,
  };

  const scheduleMode = resolveEffectiveScheduleMode(values);

  if (scheduleMode === "single") {
    const starts_at = toEventIsoTimestamp(values.starts_at);
    const ends_at = toEventIsoTimestamp(values.ends_at);
    return {
      ...base,
      dates_description: null,
      schedule_slots: [] as { starts_at: string; ends_at: string }[],
      starts_at,
      ends_at,
    };
  }

  if (scheduleMode === "multiple") {
    return {
      ...base,
      dates_description: null,
      starts_at: null,
      ends_at: null,
      schedule_slots: values.schedule_slots.map((slot) => ({
        starts_at: toEventIsoTimestamp(slot.starts_at),
        ends_at: toEventIsoTimestamp(slot.ends_at),
      })),
    };
  }

  return {
    ...base,
    dates_description: (values.dates_description ?? "").trim() || null,
    schedule_slots: [] as { starts_at: string; ends_at: string }[],
    starts_at: null,
    ends_at: null,
  };
}

export const defaultEventValues: EventFormValues = {
  title: "",
  description: "",
  cover_image: "",
  schedule_mode: "single",
  dates_description: "",
  starts_at: "",
  ends_at: "",
  schedule_slots: [],
  location: [""],
  type: "",
  max_volunteers: undefined,
  is_active: true,
  external_links: [],
  studio_partners: [],
};
