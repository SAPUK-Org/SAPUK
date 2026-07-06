import { Request, Response, NextFunction } from "express";
import {
  deleteFundraisingChampById,
  insertFundraisingChamp,
  selectFundraisingChampById,
  selectFundraisingChampBySlug,
  selectFundraisingChamps,
  updateFundraisingChampById,
  updateFundraisingChampIsActiveById,
} from "../models/fundraising-champs-model";
import type { ChampType, FundraisingChamp } from "../types";
import { logAudit } from "../utils/logAudit";
import { slugify } from "../utils/slugify";

const CHAMP_TYPES: ChampType[] = ["individual", "business"];

function parseChampType(value: unknown): ChampType | null {
  if (typeof value !== "string") return null;
  return CHAMP_TYPES.includes(value as ChampType)
    ? (value as ChampType)
    : null;
}

function parseOptionalUrl(value: unknown): string | null {
  if (value == null || value === "") return null;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function parseSlug(value: unknown, name: string): string | null {
  if (typeof value === "string" && value.trim()) {
    const slug = slugify(value);
    return slug || null;
  }
  const fromName = slugify(name);
  return fromName || null;
}

export const getFundraisingChamps = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fundraising_champs = await selectFundraisingChamps();
    res.status(200).send({ fundraising_champs });
  } catch (err) {
    next(err);
  }
};

export const getFundraisingChamp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({ msg: "Invalid fundraising champ ID" });
    }
    const fundraising_champ = await selectFundraisingChampById(
      Number(req.params.id),
    );
    if (!fundraising_champ) {
      return res.status(404).send({ msg: "Fundraising champ not found" });
    }
    res.status(200).send({ fundraising_champ });
  } catch (err) {
    next(err);
  }
};

export const createFundraisingChamp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
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
    } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!name || typeof name !== "string") {
      return res.status(400).send({ msg: "Name is required" });
    }
    if (!summary || typeof summary !== "string") {
      return res.status(400).send({ msg: "Summary is required" });
    }

    const parsedType = parseChampType(champ_type) ?? "individual";
    const parsedSlug = parseSlug(slug, name);
    if (!parsedSlug) {
      return res.status(400).send({ msg: "Slug is required" });
    }

    const existingSlug = await selectFundraisingChampBySlug(parsedSlug);
    if (existingSlug) {
      return res.status(400).send({ msg: "Slug is already in use" });
    }

    const fundraising_champ = await insertFundraisingChamp(
      parsedSlug,
      name.trim(),
      parsedType,
      summary.trim(),
      typeof body === "string" ? body.trim() || null : null,
      parseOptionalUrl(image),
      parseOptionalUrl(logo),
      parseOptionalUrl(website_url),
      typeof sort_order === "number" ? sort_order : 0,
      typeof is_active === "boolean" ? is_active : true,
      req.user?.id ?? null,
    );

    await logAudit({
      userId: req.user?.id,
      action: "create fundraising champ",
      resourceType: "fundraising_champ",
      resourceId: fundraising_champ.id as number,
      method: req.method,
      route: req.originalUrl,
      statusCode: 201,
      metadata: { name: fundraising_champ.name, slug: fundraising_champ.slug },
      ip: req.ip as string,
    });

    res.status(201).send({ fundraising_champ });
  } catch (err) {
    next(err);
  }
};

export const updateFundraisingChamp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid fundraising champ ID" });
    }
    const existing = await selectFundraisingChampById(Number(id));
    if (!existing) {
      return res.status(404).send({ msg: "Fundraising champ not found" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }

    const {
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
    } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).send({ msg: "Name is required" });
    }
    if (!summary || typeof summary !== "string") {
      return res.status(400).send({ msg: "Summary is required" });
    }

    const parsedType =
      parseChampType(champ_type) ?? existing.champ_type ?? "individual";
    const parsedSlug = parseSlug(slug ?? existing.slug, name);
    if (!parsedSlug) {
      return res.status(400).send({ msg: "Slug is required" });
    }

    if (parsedSlug !== existing.slug) {
      const slugTaken = await selectFundraisingChampBySlug(parsedSlug);
      if (slugTaken && slugTaken.id !== existing.id) {
        return res.status(400).send({ msg: "Slug is already in use" });
      }
    }

    const fundraising_champ = await updateFundraisingChampById(
      Number(id),
      parsedSlug,
      name.trim(),
      parsedType,
      summary.trim(),
      typeof body === "string" ? body.trim() || null : null,
      parseOptionalUrl(image),
      parseOptionalUrl(logo),
      parseOptionalUrl(website_url),
      typeof sort_order === "number" ? sort_order : existing.sort_order ?? 0,
      typeof is_active === "boolean" ? is_active : existing.is_active ?? true,
      req.user?.id ?? existing.created_by ?? null,
    );

    if (!fundraising_champ) {
      return res.status(404).send({ msg: "Fundraising champ not found" });
    }

    await logAudit({
      userId: req.user?.id,
      action: "update fundraising champ",
      resourceType: "fundraising_champ",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { name: fundraising_champ.name, slug: fundraising_champ.slug },
      ip: req.ip as string,
    });

    res.status(200).send({ fundraising_champ });
  } catch (err) {
    next(err);
  }
};

export const patchFundraisingChampActive = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({ msg: "Invalid fundraising champ ID" });
    }
    const id = Number(req.params.id);
    const { is_active } = req.body as { is_active?: unknown };
    if (typeof is_active !== "boolean") {
      return res.status(400).send({ msg: "is_active must be a boolean" });
    }
    const existing = await selectFundraisingChampById(id);
    if (!existing) {
      return res.status(404).send({ msg: "Fundraising champ not found" });
    }
    const updated = await updateFundraisingChampIsActiveById(id, is_active);
    if (!updated) {
      return res.status(404).send({ msg: "Fundraising champ not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: is_active
        ? "activate fundraising champ"
        : "deactivate fundraising champ",
      resourceType: "fundraising_champ",
      resourceId: id,
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { name: updated.name, is_active },
      ip: req.ip as string,
    });
    res.status(200).send({ fundraising_champ: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteFundraisingChamp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid fundraising champ ID" });
    }
    const existing = await selectFundraisingChampById(Number(id));
    if (!existing) {
      return res.status(404).send({ msg: "Fundraising champ not found" });
    }
    const fundraising_champ = await deleteFundraisingChampById(Number(id));
    if (!fundraising_champ) {
      return res.status(404).send({ msg: "Fundraising champ not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "delete fundraising champ",
      resourceType: "fundraising_champ",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { name: fundraising_champ.name, slug: fundraising_champ.slug },
      ip: req.ip as string,
    });
    res.status(200).send({ fundraising_champ });
  } catch (err) {
    next(err);
  }
};
