import app from "../../app";
import request from "supertest";
import db from "../../db/connection";
import seed from "../../db/seeds/seed";
import { testData } from "../../db/data/test-data";
import { Event } from "../../types";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

describe("Events API Endpoints", () => {
  describe("GET /api/dashboard/events", () => {
    test("Should return 200 with events when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { events },
      } = await request(app)
        .get("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      events.forEach((event: Event & { gallery?: unknown }) => {
        expect(event.title).toBeDefined();
        expect(event.description).toBeDefined();
        expect(event.starts_at === null || typeof event.starts_at === "string").toBe(
          true,
        );
        expect(event.ends_at === null || typeof event.ends_at === "string").toBe(
          true,
        );
        expect(Array.isArray(event.location)).toBe(true);
        expect(event.created_by).toBeDefined();
        expect(event.created_at).toBeDefined();
        expect(event.updated_at).toBeDefined();
        expect(Array.isArray(event.schedule_slots)).toBe(true);
        expect(Array.isArray(event.gallery)).toBe(true);
      });
    });
  });
  describe("POST /api/dashboard/events", () => {
    test("Should return 201 with event when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Event",
          description: "Test Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(201);
      expect(body.event.title).toBe("Test Event");
      expect(body.event.description).toBe("Test Description");
      expect(body.event.starts_at).toEqual(expect.any(String));
      expect(body.event.ends_at).toEqual(expect.any(String));
      expect(body.event.location).toEqual(["Test Location"]);
      expect(body.event.type).toBe("Test Type");
      expect(body.event.max_volunteers).toBe(10);
      expect(body.event.created_by).toBe(1);
    });
    test("Should return 201 when type and max_volunteers are omitted", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Open event",
          description: "No type or volunteer cap",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Community Hall"],
        })
        .expect(201);
      expect(body.event.type).toBeNull();
      expect(body.event.max_volunteers).toBeNull();
    });
    test("Should return 400 when max_volunteers is invalid", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Event",
          description: "Test Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          max_volunteers: 0,
        })
        .expect(400);
      expect(msg).toBe(
        "max_volunteers must be a positive integer when provided",
      );
    });
    test("Should return 201 with multiple locations", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Multi-venue Event",
          description: "Test Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Leggers Inn", "Dewsbury Moor Children's Centre"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(201);
      expect(body.event.location).toEqual([
        "Leggers Inn",
        "Dewsbury Moor Children's Centre",
      ]);
    });
    test("Should accept legacy single string location", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Legacy location",
          description: "Test Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: "Single Venue",
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(201);
      expect(body.event.location).toEqual(["Single Venue"]);
    });
    test("Should return 400 when location array is empty", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Event",
          description: "Test Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: [],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(400);
      expect(msg).toBe("At least one location is required");
    });
    test("Should return 400 when location is invalid type", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Event",
          description: "Test Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: 123,
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(400);
      expect(msg).toBe("location must be a string or array of strings");
    });
    test("Should return 400 when request body is empty", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(400);
      expect(msg).toBe("Request body cannot be empty");
    });
    test("Should return 400 when title is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          description: "Test Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(400);
      expect(msg).toBe("Title is required");
    });
    test("Should return 400 when description is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Event",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(400);
      expect(msg).toBe("Description is required");
    });
    test("Should return 400 when only starts_at is set without ends_at", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Event",
          description: "Test Description",
          starts_at: new Date(),
          ends_at: null,
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(400);
      expect(msg).toBe(
        "Provide both starts_at and ends_at, or omit both / use null for neither",
      );
    });
    test("Should return 400 when only ends_at is set without starts_at", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Event",
          description: "Test Description",
          starts_at: null,
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(400);
      expect(msg).toBe(
        "Provide both starts_at and ends_at, or omit both / use null for neither",
      );
    });
    test("Should return 201 when starts_at and ends_at are both omitted (prose-only schedule)", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Undated project",
          description: "Details TBC",
          dates_description: "June 2026 and July 2026 — exact days TBC",
          location: ["TBC"],
          type: "Project",
          max_volunteers: 5,
        })
        .expect(201);
      expect(body.event.starts_at).toBeNull();
      expect(body.event.ends_at).toBeNull();
      expect(body.event.schedule_slots).toEqual([]);
      expect(body.event.dates_description).toBe(
        "June 2026 and July 2026 — exact days TBC",
      );
    });
    test("Should return 201 with frontend-shaped recurring/TBC payload (schedule_mode prose)", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Dewsbury Safe Space",
          description: "Weekly safe space alternating venues.",
          cover_image: null,
          schedule_mode: "prose",
          dates_description: "Alternates Saturdays — check website for dates",
          location: ["Leggers Inn", "Dewsbury Moor Children's Centre"],
          type: null,
          max_volunteers: null,
          is_active: true,
          external_links: [],
          studio_partners: [],
        })
        .expect(201);
      expect(body.event.starts_at).toBeNull();
      expect(body.event.ends_at).toBeNull();
      expect(body.event.schedule_slots).toEqual([]);
      expect(body.event.dates_description).toBe(
        "Alternates Saturdays — check website for dates",
      );
    });
    test("Should return 201 when schedule_slots are provided without top-level timestamps", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const slotStart = new Date("2025-08-01T10:00:00Z");
      const slotEnd = new Date("2025-08-01T14:00:00Z");
      const { body } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Multi-day event",
          description: "Two sessions",
          schedule_slots: [
            { starts_at: slotStart, ends_at: slotEnd },
            {
              starts_at: new Date("2025-08-02T11:00:00Z"),
              ends_at: new Date("2025-08-02T15:00:00Z"),
            },
          ],
          location: ["Community Hub"],
          type: "Workshop",
          max_volunteers: 8,
        })
        .expect(201);
      expect(body.event.starts_at).toBeNull();
      expect(body.event.ends_at).toBeNull();
      expect(body.event.dates_description).toBeNull();
      expect(body.event.schedule_slots).toHaveLength(2);
      expect(body.event.schedule_slots[0].starts_at).toEqual(
        slotStart.toISOString(),
      );
    });
    test("Should return 400 when mixing starts_at with schedule_slots", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Mixed schedule",
          description: "Invalid",
          starts_at: new Date(),
          ends_at: new Date(),
          schedule_slots: [
            {
              starts_at: new Date("2025-08-01T10:00:00Z"),
              ends_at: new Date("2025-08-01T14:00:00Z"),
            },
          ],
          location: ["Hub"],
          type: "Workshop",
          max_volunteers: 5,
        })
        .expect(400);
      expect(msg).toBe(
        "Use only one schedule mode: single range (starts_at/ends_at), schedule_slots, or dates_description",
      );
    });
    test("Should return 400 when mixing dates_description with schedule_slots", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Mixed prose and slots",
          description: "Invalid",
          dates_description: "Every month",
          schedule_slots: [
            {
              starts_at: new Date("2025-08-01T10:00:00Z"),
              ends_at: new Date("2025-08-01T14:00:00Z"),
            },
          ],
          location: ["Hub"],
          type: "Workshop",
          max_volunteers: 5,
        })
        .expect(400);
      expect(msg).toBe(
        "Use only one schedule mode: single range (starts_at/ends_at), schedule_slots, or dates_description",
      );
    });
    test("Should return 400 when no schedule mode is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "No schedule",
          description: "Missing dates",
          location: ["Hub"],
          type: "Workshop",
          max_volunteers: 5,
        })
        .expect(400);
      expect(msg).toBe(
        "Provide a schedule: starts_at and ends_at, schedule_slots, or dates_description",
      );
    });
    test("Should return 400 when schedule slot ends before it starts", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Bad slot",
          description: "Invalid slot range",
          schedule_slots: [
            {
              starts_at: new Date("2025-08-01T14:00:00Z"),
              ends_at: new Date("2025-08-01T10:00:00Z"),
            },
          ],
          location: ["Hub"],
          type: "Workshop",
          max_volunteers: 5,
        })
        .expect(400);
      expect(msg).toBe("schedule_slots[0].ends_at must be on or after starts_at");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).post("/api/dashboard/events").expect(401);
      expect(msg).toBe(
        "Missing Authorization header. Please sign in and try again.",
      );
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", "Bearer invalid-token")
        .send({
          title: "Test Event",
          description: "Test Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(401);
      expect(msg).toBe("Invalid access token. Please sign in again.");
    });
    test("Should return 403 when user is not an admin or editor", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "charlie@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Event",
          description: "Test Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(403);
      expect(msg).toBe(
        "Access denied. You must be an admin or editor to access this resource.",
      );
    });
  });
  describe("GET /api/dashboard/events/:id", () => {
    test("Should return 200 with event when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { event },
      } = await request(app)
        .get("/api/dashboard/events/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(event.title).toBeDefined();
      expect(event.description).toBeDefined();
      expect(event.starts_at === null || typeof event.starts_at === "string").toBe(
        true,
      );
      expect(event.ends_at === null || typeof event.ends_at === "string").toBe(
        true,
      );
      expect(Array.isArray(event.location)).toBe(true);
      expect(event.created_by).toBeDefined();
      expect(event.created_at).toBeDefined();
      expect(event.updated_at).toBeDefined();
      expect(Array.isArray(event.schedule_slots)).toBe(true);
      expect(event.id).toBe(1);
    });
    test("Should return 400 when event ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/events/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid event ID");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/dashboard/events/1").expect(401);
      expect(msg).toBe(
        "Missing Authorization header. Please sign in and try again.",
      );
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/events/1")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid access token. Please sign in again.");
    });
    test("Should return 403 when user is not an admin or editor", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "charlie@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/events/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe(
        "Access denied. You must be an admin or editor to access this resource.",
      );
    });
    test("Should return 404 when event is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/events/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Event not found");
    });
  });
  describe("PATCH /api/dashboard/events/:id/active", () => {
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/events/1/active")
        .send({ is_active: false })
        .expect(401);
      expect(msg).toBe(
        "Missing Authorization header. Please sign in and try again.",
      );
    });
    test("Should return 400 when event ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/events/notanumber/active")
        .set("Authorization", `Bearer ${token}`)
        .send({ is_active: false })
        .expect(400);
      expect(msg).toBe("Invalid event ID");
    });
    test("Should return 400 when is_active is not a boolean", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/events/1/active")
        .set("Authorization", `Bearer ${token}`)
        .send({ is_active: "yes" })
        .expect(400);
      expect(msg).toBe("is_active must be a boolean");
    });
    test("Should return 404 when event is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/events/999/active")
        .set("Authorization", `Bearer ${token}`)
        .send({ is_active: false })
        .expect(404);
      expect(msg).toBe("Event not found");
    });
    test("Should return 200 and update is_active when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { event: hidden },
      } = await request(app)
        .patch("/api/dashboard/events/1/active")
        .set("Authorization", `Bearer ${token}`)
        .send({ is_active: false })
        .expect(200);
      expect(hidden.is_active).toBe(false);
      const {
        body: { event: shown },
      } = await request(app)
        .patch("/api/dashboard/events/1/active")
        .set("Authorization", `Bearer ${token}`)
        .send({ is_active: true })
        .expect(200);
      expect(shown.is_active).toBe(true);
    });
  });
  describe("PUT /api/dashboard/events/:id", () => {
    test("Should return 200 with updated event when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { event },
      } = await request(app)
        .put("/api/dashboard/events/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Event Title",
          description: "Updated Description",
          cover_image: "https://example.com/cover-image.jpg",
          dates_description: null,
          schedule_slots: [],
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(200);
      expect(event.title).toBe("Updated Event Title");
      expect(event.description).toBe("Updated Description");
      expect(event.cover_image).toBe("https://example.com/cover-image.jpg");
      expect(event.starts_at).toEqual(expect.any(String));
      expect(event.ends_at).toEqual(expect.any(String));
      expect(event.location).toEqual(["Test Location"]);
      expect(event.type).toBe("Test Type");
      expect(event.max_volunteers).toBe(10);
      expect(event.created_by).toBe(1);
    });
    test("Should return 400 when event ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/events/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Event Title",
          description: "Updated Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(400);
      expect(msg).toBe("Invalid event ID");
    });
    test("Should return 400 when request body is empty", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/events/1")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(400);
      expect(msg).toBe("Request body cannot be empty");
    });
    test("Should return 400 when title is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/events/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          description: "Updated Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(400);
      expect(msg).toBe("Title is required");
    });
    test("Should return 400 when description is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/events/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Event Title",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(400);
      expect(msg).toBe("Description is required");
    });
    test("Should return 400 when only starts_at is set without ends_at on update", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/events/2")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Event Title",
          description: "Updated Description",
          starts_at: new Date(),
          ends_at: null,
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
          is_active: true,
        })
        .expect(400);
      expect(msg).toBe(
        "Provide both starts_at and ends_at, or omit both / use null for neither",
      );
    });
    test("Should return 400 when only ends_at is set without starts_at on update", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/events/2")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Event Title",
          description: "Updated Description",
          starts_at: null,
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
          is_active: true,
        })
        .expect(400);
      expect(msg).toBe(
        "Provide both starts_at and ends_at, or omit both / use null for neither",
      );
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).put("/api/dashboard/events/1").expect(401);
      expect(msg).toBe(
        "Missing Authorization header. Please sign in and try again.",
      );
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/events/1")
        .set("Authorization", "Bearer invalid-token")
        .send({
          title: "Updated Event Title",
          description: "Updated Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(401);
      expect(msg).toBe("Invalid access token. Please sign in again.");
    });
    test("Should return 403 when user is not an admin or editor", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "charlie@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/events/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Event Title",
          description: "Updated Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(403);
      expect(msg).toBe(
        "Access denied. You must be an admin or editor to access this resource.",
      );
    });
    test("Should return 404 when event is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/events/999")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Event Title",
          description: "Updated Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: ["Test Location"],
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(404);
      expect(msg).toBe("Event not found");
    });
  });
  describe("DELETE /api/dashboard/events/:id", () => {
    test("Should return 200 with deleted event when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      await request(app)
        .delete("/api/dashboard/events/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
    test("Should return 400 when event ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/events/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid event ID");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).delete("/api/dashboard/events/1").expect(401);
      expect(msg).toBe(
        "Missing Authorization header. Please sign in and try again.",
      );
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/events/1")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid access token. Please sign in again.");
    });
    test("Should return 403 when user is not an admin or editor", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "charlie@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/events/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe(
        "Access denied. You must be an admin or editor to access this resource.",
      );
    });
    test("Should return 404 when event is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/events/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Event not found");
    });
  });
});
