import { Request, Response, NextFunction } from "express";
import {
  insertCrisisResource,
  selectCrisisResourceById,
  selectCrisisResources,
  updateCrisisResourceById,
  deleteCrisisResourceById,
} from "../models/crisis-resources-model";
import type { CrisisResource } from "../types";
import { logAudit } from "../utils/logAudit";

export const getCrisisResources = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const crisis_resources = await selectCrisisResources();
    res.status(200).send({ crisis_resources });
  } catch (err) {
    next(err);
  }
};

export const getCrisisResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({ msg: "Invalid crisis resource ID" });
    }
    const crisis_resource = await selectCrisisResourceById(
      Number(req.params.id),
    );
    if (!crisis_resource) {
      return res.status(404).send({ msg: "Crisis resource not found" });
    }
    res.status(200).send({ crisis_resource });
  } catch (err) {
    next(err);
  }
};

export const createCrisisResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      phone_or_url,
      type,
      description,
      hours,
      sort_order,
      is_active,
    } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!name) {
      return res.status(400).send({ msg: "Name is required" });
    }
    if (!phone_or_url) {
      return res.status(400).send({ msg: "Phone or URL is required" });
    }
    if (!type) {
      return res.status(400).send({ msg: "Type is required" });
    }
    const crisis_resource = (await insertCrisisResource(
      name,
      phone_or_url,
      type,
      description ?? null,
      hours ?? null,
      sort_order ?? 0,
      is_active ?? true,
    )) as CrisisResource;
    await logAudit({
      userId: req.user?.id,
      action: "create crisis resource",
      resourceType: "crisis_resource",
      resourceId: crisis_resource.id as number,
      method: req.method,
      route: req.originalUrl,
      statusCode: 201,
      metadata: { name: crisis_resource.name, type: crisis_resource.type },
      ip: req.ip as string,
    });
    res.status(201).send({ crisis_resource });
  } catch (err) {
    next(err);
  }
};

export const updateCrisisResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const {
    name,
    phone_or_url,
    type,
    description,
    hours,
    sort_order,
    is_active,
  } = req.body;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid crisis resource ID" });
    }
    const existing = await selectCrisisResourceById(Number(id));
    if (!existing) {
      return res.status(404).send({ msg: "Crisis resource not found" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!name) {
      return res.status(400).send({ msg: "Name is required" });
    }
    if (!phone_or_url) {
      return res.status(400).send({ msg: "Phone or URL is required" });
    }
    if (!type) {
      return res.status(400).send({ msg: "Type is required" });
    }
    const crisis_resource = (await updateCrisisResourceById(
      Number(id),
      name,
      phone_or_url,
      type,
      description ?? null,
      hours ?? null,
      sort_order ?? 0,
      is_active ?? true,
    )) as CrisisResource | undefined;
    if (!crisis_resource) {
      return res.status(404).send({ msg: "Crisis resource not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "update crisis resource",
      resourceType: "crisis_resource",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { name: crisis_resource.name, type: crisis_resource.type },
      ip: req.ip as string,
    });
    res.status(200).send({ crisis_resource });
  } catch (err) {
    next(err);
  }
};

export const deleteCrisisResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid crisis resource ID" });
    }
    const existing = await selectCrisisResourceById(Number(id));
    if (!existing) {
      return res.status(404).send({ msg: "Crisis resource not found" });
    }
    const crisis_resource = (await deleteCrisisResourceById(Number(id))) as
      | CrisisResource
      | undefined;
    if (!crisis_resource) {
      return res.status(404).send({ msg: "Crisis resource not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "delete crisis resource",
      resourceType: "crisis_resource",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { name: crisis_resource.name, type: crisis_resource.type },
      ip: req.ip as string,
    });
    res.status(200).send({ crisis_resource });
  } catch (err) {
    next(err);
  }
};
