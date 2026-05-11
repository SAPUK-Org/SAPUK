import { RequestHandler, Router } from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  patchEventActive,
} from "../../controllers/events-controller";
const eventsRouter = Router();

eventsRouter.get("/", getEvents as RequestHandler);
eventsRouter.post("/", createEvent as RequestHandler);
eventsRouter.patch("/:id/active", patchEventActive as RequestHandler);
eventsRouter.get("/:id", getEvent as RequestHandler);
eventsRouter.put("/:id", updateEvent as RequestHandler);
eventsRouter.delete("/:id", deleteEvent as RequestHandler);

export default eventsRouter;
