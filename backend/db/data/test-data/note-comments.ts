import { NoteComment } from "../../../types";

export const note_comments: Omit<
  NoteComment,
  "id" | "created_at"
>[] = [
  {
    note_id: 1,
    author_id: 2,
    content: "I can help with the volunteer recognition slides.",
  },
  {
    note_id: 1,
    author_id: 3,
    content: "Thanks for the update, will be there.",
  },
  {
    note_id: 2,
    author_id: 1,
    content: "Great progress! I'll reach out to our usual volunteers.",
  },
  {
    note_id: 3,
    author_id: 3,
    content: "Reviewed and shared with the team.",
  },
];
