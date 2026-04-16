import { RequestHandler, Router } from "express";
import {
  getUsefulLinks,
  getUsefulLink,
  createUsefulLink,
  updateUsefulLink,
  deleteUsefulLink,
} from "../../controllers/useful-links-controller";

const usefulLinksRouter = Router();

usefulLinksRouter.get("/", getUsefulLinks as RequestHandler);
usefulLinksRouter.post("/", createUsefulLink as RequestHandler);
usefulLinksRouter.get("/:id", getUsefulLink as RequestHandler);
usefulLinksRouter.put("/:id", updateUsefulLink as RequestHandler);
usefulLinksRouter.delete("/:id", deleteUsefulLink as RequestHandler);

export default usefulLinksRouter;
