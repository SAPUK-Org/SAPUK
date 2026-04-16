import app from "../../app";
import request from "supertest";
import db from "../../db/connection";
import seed from "../../db/seeds/seed";
import { testData } from "../../db/data/test-data";
import { CrisisResource } from "../../types";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

describe("Crisis Resources API Endpoints", () => {
  describe("GET /api/dashboard/crisis-resources", () => {
    test("Should return 200 with crisis_resources when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { crisis_resources },
      } = await request(app)
        .get("/api/dashboard/crisis-resources")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      crisis_resources.forEach((cr: CrisisResource) => {
        expect(cr.name).toBeDefined();
        expect(cr.phone_or_url).toBeDefined();
        expect(cr.description).toBeDefined();
        expect(cr.hours).toBeDefined();
        expect(cr.type).toBeDefined();
        expect(cr.is_active).toBeDefined();
      });
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/dashboard/crisis-resources").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/crisis-resources")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
  });
  describe("POST /api/dashboard/crisis-resources", () => {
    test("Should return 201 with crisis_resource when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/crisis-resources")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test Helpline",
          phone_or_url: "0800 123 456",
          type: "crisis",
          hours: "24/7",
        })
        .expect(201);
      expect(body.crisis_resource.name).toBe("Test Helpline");
      expect(body.crisis_resource.phone_or_url).toBe("0800 123 456");
      expect(body.crisis_resource.type).toBe("crisis");
      expect(body.crisis_resource.hours).toBe("24/7");
      expect(body.crisis_resource.is_active).toBe(true);
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
        .post("/api/dashboard/crisis-resources")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(400);
      expect(msg).toBe("Request body cannot be empty");
    });
    test("Should return 400 when name is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/crisis-resources")
        .set("Authorization", `Bearer ${token}`)
        .send({
          phone_or_url: "0800 123 456",
          type: "crisis",
        })
        .expect(400);
      expect(msg).toBe("Name is required");
    });
    test("Should return 400 when phone_or_url is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/crisis-resources")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test Helpline",
          type: "crisis",
        })
        .expect(400);
      expect(msg).toBe("Phone or URL is required");
    });
    test("Should return 400 when type is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/crisis-resources")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test Helpline",
          phone_or_url: "0800 123 456",
        })
        .expect(400);
      expect(msg).toBe("Type is required");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/crisis-resources")
        .send({
          name: "Test Helpline",
          phone_or_url: "0800 123 456",
          type: "crisis",
        })
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/crisis-resources")
        .set("Authorization", "Bearer invalid-token")
        .send({
          name: "Test Helpline",
          phone_or_url: "0800 123 456",
          type: "crisis",
        })
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
  });
  describe("GET /api/dashboard/crisis-resources/:id", () => {
    test("Should return 200 with crisis_resource when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { crisis_resource },
      } = await request(app)
        .get("/api/dashboard/crisis-resources/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(crisis_resource.name).toBeDefined();
      expect(crisis_resource.phone_or_url).toBeDefined();
      expect(crisis_resource.type).toBeDefined();
      expect(crisis_resource.is_active).toBeDefined();
      expect(crisis_resource.created_at).toBeDefined();
      expect(crisis_resource.updated_at).toBeDefined();
      expect(crisis_resource.id).toBe(1);
    });
    test("Should return 400 when crisis resource ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/crisis-resources/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid crisis resource ID");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/crisis-resources/1")
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/crisis-resources/1")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 404 when crisis resource is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/crisis-resources/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Crisis resource not found");
    });
  });
  describe("PUT /api/dashboard/crisis-resources/:id", () => {
    test("Should return 200 with updated crisis_resource when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { crisis_resource },
      } = await request(app)
        .put("/api/dashboard/crisis-resources/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Helpline Name",
          phone_or_url: "0800 999 888",
          type: "support",
          hours: "9am-5pm",
        })
        .expect(200);
      expect(crisis_resource.name).toBe("Updated Helpline Name");
      expect(crisis_resource.phone_or_url).toBe("0800 999 888");
      expect(crisis_resource.type).toBe("support");
      expect(crisis_resource.hours).toBe("9am-5pm");
    });
    test("Should return 400 when crisis resource ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/crisis-resources/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Helpline",
          phone_or_url: "0800 123 456",
          type: "crisis",
        })
        .expect(400);
      expect(msg).toBe("Invalid crisis resource ID");
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
        .put("/api/dashboard/crisis-resources/1")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(400);
      expect(msg).toBe("Request body cannot be empty");
    });
    test("Should return 400 when name is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/crisis-resources/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          phone_or_url: "0800 123 456",
          type: "crisis",
        })
        .expect(400);
      expect(msg).toBe("Name is required");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/crisis-resources/1")
        .send({
          name: "Updated Helpline",
          phone_or_url: "0800 123 456",
          type: "crisis",
        })
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/crisis-resources/1")
        .set("Authorization", "Bearer invalid-token")
        .send({
          name: "Updated Helpline",
          phone_or_url: "0800 123 456",
          type: "crisis",
        })
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 404 when crisis resource is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/crisis-resources/999")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Helpline",
          phone_or_url: "0800 123 456",
          type: "crisis",
        })
        .expect(404);
      expect(msg).toBe("Crisis resource not found");
    });
  });
  describe("DELETE /api/dashboard/crisis-resources/:id", () => {
    test("Should return 200 with deleted crisis_resource when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      await request(app)
        .delete("/api/dashboard/crisis-resources/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
    test("Should return 400 when crisis resource ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/crisis-resources/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid crisis resource ID");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/crisis-resources/1")
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/crisis-resources/1")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 404 when crisis resource is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/crisis-resources/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Crisis resource not found");
    });
  });
});
