import db from "../db/connection";

export interface AuditLogInput {
  userId?: number;
  action: string;
  resourceType: string;
  resourceId: number;
  method: string;
  route: string;
  statusCode: number;
  metadata: Record<string, unknown>;
  ip: string;
}

export interface AuditLog {
  id: string;
  user_id: number | null;
  action: string;
  resource_type: string;
  resource_id: number | null;
  method?: string | null;
  route?: string | null;
  status_code?: number | null;
  metadata?: Record<string, unknown> | null;
  ip?: string | null;
  created_at?: string;
}

export const logAudit = async (data: AuditLogInput) => {
  await db.query(
    `
      INSERT INTO audit_logs 
      (user_id, action, resource_type, resource_id, method, route, status_code, metadata, ip)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      `,
    [
      data.userId,
      data.action,
      data.resourceType,
      data.resourceId,
      data.method,
      data.route,
      data.statusCode,
      data.metadata,
      data.ip,
    ],
  );
};
