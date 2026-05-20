import { Request, Response, NextFunction } from "express";
import {
  insertEvent,
  selectEventById,
  selectEvents,
  updateEventById,
  deleteEventById,
  updateEventIsActiveById,
} from "../models/events-model";
import { selectImageGalleryRowsForEventIds } from "../models/resources-model";
import { deleteResourcesByAttachable } from "../models/resources-model";
import { UTApi } from "uploadthing/server";
import type { Event } from "../types";
import { logAudit } from "../utils/logAudit";
import { parseExternalLinks, parseStudioPartners } from "../utils/parseEventMedia";
import { parseLocations } from "../utils/parseLocations";
import {
  parseOptionalEventType,
  parseOptionalMaxVolunteers,
} from "../utils/parseEventFields";
import { resolveEventSchedule } from "../utils/eventDates";

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = (await selectEvents()) as Event[];
    const ids = events.map((e) => e.id);
    const galleryByEventId =
      ids.length > 0 ? await selectImageGalleryRowsForEventIds(ids) : new Map();
    const eventsWithGallery = events.map((e) => ({
      ...e,
      gallery: galleryByEventId.get(e.id) ?? [],
    }));
    res.status(200).send({ events: eventsWithGallery });
  } catch (err) {
    next(err);
  }
};

export const patchEventActive = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({ msg: "Invalid event ID" });
    }
    const id = Number(req.params.id);
    const { is_active } = req.body as { is_active?: unknown };
    if (typeof is_active !== "boolean") {
      return res.status(400).send({ msg: "is_active must be a boolean" });
    }
    const existing = await selectEventById(id);
    if (!existing) {
      return res.status(404).send({ msg: "Event not found" });
    }
    const updated = await updateEventIsActiveById(id, is_active);
    if (!updated) {
      return res.status(404).send({ msg: "Event not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: is_active ? "activate event" : "deactivate event",
      resourceType: "event",
      resourceId: id,
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { title: updated.title, is_active },
      ip: req.ip as string,
    });
    res.status(200).send({ event: updated });
  } catch (err) {
    next(err);
  }
};

const logEventValidationError = (msg: string) => {
  console.warn("[createEvent] 400:", msg);
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
      schedule_mode,
      dates_description,
      schedule_slots,
      starts_at,
      ends_at,
      location,
      type,
      max_volunteers,
      is_active,
      external_links,
      studio_partners,
    } = req.body;
    if (Object.keys(req.body).length === 0) {
      logEventValidationError("Request body cannot be empty");
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!title) {
      logEventValidationError("Title is required");
      return res.status(400).send({ msg: "Title is required" });
    }
    if (!description) {
      logEventValidationError("Description is required");
      return res.status(400).send({ msg: "Description is required" });
    }
    const parsedLocations = parseLocations(location);
    if (!parsedLocations.ok) {
      logEventValidationError(parsedLocations.msg);
      return res.status(400).send({ msg: parsedLocations.msg });
    }
    const parsedType = parseOptionalEventType(type);
    const parsedMaxVolunteers = parseOptionalMaxVolunteers(max_volunteers);
    if (!parsedMaxVolunteers.ok) {
      logEventValidationError(parsedMaxVolunteers.msg);
      return res.status(400).send({ msg: parsedMaxVolunteers.msg });
    }
    const cover =
      typeof cover_image === "string" && cover_image.trim() === ""
        ? null
        : cover_image ?? null;

    const active =
      typeof is_active === "boolean" ? is_active : true;

    const parsedLinks = parseExternalLinks(external_links);
    if (!parsedLinks.ok) {
      logEventValidationError(parsedLinks.msg);
      return res.status(400).send({ msg: parsedLinks.msg });
    }
    const parsedStudios = parseStudioPartners(studio_partners);
    if (!parsedStudios.ok) {
      logEventValidationError(parsedStudios.msg);
      return res.status(400).send({ msg: parsedStudios.msg });
    }

    const schedule = resolveEventSchedule({
      schedule_mode,
      starts_at,
      ends_at,
      schedule_slots,
      dates_description,
    });
    if (!schedule.ok) {
      logEventValidationError(schedule.msg);
      return res.status(400).send({ msg: schedule.msg });
    }

    const event = (await insertEvent(
      title,
      description,
      cover,
      schedule.dates_description,
      schedule.schedule_slots,
      schedule.starts_at,
      schedule.ends_at,
      parsedLocations.value,
      parsedType,
      parsedMaxVolunteers.value,
      active,
      parsedLinks.value,
      parsedStudios.value,
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
    schedule_mode,
    dates_description,
    schedule_slots,
    starts_at,
    ends_at,
    location,
    type,
    max_volunteers,
    is_active,
    external_links,
    studio_partners,
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
    const parsedLocations = parseLocations(location);
    if (!parsedLocations.ok) {
      return res.status(400).send({ msg: parsedLocations.msg });
    }
    const parsedType = parseOptionalEventType(type);
    const parsedMaxVolunteers = parseOptionalMaxVolunteers(max_volunteers);
    if (!parsedMaxVolunteers.ok) {
      return res.status(400).send({ msg: parsedMaxVolunteers.msg });
    }
    const active =
      typeof is_active === "boolean" ? is_active : (event.is_active ?? true);

    const externalRaw = Object.prototype.hasOwnProperty.call(
      req.body,
      "external_links",
    )
      ? external_links
      : (event.external_links ?? []);
    const studioRaw = Object.prototype.hasOwnProperty.call(
      req.body,
      "studio_partners",
    )
      ? studio_partners
      : (event.studio_partners ?? []);

    const parsedLinks = parseExternalLinks(externalRaw);
    if (!parsedLinks.ok) {
      return res.status(400).send({ msg: parsedLinks.msg });
    }
    const parsedStudios = parseStudioPartners(studioRaw);
    if (!parsedStudios.ok) {
      return res.status(400).send({ msg: parsedStudios.msg });
    }

    const startRaw = Object.prototype.hasOwnProperty.call(req.body, "starts_at")
      ? starts_at
      : event.starts_at;
    const endRaw = Object.prototype.hasOwnProperty.call(req.body, "ends_at")
      ? ends_at
      : event.ends_at;
    const slotsRaw = Object.prototype.hasOwnProperty.call(
      req.body,
      "schedule_slots",
    )
      ? schedule_slots
      : (event.schedule_slots ?? []);
    const datesDescRaw = Object.prototype.hasOwnProperty.call(
      req.body,
      "dates_description",
    )
      ? dates_description
      : event.dates_description;

    const scheduleModeRaw = Object.prototype.hasOwnProperty.call(
      req.body,
      "schedule_mode",
    )
      ? schedule_mode
      : undefined;

    const schedule = resolveEventSchedule({
      schedule_mode: scheduleModeRaw,
      starts_at: startRaw,
      ends_at: endRaw,
      schedule_slots: slotsRaw,
      dates_description: datesDescRaw,
    });
    if (!schedule.ok) {
      return res.status(400).send({ msg: schedule.msg });
    }

    const updatedEvent = (await updateEventById(
      Number(id),
      title,
      description,
      typeof cover_image === "string" && cover_image.trim() === ""
        ? null
        : cover_image ?? null,
      schedule.dates_description,
      schedule.schedule_slots,
      schedule.starts_at,
      schedule.ends_at,
      parsedLocations.value,
      parsedType,
      parsedMaxVolunteers.value,
      active,
      parsedLinks.value,
      parsedStudios.value,
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
