import app from "../app";
import request from "supertest";
import db from "../db/connection";
import seed from "../db/seeds/seed";
import { testData } from "../db/data/test-data";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "test-refresh-secret";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

describe("Auth API Endpoints", () => {
  describe("POST /api/auth/login", () => {
    test("Should return 200 with user and token when credentials are valid", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);

      const { body } = response;
      expect(body).toHaveProperty("user");
      expect(body).toHaveProperty("token", expect.any(String));

      const { user } = body;
      expect(user).toHaveProperty("id", expect.any(Number));
      expect(user).toHaveProperty("username", "alice123");
      expect(user).toHaveProperty("email", "alice@example.com");
      expect(user).toHaveProperty("role", "admin");
      expect(user).toHaveProperty("created_at", expect.any(String));
      expect(user).toHaveProperty("updated_at", expect.any(String));
      expect(user).not.toHaveProperty("password_hash");

      const setCookie = response.headers["set-cookie"];
      expect(setCookie).toBeDefined();
      const refreshCookie = (setCookie as unknown as string[]).find(
        (cookie: string) => cookie.startsWith("refreshToken="),
      );
      expect(refreshCookie).toBeDefined();
      expect(refreshCookie).toContain("HttpOnly");
    });
    test("Should return 401 when email does not exist", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/auth/login")
        .send({ email: "nonexistent@example.com", password: "password" })
        .expect(401);
      expect(msg).toBe("Invalid email or password");
    });
    test("Should return 401 when password is wrong", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "wrongpassword" })
        .expect(401);
      expect(msg).toBe("Invalid email or password");
    });
    test("Should return 400 when email is missing", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/auth/login")
        .send({ password: "password" })
        .expect(400);
      expect(msg).toBe("Email and password are required");
    });
    test("Should return 400 when password is missing", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com" })
        .expect(400);
      expect(msg).toBe("Email and password are required");
    });
  });
  describe("POST /api/auth/logout", () => {
    test("Should return 200 with message (client discards token)", async () => {
      const {
        body: { msg },
      } = await request(app).post("/api/auth/logout").expect(200);
      expect(msg).toBe("Logged out");
    });
    test("Should clear refreshToken cookie on logout", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);

      const cookies = loginRes.headers["set-cookie"] as unknown as string[];
      const agent = request.agent(app);

      const logoutRes = await agent
        .post("/api/auth/logout")
        .set("Cookie", cookies)
        .expect(200);

      const setCookie = logoutRes.headers["set-cookie"];
      expect(setCookie).toBeDefined();
      const clearedCookie = (setCookie as unknown as string[]).find(
        (cookie: string) => cookie.startsWith("refreshToken="),
      );
      expect(clearedCookie).toBeDefined();
    });
  });
  describe("Protected route GET /api/users/me", () => {
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/users/me").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/users/me")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 200 with current user when valid token is provided", async () => {
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
      expect(user).toHaveProperty("username", "alice123");
      expect(user).toHaveProperty("email", "alice@example.com");
      expect(user).toHaveProperty("role", "admin");
      expect(user).not.toHaveProperty("password_hash");
    });
  });
  describe("POST /api/auth/refresh", () => {
    test("Should return 401 when no refresh cookie is provided", async () => {
      const {
        body: { msg },
      } = await request(app).post("/api/auth/refresh").expect(401);
      expect(msg).toBe("Refresh token required");
    });
    test("Should return 401 when refresh token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/auth/refresh")
        .set("Cookie", ["refreshToken=invalid-token"])
        .expect(401);
      expect(msg).toBe("Invalid or expired refresh token");
    });
    test("Should issue a new access token with a valid refresh token", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);

      const cookies = loginRes.headers["set-cookie"] as unknown as string[];

      const refreshRes = await request(app)
        .post("/api/auth/refresh")
        .set("Cookie", cookies)
        .expect(200);

      expect(refreshRes.body).toHaveProperty("token", expect.any(String));

      const {
        body: { user },
      } = await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${refreshRes.body.token}`)
        .expect(200);

      expect(user).toHaveProperty("email", "alice@example.com");
    });
  });
});
