import type { Event, EventFormValues, EventGalleryImage } from "./types";

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

export function formatEventDateTime(event: Event): string {
  const hasStart = isValidDate(event.starts_at);
  const hasEnd = isValidDate(event.ends_at);
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

export const defaultEventValues: EventFormValues = {
  title: "",
  description: "",
  cover_image: "",
  dates_description: "",
  starts_at: "",
  ends_at: "",
  location: "",
  type: "",
  max_volunteers: 1,
  is_active: true,
  external_links: [],
  studio_partners: [],
};
