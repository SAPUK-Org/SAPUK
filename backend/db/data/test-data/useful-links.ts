import { UsefulLink } from "../../../types";

export const useful_links: UsefulLink[] = [
  {
    title: "SAPUK Volunteer Handbook",
    url: "https://example.com/handbook",
    description: "Internal guide for volunteers",
    sort_order: 0,
    is_active: true,
    metadata: { category: "internal" },
  },
  {
    title: "Donate to SAPUK",
    url: "https://example.com/donate",
    description: "Support our work",
    sort_order: 1,
    is_active: true,
    metadata: null,
  },
  {
    title: "Training Portal",
    url: "https://example.com/training",
    description: "Access training materials",
    sort_order: 2,
    is_active: true,
    metadata: { category: "training", icon: "book" },
  },
];
