export type SafeSpaceFilter =
  | "all"
  | "virtual"
  | "in-person"
  | "lancashire"
  | "dewsbury"
  | "regular";

export type SafeSpaceType = "virtual" | "in-person";

export type SafeSpaceRegion = "uk-wide" | "lancashire" | "dewsbury";

export type FeaturedSafeSpace = {
  id: string;
  title: string;
  type: SafeSpaceType;
  region: SafeSpaceRegion;
  description: string;
  schedule: string;
  time: string;
  location: string;
  href: string;
  image?: { src: string; alt: string };
  filters: SafeSpaceFilter[];
};

export type RecurringSafeSpace = {
  id: string;
  title: string;
  schedule: string;
  location: string;
  region: SafeSpaceRegion;
  type: SafeSpaceType;
  href: string;
  filters: SafeSpaceFilter[];
};

export const SAFE_SPACES_FILTERS: {
  id: SafeSpaceFilter;
  label: string;
}[] = [
  { id: "all", label: "All safe spaces" },
  { id: "virtual", label: "Virtual" },
  { id: "in-person", label: "In person" },
  { id: "lancashire", label: "Lancashire" },
  { id: "dewsbury", label: "Dewsbury (Kirklees)" },
  { id: "regular", label: "Regular groups" },
];

export const FEATURED_SAFE_SPACES: FeaturedSafeSpace[] = [
  {
    id: "virtual",
    title: "Virtual Safe Spaces",
    type: "virtual",
    region: "uk-wide",
    description:
      "Free, confidential online support sessions open to anyone across the UK over 16. Join from home or any private space via Microsoft Teams or phone.",
    schedule: "Every Friday",
    time: "9:00am – 12:30pm",
    location: "Online / phone",
    href: "/how-we-can-help-you/safe-spaces/virtual",
    image: {
      src: "/safe-spaces/virtual-safe-spaces.png",
      alt: "Illustration of two people connecting in a virtual support session",
    },
    filters: ["all", "virtual", "regular"],
  },
  {
    id: "leggers-inn",
    title: "Leggers Inn Safe Space",
    type: "in-person",
    region: "dewsbury",
    description:
      "A friendly safe space to talk, connect and find local support with the Dewsbury team.",
    schedule: "Alternating local sessions",
    time: "9:30am – 12:00pm",
    location: "Leggers Inn, Dewsbury",
    href: "/how-we-can-help-you/local/dewsbury#regular-groups",
    filters: ["all", "in-person", "dewsbury", "regular"],
  },
  {
    id: "dewsbury-moor",
    title: "Dewsbury Moor Safe Space",
    type: "in-person",
    region: "dewsbury",
    description:
      "Drop in for support and information from the Dewsbury team at Dewsbury Moor Children's Centre.",
    schedule: "Alternating with Leggers Inn",
    time: "9:30am – 12:00pm",
    location: "Dewsbury Moor Children's Centre",
    href: "/how-we-can-help-you/local/dewsbury#regular-groups",
    filters: ["all", "in-person", "dewsbury", "regular"],
  },
  {
    id: "lancashire",
    title: "Lancashire Safe Spaces",
    type: "in-person",
    region: "lancashire",
    description:
      "A monthly safe space to talk, connect and find local suicide prevention resources across Lancashire.",
    schedule: "1st Thursday every month",
    time: "9:30am – 12:30pm",
    location: "Longridge Civic Hall",
    href: "/how-we-can-help-you/local/lancashire#regular-groups",
    filters: ["all", "in-person", "lancashire", "regular"],
  },
];

