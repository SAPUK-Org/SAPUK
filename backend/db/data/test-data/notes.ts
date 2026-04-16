import { Note } from "../../../types";

export const notes: Omit<Note, "id" | "created_at" | "updated_at">[] = [
  {
    title: "Staff Meeting Reminder",
    content:
      "Weekly all-hands meeting moved to Thursday this week. Agenda: Q1 review, new outreach program launch, volunteer recognition ceremony planning.",
    author_id: 1,
  },
  {
    title: "Fundraiser Update",
    content:
      "Walk for Hope registration has exceeded 200 participants! We need 15 more volunteers for event day coordination.",
    author_id: 2,
  },
  {
    title: "New Resource Available",
    content:
      "The updated Safe Messaging Guidelines are now available in the resource library. All staff must review before March 1st.",
    author_id: 1,
  },
  {
    title: "Crisis Line Training",
    content:
      "Reminder: QPR Gatekeeper Training session next Tuesday at 2pm. Please confirm attendance.",
    author_id: 1,
  },
];
