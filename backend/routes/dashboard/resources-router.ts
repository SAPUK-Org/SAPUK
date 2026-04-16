import { RequestHandler, Router } from "express";
import {
  createResource,
  deleteResource,
  getResources,
  updateResource,
} from "../../controllers/resources-controller";
import { requireAuthOrUploadCallback } from "../../middleware/auth";
import { requireAdminOrEditor } from "../../middleware/auth";

const resourcesRouter = Router();

const requireAdminOrEditorOrUploadCallback: RequestHandler = (
  req,
  res,
  next,
) => {
  if ((req as { isUploadCallback?: boolean }).isUploadCallback) return next();
  return requireAdminOrEditor(req, res, next);
};

resourcesRouter.get("/", getResources as RequestHandler);
resourcesRouter.post(
  "/",
  requireAuthOrUploadCallback as RequestHandler,
  requireAdminOrEditorOrUploadCallback,
  createResource as RequestHandler,
);
resourcesRouter.patch(
  "/:id",
  requireAdminOrEditorOrUploadCallback,
  updateResource as RequestHandler,
);
resourcesRouter.delete(
  "/:id",
  requireAdminOrEditorOrUploadCallback,
  deleteResource as RequestHandler,
);

export default resourcesRouter;
