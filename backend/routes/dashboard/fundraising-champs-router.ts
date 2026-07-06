import { RequestHandler, Router } from "express";
import {
  getFundraisingChamps,
  getFundraisingChamp,
  createFundraisingChamp,
  updateFundraisingChamp,
  deleteFundraisingChamp,
  patchFundraisingChampActive,
} from "../../controllers/fundraising-champs-controller";

const fundraisingChampsRouter = Router();

fundraisingChampsRouter.get("/", getFundraisingChamps as RequestHandler);
fundraisingChampsRouter.post("/", createFundraisingChamp as RequestHandler);
fundraisingChampsRouter.patch(
  "/:id/active",
  patchFundraisingChampActive as RequestHandler,
);
fundraisingChampsRouter.get("/:id", getFundraisingChamp as RequestHandler);
fundraisingChampsRouter.put("/:id", updateFundraisingChamp as RequestHandler);
fundraisingChampsRouter.delete(
  "/:id",
  deleteFundraisingChamp as RequestHandler,
);

export default fundraisingChampsRouter;
