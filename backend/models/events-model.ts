import db from "../db/connection";
import { Event } from "../types";

export const selectEvents = async () => {
  const { rows } = await db.query(`
    SELECT * FROM events
  `);
  return rows;
};

export const selectEventById = async (id: number) => {
  const { rows } = await db.query(
    `
    SELECT * FROM events WHERE id = $1
  `,
    [id],
  );
  return rows[0] as Event | undefined;
};

export const insertEvent = async (
  title: string,
  description: string,
  cover_image: string | null,
  starts_at: Date,
  ends_at: Date,
  location: string,
  type: string,
  max_volunteers: number,
  created_by: number,
) => {
  const { rows } = await db.query(
    `
    INSERT INTO events (title, description, cover_image, starts_at, ends_at, location, type, max_volunteers, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
  `,
    [
      title,
      description,
      cover_image,
      starts_at,
      ends_at,
      location,
      type,
      max_volunteers,
      created_by,
    ],
  );
  return rows[0];
};

export const updateEventById = async (
  id: number,
  title: string,
  description: string,
  cover_image: string | null,
  starts_at: Date,
  ends_at: Date,
  location: string,
  type: string,
  max_volunteers: number,
  created_by: number,
) => {
  const { rows } = await db.query(
    `
    UPDATE events SET title = $1, description = $2, cover_image = $3, starts_at = $4, ends_at = $5, location = $6, type = $7, max_volunteers = $8, created_by = $9 WHERE id = $10 RETURNING *
  `,
    [
      title,
      description,
      cover_image,
      starts_at,
      ends_at,
      location,
      type,
      max_volunteers,
      created_by,
      id,
    ],
  );
  return rows[0];
};

export const deleteEventById = async (id: number) => {
  const { rows } = await db.query(
    `
    DELETE FROM events WHERE id = $1 RETURNING *
  `,
    [id],
  );
  return rows[0];
};
