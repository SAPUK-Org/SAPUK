import * as z from "zod";
import type { CommunityCause } from "@/types/cms";

export const causeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  summary: z.string().min(1, "Summary is required"),
  image: z.string().optional(),
  link_url: z.string().optional(),
  sort_order: z.coerce.number().int().min(0),
  is_active: z.boolean(),
});

export type CauseFormValues = z.infer<typeof causeSchema>;

export const defaultCauseValues: CauseFormValues = {
  name: "",
  summary: "",
  image: "",
  link_url: "",
  sort_order: 0,
  is_active: true,
};

export function causeToFormValues(cause: CommunityCause): CauseFormValues {
  return {
    name: cause.name,
    summary: cause.summary,
    image: cause.image ?? "",
    link_url: cause.link_url ?? "",
    sort_order: cause.sort_order ?? 0,
    is_active: cause.is_active !== false,
  };
}

export function toCauseApiBody(values: CauseFormValues) {
  return {
    name: values.name.trim(),
    summary: values.summary.trim(),
    image: values.image?.trim() || null,
    link_url: values.link_url?.trim() || null,
    sort_order: values.sort_order,
    is_active: values.is_active,
  };
}
