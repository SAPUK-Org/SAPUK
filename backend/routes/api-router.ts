import { Router } from "express";
const apiRouter = Router();
import endpoints from "../endpoints.json";
import authRouter from "./auth-router";
import usersRouter from "./users-router";
import dashboardRouter from "./dashboard/dashboard-router";
import { uploadRouter } from "../utils/uploadthing";
import { createRouteHandler } from "uploadthing/express";
import { requireAuth } from "../middleware/auth";
import { createResource } from "../controllers/resources-controller";
import { requireValidUploadSecret } from "../middleware/auth";
import publicEventsRouter from "./public/public-events-router";

apiRouter.get("/", (req, res) => {
  res.status(200).send({ endpoints: endpoints });
});

apiRouter.use("/public/events", publicEventsRouter);

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.post(
  "/upload-callback/resources",
  requireValidUploadSecret,
  createResource,
);
apiRouter.use("/dashboard", requireAuth, dashboardRouter);
apiRouter.use(
  "/uploadthing",
  createRouteHandler({
    router: uploadRouter,
  }),
);

export default apiRouter;
