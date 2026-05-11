import app from "../../app";
import request from "supertest";
import db from "../../db/connection";
import seed from "../../db/seeds/seed";
import { testData } from "../../db/data/test-data";
import type { Event } from "../../types";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

describe("Public events API", () => {
  describe("GET /api/public/events", () => {
    test("Should return 200 with events without Authorization", async () => {
      const {
        body: { events },
      } = await request(app).get("/api/public/events").expect(200);
      expect(Array.isArray(events)).toBe(true);
      events.forEach((event: Event & { gallery?: unknown }) => {
        expect(event.title).toBeDefined();
        expect(event.description).toBeDefined();
        expect(event.location).toBeDefined();
        expect(event.type).toBeDefined();
        expect(event.is_active).not.toBe(false);
        expect(Array.isArray(event.gallery)).toBe(true);
        expect(Array.isArray(event.external_links)).toBe(true);
        expect(Array.isArray(event.studio_partners)).toBe(true);
      });
      const ids = events.map((e: Event) => e.id);
      expect(ids).not.toContain(5);
    });
  });

  describe("GET /api/public/events/:id", () => {
    test("Should return 200 with event and gallery without Authorization", async () => {
      const { body } = await request(app).get("/api/public/events/1").expect(200);
      expect(body.event).toBeDefined();
      expect(body.event.id).toBe(1);
      expect(Array.isArray(body.gallery)).toBe(true);
    });

    test("Should return 400 when id is not a number", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/public/events/notanumber").expect(400);
      expect(msg).toBe("Invalid event ID");
    });

    test("Should return 404 when event is not found", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/public/events/99999").expect(404);
      expect(msg).toBe("Event not found");
    });

    test("Should return 404 for inactive event", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/public/events/5").expect(404);
      expect(msg).toBe("Event not found");
    });
  });
});
