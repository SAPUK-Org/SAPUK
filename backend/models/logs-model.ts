import db from "../db/connection";

type LogsQueryOptions = {
  userId?: number;
  action?: string;
  resourceType?: string;
  resourceId?: number;
  method?: string;
  route?: string;
};

export const selectLogs = async (options: LogsQueryOptions = {}) => {
  const { userId, action, resourceType, resourceId, method, route } = options;

  const whereClauses: string[] = [];
  const values: (number | string)[] = [];

  if (typeof userId === "number") {
    values.push(userId);
    whereClauses.push(`user_id = $${values.length}`);
  }

  if (typeof action === "string") {
    values.push(`%${action}%`);
    whereClauses.push(`action ILIKE $${values.length}`);
  }

  if (typeof resourceType === "string") {
    values.push(`%${resourceType}%`);
    whereClauses.push(`resource_type ILIKE $${values.length}`);
  }

  if (typeof resourceId === "number") {
    values.push(resourceId);
    whereClauses.push(`resource_id = $${values.length}`);
  }

  if (typeof method === "string") {
    values.push(method);
    whereClauses.push(`method = $${values.length}`);
  }

  if (typeof route === "string") {
    values.push(`%${route}%`);
    whereClauses.push(`route ILIKE $${values.length}`);
  }

  const whereClause =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const query = `
    SELECT * FROM audit_logs
    ${whereClause}
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query(query, values);
  return rows;
};
