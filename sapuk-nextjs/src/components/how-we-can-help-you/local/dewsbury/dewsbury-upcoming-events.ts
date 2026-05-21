/** Scheduled Dewsbury events (month is 0-indexed in Date). */
export type DewsburyScheduledEvent = {
  date: Date;
  title: string;
  time: string;
  note?: string;
};

export type DewsburyTbcEvent = {
  title: string;
  detail: string;
};

/** Year for fixed dates in the static copy — update when dates are refreshed. */
export const DEWSBURY_SCHEDULED_EVENTS: DewsburyScheduledEvent[] = [
  {
    date: new Date(2026, 4, 18),
    title: "Leggers Inn Safe Space",
    time: "9:30am until 12:00pm",
  },
  {
    date: new Date(2026, 4, 22),
    title: "Dewsbury Moor Children's Centre Safe Space",
    time: "9:30am until 12:00pm",
    note: "Then alternates with Leggers Inn",
  },
  {
    date: new Date(2026, 4, 23),
    title: "Walk & Talk",
    time: "Meet outside Leggers Inn at 10:30am",
  },
  {
    date: new Date(2026, 4, 28),
    title: "Stall at Dewsbury Moor Children's Centre",
    time: "10am until 2pm",
  },
  {
    date: new Date(2026, 5, 13),
    title: "Board Game Club",
    time: "9:45 until 11:45",
    note: "The Three Strand Cafe, Longcauseway",
  },
];

export const DEWSBURY_TBC_EVENTS: DewsburyTbcEvent[] = [
  { title: "Virtual Safe Space", detail: "Coming soon TBC" },
  { title: "Summer Food Pantry", detail: "Coming soon TBC" },
];
