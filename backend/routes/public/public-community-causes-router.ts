import { RequestHandler, Router } from "express";
import { getPublicCommunityCauses } from "../../controllers/public-community-causes-controller";

const publicCommunityCausesRouter = Router();

publicCommunityCausesRouter.get(
  "/",
  getPublicCommunityCauses as RequestHandler,
);

export default publicCommunityCausesRouter;
