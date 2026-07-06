import type { CommunityCause } from "../../../types";

export const community_causes: Omit<
  CommunityCause,
  "id" | "created_at" | "updated_at"
>[] = [
  {
    name: "Test Community Cause",
    summary: "A test cause supported by SAPUK.",
    image: null,
    link_url: "https://example.com",
    sort_order: 0,
    is_active: true,
    created_by: 1,
  },
];
