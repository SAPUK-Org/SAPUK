import { Router, RequestHandler } from "express";
import { login, logout, refreshToken } from "../controllers/auth-controller";

const authRouter = Router();

authRouter.post("/login", login as RequestHandler);
authRouter.post("/logout", logout as RequestHandler);
authRouter.post("/refresh", refreshToken as RequestHandler);

export default authRouter;
