import { Router } from "express";
import { getLogs } from "../../controllers/logs-controller";

const logsRouter = Router();

logsRouter.get("/", getLogs);

export default logsRouter;
