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
        expect(event.location).toBeDefined();
        expect(event.type).toBeDefined();
        expect(event.max_volunteers).toBeDefined();
        expect(event.created_by).toBeDefined();
        expect(event.created_at).toBeDefined();
        expect(event.updated_at).toBeDefined();
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
          location: "Test Location",
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(201);
      expect(body.event.title).toBe("Test Event");
      expect(body.event.description).toBe("Test Description");
      expect(body.event.starts_at).toEqual(expect.any(String));
      expect(body.event.ends_at).toEqual(expect.any(String));
      expect(body.event.location).toBe("Test Location");
      expect(body.event.type).toBe("Test Type");
      expect(body.event.max_volunteers).toBe(10);
      expect(body.event.created_by).toBe(1);
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
          location: "Test Location",
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
          location: "Test Location",
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
          location: "Test Location",
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
          location: "Test Location",
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
          location: "TBC",
          type: "Project",
          max_volunteers: 5,
        })
        .expect(201);
      expect(body.event.starts_at).toBeNull();
      expect(body.event.ends_at).toBeNull();
      expect(body.event.dates_description).toBe(
        "June 2026 and July 2026 — exact days TBC",
      );
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
          location: "Test Location",
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
          location: "Test Location",
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
      expect(event.location).toBeDefined();
      expect(event.type).toBeDefined();
      expect(event.max_volunteers).toBeDefined();
      expect(event.created_by).toBeDefined();
      expect(event.created_at).toBeDefined();
      expect(event.updated_at).toBeDefined();
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
          starts_at: new Date(),
          ends_at: new Date(),
          location: "Test Location",
          type: "Test Type",
          max_volunteers: 10,
        })
        .expect(200);
      expect(event.title).toBe("Updated Event Title");
      expect(event.description).toBe("Updated Description");
      expect(event.cover_image).toBe("https://example.com/cover-image.jpg");
      expect(event.starts_at).toEqual(expect.any(String));
      expect(event.ends_at).toEqual(expect.any(String));
      expect(event.location).toBe("Test Location");
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
          location: "Test Location",
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
          location: "Test Location",
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
          location: "Test Location",
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
          location: "Test Location",
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
          location: "Test Location",
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
          location: "Test Location",
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
          location: "Test Location",
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
          location: "Test Location",
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
