import { RequestHandler, Router } from "express";
import {
  getPublicEventById,
  getPublicEvents,
} from "../../controllers/public-events-controller";

const publicEventsRouter = Router();

publicEventsRouter.get("/", getPublicEvents as RequestHandler);
publicEventsRouter.get("/:id", getPublicEventById as RequestHandler);

export default publicEventsRouter;
