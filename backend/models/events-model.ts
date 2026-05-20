import db from "../db/connection";
import { Event } from "../types";

export const selectEvents = async () => {
  const { rows } = await db.query(`
    SELECT * FROM events
  `);
  return rows;
};

/** Events visible on the public marketing site. */
export const selectPublicEvents = async (): Promise<Event[]> => {
  const { rows } = await db.query(`
    SELECT * FROM events
    WHERE is_active = true
    ORDER BY COALESCE(
      starts_at,
      (SELECT MIN((elem->>'starts_at')::timestamptz)
       FROM jsonb_array_elements(schedule_slots) elem
       WHERE elem->>'starts_at' IS NOT NULL)
    ) ASC NULLS LAST, id ASC
  `);
  return rows as Event[];
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
  dates_description: string | null,
  schedule_slots: unknown,
  starts_at: Date | string | null,
  ends_at: Date | string | null,
  location: string,
  type: string,
  max_volunteers: number,
  is_active: boolean,
  external_links: unknown,
  studio_partners: unknown,
  created_by: number,
) => {
  const { rows } = await db.query(
    `
    INSERT INTO events (title, description, cover_image, dates_description, schedule_slots, starts_at, ends_at, location, type, max_volunteers, is_active, external_links, studio_partners, created_by) VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9, $10, $11, $12::jsonb, $13::jsonb, $14) RETURNING *
  `,
    [
      title,
      description,
      cover_image,
      dates_description,
      JSON.stringify(schedule_slots ?? []),
      starts_at,
      ends_at,
      location,
      type,
      max_volunteers,
      is_active,
      JSON.stringify(external_links ?? []),
      JSON.stringify(studio_partners ?? []),
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
  dates_description: string | null,
  schedule_slots: unknown,
  starts_at: Date | string | null,
  ends_at: Date | string | null,
  location: string,
  type: string,
  max_volunteers: number,
  is_active: boolean,
  external_links: unknown,
  studio_partners: unknown,
  created_by: number,
) => {
  const { rows } = await db.query(
    `
    UPDATE events SET title = $1, description = $2, cover_image = $3, dates_description = $4, schedule_slots = $5::jsonb, starts_at = $6, ends_at = $7, location = $8, type = $9, max_volunteers = $10, is_active = $11, external_links = $12::jsonb, studio_partners = $13::jsonb, created_by = $14 WHERE id = $15 RETURNING *
  `,
    [
      title,
      description,
      cover_image,
      dates_description,
      JSON.stringify(schedule_slots ?? []),
      starts_at,
      ends_at,
      location,
      type,
      max_volunteers,
      is_active,
      JSON.stringify(external_links ?? []),
      JSON.stringify(studio_partners ?? []),
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

export const updateEventIsActiveById = async (id: number, is_active: boolean) => {
  const { rows } = await db.query(
    `UPDATE events SET is_active = $1 WHERE id = $2 RETURNING *`,
    [is_active, id],
  );
  return rows[0] as Event | undefined;
};
