/** Scheduled Lancashire events (month is 0-indexed in Date). */
export type LancashireScheduledEvent = {
  date: Date;
  title: string;
  time: string;
  note?: string;
};

export type LancashireTbcEvent = {
  title: string;
  detail: string;
};

/** Year for fixed dates in the static copy. Update when dates are refreshed. */
export const LANCASHIRE_EVENT_YEAR = 2026;

export const LANCASHIRE_SCHEDULED_EVENTS: LancashireScheduledEvent[] = [
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 4, 13),
    title: "Blackburn Mall",
    time: "Available in Blackburn Mall",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 4, 23),
    title: "Longridge day out",
    time: "Afternoon at Wilfred's club",
    note: "Check our socials for exact start time",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 5, 20),
    title: "Leyland festival",
    time: "All day",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 6, 4),
    title: "Longridge day out",
    time: "Afternoon at Wilfred's club",
    note: "Check our socials for exact start time",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 6, 12),
    title: "Walk & Talk",
    time: "1pm",
    note: "Meet one hour before at Longridge Civic Hall. Water and sandwiches provided.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 7, 2),
    title: "Lytham community con",
    time: "All day",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 8, 20),
    title: "Walk & Talk",
    time: "12pm",
    note: "Meet one hour before at Longridge Civic Hall. Water and sandwiches provided.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 8, 26),
    title: "Longridge day out",
    time: "Afternoon at Wilfred's club",
    note: "Check our socials for exact start time",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 9, 4),
    title: "Walk & Talk",
    time: "1pm",
    note: "Meet one hour before at Longridge Civic Hall. Water and sandwiches provided.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 10, 7),
    title: "Longridge day out",
    time: "Afternoon at Wilfred's club",
    note: "Check our socials for exact start time",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 11, 13),
    title: "Walk & Talk",
    time: "1pm",
    note: "Meet one hour before at Longridge Civic Hall. Water and sandwiches provided.",
  },
  {
    date: new Date(LANCASHIRE_EVENT_YEAR, 11, 19),
    title: "Longridge day out",
    time: "Afternoon at Wilfred's club",
    note: "Check our socials for exact start time",
  },
];

export const LANCASHIRE_TBC_EVENTS: LancashireTbcEvent[] = [
  {
    title: "Safe Spaces",
    detail:
      "First Thursday of each month, 9:30am to 12:30pm at Longridge Civic Hall. Information and resources on suicide prevention and awareness, plus the weekly market. Come and grab a coffee with us.",
  },
  {
    title: "Art Week",
    detail:
      "Tuesdays in Darwen (Darwen Urban Seed) and Fridays in Longridge (Longridge Library, 9:30am to 12:30pm). All materials provided. New groups starting April / May; check socials for Darwen times.",
  },
  {
    title: "Walk & Talk",
    detail:
      "Times and locations may change. Please keep an eye on our social media pages for the latest updates.",
  },
  {
    title: "The UK Semicolon Project",
    detail:
      "Available across Lancashire. An annual project that begins every April. See the Projects page for more information.",
  },
];
