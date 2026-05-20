import type { EventScheduleSlot } from "../types";

/** Parse API body field into a DB timestamp or null. Rejects invalid non-empty strings. */
export function parseOptionalTimestamp(
  raw: unknown,
  fieldLabel: string,
):
  | { ok: true; value: Date | null }
  | { ok: false; msg: string } {
  if (raw === null || raw === undefined) {
    return { ok: true, value: null };
  }
  if (typeof raw === "string" && raw.trim() === "") {
    return { ok: true, value: null };
  }
  const d = raw instanceof Date ? raw : new Date(String(raw));
  if (Number.isNaN(d.getTime())) {
    return { ok: false, msg: `Invalid ${fieldLabel}` };
  }
  return { ok: true, value: d };
}

export function normalizeDatesDescription(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const t = raw.trim();
  return t === "" ? null : t;
}

export function parseScheduleSlots(
  raw: unknown,
):
  | { ok: true; value: EventScheduleSlot[] }
  | { ok: false; msg: string } {
  if (raw === null || raw === undefined) {
    return { ok: true, value: [] };
  }
  if (!Array.isArray(raw)) {
    return { ok: false, msg: "schedule_slots must be an array" };
  }
  const slots: EventScheduleSlot[] = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    if (item === null || typeof item !== "object" || Array.isArray(item)) {
      return { ok: false, msg: `Invalid schedule_slots[${i}]` };
    }
    const parsedStart = parseOptionalTimestamp(
      (item as { starts_at?: unknown }).starts_at,
      `schedule_slots[${i}].starts_at`,
    );
    if (!parsedStart.ok) {
      return { ok: false, msg: parsedStart.msg };
    }
    const parsedEnd = parseOptionalTimestamp(
      (item as { ends_at?: unknown }).ends_at,
      `schedule_slots[${i}].ends_at`,
    );
    if (!parsedEnd.ok) {
      return { ok: false, msg: parsedEnd.msg };
    }
    if (parsedStart.value === null || parsedEnd.value === null) {
      return {
        ok: false,
        msg: `schedule_slots[${i}] requires both starts_at and ends_at`,
      };
    }
    if (parsedEnd.value.getTime() < parsedStart.value.getTime()) {
      return {
        ok: false,
        msg: `schedule_slots[${i}].ends_at must be on or after starts_at`,
      };
    }
    slots.push({
      starts_at: parsedStart.value.toISOString(),
      ends_at: parsedEnd.value.toISOString(),
    });
  }
  return { ok: true, value: slots };
}

export type ResolvedEventSchedule =
  | {
      ok: true;
      mode: "single";
      starts_at: Date;
      ends_at: Date;
      schedule_slots: EventScheduleSlot[];
      dates_description: null;
    }
  | {
      ok: true;
      mode: "multiple";
      starts_at: null;
      ends_at: null;
      schedule_slots: EventScheduleSlot[];
      dates_description: null;
    }
  | {
      ok: true;
      mode: "prose";
      starts_at: null;
      ends_at: null;
      schedule_slots: EventScheduleSlot[];
      dates_description: string;
    };

export function resolveEventSchedule(input: {
  starts_at: unknown;
  ends_at: unknown;
  schedule_slots: unknown;
  dates_description: unknown;
}): ResolvedEventSchedule | { ok: false; msg: string } {
  const parsedStart = parseOptionalTimestamp(input.starts_at, "starts_at");
  if (!parsedStart.ok) {
    return parsedStart;
  }
  const parsedEnd = parseOptionalTimestamp(input.ends_at, "ends_at");
  if (!parsedEnd.ok) {
    return parsedEnd;
  }
  const parsedSlots = parseScheduleSlots(input.schedule_slots);
  if (!parsedSlots.ok) {
    return parsedSlots;
  }
  const datesDesc = normalizeDatesDescription(input.dates_description);

  const hasSingle = parsedStart.value !== null && parsedEnd.value !== null;
  const hasSinglePartial =
    (parsedStart.value === null) !== (parsedEnd.value === null);
  const hasMultiple = parsedSlots.value.length > 0;
  const hasProse = datesDesc !== null;

  if (hasSinglePartial) {
    return {
      ok: false,
      msg: "Provide both starts_at and ends_at, or omit both / use null for neither",
    };
  }

  if (hasSingle && parsedEnd.value!.getTime() < parsedStart.value!.getTime()) {
    return { ok: false, msg: "ends_at must be on or after starts_at" };
  }

  const modeCount = [hasSingle, hasMultiple, hasProse].filter(Boolean).length;
  if (modeCount === 0) {
    return {
      ok: false,
      msg: "Provide a schedule: starts_at and ends_at, schedule_slots, or dates_description",
    };
  }
  if (modeCount > 1) {
    return {
      ok: false,
      msg: "Use only one schedule mode: single range (starts_at/ends_at), schedule_slots, or dates_description",
    };
  }

  if (hasSingle) {
    return {
      ok: true,
      mode: "single",
      starts_at: parsedStart.value!,
      ends_at: parsedEnd.value!,
      schedule_slots: [],
      dates_description: null,
    };
  }
  if (hasMultiple) {
    return {
      ok: true,
      mode: "multiple",
      starts_at: null,
      ends_at: null,
      schedule_slots: parsedSlots.value,
      dates_description: null,
    };
  }
  return {
    ok: true,
    mode: "prose",
    starts_at: null,
    ends_at: null,
    schedule_slots: [],
    dates_description: datesDesc!,
  };
}
