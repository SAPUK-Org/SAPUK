export type ParseLocationsResult =
  | { ok: true; value: string[] }
  | { ok: false; msg: string };

export function parseLocations(raw: unknown): ParseLocationsResult {
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) {
      return { ok: false, msg: "At least one location is required" };
    }
    return { ok: true, value: [trimmed] };
  }

  if (!Array.isArray(raw)) {
    return { ok: false, msg: "location must be a string or array of strings" };
  }

  const value = raw
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  if (value.length === 0) {
    return { ok: false, msg: "At least one location is required" };
  }

  return { ok: true, value };
}
