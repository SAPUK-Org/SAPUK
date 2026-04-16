import app from "../app";
import request from "supertest";
import db from "../db/connection";
import seed from "../db/seeds/seed";
import { testData } from "../db/data/test-data";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

describe("Users API Endpoints", () => {
  describe("GET /api/users/me - Current User", () => {
    test("Should return the current user when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);

      const { token } = loginRes.body;

      const {
        body: { user },
      } = await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(user).toHaveProperty("id", expect.any(Number));
      expect(user).toHaveProperty("username", expect.any(String));
      expect(user).toHaveProperty("email", expect.any(String));
      expect(user).toHaveProperty("role", expect.any(String));
      expect(user).toHaveProperty("created_at", expect.any(String));
      expect(user).toHaveProperty("updated_at", expect.any(String));
      expect(user).not.toHaveProperty("password_hash");
    });
    test("Should return appropriate error when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/users/me").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return appropriate error when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/users/me")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return appropriate error when user is not logged in", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/users/me").expect(401);
      expect(msg).toBe("Authentication required");
    });
  });
});
