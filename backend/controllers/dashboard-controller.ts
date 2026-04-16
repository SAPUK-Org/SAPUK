import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import {
  deleteStaffMemberById,
  insertStaffMember,
  selectStaffMemberById,
  selectStaffMembers,
  updateStaffMemberById,
  updateStaffMemberIsActive,
  updateStaffMemberRole,
} from "../models/dashboard-model";
import type { StaffRole } from "../types";
import { sanitizeUser, sanitizeUsers } from "../utils/databaseHelpers";
import { logAudit } from "../utils/logAudit";

export const getStaffMembers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, role, is_active, search } = req.query;

    let pageNum: number | undefined;
    let limitNum: number | undefined;
    let offset: number | undefined;

    if (typeof page === "string") {
      pageNum = Number(page);
      if (!Number.isInteger(pageNum) || pageNum < 1) {
        return res.status(400).json({ msg: "Invalid page query parameter" });
      }
    }

    if (typeof limit === "string") {
      limitNum = Number(limit);
      if (!Number.isInteger(limitNum) || limitNum < 1) {
        return res.status(400).json({ msg: "Invalid limit query parameter" });
      }
    }

    if (pageNum && limitNum) {
      offset = (pageNum - 1) * limitNum;
    }

    let isActiveBool: boolean | undefined;
    if (typeof is_active === "string") {
      if (is_active === "true") {
        isActiveBool = true;
      } else if (is_active === "false") {
        isActiveBool = false;
      } else {
        return res
          .status(400)
          .json({ msg: "Invalid is_active query parameter" });
      }
    }

    const validRoles: StaffRole[] = ["admin", "editor", "staff"];
    let roleFilter: StaffRole | undefined;
    if (typeof role === "string") {
      if (!validRoles.includes(role as StaffRole)) {
        return res.status(400).json({ msg: "Invalid role query parameter" });
      }
      roleFilter = role as StaffRole;
    }

    const searchTerm = typeof search === "string" ? search : undefined;

    const { staffMembers, total } = await selectStaffMembers({
      role: roleFilter,
      isActive: isActiveBool,
      search: searchTerm,
      limit: limitNum,
      offset,
    });

    if (!staffMembers || staffMembers.length === 0) {
      return res.status(404).json({ msg: "No staff members found" });
    }
    const sanitizedStaffMembers = sanitizeUsers(staffMembers);
    res.status(200).json({
      staffMembers: sanitizedStaffMembers,
      total,
      page: pageNum,
      limit: limitNum,
    });
  } catch (err) {
    next(err);
  }
};

export const createStaffMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email, password, role } = req.body;
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!password) {
      return res.status(400).send({ msg: "Password is required" });
    }
    if (!username) {
      return res.status(400).send({ msg: "Username is required" });
    }
    if (!email) {
      return res.status(400).send({ msg: "Email is required" });
    }
    if (!role) {
      return res.status(400).send({ msg: "Role is required" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const staffMember = await insertStaffMember(
      username,
      email,
      passwordHash,
      role,
    );
    if (!staffMember) {
      return res.status(400).send({ msg: "Failed to create staff member" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "create staff member",
      resourceType: "user",
      resourceId: staffMember.id as number,
      method: req.method,
      route: req.originalUrl,
      statusCode: 201,
      metadata: {
        username: staffMember.username,
        email: staffMember.email,
        role: staffMember.role,
      },
      ip: req.ip as string,
    });
    const sanitizedStaffMember = sanitizeUser(staffMember);
    res.status(201).send({ staffMember: sanitizedStaffMember });
  } catch (err) {
    next(err);
  }
};

export const getStaffMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid staff member ID" });
    }
    const staffMember = await selectStaffMemberById(Number(id));
    if (!staffMember) {
      return res.status(404).send({ msg: "Staff member not found" });
    }
    const sanitizedStaffMember = sanitizeUser(staffMember);
    res.status(200).send({ staffMember: sanitizedStaffMember });
  } catch (err) {
    next(err);
  }
};

