import { Request, Response, NextFunction } from "express";
import { selectPublicCommunityCauses } from "../models/community-causes-model";

export const getPublicCommunityCauses = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const community_causes = await selectPublicCommunityCauses();
    res.status(200).send({ community_causes });
  } catch (err) {
    next(err);
  }
};
