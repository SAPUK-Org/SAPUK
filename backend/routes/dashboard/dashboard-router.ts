import { Router } from "express";
import { requireAdmin, requireAdminOrEditor } from "../../middleware/auth";
import staffRouter from "./staff-router";
import eventsRouter from "./events-router";
import crisisResourcesRouter from "./crisis-resources-router";
import usefulLinksRouter from "./useful-links-router";
import resourcesRouter from "./resources-router";
import notesRouter from "./notes-router";
import logsRouter from "./logs-router";

const dashboardRouter = Router();

dashboardRouter.use("/staff", requireAdmin, staffRouter);
dashboardRouter.use("/events", requireAdminOrEditor, eventsRouter);
dashboardRouter.use("/crisis-resources", crisisResourcesRouter);
dashboardRouter.use("/useful-links", usefulLinksRouter);
dashboardRouter.use("/resources", resourcesRouter);
dashboardRouter.use("/notes", notesRouter);
dashboardRouter.use("/logs", requireAdmin, logsRouter);

export default dashboardRouter;
