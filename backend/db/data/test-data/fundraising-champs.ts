import type { FundraisingChamp } from "../../../types";

export const fundraising_champs: Omit<
  FundraisingChamp,
  "id" | "created_at" | "updated_at"
>[] = [
  {
    slug: "test-champ",
    name: "Test Fundraising Champ",
    champ_type: "individual",
    summary: "A test fundraising champion for automated tests.",
    body: "Full story for the test champ.",
    image: null,
    logo: null,
    website_url: "https://example.com",
    sort_order: 0,
    is_active: true,
    created_by: 1,
  },
];
