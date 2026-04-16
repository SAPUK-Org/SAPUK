import db from "../db/connection";
import { StaffRole, User } from "../types";

type StaffMembersQueryOptions = {
  role?: StaffRole;
  isActive?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
};

export const selectStaffMembers = async (
  options: StaffMembersQueryOptions = {},
) => {
  const { role, isActive, search, limit, offset } = options;

  const whereClauses: string[] = [];
  const values: (string | boolean)[] = [];

  if (role) {
    values.push(role);
    whereClauses.push(`role = $${values.length}`);
  }

  if (typeof isActive === "boolean") {
    values.push(isActive);
    whereClauses.push(`is_active = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    // Search by username OR email
    whereClauses.push(
      `(username ILIKE $${values.length} OR email ILIKE $${values.length})`,
    );
  }

  const whereClause =
    whereClauses.length > 0 ? ` WHERE ${whereClauses.join(" AND ")}` : "";

  let query = `
    SELECT * FROM users
    ${whereClause}
  `;

  const paginatedValues = [...values];

  if (typeof limit === "number") {
    paginatedValues.push(limit.toString());
    query += ` LIMIT $${paginatedValues.length}`;
  }

  if (typeof offset === "number") {
    paginatedValues.push(offset.toString());
    query += ` OFFSET $${paginatedValues.length}`;
  }

  const { rows } = await db.query(query, paginatedValues);

  const {
    rows: [countRow],
  } = await db.query(
    `
    SELECT COUNT(*)::int AS total
    FROM users
    ${whereClause}
  `,
    values,
  );

  return {
    staffMembers: rows as User[],
    total: (countRow as { total: number }).total ?? 0,
  };
};

export const insertStaffMember = async (
  username: string,
  email: string,
  passwordHash: string,
  role: StaffRole,
) => {
  const { rows } = await db.query(
    `
    INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *
  `,
    [username, email, passwordHash, role],
  );
  return rows[0] as User;
};

export const selectStaffMemberById = async (id: number) => {
  const { rows } = await db.query(
    `
    SELECT * FROM users WHERE id = $1
  `,
    [id],
  );
  return rows[0] as User;
};

export const updateStaffMemberById = async (
  id: number,
  username: string,
  email: string,
  role: StaffRole,
) => {
  const { rows } = await db.query(
    `
    UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4 RETURNING *
  `,
    [username, email, role, id],
  );
  return rows[0] as User;
};

export const deleteStaffMemberById = async (id: number) => {
  const { rows } = await db.query(
    `
    DELETE FROM users WHERE id = $1 RETURNING *
  `,
    [id],
  );
  return rows[0] as User;
};

export const updateStaffMemberRole = async (id: number, role: StaffRole) => {
  const { rows } = await db.query(
    `
    UPDATE users SET role = $1 WHERE id = $2 RETURNING *
  `,
    [role, id],
  );
  return rows[0] as User;
};

export const updateStaffMemberIsActive = async (
  id: number,
  isActive: boolean,
) => {
  const { rows } = await db.query(
    `
    UPDATE users SET is_active = $1 WHERE id = $2 RETURNING *
  `,
    [isActive, id],
  );
  return rows[0] as User;
};
