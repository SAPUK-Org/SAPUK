import { Request, Response, NextFunction } from "express";
import {
  deleteResource as deleteResourceModel,
  insertResource,
  patchResource,
  selectResources,
} from "../models/resources-model";
import { logAudit } from "../utils/logAudit";

export const getResources = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const resources = await selectResources();
    res.status(200).send({ resources });
  } catch (err) {
    next(err);
  }
};

export const createResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      url,
      mime_type,
      file_name,
      file_key,
      uploaded_by,
      attachable_type,
      attachable_id,
      metadata,
    } = req.body;

    if (!url) return res.status(400).send({ msg: "url is required" });
    if (!mime_type)
      return res.status(400).send({ msg: "mime_type is required" });
    if (!file_name)
      return res.status(400).send({ msg: "file_name is required" });

    const effectiveUploadedBy =
      req.user?.id ?? (uploaded_by != null ? Number(uploaded_by) : null);

    const resource = await insertResource(
      url,
      mime_type,
      file_name,
      file_key ?? null,
      effectiveUploadedBy,
      attachable_type ?? null,
      attachable_id != null ? Number(attachable_id) : null,
      metadata ?? null,
    );
    await logAudit({
      userId: req.user?.id ?? effectiveUploadedBy ?? undefined,
      action: "create resource",
      resourceType: "resource",
      resourceId: resource.id,
      method: req.method,
      route: req.originalUrl,
      statusCode: 201,
      metadata: { file_name: resource.file_name, mime_type: resource.mime_type },
      ip: req.ip as string,
    });
    res.status(201).send({ resource });
  } catch (err) {
    next(err);
  }
};

export const updateResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id)) {
      return res.status(400).send({ msg: "Invalid resource id" });
    }
    const {
      url,
      mime_type,
      file_name,
      file_key,
      uploaded_by,
      attachable_type,
      attachable_id,
      metadata,
      notes,
    } = req.body;

    if (!url) return res.status(400).send({ msg: "url is required" });
    if (!mime_type)
      return res.status(400).send({ msg: "mime_type is required" });
    if (!file_name)
      return res.status(400).send({ msg: "file_name is required" });

    const resource = await patchResource(
      id,
      url,
      mime_type,
      file_name,
      file_key ?? null,
      uploaded_by ?? null,
      attachable_type ?? null,
      attachable_id != null ? Number(attachable_id) : null,
      metadata ?? null,
      notes ?? null,
    );
    await logAudit({
      userId: req.user?.id,
      action: "update resource",
      resourceType: "resource",
      resourceId: id,
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { file_name: resource.file_name, mime_type: resource.mime_type },
      ip: req.ip as string,
    });
    res.status(200).send({ resource });
  } catch (err) {
    next(err);
  }
};

export const deleteResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id)) {
      return res.status(400).send({ msg: "Invalid resource id" });
    }
    const resource = await deleteResourceModel(id);
    if (!resource) {
      return res.status(404).send({ msg: "Resource not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "delete resource",
      resourceType: "resource",
      resourceId: id,
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { file_name: resource.file_name },
      ip: req.ip as string,
    });
    res.status(200).send({ resource });
  } catch (err) {
    next(err);
  }
};
