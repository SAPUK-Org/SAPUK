export type MilestoneCategory = "growth" | "impact" | "moments";

export type MilestoneFilter = "all" | MilestoneCategory;

export type MilestoneIcon =
  | "sprout"
  | "megaphone"
  | "users"
  | "message-circle"
  | "heart"
  | "home"
  | "star";

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  content: string;
  category: MilestoneCategory;
  icon: MilestoneIcon;
}

export interface EvolutionStat {
  id: string;
  value: string;
  label: string;
  icon: "users" | "messages" | "heart" | "home";
}

export const HERO_IMAGE = {
  src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwFwS4ZyMwmHblSjp50Dqc2EKQRFM8tirXvNLZ",
  alt: "EST 2016 — The Beginning of SAPUK",
} as const;

export const HERO_COPY = {
  eyebrow: "Our Journey",
  title: "The Beginning of SAPUK",
  description:
    "Every step, every conversation, every life reached — our story is one of hope, resilience and community.",
} as const;

export const MILESTONE_FILTERS: { id: MilestoneFilter; label: string }[] = [
  { id: "all", label: "All Milestones" },
  { id: "growth", label: "Our Growth" },
  { id: "impact", label: "Community Impact" },
  { id: "moments", label: "Key Moments" },
];

export const timelineData: TimelineMilestone[] = [
  {
    id: "2016",
    year: "2016",
    title: "The Seed is Planted",
    content:
      "SAPUK begins after loss, with a simple belief: no one should face their darkest moments alone.",
    category: "moments",
    icon: "sprout",
  },
  {
    id: "2017",
    year: "2017",
    title: "A Voice for Change",
    content:
      "We start sharing stories, raising awareness, and opening conversations about suicide prevention.",
    category: "impact",
    icon: "megaphone",
  },
  {
    id: "2018",
    year: "2018",
    title: "Building a Community",
    content:
      "What began as one person's healing grows into a network of people supporting each other.",
    category: "growth",
    icon: "users",
  },
  {
    id: "2019",
    year: "2019",
    title: "Expanding Support",
    content:
      "SAPChat launches and volunteering grows, bringing support to people across the UK.",
    category: "growth",
    icon: "message-circle",
  },
  {
    id: "2021",
    year: "2021",
    title: "Growing Our Reach",
    content:
      "More volunteers join, more conversations happen, and more lives are gently held.",
    category: "impact",
    icon: "heart",
  },
  {
    id: "2023",
    year: "2023",
    title: "Safe Spaces, Real Impact",
    content:
      "Physical community projects open, creating places where people can feel safe and supported.",
    category: "impact",
    icon: "home",
  },
  {
    id: "today",
    year: "Today & Beyond",
    title: "Still Here. Still Listening.",
    content:
      "We keep evolving with compassion at the centre — present for whoever needs us next.",
    category: "moments",
    icon: "star",
  },
];

export const FOUNDER_QUOTE = {
  text: "We didn't just start SAPUK. We started a movement of hope.",
  attribution: "Danielle Shaw, Founder",
} as const;

export const evolutionStats: EvolutionStat[] = [
  {
    id: "volunteers",
    value: "50+",
    label: "Active Volunteers Across the UK",
    icon: "users",
  },
  {
    id: "conversations",
    value: "10,000+",
    label: "Conversations Through SAPChat",
    icon: "messages",
  },
  {
    id: "lives",
    value: "Thousands",
    label: "Of Lives Supported Since 2016",
    icon: "heart",
  },
  {
    id: "spaces",
    value: "Growing",
    label: "Safe Spaces & Projects Across Communities",
    icon: "home",
  },
];

export const CTA_COPY = {
  title: "Be part of our story",
  description:
    "Help us create a future where no one faces their darkest moments alone.",
} as const;
