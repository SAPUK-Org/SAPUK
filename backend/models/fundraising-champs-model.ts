import db from "../db/connection";
import type { FundraisingChamp } from "../types";

export const selectFundraisingChamps = async () => {
  const { rows } = await db.query(`
    SELECT * FROM fundraising_champs
    ORDER BY sort_order ASC, id ASC
  `);
  return rows as FundraisingChamp[];
};

export const selectPublicFundraisingChamps = async () => {
  const { rows } = await db.query(`
    SELECT * FROM fundraising_champs
    WHERE is_active = true
    ORDER BY sort_order ASC, id ASC
  `);
  return rows as FundraisingChamp[];
};

export const selectFundraisingChampById = async (id: number) => {
  const { rows } = await db.query(
    `SELECT * FROM fundraising_champs WHERE id = $1`,
    [id],
  );
  return rows[0] as FundraisingChamp | undefined;
};

export const selectPublicFundraisingChampBySlug = async (slug: string) => {
  const { rows } = await db.query(
    `SELECT * FROM fundraising_champs WHERE slug = $1 AND is_active = true`,
    [slug],
  );
  return rows[0] as FundraisingChamp | undefined;
};

export const selectFundraisingChampBySlug = async (slug: string) => {
  const { rows } = await db.query(
    `SELECT * FROM fundraising_champs WHERE slug = $1`,
    [slug],
  );
  return rows[0] as FundraisingChamp | undefined;
};

export const insertFundraisingChamp = async (
  slug: string,
  name: string,
  champ_type: string,
  summary: string,
  body: string | null,
  image: string | null,
  logo: string | null,
  website_url: string | null,
  sort_order: number,
  is_active: boolean,
  created_by: number | null,
) => {
  const { rows } = await db.query(
    `
    INSERT INTO fundraising_champs (
      slug, name, champ_type, summary, body, image, logo, website_url,
      sort_order, is_active, created_by
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
  `,
    [
      slug,
      name,
      champ_type,
      summary,
      body,
      image,
      logo,
      website_url,
      sort_order,
      is_active,
      created_by,
    ],
  );
  return rows[0] as FundraisingChamp;
};

export const updateFundraisingChampById = async (
  id: number,
  slug: string,
  name: string,
  champ_type: string,
  summary: string,
  body: string | null,
  image: string | null,
  logo: string | null,
  website_url: string | null,
  sort_order: number,
  is_active: boolean,
  created_by: number | null,
) => {
  const { rows } = await db.query(
    `
    UPDATE fundraising_champs
    SET slug = $1, name = $2, champ_type = $3, summary = $4, body = $5,
        image = $6, logo = $7, website_url = $8, sort_order = $9,
        is_active = $10, created_by = $11, updated_at = NOW()
    WHERE id = $12
    RETURNING *
  `,
    [
      slug,
      name,
      champ_type,
      summary,
      body,
      image,
      logo,
      website_url,
      sort_order,
      is_active,
      created_by,
      id,
    ],
  );
  return rows[0] as FundraisingChamp | undefined;
};

export const deleteFundraisingChampById = async (id: number) => {
  const { rows } = await db.query(
    `DELETE FROM fundraising_champs WHERE id = $1 RETURNING *`,
    [id],
  );
  return rows[0] as FundraisingChamp | undefined;
};

export const updateFundraisingChampIsActiveById = async (
  id: number,
  is_active: boolean,
) => {
  const { rows } = await db.query(
    `UPDATE fundraising_champs SET is_active = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [is_active, id],
  );
  return rows[0] as FundraisingChamp | undefined;
};
