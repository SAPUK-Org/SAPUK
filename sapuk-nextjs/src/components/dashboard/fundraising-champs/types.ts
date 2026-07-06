import * as z from "zod";
import type { FundraisingChamp } from "@/types/cms";

/** Fixed public route prefix — only the slug segment is stored in the CMS. */
export const CHAMP_PUBLIC_PATH_PREFIX = "/fundraise/champs";

export function getChampPublicPath(slug: string): string {
  const trimmed = slug.trim();
  return trimmed
    ? `${CHAMP_PUBLIC_PATH_PREFIX}/${trimmed}`
    : `${CHAMP_PUBLIC_PATH_PREFIX}/your-slug`;
}

export const champSchema = z.object({
  slug: z.string().min(1, "URL slug is required"),
  name: z.string().min(1, "Name is required"),
  champ_type: z.enum(["individual", "business"]),
  summary: z.string().min(1, "Summary is required"),
  body: z.string().optional(),
  image: z.string().optional(),
  logo: z.string().optional(),
  website_url: z.string().optional(),
  sort_order: z.coerce.number().int().min(0),
  is_active: z.boolean(),
});

export type ChampFormValues = z.infer<typeof champSchema>;

export const defaultChampValues: ChampFormValues = {
  slug: "",
  name: "",
  champ_type: "individual",
  summary: "",
  body: "",
  image: "",
  logo: "",
  website_url: "",
  sort_order: 0,
  is_active: true,
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function champToFormValues(champ: FundraisingChamp): ChampFormValues {
  return {
    slug: champ.slug,
    name: champ.name,
    champ_type: champ.champ_type,
    summary: champ.summary,
    body: champ.body ?? "",
    image: champ.image ?? "",
    logo: champ.logo ?? "",
    website_url: champ.website_url ?? "",
    sort_order: champ.sort_order ?? 0,
    is_active: champ.is_active !== false,
  };
}

export function toChampApiBody(values: ChampFormValues) {
  return {
    slug: values.slug.trim(),
    name: values.name.trim(),
    champ_type: values.champ_type,
    summary: values.summary.trim(),
    body: values.body?.trim() || null,
    image: values.image?.trim() || null,
    logo: values.logo?.trim() || null,
    website_url: values.website_url?.trim() || null,
    sort_order: values.sort_order,
    is_active: values.is_active,
  };
}
