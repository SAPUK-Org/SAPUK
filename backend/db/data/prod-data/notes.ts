import { Note } from "../../../types";

export const notes: Omit<Note, "id" | "created_at" | "updated_at">[] = [];
