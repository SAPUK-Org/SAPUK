import { CrisisResource } from "../../../types";

export const crisis_resources: CrisisResource[] = [
  {
    is_active: true,
    name: "UK Emergency Services",
    phone_or_url: "999",
    hours: "24/7",
    type: "crisis",
  },
  {
    is_active: true,
    name: "Samaritans",
    phone_or_url: "116 123",
    hours: "24/7",
    type: "crisis",
  },
  {
    is_active: true,
    name: "Shout Crisis Text Line",
    phone_or_url: "85258",
    description: "Text SHOUT to 85258",
    type: "crisis",
  },
  {
    is_active: true,
    name: "CALM",
    phone_or_url: "0800 58 58 58",
    hours: "5pm-midnight",
    type: "crisis",
  },
  {
    is_active: true,
    name: "NHS Mental Health",
    phone_or_url: "111",
    hours: "24/7",
    description: "Choose option 2 for mental health support",
    type: "crisis",
  },
];
