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
  /** One or more paragraphs of body copy */
  content: string[];
  category: MilestoneCategory;
  icon: MilestoneIcon;
}

export interface EvolutionStat {
  id: string;
  value: string;
  label: string;
  icon: "users" | "messages" | "heart" | "clock";
}

export const HERO_IMAGE = {
  src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwFwS4ZyMwmHblSjp50Dqc2EKQRFM8tirXvNLZ",
  alt: "EST 2016 — The Beginning of SAPUK",
} as const;

export const HERO_COPY = {
  eyebrow: "Our Journey",
  title: "The Beginning of SAPUK",
  description:
    "SAPUK is a non profit suicide prevention CIC, founded in 2016 by Danielle Shaw. What began as a healing platform grew into a support network of care, strength and compassion.",
} as const;

export const MILESTONE_FILTERS: { id: MilestoneFilter; label: string }[] = [
  { id: "all", label: "All Milestones" },
  { id: "growth", label: "Our Growth" },
  { id: "impact", label: "Community Impact" },
  { id: "moments", label: "Key Moments" },
];

export const timelineData: TimelineMilestone[] = [
  {
    id: "facts-first",
    year: "2016",
    title: "The facts first",
    content: [
      "SAPUK is a non profit suicide prevention CIC, founded in 2016 by Danielle Shaw after the devastating loss of Bryan Baron on 4 September 2016. For the full background on what happened that day, please refer to the blog \"Seeing Suicide\". Please note that this includes a trigger warning and may bring up distressing images. If you require support, please reach out.",
    ],
    category: "moments",
    icon: "sprout",
  },
  {
    id: "support-network",
    year: "Early years",
    title: "A support network forms",
    content: [
      '"SAPUK was never intended to become what it has. It started as a healing platform for my own trauma and, due to the correspondence, grew into a support network. It was needed for those people," as described in "Volunteering with SAPUK".',
    ],
    category: "growth",
    icon: "users",
  },
  {
    id: "sapchat",
    year: "SAPChat",
    title: "Guiding people through SAPChat",
    content: [
      "SAPUK became what it is because of the support that we offer and, for the years that SAPUK has been afloat, we have guided countless people who have been, or are, struggling with suicidal ideation via our SAPChat service. This is a messaging line on Facebook and a phone line that operates weekly.",
      "At SAPUK we also have a recovery plan that people can enrol on with adequately trained members. This consists of a weekly phone call as well as access to our messaging line.",
    ],
    category: "impact",
    icon: "message-circle",
  },
  {
    id: "stable-team",
    year: "Growth",
    title: "From one person to a team",
    content: [
      '"I became obsessed with preventing suicide. This became my life quite quickly after enduring the loss of suicide because I realised I was good at it. I was just 24 when I had to undergo the trauma, and 26 when we opened the SAPChat service. It all escalated more quickly than I developed my admin footing.',
      'After years of growth, confusion, approval, knock backs and realisation, we now have a stable and secure team running SAPUK, and it is amazing. We are so lucky. With me just running it and my ADHD traits, it had no chance. I will be here preventing suicide for as long as I breathe. It went from just me to now over 50 volunteers, and it is not because of me. It is because of what we can offer here: support, strength, care and compassion."',
    ],
    category: "growth",
    icon: "star",
  },
  {
    id: "suicide-rates",
    year: "Today",
    title: "Suicide Rates",
    content: [
      "Suicide rates are the highest they have ever been and suicide has been the leading cause of death in men under the age of 45 for the last decade. We want to help reduce that number. SAPUK has a dedicated, selfless, voluntary team, running every day from 6 am to 11 pm. All volunteers have basic training, with many members building on this in different ways, and we have enough knowledge among us to be able to offer meaningful guidance. Thank you for taking the time to read this. The SAPUK team, supported by The Semicolon Shop.",
    ],
    category: "impact",
    icon: "heart",
  },
];

export const FOUNDER_QUOTE = {
  text: "I will be here preventing suicide for as long as I breathe. It went from just me to now over 50 volunteers, and it is not because of me. It is because of what we can offer here: support, strength, care and compassion.",
  attribution: "Danielle Shaw, Founder",
} as const;

/** Stats grounded in claims from the current page copy */
export const evolutionStats: EvolutionStat[] = [
  {
    id: "volunteers",
    value: "50+",
    label: "Active Volunteers Across the UK",
    icon: "users",
  },
  {
    id: "hours",
    value: "6am–11pm",
    label: "Support Available Every Day",
    icon: "clock",
  },
  {
    id: "founded",
    value: "2016",
    label: "Founded by Danielle Shaw",
    icon: "heart",
  },
  {
    id: "sapchat",
    value: "SAPChat",
    label: "Messaging & Weekly Phone Support",
    icon: "messages",
  },
];

export const CTA_COPY = {
  title: "Be part of our story",
  description:
    "Help us create a future where no one faces their darkest moments alone.",
} as const;
