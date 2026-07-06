import db from "../db/connection";
import type { CommunityCause } from "../types";

export const selectCommunityCauses = async () => {
  const { rows } = await db.query(`
    SELECT * FROM community_causes
    ORDER BY sort_order ASC, id ASC
  `);
  return rows as CommunityCause[];
};

export const selectPublicCommunityCauses = async () => {
  const { rows } = await db.query(`
    SELECT * FROM community_causes
    WHERE is_active = true
    ORDER BY sort_order ASC, id ASC
  `);
  return rows as CommunityCause[];
};

export const selectCommunityCauseById = async (id: number) => {
  const { rows } = await db.query(
    `SELECT * FROM community_causes WHERE id = $1`,
    [id],
  );
  return rows[0] as CommunityCause | undefined;
};

export const insertCommunityCause = async (
  name: string,
  summary: string,
  image: string | null,
  link_url: string | null,
  sort_order: number,
  is_active: boolean,
  created_by: number | null,
) => {
  const { rows } = await db.query(
    `
    INSERT INTO community_causes (name, summary, image, link_url, sort_order, is_active, created_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
    [name, summary, image, link_url, sort_order, is_active, created_by],
  );
  return rows[0] as CommunityCause;
};

export const updateCommunityCauseById = async (
  id: number,
  name: string,
  summary: string,
  image: string | null,
  link_url: string | null,
  sort_order: number,
  is_active: boolean,
  created_by: number | null,
) => {
  const { rows } = await db.query(
    `
    UPDATE community_causes
    SET name = $1, summary = $2, image = $3, link_url = $4,
        sort_order = $5, is_active = $6, created_by = $7, updated_at = NOW()
    WHERE id = $8
    RETURNING *
  `,
    [name, summary, image, link_url, sort_order, is_active, created_by, id],
  );
  return rows[0] as CommunityCause | undefined;
};

export const deleteCommunityCauseById = async (id: number) => {
  const { rows } = await db.query(
    `DELETE FROM community_causes WHERE id = $1 RETURNING *`,
    [id],
  );
  return rows[0] as CommunityCause | undefined;
};

export const updateCommunityCauseIsActiveById = async (
  id: number,
  is_active: boolean,
) => {
  const { rows } = await db.query(
    `UPDATE community_causes SET is_active = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [is_active, id],
  );
  return rows[0] as CommunityCause | undefined;
};
