import db from "../db/connection";
import { CrisisResource } from "../types";

export const selectCrisisResources = async () => {
  const { rows } = await db.query(`
    SELECT * FROM crisis_resources
    ORDER BY sort_order ASC, id ASC
  `);
  return rows;
};

export const selectCrisisResourceById = async (id: number) => {
  const { rows } = await db.query(
    `
    SELECT * FROM crisis_resources WHERE id = $1
  `,
    [id],
  );
  return rows[0] as CrisisResource | undefined;
};

export const insertCrisisResource = async (
  name: string,
  phone_or_url: string,
  type: string,
  description?: string | null,
  hours?: string | null,
  sort_order?: number | null,
  is_active?: boolean,
) => {
  const { rows } = await db.query(
    `
    INSERT INTO crisis_resources (name, phone_or_url, type, description, hours, sort_order, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
    [
      name,
      phone_or_url,
      type,
      description ?? null,
      hours ?? null,
      sort_order ?? 0,
      is_active ?? true,
    ],
  );
  return rows[0];
};

export const updateCrisisResourceById = async (
  id: number,
  name: string,
  phone_or_url: string,
  type: string,
  description?: string | null,
  hours?: string | null,
  sort_order?: number | null,
  is_active?: boolean,
) => {
  const { rows } = await db.query(
    `
    UPDATE crisis_resources
    SET name = $1, phone_or_url = $2, type = $3, description = $4, hours = $5, sort_order = $6, is_active = $7, updated_at = NOW()
    WHERE id = $8
    RETURNING *
  `,
    [
      name,
      phone_or_url,
      type,
      description ?? null,
      hours ?? null,
      sort_order ?? 0,
      is_active ?? true,
      id,
    ],
  );
  return rows[0];
};

export const deleteCrisisResourceById = async (id: number) => {
  const { rows } = await db.query(
    `
    DELETE FROM crisis_resources WHERE id = $1 RETURNING *
  `,
    [id],
  );
  return rows[0];
};
