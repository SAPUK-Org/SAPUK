import { Request, Response, NextFunction } from "express";
import {
  insertUsefulLink,
  selectUsefulLinkById,
  selectUsefulLinks,
  updateUsefulLinkById,
  deleteUsefulLinkById,
} from "../models/useful-links-model";
import type { UsefulLink } from "../types";
import { logAudit } from "../utils/logAudit";

export const getUsefulLinks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const useful_links = await selectUsefulLinks();
    res.status(200).send({ useful_links });
  } catch (err) {
    next(err);
  }
};

export const getUsefulLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({ msg: "Invalid useful link ID" });
    }
    const useful_link = await selectUsefulLinkById(Number(req.params.id));
    if (!useful_link) {
      return res.status(404).send({ msg: "Useful link not found" });
    }
    res.status(200).send({ useful_link });
  } catch (err) {
    next(err);
  }
};

export const createUsefulLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, url, description, sort_order, is_active, metadata } =
      req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!title) {
      return res.status(400).send({ msg: "Title is required" });
    }
    if (!url) {
      return res.status(400).send({ msg: "URL is required" });
    }
    const useful_link = (await insertUsefulLink(
      title,
      url,
      description ?? null,
      sort_order ?? 0,
      is_active ?? true,
      metadata ?? null,
    )) as UsefulLink;
    await logAudit({
      userId: req.user?.id,
      action: "create useful link",
      resourceType: "useful_link",
      resourceId: useful_link.id as number,
      method: req.method,
      route: req.originalUrl,
      statusCode: 201,
      metadata: { title: useful_link.title, url: useful_link.url },
      ip: req.ip as string,
    });
    res.status(201).send({ useful_link });
  } catch (err) {
    next(err);
  }
};

export const updateUsefulLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { title, url, description, sort_order, is_active, metadata } = req.body;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid useful link ID" });
    }
    const existing = await selectUsefulLinkById(Number(id));
    if (!existing) {
      return res.status(404).send({ msg: "Useful link not found" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!title) {
      return res.status(400).send({ msg: "Title is required" });
    }
    if (!url) {
      return res.status(400).send({ msg: "URL is required" });
    }
    const useful_link = (await updateUsefulLinkById(
      Number(id),
      title,
      url,
      description ?? null,
      sort_order ?? 0,
      is_active ?? true,
      metadata ?? null,
    )) as UsefulLink | undefined;
    if (!useful_link) {
      return res.status(404).send({ msg: "Useful link not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "update useful link",
      resourceType: "useful_link",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { title: useful_link.title, url: useful_link.url },
      ip: req.ip as string,
    });
    res.status(200).send({ useful_link });
  } catch (err) {
    next(err);
  }
};

export const deleteUsefulLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid useful link ID" });
    }
    const existing = await selectUsefulLinkById(Number(id));
    if (!existing) {
      return res.status(404).send({ msg: "Useful link not found" });
    }
    const useful_link = (await deleteUsefulLinkById(Number(id))) as
      | UsefulLink
      | undefined;
    if (!useful_link) {
      return res.status(404).send({ msg: "Useful link not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "delete useful link",
      resourceType: "useful_link",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { title: useful_link.title, url: useful_link.url },
      ip: req.ip as string,
    });
    res.status(200).send({ useful_link });
  } catch (err) {
    next(err);
  }
};
