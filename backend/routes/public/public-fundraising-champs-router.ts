import { RequestHandler, Router } from "express";
import {
  getPublicFundraisingChamps,
  getPublicFundraisingChampBySlug,
} from "../../controllers/public-fundraising-champs-controller";

const publicFundraisingChampsRouter = Router();

publicFundraisingChampsRouter.get(
  "/",
  getPublicFundraisingChamps as RequestHandler,
);
publicFundraisingChampsRouter.get(
  "/:slug",
  getPublicFundraisingChampBySlug as RequestHandler,
);

export default publicFundraisingChampsRouter;
