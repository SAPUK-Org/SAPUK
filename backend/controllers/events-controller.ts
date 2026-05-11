import { Request, Response, NextFunction } from "express";
import {
  insertEvent,
  selectEventById,
  selectEvents,
  updateEventById,
  deleteEventById,
} from "../models/events-model";
import { deleteResourcesByAttachable } from "../models/resources-model";
import { UTApi } from "uploadthing/server";
import type { Event } from "../types";
import { logAudit } from "../utils/logAudit";

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await selectEvents();
    res.status(200).send({ events });
  } catch (err) {
    next(err);
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      description,
      cover_image,
      starts_at,
      ends_at,
      location,
      type,
      max_volunteers,
    } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!title) {
      return res.status(400).send({ msg: "Title is required" });
    }
    if (!description) {
      return res.status(400).send({ msg: "Description is required" });
    }
    if (!starts_at) {
      return res.status(400).send({ msg: "Starts at is required" });
    }
    if (!ends_at) {
      return res.status(400).send({ msg: "Ends at is required" });
    }
    if (!location) {
      return res.status(400).send({ msg: "Location is required" });
    }
    if (!type) {
      return res.status(400).send({ msg: "Type is required" });
    }
    if (!max_volunteers) {
      return res.status(400).send({ msg: "Max volunteers is required" });
    }
    const cover =
      typeof cover_image === "string" && cover_image.trim() === ""
        ? null
        : cover_image ?? null;

    const event = (await insertEvent(
      title,
      description,
      cover,
      starts_at,
      ends_at,
      location,
      type,
      max_volunteers,
      req.user?.id as number,
    )) as Event;
    await logAudit({
      userId: req.user?.id,
      action: "create event",
      resourceType: "event",
      resourceId: event.id,
      method: req.method,
      route: req.originalUrl,
      statusCode: 201,
      metadata: { title: event.title, type: event.type },
      ip: req.ip as string,
    });
    res.status(201).send({ event });
  } catch (err) {
    next(err);
  }
};
export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({ msg: "Invalid event ID" });
    }
    const event = await selectEventById(Number(req.params.id));
    if (!event) {
      return res.status(404).send({ msg: "Event not found" });
    }
    res.status(200).send({ event });
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const {
    title,
    description,
    cover_image,
    starts_at,
    ends_at,
    location,
    type,
    max_volunteers,
  } = req.body;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid event ID" });
    }
    const event = await selectEventById(Number(id));
    if (!event) {
      return res.status(404).send({ msg: "Event not found" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!title) {
      return res.status(400).send({ msg: "Title is required" });
    }
    if (!description) {
      return res.status(400).send({ msg: "Description is required" });
    }
    if (!starts_at) {
      return res.status(400).send({ msg: "Starts at is required" });
    }
    if (!ends_at) {
      return res.status(400).send({ msg: "Ends at is required" });
    }
    if (!location) {
      return res.status(400).send({ msg: "Location is required" });
    }
    if (!type) {
      return res.status(400).send({ msg: "Type is required" });
    }
    if (!max_volunteers) {
      return res.status(400).send({ msg: "Max volunteers is required" });
    }
    const updatedEvent = (await updateEventById(
      Number(id),
      title,
      description,
      typeof cover_image === "string" && cover_image.trim() === ""
        ? null
        : cover_image ?? null,
      starts_at,
      ends_at,
      location,
      type,
      max_volunteers,
      req.user?.id as number,
    )) as Event | undefined;
    if (!updatedEvent) {
      return res.status(404).send({ msg: "Event not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "update event",
      resourceType: "event",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { title: updatedEvent.title, type: updatedEvent.type },
      ip: req.ip as string,
    });
    res.status(200).send({ event: updatedEvent });
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      return res.status(400).send({ msg: "Invalid event ID" });
    }
    const event = await selectEventById(Number(id));
    if (!event) {
      return res.status(404).send({ msg: "Event not found" });
    }
    const eventResources = await deleteResourcesByAttachable(
      "event",
      Number(id),
    );
    const fileKeys = eventResources
      .map((r) => r.file_key)
      .filter((k): k is string => typeof k === "string" && k.length > 0);
    if (fileKeys.length > 0) {
      try {
        const utapi = new UTApi();
        await utapi.deleteFiles(fileKeys);
      } catch (utErr) {
        console.error(
          "UploadThing delete failed (event resource rows already removed):",
          utErr,
        );
      }
    }

    const deletedEvent = (await deleteEventById(Number(id))) as
      | Event
      | undefined;
    if (!deletedEvent) {
      return res.status(404).send({ msg: "Event not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "delete event",
      resourceType: "event",
      resourceId: Number(id),
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: {
        title: deletedEvent.title,
        type: deletedEvent.type,
      },
      ip: req.ip as string,
    });
    res.status(200).send({ event: deletedEvent });
  } catch (err) {
    next(err);
  }
};
