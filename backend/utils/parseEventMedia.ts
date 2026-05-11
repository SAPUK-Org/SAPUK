import type {
  EventExternalLink,
  EventStudioPartner,
  EventStudioSocialLink,
} from "../types";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function parseExternalLinks(raw: unknown):
  | { ok: true; value: EventExternalLink[] }
  | { ok: false; msg: string } {
  if (raw === undefined || raw === null) {
    return { ok: true, value: [] };
  }
  if (!Array.isArray(raw)) {
    return { ok: false, msg: "external_links must be a JSON array" };
  }
  const out: EventExternalLink[] = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    if (!item || typeof item !== "object") {
      return { ok: false, msg: `external_links[${i}] must be an object` };
    }
    const o = item as Record<string, unknown>;
    if (!isNonEmptyString(o.label)) {
      return { ok: false, msg: `external_links[${i}].label is required` };
    }
    if (!isNonEmptyString(o.url)) {
      return { ok: false, msg: `external_links[${i}].url is required` };
    }
    const kind = o.kind;
    if (kind !== "web" && kind !== "tiktok" && kind !== "image") {
      return {
        ok: false,
        msg: `external_links[${i}].kind must be "web", "tiktok", or "image"`,
      };
    }
    out.push({
      label: o.label.trim(),
      url: o.url.trim(),
      kind,
    });
  }
  return { ok: true, value: out };
}

export function parseStudioPartners(raw: unknown):
  | { ok: true; value: EventStudioPartner[] }
  | { ok: false; msg: string } {
  if (raw === undefined || raw === null) {
    return { ok: true, value: [] };
  }
  if (!Array.isArray(raw)) {
    return { ok: false, msg: "studio_partners must be a JSON array" };
  }
  const out: EventStudioPartner[] = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    if (!item || typeof item !== "object") {
      return { ok: false, msg: `studio_partners[${i}] must be an object` };
    }
    const o = item as Record<string, unknown>;
    if (!isNonEmptyString(o.name)) {
      return { ok: false, msg: `studio_partners[${i}].name is required` };
    }
    const socialRaw = o.socialLinks;
    let socialLinks: EventStudioSocialLink[] | undefined;
    if (socialRaw !== undefined && socialRaw !== null) {
      if (!Array.isArray(socialRaw)) {
        return {
          ok: false,
          msg: `studio_partners[${i}].socialLinks must be an array`,
        };
      }
      socialLinks = [];
      for (let j = 0; j < socialRaw.length; j++) {
        const s = socialRaw[j];
        if (!s || typeof s !== "object") {
          return {
            ok: false,
            msg: `studio_partners[${i}].socialLinks[${j}] must be an object`,
          };
        }
        const so = s as Record<string, unknown>;
        if (!isNonEmptyString(so.network) || !isNonEmptyString(so.url)) {
          return {
            ok: false,
            msg: `studio_partners[${i}].socialLinks[${j}] needs network and url`,
          };
        }
        socialLinks.push({
          network: so.network.trim(),
          url: so.url.trim(),
        });
      }
    }
    out.push({
      name: o.name.trim(),
      location:
        typeof o.location === "string" && o.location.trim()
          ? o.location.trim()
          : null,
      imageSrc:
        typeof o.imageSrc === "string" && o.imageSrc.trim()
          ? o.imageSrc.trim()
          : null,
      description:
        typeof o.description === "string" && o.description.trim()
          ? o.description.trim()
          : null,
      socialLinks,
    });
  }
  return { ok: true, value: out };
}
