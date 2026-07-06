import type { CommunityCause } from "../../../types";

export const community_causes: Omit<
  CommunityCause,
  "id" | "created_at" | "updated_at"
>[] = [];
