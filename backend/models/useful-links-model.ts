import db from "../db/connection";
import { UsefulLink } from "../types";

export const selectUsefulLinks = async () => {
  const { rows } = await db.query(`
    SELECT * FROM useful_links
    ORDER BY sort_order ASC, id ASC
  `);
  return rows;
};

export const selectUsefulLinkById = async (id: number) => {
  const { rows } = await db.query(
    `
    SELECT * FROM useful_links WHERE id = $1
  `,
    [id],
  );
  return rows[0] as UsefulLink | undefined;
};

export const insertUsefulLink = async (
  title: string,
  url: string,
  description?: string | null,
  sort_order?: number | null,
  is_active?: boolean,
  metadata?: Record<string, unknown> | null,
) => {
  const { rows } = await db.query(
    `
    INSERT INTO useful_links (title, url, description, sort_order, is_active, metadata)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
    [
      title,
      url,
      description ?? null,
      sort_order ?? 0,
      is_active ?? true,
      metadata ? JSON.stringify(metadata) : null,
    ],
  );
  return rows[0];
};

export const updateUsefulLinkById = async (
  id: number,
  title: string,
  url: string,
  description?: string | null,
  sort_order?: number | null,
  is_active?: boolean,
  metadata?: Record<string, unknown> | null,
) => {
  const { rows } = await db.query(
    `
    UPDATE useful_links
    SET title = $1, url = $2, description = $3, sort_order = $4, is_active = $5, metadata = $6, updated_at = NOW()
    WHERE id = $7
    RETURNING *
  `,
    [
      title,
      url,
      description ?? null,
      sort_order ?? 0,
      is_active ?? true,
      metadata ? JSON.stringify(metadata) : null,
      id,
    ],
  );
  return rows[0];
};

export const deleteUsefulLinkById = async (id: number) => {
  const { rows } = await db.query(
    `
    DELETE FROM useful_links WHERE id = $1 RETURNING *
  `,
    [id],
  );
  return rows[0];
};
