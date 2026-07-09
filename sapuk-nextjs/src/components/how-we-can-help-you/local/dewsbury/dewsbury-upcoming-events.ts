export type DewsburyAccent =
  | "blue"
  | "green"
  | "amber"
  | "rose"
  | "purple";

/** Scheduled Dewsbury events (month is 0-indexed in Date). */
export type DewsburyScheduledEvent = {
  date: Date;
  title: string;
  category: string;
  location: string;
  time: string;
  summary: string;
  accent: DewsburyAccent;
  note?: string;
};

export type DewsburyRecurringService = {
  title: string;
  category: string;
  detail: string;
  schedule: string;
  location: string;
  accent: DewsburyAccent;
  icon: "shield" | "walk" | "games" | "pantry" | "virtual";
};

/** Year for fixed dates in the static copy. Update when dates are refreshed. */
export const DEWSBURY_EVENT_YEAR = 2026;

export const DEWSBURY_SCHEDULED_EVENTS: DewsburyScheduledEvent[] = [
  {
    date: new Date(DEWSBURY_EVENT_YEAR, 4, 18),
    title: "Leggers Inn Safe Space",
    category: "Safe Space",
    location: "Leggers Inn",
    time: "9:30am - 12:00pm",
    summary: "A friendly safe space to talk, connect and find local support.",
    accent: "blue",
  },
  {
    date: new Date(DEWSBURY_EVENT_YEAR, 4, 22),
    title: "Dewsbury Moor Safe Space",
    category: "Safe Space",
    location: "Dewsbury Moor Children's Centre",
    time: "9:30am - 12:00pm",
    summary: "Drop in for support and information from the Dewsbury team.",
    accent: "blue",
    note: "Then alternates with Leggers Inn.",
  },
  {
    date: new Date(DEWSBURY_EVENT_YEAR, 4, 23),
    title: "Walk & Talk",
    category: "Walk & Talk",
    location: "Outside Leggers Inn",
    time: "Meet at 10:30am",
    summary: "A gentle community walk followed by tea and coffee.",
    accent: "amber",
  },
  {
    date: new Date(DEWSBURY_EVENT_YEAR, 4, 28),
    title: "Community Stall",
    category: "Community",
    location: "Dewsbury Moor Children's Centre",
    time: "10:00am - 2:00pm",
    summary: "Meet the team and learn more about local SAPUK support.",
    accent: "rose",
  },
  {
    date: new Date(DEWSBURY_EVENT_YEAR, 5, 13),
    title: "Board Game Club",
    category: "Board Games",
    location: "The Three Strand Cafe, Longcauseway",
    time: "9:45am - 11:45am",
    summary: "A relaxed board game session for connection and conversation.",
    accent: "green",
  },
];

export const DEWSBURY_RECURRING_SERVICES: DewsburyRecurringService[] = [
  {
    title: "Safe Spaces",
    category: "Local support",
    detail:
      "Safe places to talk, find resources and connect with SAPUK facilitators.",
    schedule: "Alternating local sessions",
    location: "Leggers Inn and Dewsbury Moor",
    accent: "blue",
    icon: "shield",
  },
  {
    title: "Walk & Talk",
    category: "Regular groups",
    detail:
      "Friendly walks for anyone who wants company, fresh air and a gentle chat.",
    schedule: "Dates announced locally",
    location: "Outside Leggers Inn",
    accent: "amber",
    icon: "walk",
  },
  {
    title: "Board Game Club",
    category: "Community",
    detail:
      "A calm social session built around board games, conversation and connection.",
    schedule: "Second Saturday each month",
    location: "The Three Strand Cafe",
    accent: "green",
    icon: "games",
  },
  {
    title: "Summer Food Pantry",
    category: "Food pantry",
    detail:
      "Holiday food pantry support for families and local residents. Details coming soon.",
    schedule: "Coming soon",
    location: "Dewsbury and Kirklees",
    accent: "rose",
    icon: "pantry",
  },
  {
    title: "Virtual Safe Space",
    category: "Online support",
    detail:
      "Remote safe-space support for people who cannot attend in person. Details coming soon.",
    schedule: "Coming soon",
    location: "Online",
    accent: "purple",
    icon: "virtual",
  },
];
