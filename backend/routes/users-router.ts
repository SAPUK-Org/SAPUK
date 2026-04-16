import { Router, RequestHandler } from "express";
const usersRouter = Router();
import { getCurrentUser } from "../controllers/users-controller";
import { requireAuth } from "../middleware/auth";

usersRouter.get("/me", requireAuth as RequestHandler, getCurrentUser as RequestHandler);

export default usersRouter;
