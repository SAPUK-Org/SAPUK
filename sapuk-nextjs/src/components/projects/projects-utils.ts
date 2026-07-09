import type { Event } from "@/components/dashboard/events/types";
import {
  formatDate,
  formatTimeRange,
} from "@/components/dashboard/events/events-utils";

export type ProjectsFilter = "all" | "events" | "projects";

export const EVENT_COVER_FALLBACK_URL =
  "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNb8DnDNdPm4ONuTHBMDl7iLEAVgaJx5nCpth8";

export function getEventCoverImage(event: Event): string {
  return event.cover_image?.trim() || EVENT_COVER_FALLBACK_URL;
}

export function hasCustomEventCover(event: Event): boolean {
  return Boolean(event.cover_image?.trim());
}

export function isProjectType(type: string | null | undefined): boolean {
  return (type ?? "").toLowerCase().includes("project");
}

export function filterEventsByTab(
  events: Event[],
  filter: ProjectsFilter,
): Event[] {
  if (filter === "all") return events;
  if (filter === "projects") {
    return events.filter((event) => isProjectType(event.type));
  }
  return events.filter((event) => !isProjectType(event.type));
}

export function countEventsByTab(events: Event[]) {
  const projects = events.filter((event) => isProjectType(event.type)).length;
  return {
    all: events.length,
    events: events.length - projects,
    projects,
  };
}

export function getEventCardSchedule(event: Event): {
  date: string;
  time: string | null;
} {
  const slots = event.schedule_slots ?? [];

  if (slots.length > 0) {
    const first = slots[0];
    const date =
      slots.length > 1
        ? `${formatDate(first.starts_at)} (+${slots.length - 1} more)`
        : formatDate(first.starts_at);
    return {
      date,
      time: formatTimeRange(first.starts_at, first.ends_at),
    };
  }

  const desc = event.dates_description?.trim();
  if (desc) {
    return { date: desc, time: null };
  }

  const hasStart = Boolean(event.starts_at?.trim());
  if (hasStart) {
    return {
      date: formatDate(event.starts_at),
      time: formatTimeRange(event.starts_at, event.ends_at),
    };
  }

  return { date: "Date TBC", time: null };
}
