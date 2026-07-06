import { Request, Response, NextFunction } from "express";
import {
  deleteCommunityCauseById,
  insertCommunityCause,
  selectCommunityCauseById,
  selectCommunityCauses,
  updateCommunityCauseById,
  updateCommunityCauseIsActiveById,
} from "../models/community-causes-model";
import type { CommunityCause } from "../types";
import { logAudit } from "../utils/logAudit";

function parseOptionalUrl(value: unknown): string | null {
  if (value == null || value === "") return null;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export const getCommunityCauses = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const community_causes = await selectCommunityCauses();
    res.status(200).send({ community_causes });
  } catch (err) {
    next(err);
  }
};

export const getCommunityCause = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({ msg: "Invalid community cause ID" });
    }
    const community_cause = await selectCommunityCauseById(
      Number(req.params.id),
    );
    if (!community_cause) {
      return res.status(404).send({ msg: "Community cause not found" });
    }
    res.status(200).send({ community_cause });
  } catch (err) {
    next(err);
  }
};

export const createCommunityCause = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, summary, image, link_url, sort_order, is_active } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!name || typeof name !== "string") {
      return res.status(400).send({ msg: "Name is required" });
    }
    if (!summary || typeof summary !== "string") {
      return res.status(400).send({ msg: "Summary is required" });
    }

    const community_cause = (await insertCommunityCause(
      name.trim(),
      summary.trim(),
      parseOptionalUrl(image),
      parseOptionalUrl(link_url),
      typeof sort_order === "number" ? sort_order : 0,
      typeof is_active === "boolean" ? is_active : true,
      req.user?.id ?? null,
    )) as CommunityCause;

    await logAudit({
      userId: req.user?.id,
      action: "create community cause",
      resourceType: "community_cause",
      resourceId: community_cause.id as number,
      method: req.method,
      route: req.originalUrl,
      statusCode: 201,
      metadata: { name: community_cause.name },
      ip: req.ip as string,
    });

    res.status(201).send({ community_cause });
  } catch (err) {
    next(err);
  }
};

export const updateCommunityCause = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid community cause ID" });
    }
    const existing = await selectCommunityCauseById(Number(id));
    if (!existing) {
      return res.status(404).send({ msg: "Community cause not found" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }

    const { name, summary, image, link_url, sort_order, is_active } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).send({ msg: "Name is required" });
    }
    if (!summary || typeof summary !== "string") {
      return res.status(400).send({ msg: "Summary is required" });
    }

    const community_cause = (await updateCommunityCauseById(
      Number(id),
      name.trim(),
      summary.trim(),
      parseOptionalUrl(image),
      parseOptionalUrl(link_url),
      typeof sort_order === "number" ? sort_order : existing.sort_order ?? 0,
      typeof is_active === "boolean" ? is_active : existing.is_active ?? true,
      req.user?.id ?? existing.created_by ?? null,
    )) as CommunityCause | undefined;

    if (!community_cause) {
      return res.status(404).send({ msg: "Community cause not found" });
    }

    await logAudit({
      userId: req.user?.id,
      action: "update community cause",
      resourceType: "community_cause",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { name: community_cause.name },
      ip: req.ip as string,
    });

    res.status(200).send({ community_cause });
  } catch (err) {
    next(err);
  }
};

export const patchCommunityCauseActive = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({ msg: "Invalid community cause ID" });
    }
    const id = Number(req.params.id);
    const { is_active } = req.body as { is_active?: unknown };
    if (typeof is_active !== "boolean") {
      return res.status(400).send({ msg: "is_active must be a boolean" });
    }
    const existing = await selectCommunityCauseById(id);
    if (!existing) {
      return res.status(404).send({ msg: "Community cause not found" });
    }
    const updated = await updateCommunityCauseIsActiveById(id, is_active);
    if (!updated) {
      return res.status(404).send({ msg: "Community cause not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: is_active
        ? "activate community cause"
        : "deactivate community cause",
      resourceType: "community_cause",
      resourceId: id,
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { name: updated.name, is_active },
      ip: req.ip as string,
    });
    res.status(200).send({ community_cause: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteCommunityCause = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid community cause ID" });
    }
    const existing = await selectCommunityCauseById(Number(id));
    if (!existing) {
      return res.status(404).send({ msg: "Community cause not found" });
    }
    const community_cause = await deleteCommunityCauseById(Number(id));
    if (!community_cause) {
      return res.status(404).send({ msg: "Community cause not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "delete community cause",
      resourceType: "community_cause",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { name: community_cause.name },
      ip: req.ip as string,
    });
    res.status(200).send({ community_cause });
  } catch (err) {
    next(err);
  }
};
