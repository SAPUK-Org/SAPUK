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
