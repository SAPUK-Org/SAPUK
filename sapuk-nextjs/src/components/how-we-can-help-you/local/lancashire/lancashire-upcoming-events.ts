/** Year for fixed Lancashire event dates. Update when dates are refreshed. */
export const LANCASHIRE_EVENT_YEAR = 2026;

export type LancashireAccent =
  | "blue"
  | "green"
  | "amber"
  | "rose"
  | "purple";

export type LancashireScheduledEvent = {
  date: Date;
  title: string;
  category: string;
  location: string;
  time: string;
  summary: string;
  accent: LancashireAccent;
  note?: string;
};

export type LancashireRecurringService = {
  title: string;
  category: string;
  detail: string;
  schedule: string;
  location: string;
  accent: LancashireAccent;
  icon: "shield" | "semicolon" | "walk" | "art";
};

export type LancashireCommunityHighlight = {
  title: string;
  date: string;
  eventDate?: Date;
  detail: string;
  accent: LancashireAccent;
};

export const LANCASHIRE_SCHEDULED_EVENTS: LancashireScheduledEvent[] = [
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 4, 13),
    title: "Blackburn Mall",
    category: "Safe Space",
    location: "Blackburn Mall",
    time: "10:00am - 3:00pm",
    summary: "Pop in for a chat, support and connection.",
    accent: "blue",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 4, 23),
    title: "Longridge day out",
    category: "Wellbeing",
    location: "Longridge Civic Hall",
    time: "12:30pm - 3:30pm",
    summary: "Afternoon at Wilfred's club and local walk.",
    accent: "green",
    note: "Check socials for exact start time.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 5, 20),
    title: "Leyland Festival",
    category: "Festival",
    location: "Leyland",
    time: "All day",
    summary: "Join us at the community festival.",
    accent: "rose",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 6, 4),
    title: "Longridge day out",
    category: "Wellbeing",
    location: "Longridge Civic Hall",
    time: "12:30pm - 3:30pm",
    summary: "Afternoon at Wilfred's club and local walk.",
    accent: "green",
    note: "Check socials for exact start time.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 6, 12),
    title: "Walk & Talk",
    category: "Talk & Walk",
    location: "Longridge Civic Hall",
    time: "1:00pm - 3:00pm",
    summary: "Meet new people and enjoy a friendly walk.",
    accent: "amber",
    note: "Meet one hour before. Water and sandwiches provided.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 7, 2),
    title: "Lytham Community Con",
    category: "Community",
    location: "Lytham",
    time: "All day",
    summary: "Visit us at the annual community con.",
    accent: "rose",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 8, 20),
    title: "Walk & Talk",
    category: "Talk & Walk",
    location: "Longridge Civic Hall",
    time: "12:00pm - 2:00pm",
    summary: "A relaxed monthly walk with friendly support.",
    accent: "amber",
    note: "Meet one hour before. Water and sandwiches provided.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 8, 26),
    title: "Longridge day out",
    category: "Wellbeing",
    location: "Longridge Civic Hall",
    time: "12:30pm - 3:30pm",
    summary: "Afternoon at Wilfred's club and local walk.",
    accent: "green",
    note: "Check socials for exact start time.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 9, 4),
    title: "Walk & Talk",
    category: "Talk & Walk",
    location: "Longridge Civic Hall",
    time: "1:00pm - 3:00pm",
    summary: "A relaxed monthly walk with friendly support.",
    accent: "amber",
    note: "Meet one hour before. Water and sandwiches provided.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 10, 7),
    title: "Longridge day out",
    category: "Wellbeing",
    location: "Longridge Civic Hall",
    time: "12:30pm - 3:30pm",
    summary: "Afternoon at Wilfred's club and local walk.",
    accent: "green",
    note: "Check socials for exact start time.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 11, 13),
    title: "Walk & Talk",
    category: "Talk & Walk",
    location: "Longridge Civic Hall",
    time: "1:00pm - 3:00pm",
    summary: "A relaxed monthly walk with friendly support.",
    accent: "amber",
    note: "Meet one hour before. Water and sandwiches provided.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 11, 19),
    title: "Longridge day out",
    category: "Wellbeing",
    location: "Longridge Civic Hall",
    time: "12:30pm - 3:30pm",
    summary: "Afternoon at Wilfred's club and local walk.",
    accent: "green",
    note: "Check socials for exact start time.",
  },
];

export const LANCASHIRE_RECURRING_SERVICES: LancashireRecurringService[] = [
  {
    title: "Safe Spaces",
    category: "Local support",
    detail:
      "A monthly safe space to talk, connect and find local suicide prevention resources.",
    schedule: "1st Thursday every month, 9:30am - 12:30pm",
    location: "Longridge Civic Hall",
    accent: "blue",
    icon: "shield",
  },
  {
    title: "The UK Semicolon Project",
    category: "Projects",
    detail:
      "Supportive group outreach and awareness across Lancashire, beginning each April.",
    schedule: "Project ongoing",
    location: "Various locations",
    accent: "green",
    icon: "semicolon",
  },
  {
    title: "Walk & Talk",
    category: "Regular groups",
    detail:
      "Gentle walks and good conversation for anyone who wants company and fresh air.",
    schedule: "Monthly Sundays",
    location: "Longridge Civic Hall",
    accent: "amber",
    icon: "walk",
  },
  {
    title: "Art Week",
    category: "Art Week",
    detail:
      "Creative sessions with materials provided, from colouring to bracelets and diamond art.",
    schedule: "Weekly sessions",
    location: "Darwen and Longridge",
    accent: "rose",
    icon: "art",
  },
];

export const LANCASHIRE_COMMUNITY_HIGHLIGHTS: LancashireCommunityHighlight[] = [
  {
    title: "Leyland Festival",
    date: `20 June ${LANCASHIRE_EVENT_YEAR}`,
    eventDate: new Date(LANCASHIRE_EVENT_YEAR, 5, 20),
    detail: "Community celebration for all ages.",
    accent: "green",
  },
  {
    title: "Lytham Community Con",
    date: `2 August ${LANCASHIRE_EVENT_YEAR}`,
    eventDate: new Date(LANCASHIRE_EVENT_YEAR, 7, 2),
    detail: "Local groups, stalls and activities.",
    accent: "amber",
  },
  {
    title: "Blackburn Mall",
    date: "Ongoing",
    detail: "Regular drop-in for chat and support.",
    accent: "rose",
  },
];
