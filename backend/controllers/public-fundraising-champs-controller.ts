import { Request, Response, NextFunction } from "express";
import {
  selectPublicFundraisingChamps,
  selectPublicFundraisingChampBySlug,
} from "../models/fundraising-champs-model";

export const getPublicFundraisingChamps = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fundraising_champs = await selectPublicFundraisingChamps();
    res.status(200).send({ fundraising_champs });
  } catch (err) {
    next(err);
  }
};

export const getPublicFundraisingChampBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rawSlug = req.params.slug;
    const slug = (Array.isArray(rawSlug) ? rawSlug[0] : rawSlug)?.trim();
    if (!slug) {
      return res.status(400).send({ msg: "Invalid slug" });
    }
    const fundraising_champ = await selectPublicFundraisingChampBySlug(slug);
    if (!fundraising_champ) {
      return res.status(404).send({ msg: "Fundraising champ not found" });
    }
    res.status(200).send({ fundraising_champ });
  } catch (err) {
    next(err);
  }
};
