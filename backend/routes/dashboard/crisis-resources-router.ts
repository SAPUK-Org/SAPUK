import { RequestHandler, Router } from "express";
import {
  getCrisisResources,
  getCrisisResource,
  createCrisisResource,
  updateCrisisResource,
  deleteCrisisResource,
} from "../../controllers/crisis-resources-controller";

const crisisResourcesRouter = Router();

crisisResourcesRouter.get("/", getCrisisResources as RequestHandler);
crisisResourcesRouter.post("/", createCrisisResource as RequestHandler);
crisisResourcesRouter.get("/:id", getCrisisResource as RequestHandler);
crisisResourcesRouter.put("/:id", updateCrisisResource as RequestHandler);
crisisResourcesRouter.delete("/:id", deleteCrisisResource as RequestHandler);

export default crisisResourcesRouter;
