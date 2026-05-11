import { Request, Response, NextFunction } from "express";
import { selectEventById, selectPublicEvents } from "../models/events-model";
import {
  selectImageGalleryRowsForEventIds,
  selectResources,
} from "../models/resources-model";

export const getPublicEvents = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await selectPublicEvents();
    const ids = events.map((e) => e.id);
    const galleryByEventId = await selectImageGalleryRowsForEventIds(ids);
    const eventsWithGallery = events.map((e) => ({
      ...e,
      gallery: galleryByEventId.get(e.id) ?? [],
    }));
    res.status(200).send({ events: eventsWithGallery });
  } catch (err) {
    next(err);
  }
};

export const getPublicEventById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({ msg: "Invalid event ID" });
    }
    const id = Number(req.params.id);
    const event = await selectEventById(id);
    if (!event) {
      return res.status(404).send({ msg: "Event not found" });
    }
    if (event.is_active === false) {
      return res.status(404).send({ msg: "Event not found" });
    }
    const resources = await selectResources({
      attachable_type: "event",
      attachable_id: id,
    });
    const gallery = resources
      .filter((r) => r.mime_type.startsWith("image/"))
      .map((r) => ({ url: r.url, file_name: r.file_name }));
    res.status(200).send({ event, gallery });
  } catch (err) {
    next(err);
  }
};
