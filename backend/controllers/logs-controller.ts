import { Request, Response, NextFunction } from "express";
import { selectLogs } from "../models/logs-model";

export const getLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id, action, resource_type, resource_id, method, route } =
      req.query;

    let userId: number | undefined;
    if (typeof user_id === "string") {
      const parsedUserId = Number(user_id);
      if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
        return res
          .status(400)
          .send({ msg: "Invalid user_id query parameter" });
      }
      userId = parsedUserId;
    }

    let resourceId: number | undefined;
    if (typeof resource_id === "string") {
      const parsedResourceId = Number(resource_id);
      if (!Number.isInteger(parsedResourceId) || parsedResourceId <= 0) {
        return res
          .status(400)
          .send({ msg: "Invalid resource_id query parameter" });
      }
      resourceId = parsedResourceId;
    }

    const actionFilter =
      typeof action === "string" && action.trim().length > 0
        ? action.trim()
        : undefined;
    const resourceTypeFilter =
      typeof resource_type === "string" && resource_type.trim().length > 0
        ? resource_type.trim()
        : undefined;
    const methodFilter =
      typeof method === "string" && method.trim().length > 0
        ? method.trim()
        : undefined;
    const routeFilter =
      typeof route === "string" && route.trim().length > 0
        ? route.trim()
        : undefined;

    const logs = await selectLogs({
      userId,
      action: actionFilter,
      resourceType: resourceTypeFilter,
      resourceId,
      method: methodFilter,
      route: routeFilter,
    });

    if (!logs || logs.length === 0) {
      return res.status(404).send({ msg: "No logs found" });
    }

    res.status(200).send({ logs });
  } catch (err) {
    next(err);
  }
};
