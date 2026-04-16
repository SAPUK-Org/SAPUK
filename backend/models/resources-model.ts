import db from "../db/connection";
import { Resource } from "../types";

export const selectResources = async () => {
  const { rows } = await db.query(
    `SELECT id, url, mime_type, resource_type, file_name, file_key, uploaded_by, attachable_type, attachable_id, metadata, notes, created_at
     FROM resources
     ORDER BY created_at DESC`,
  );
  return rows as Resource[];
};

function deriveResourceType(
  mimeType: string,
): "image" | "document" | "video" | "other" {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType === "application/pdf" || mimeType.startsWith("application/"))
    return "document";
  if (mimeType.startsWith("video/")) return "video";
  return "other";
}

export const insertResource = async (
  url: string,
  mime_type: string,
  file_name: string,
  file_key: string | null,
  uploaded_by: number | null,
  attachable_type?: string | null,
  attachable_id?: number | null,
  metadata?: Record<string, unknown> | null,
) => {
  const resource_type = deriveResourceType(mime_type);
  const { rows } = await db.query(
    `
    INSERT INTO resources (url, mime_type, resource_type, file_name, file_key, uploaded_by, attachable_type, attachable_id, metadata)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `,
    [
      url,
      mime_type,
      resource_type,
      file_name,
      file_key ?? null,
      uploaded_by ?? null,
      attachable_type ?? null,
      attachable_id ?? null,
      metadata ? JSON.stringify(metadata) : null,
    ],
  );
  return rows[0] as Resource;
};

export const patchResource = async (
  id: number,
  url: string,
  mime_type: string,
  file_name: string,
  file_key: string | null,
  uploaded_by: number | null,
  attachable_type: string | null,
  attachable_id: number | null,
  metadata: Record<string, unknown> | null,
  notes: string | null,
) => {
  const resource_type = deriveResourceType(mime_type);
  const { rows } = await db.query(
    `UPDATE resources SET url = $1, mime_type = $2, resource_type = $3, file_name = $4, file_key = $5, uploaded_by = $6, attachable_type = $7, attachable_id = $8, metadata = $9, notes = $10 WHERE id = $11 RETURNING *`,
    [
      url,
      mime_type,
      resource_type,
      file_name,
      file_key ?? null,
      uploaded_by ?? null,
      attachable_type ?? null,
      attachable_id ?? null,
      metadata ? JSON.stringify(metadata) : null,
      notes ?? null,
      id,
    ],
  );
  return rows[0] as Resource;
};

export const deleteResource = async (id: number): Promise<Resource> => {
  const { rows } = await db.query(
    `DELETE FROM resources WHERE id = $1 RETURNING *`,
    [id],
  );
  return rows[0] as Resource;
};