export const updateStaffMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid staff member ID" });
    }
    const staffMember = await selectStaffMemberById(Number(id));
    if (!staffMember) {
      return res.status(404).send({ msg: "Staff member not found" });
    }
    const updatedStaffMember = await updateStaffMemberById(
      Number(id),
      username,
      email,
      role,
    );
    await logAudit({
      userId: req.user?.id,
      action: "update staff member",
      resourceType: "user",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: {
        username: updatedStaffMember.username,
        email: updatedStaffMember.email,
        role: updatedStaffMember.role,
      },
      ip: req.ip as string,
    });
    const sanitizedUpdatedStaffMember = sanitizeUser(updatedStaffMember);
    res.status(200).send({ staffMember: sanitizedUpdatedStaffMember });
  } catch (err) {
    next(err);
  }
};

export const deleteStaffMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid staff member ID" });
    }
    const staffMember = await selectStaffMemberById(Number(id));
    if (!staffMember) {
      return res.status(404).send({ msg: "Staff member not found" });
    }
    const deletedStaffMember = await deleteStaffMemberById(Number(id));
    if (!deletedStaffMember) {
      return res.status(404).send({ msg: "Staff member not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "delete staff member",
      resourceType: "user",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 204,
      metadata: {
        username: deletedStaffMember.username,
        email: deletedStaffMember.email,
        role: deletedStaffMember.role,
        is_active: deletedStaffMember.is_active,
      },
      ip: req.ip as string,
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const patchStaffMemberRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid staff member ID" });
    }
    if (!role) {
      return res.status(400).send({ msg: "Role is required" });
    }
    const staffMember = await selectStaffMemberById(Number(id));
    if (!staffMember) {
      return res.status(404).send({ msg: "Staff member not found" });
    }
    const updatedStaffMember = await updateStaffMemberRole(Number(id), role);
    await logAudit({
      userId: req.user?.id,
      action: "patch staff member role",
      resourceType: "user",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: {
        username: staffMember.username,
        previous_role: staffMember.role,
        new_role: role,
      },
      ip: req.ip as string,
    });
    const sanitizedUpdatedStaffMember = sanitizeUser(updatedStaffMember);
    res.status(200).send({ staffMember: sanitizedUpdatedStaffMember });
  } catch (err) {
    next(err);
  }
};

export const deactivateStaffMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid staff member ID" });
    }
    const staffMember = await selectStaffMemberById(Number(id));
    if (!staffMember) {
      return res.status(404).send({ msg: "Staff member not found" });
    }
    const updatedStaffMember = await updateStaffMemberIsActive(
      Number(id),
      false,
    );
    await logAudit({
      userId: req.user?.id,
      action: "deactivate staff member",
      resourceType: "user",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: {
        username: staffMember.username,
        email: staffMember.email,
      },
      ip: req.ip as string,
    });
    const sanitizedUpdatedStaffMember = sanitizeUser(updatedStaffMember);
    res.status(200).send({ staffMember: sanitizedUpdatedStaffMember });
  } catch (err) {
    next(err);
  }
};

export const activateStaffMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid staff member ID" });
    }
    const staffMember = await selectStaffMemberById(Number(id));
    if (!staffMember) {
      return res.status(404).send({ msg: "Staff member not found" });
    }
    const updatedStaffMember = await updateStaffMemberIsActive(
      Number(id),
      true,
    );
    await logAudit({
      userId: req.user?.id,
      action: "activate staff member",
      resourceType: "user",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: {
        username: staffMember.username,
        email: staffMember.email,
      },
      ip: req.ip as string,
    });
    const sanitizedUpdatedStaffMember = sanitizeUser(updatedStaffMember);
    res.status(200).send({ staffMember: sanitizedUpdatedStaffMember });
  } catch (err) {
    next(err);
  }
};
