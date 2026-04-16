import app from "../../app";
import request from "supertest";
import db from "../../db/connection";
import seed from "../../db/seeds/seed";
import { testData } from "../../db/data/test-data";
import { UsefulLink } from "../../types";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

describe("Useful Links API Endpoints", () => {
  describe("GET /api/dashboard/useful-links", () => {
    test("Should return 200 with useful_links when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { useful_links },
      } = await request(app)
        .get("/api/dashboard/useful-links")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      useful_links.forEach((link: UsefulLink) => {
        expect(link.title).toBeDefined();
        expect(link.url).toBeDefined();
        expect(link.description).toBeDefined();
        expect(link.sort_order).toBeDefined();
        expect(link.is_active).toBeDefined();
        expect(link.metadata).toBeDefined();
      });
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/dashboard/useful-links").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/useful-links")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
  });
  describe("POST /api/dashboard/useful-links", () => {
    test("Should return 201 with useful_link when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/useful-links")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "New Link",
          url: "https://example.com/new",
          description: "A new useful link",
        })
        .expect(201);
      expect(body.useful_link.title).toBe("New Link");
      expect(body.useful_link.url).toBe("https://example.com/new");
      expect(body.useful_link.description).toBe("A new useful link");
      expect(body.useful_link.is_active).toBe(true);
    });
    test("Should return 201 with useful_link including metadata", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/useful-links")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Link with metadata",
          url: "https://example.com/meta",
          metadata: { category: "training", icon: "book" },
        })
        .expect(201);
      expect(body.useful_link.metadata).toEqual({
        category: "training",
        icon: "book",
      });
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
        .post("/api/dashboard/useful-links")
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
        .post("/api/dashboard/useful-links")
        .set("Authorization", `Bearer ${token}`)
        .send({ url: "https://example.com" })
        .expect(400);
      expect(msg).toBe("Title is required");
    });
    test("Should return 400 when url is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/useful-links")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "My Link" })
        .expect(400);
      expect(msg).toBe("URL is required");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/useful-links")
        .send({ title: "My Link", url: "https://example.com" })
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
  });
  describe("GET /api/dashboard/useful-links/:id", () => {
    test("Should return 200 with useful_link when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { useful_link },
      } = await request(app)
        .get("/api/dashboard/useful-links/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(useful_link.title).toBe("SAPUK Volunteer Handbook");
      expect(useful_link.url).toBe("https://example.com/handbook");
      expect(useful_link.metadata).toEqual({ category: "internal" });
    });
    test("Should return 400 when useful link ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/useful-links/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid useful link ID");
    });
    test("Should return 404 when useful link is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/useful-links/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Useful link not found");
    });
  });
  describe("PUT /api/dashboard/useful-links/:id", () => {
    test("Should return 200 with updated useful_link when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { useful_link },
      } = await request(app)
        .put("/api/dashboard/useful-links/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Handbook",
          url: "https://example.com/handbook-v2",
          description: "Updated guide",
        })
        .expect(200);
      expect(useful_link.title).toBe("Updated Handbook");
      expect(useful_link.url).toBe("https://example.com/handbook-v2");
      expect(useful_link.description).toBe("Updated guide");
    });
    test("Should return 400 when useful link ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/useful-links/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Link", url: "https://example.com" })
        .expect(400);
      expect(msg).toBe("Invalid useful link ID");
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
        .put("/api/dashboard/useful-links/1")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(400);
      expect(msg).toBe("Request body cannot be empty");
    });
    test("Should return 404 when useful link is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/useful-links/999")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Link", url: "https://example.com" })
        .expect(404);
      expect(msg).toBe("Useful link not found");
    });
  });
  describe("DELETE /api/dashboard/useful-links/:id", () => {
    test("Should return 200 with deleted useful_link when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      await request(app)
        .delete("/api/dashboard/useful-links/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
    test("Should return 400 when useful link ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/useful-links/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid useful link ID");
    });
    test("Should return 404 when useful link is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/useful-links/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Useful link not found");
    });
  });
});
