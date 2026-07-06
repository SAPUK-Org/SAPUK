export type SuicidologyIcon =
  | "help-circle"
  | "clock"
  | "briefcase"
  | "heart"
  | "users"
  | "shield";

export type ContentSectionVariant = "default" | "highlight";

export type SuicidologyContentSection = {
  number: number;
  title: string;
  icon: SuicidologyIcon;
  paragraphs: string[];
  variant?: ContentSectionVariant;
  cta?: string;
};

export type SuicidologySidebarItem =
  | {
      type: "why-matters";
      title: string;
      icon: SuicidologyIcon;
      content: string;
    }
  | {
      type: "quote";
      content: string;
      attribution: string;
      role: string;
    }
  | {
      type: "takeaway";
      title: string;
      icon: SuicidologyIcon;
      content: string;
    };

// Replace illustrationSrc when final hero asset is ready
export const heroContent = {
  title: "Understanding Suicidology",
  subtitle:
    "Exploring the scientific study of suicide and how knowledge, compassion, and prevention can save lives.",
  intro:
    "Suicidology is identified as an extension of Psychology, Sociology or other similar profession - the scientific study and research on suicide, suicidal thoughts, tendencies, intrusive thoughts, and interventions.",
  illustrationSrc:
    "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMN5NSaWqQQDzYblRcrHvj5xAw6JLBmyM082uTV",
  illustrationAlt:
    "Hands cupping a heart — suicidology illustration placeholder",
};

export const contentSections: SuicidologyContentSection[] = [
  {
    number: 1,
    title: "What is it?",
    icon: "help-circle",
    paragraphs: [
      'Suicidology is the scientific study and research on suicide, suicidal thoughts, suicidal tendencies, intrusive thoughts and interventions, but is not classed as an actioning profession. It was appropriately described as an "aborning profession", because it was a new field and had only grasped a social identity in the early 2000\'s, but it should be classed as a profession because it is a directed study towards a single phenomenon.',
    ],
  },
  {
    number: 2,
    title: "Where did it begin?",
    icon: "clock",
    paragraphs: [
      "The studies of Suicidology have a long history dating back to the 1700's with findings coming forth from the early 1400's but it has never been pursued categorically as its own, although most mental health illnesses ultimately end up within these grounds of suicidal thoughts.",
    ],
  },
  {
    number: 3,
    title: "Is it a profession?",
    icon: "briefcase",
    paragraphs: [
      "A profession is a type of job that requires advanced education or training.",
      "Does Suicide Prevention and Awareness require advanced education or training? To a degree no it doesn't because anyone can intervene with suicidal thoughts, you don't have to be an expert to stop someone from taking this extreme step and talking about it will not push someone to it, it will more so give them a shoulder to lean on, so no you don't have to be a professional for this.",
    ],
  },
  {
    number: 4,
    title: "There is still so much stigma.",
    icon: "heart",
    variant: "highlight",
    paragraphs: [
      "Suicide prevention is everyone's business – if your friend is suicidal, you should be there, if a family member is suicidal, you should show up, its time that could save a life, that being said if people are not speaking up about their suicidal thoughts then it is best to directly ask them about suicide.",
    ],
    cta: "Speak up. Reach out. Save a life.",
  },
];

export const sidebarItems: SuicidologySidebarItem[] = [
  {
    type: "why-matters",
    title: "Why it matters",
    icon: "users",
    content:
      "Many individuals focus on both the prevention of suicide, and the phenomenon of suicide itself. Contemporary suicidology has made significant contributions to our shared understanding of suicide prevention, suicide intervention, and responses in the aftermath of a death by suicide — and it is expanding rapidly with new members joining and contributing to this knowledge.",
  },
  {
    type: "quote",
    content:
      "Michael J. Kraal has written about suicidology's \"great origin myth\" being the belief that the idea of suicide originates within the individual, perhaps even in something neurobiological, but this hasn't been explored much as the funding is minimal within neurological research of suicidal patients.",
    attribution: "Michael J. Kraal",
    role: "Writer on Suicidology",
  },
  {
    type: "takeaway",
    title: "Key takeaway",
    icon: "shield",
    content:
      "You don't need to be an expert to make a difference. Prevention, intervention, and compassionate conversation are everyone's responsibility — and every moment of connection can help save a life.",
  },
];