export const RECURRING_SAFE_SPACES: RecurringSafeSpace[] = [
  {
    id: "recurring-virtual",
    title: "Virtual Safe Spaces",
    schedule: "Fridays, 9:00am – 12:30pm",
    location: "Online",
    region: "uk-wide",
    type: "virtual",
    href: "/how-we-can-help-you/safe-spaces/virtual",
    filters: ["all", "virtual", "regular"],
  },
  {
    id: "recurring-dewsbury",
    title: "Dewsbury Safe Spaces",
    schedule: "Alternating local sessions",
    location: "Leggers Inn & Dewsbury Moor",
    region: "dewsbury",
    type: "in-person",
    href: "/how-we-can-help-you/local/dewsbury#regular-groups",
    filters: ["all", "in-person", "dewsbury", "regular"],
  },
  {
    id: "recurring-walk-dewsbury",
    title: "Walk & Talk (Dewsbury)",
    schedule: "Dates announced locally",
    location: "Outside Leggers Inn",
    region: "dewsbury",
    type: "in-person",
    href: "/how-we-can-help-you/local/dewsbury#regular-groups",
    filters: ["all", "in-person", "dewsbury", "regular"],
  },
  {
    id: "recurring-lancashire",
    title: "Lancashire Safe Spaces",
    schedule: "1st Thursday, 9:30am – 12:30pm",
    location: "Longridge Civic Hall",
    region: "lancashire",
    type: "in-person",
    href: "/how-we-can-help-you/local/lancashire#regular-groups",
    filters: ["all", "in-person", "lancashire", "regular"],
  },
  {
    id: "recurring-walk-lancashire",
    title: "Walk & Talk (Lancashire)",
    schedule: "Monthly Sundays",
    location: "Longridge Civic Hall",
    region: "lancashire",
    type: "in-person",
    href: "/how-we-can-help-you/local/lancashire#regular-groups",
    filters: ["all", "in-person", "lancashire", "regular"],
  },
];

export const VIRTUAL_CONTACTS = {
  teams: {
    name: "Mark",
    role: "Virtual Safe Space facilitator (Microsoft Teams)",
    email: "Mark@suicideapuk.co.uk",
  },
  phone: {
    name: "Heidi",
    role: "Virtual Safe Space facilitator (phone)",
    email: "heidi@suicideapuk.co.uk",
  },
  general: {
    name: "Heidi",
    role: "Events Director — general Virtual Safe Spaces queries",
    email: "heidi@suicideapuk.co.uk",
  },
  promo: {
    name: "Isobel",
    role: "Director Support for Events — posters and leaflets",
    email: "isobel@suicideapuk.co.uk",
  },
} as const;

export const VALUE_PROPS = [
  {
    title: "Virtual & in-person",
    detail: "Online or local locations to suit you",
  },
  {
    title: "Warm & welcoming",
    detail: "Friendly spaces where you can be yourself",
  },
  {
    title: "Confidential support",
    detail: "Safe, private and judgement-free",
  },
  {
    title: "Community connection",
    detail: "Meet others and feel less alone",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    title: "Book a slot",
    detail:
      "Email a facilitator to book a Microsoft Teams or phone session. In-person spaces welcome you locally — see your area page for details.",
  },
  {
    title: "Share as much or as little as you like",
    detail:
      "Talk openly about how you are feeling, or simply sit with a supportive presence. There is no pressure.",
  },
  {
    title: "Emotional, non-clinical support",
    detail:
      "Trained volunteers offer a calm, welcoming environment focused on emotional wellbeing — not clinical treatment.",
  },
  {
    title: "Signposting when needed",
    detail:
      "If you need extra help, we can guide you towards other SAPUK services and local support.",
  },
] as const;

export const VIRTUAL_WHO_FOR = [
  "Is feeling overwhelmed, anxious, isolated, or stressed",
  "Would benefit from a supportive, non-judgemental environment",
  "Prefers online support or cannot access in-person services",
  "Wants a safe place to talk and feel heard",
] as const;

export const VIRTUAL_EXPECT = [
  "Talk openly about how they are feeling",
  "Receive emotional, non-clinical support from trained volunteers",
  "Connect with a supportive environment designed to help them feel more settled",
  "Share as much or as little as they feel comfortable with",
  "Sessions are informal, friendly, and focused on emotional wellbeing",
] as const;

export const VIRTUAL_ACCESSIBILITY = [
  "Free",
  "Open to anyone in the UK over 16 years old",
  "Fully online",
  "Confidential unless there is a significant risk of harm",
  "Easy to join from any device",
] as const;
