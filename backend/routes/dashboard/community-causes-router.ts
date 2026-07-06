import { RequestHandler, Router } from "express";
import {
  getCommunityCauses,
  getCommunityCause,
  createCommunityCause,
  updateCommunityCause,
  deleteCommunityCause,
  patchCommunityCauseActive,
} from "../../controllers/community-causes-controller";

const communityCausesRouter = Router();

communityCausesRouter.get("/", getCommunityCauses as RequestHandler);
communityCausesRouter.post("/", createCommunityCause as RequestHandler);
communityCausesRouter.patch(
  "/:id/active",
  patchCommunityCauseActive as RequestHandler,
);
communityCausesRouter.get("/:id", getCommunityCause as RequestHandler);
communityCausesRouter.put("/:id", updateCommunityCause as RequestHandler);
communityCausesRouter.delete("/:id", deleteCommunityCause as RequestHandler);

export default communityCausesRouter;
