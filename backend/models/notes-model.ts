import db from "../db/connection";
import { Note, NoteWithCommentCount } from "../types";

type NoteWithCommentsResult = {
  note: Note;
  comments: NoteCommentRow[];
};

type NoteCommentRow = {
  id: number;
  note_id: number;
  author_id: number | null;
  author_username?: string | null;
  author_profile_picture?: string | null;
  content: string;
  created_at: Date;
};

export const selectNotes = async (): Promise<NoteWithCommentCount[]> => {
  const { rows } = await db.query(`
    SELECT n.*,
      (SELECT COUNT(*)::int FROM note_comments c WHERE c.note_id = n.id) AS comment_count,
      u.username AS author_username,
      u.profile_picture AS author_profile_picture
    FROM notes n
    LEFT JOIN users u ON n.author_id = u.id
    ORDER BY n.created_at DESC
  `);
  return rows as NoteWithCommentCount[];
};

export const selectNoteByIdWithComments = async (
  id: number
): Promise<{ note: Note; comments: NoteCommentRow[] } | undefined> => {
  const { rows: noteRows } = await db.query(
    `
    SELECT n.*, u.username AS author_username, u.profile_picture AS author_profile_picture
    FROM notes n
    LEFT JOIN users u ON n.author_id = u.id
    WHERE n.id = $1
  `,
    [id]
  );
  const note = noteRows[0] as Note | undefined;
  if (!note) return undefined;

  const { rows: commentRows } = await db.query(
    `
    SELECT nc.id, nc.note_id, nc.author_id, nc.content, nc.created_at,
      u.username AS author_username,
      u.profile_picture AS author_profile_picture
    FROM note_comments nc
    LEFT JOIN users u ON nc.author_id = u.id
    WHERE nc.note_id = $1
    ORDER BY nc.created_at ASC
  `,
    [id]
  );
  const comments = commentRows as NoteCommentRow[];
  return { note, comments };
};

export const insertNote = async (
  title: string,
  content: string,
  author_id: number | null
) => {
  const { rows } = await db.query(
    `
    INSERT INTO notes (title, content, author_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [title, content, author_id]
  );
  return rows[0] as Note;
};

export const updateNoteById = async (
  id: number,
  title: string,
  content: string
) => {
  const { rows } = await db.query(
    `
    UPDATE notes
    SET title = $1, content = $2, updated_at = NOW()
    WHERE id = $3
    RETURNING *
  `,
    [title, content, id]
  );
  return rows[0] as Note | undefined;
};

export const deleteNoteById = async (id: number) => {
  const { rows } = await db.query(
    `
    DELETE FROM notes WHERE id = $1 RETURNING *
  `,
    [id]
  );
  return rows[0] as Note | undefined;
};
