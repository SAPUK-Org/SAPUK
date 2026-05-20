export type ParseOptionalMaxVolunteersResult =
  | { ok: true; value: number | null }
  | { ok: false; msg: string };

/** Optional event category/label; empty or omitted becomes null. */
export function parseOptionalEventType(raw: unknown): string | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed || null;
}

/** Optional volunteer cap; omitted or null is allowed. Must be a positive integer when set. */
export function parseOptionalMaxVolunteers(
  raw: unknown,
): ParseOptionalMaxVolunteersResult {
  if (raw === undefined || raw === null || raw === "") {
    return { ok: true, value: null };
  }
  if (typeof raw !== "number" || !Number.isInteger(raw) || raw < 1) {
    return {
      ok: false,
      msg: "max_volunteers must be a positive integer when provided",
    };
  }
  return { ok: true, value: raw };
}
