import db from "../db/connection";
import { NoteComment } from "../types";

export const insertNoteComment = async (
  note_id: number,
  author_id: number | null,
  content: string,
) => {
  const { rows } = await db.query(
    `
    INSERT INTO note_comments (note_id, author_id, content)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [note_id, author_id, content],
  );
  return rows[0] as NoteComment;
};

export const selectNoteCommentById = async (id: number) => {
  const { rows } = await db.query(
    `
    SELECT * FROM note_comments WHERE id = $1
  `,
    [id],
  );
  return rows[0] as NoteComment | undefined;
};

export const selectNoteCommentWithAuthorById = async (id: number) => {
  const { rows } = await db.query(
    `
    SELECT nc.*,
      u.username AS author_username,
      u.profile_picture AS author_profile_picture
    FROM note_comments nc
    LEFT JOIN users u ON nc.author_id = u.id
    WHERE nc.id = $1
  `,
    [id],
  );
  return rows[0] as (NoteComment & {
    author_username?: string | null;
    author_profile_picture?: string | null;
  }) | undefined;
};

export const patchNoteCommentById = async (id: number, content: string) => {
  const { rows } = await db.query(
    `
    UPDATE note_comments SET content = $1 WHERE id = $2 RETURNING *
  `,
    [content, id],
  );
  return rows[0] as NoteComment | undefined;
};

export const patchNoteCommentByIdAndReturnWithAuthor = async (
  id: number,
  content: string,
) => {
  const updated = await patchNoteCommentById(id, content);
  if (!updated) return undefined;
  return selectNoteCommentWithAuthorById(updated.id!);
};

export const deleteNoteCommentById = async (id: number) => {
  const { rows } = await db.query(
    `
    DELETE FROM note_comments WHERE id = $1 RETURNING *
  `,
    [id],
  );
  return rows[0] as NoteComment | undefined;
};
