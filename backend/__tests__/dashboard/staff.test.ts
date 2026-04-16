import app from "../../app";
import request from "supertest";
import db from "../../db/connection";
import seed from "../../db/seeds/seed";
import { testData } from "../../db/data/test-data";
import { User } from "../../types";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

describe("Staff API Endpoints", () => {
  describe("GET /api/dashboard/staff", () => {
    test("Should return 200 with staff members when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { staffMembers },
      } = await request(app)
        .get("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      staffMembers.forEach((staffMember: User) => {
        expect(staffMember.username).toBeDefined();
        expect(staffMember.email).toBeDefined();
        expect(staffMember.profile_picture).toBeDefined();
        expect(staffMember.role).toBeDefined();
        expect(staffMember.is_active).toBeDefined();
      });
    });
    test("Should return 200 with staff members with single filter applied", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { staffMembers },
      } = await request(app)
        .get("/api/dashboard/staff?role=staff")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      staffMembers.forEach((staffMember: User) => {
        expect(staffMember.role).toBe("staff");
      });
    });
    test("Should return 200 with staff members with multiple filters applied", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { staffMembers },
      } = await request(app)
        .get("/api/dashboard/staff?role=staff&is_active=true")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      staffMembers.forEach((staffMember: User) => {
        expect(staffMember.role).toBe("staff");
        expect(staffMember.is_active).toBe(true);
      });
    });
    test("Should filter by search term", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { staffMembers },
      } = await request(app)
        .get("/api/dashboard/staff?search=alice")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      staffMembers.forEach((staffMember: User) => {
        expect(staffMember.username).toContain("alice");
      });
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/dashboard/staff").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 403 when user is not an admin", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe("Access denied");
    });
    test("Should return 400 when page query parameter is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff?page=notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid page query parameter");
    });
    test("Should return 400 when limit query parameter is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff?limit=notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid limit query parameter");
    });
    test("Should return 400 when is_active query parameter is not a boolean", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff?is_active=notabool")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid is_active query parameter");
    });
    test("Should return 400 when role query parameter is not a valid role", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff?role=notavalidrole")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid role query parameter");
    });
    test("Should return 404 when no staff members are found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get(
          "/api/dashboard/staff?role=admin&is_active=true&search=nonexistent",
        )
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("No staff members found");
    });
  });
  describe("POST /api/dashboard/staff", () => {
    test("Should return 201 with created staff member when a valid token is provided", async () => {
      const newStaffMember = {
        username: "newstaffmember",
        email: "newstaffmember@example.com",
        profile_picture:
          "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNRBf21AWCDRpigEzNJP8dCk4vYZFMmsa52wS3",
        password: "password123",
        role: "staff",
      };
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" });
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .send(newStaffMember)
        .expect(201);
      expect(body.staffMember.username).toBe(newStaffMember.username);
      expect(body.staffMember.email).toBe(newStaffMember.email);
      expect(body.staffMember.role).toBe(newStaffMember.role);
      expect(body.staffMember.is_active).toBe(true);
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
        .post("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(400);
      expect(msg).toBe("Request body cannot be empty");
    });
    test("Should return 400 when username is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .send({
          email: "updatedemail@example.com",
          password: "password123",
          role: "staff",
        })
        .expect(400);
      expect(msg).toBe("Username is required");
    });
    test("Should return 400 when email is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "updatedusername",
          password: "password123",
          role: "staff",
        })
        .expect(400);
      expect(msg).toBe("Email is required");
    });
    test("Should return 400 when password is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "updatedusername",
          email: "updatedemail@example.com",
          role: "staff",
        })
        .expect(400);
      expect(msg).toBe("Password is required");
    });
    test("Should return 400 when role is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "updatedusername",
          email: "updatedemail@example.com",
          password: "password123",
        })
        .expect(400);
      expect(msg).toBe("Role is required");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).post("/api/dashboard/staff").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/staff")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 403 when user is not an admin", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe("Access denied");
    });
  });
  describe("GET /api/dashboard/staff/:id", () => {
    test("Should return 200 with staff member when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { staffMember },
      } = await request(app)
        .get("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(staffMember.username).toBeDefined();
      expect(staffMember.email).toBeDefined();
      expect(staffMember.profile_picture).toBeDefined();
      expect(staffMember.role).toBeDefined();
      expect(staffMember.is_active).toBeDefined();
    });
    test("Should return 400 when staff member ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid staff member ID");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/dashboard/staff/2").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff/2")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 403 when user is not an admin", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe("Access denied");
    });
    test("Should return 404 when staff member is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/staff/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Staff member not found");
    });
  });
  describe("PUT /api/dashboard/staff/:id", () => {
    test("Should return 200 with updated staff member when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { staffMember },
      } = await request(app)
        .put("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "updatedusername",
          email: "updatedemail@example.com",
          profile_picture:
            "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNRBf21AWCDRpigEzNJP8dCk4vYZFMmsa52wS3",
          role: "admin",
        })
        .expect(200);
      expect(staffMember.username).toBe("updatedusername");
      expect(staffMember.email).toBe("updatedemail@example.com");
      expect(staffMember.role).toBe("admin");
      expect(staffMember.is_active).toBe(true);
    });
    test("Should return 400 when staff member ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/staff/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "updatedusername",
          email: "updatedemail@example.com",
          role: "admin",
        })
        .expect(400);
      expect(msg).toBe("Invalid staff member ID");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).put("/api/dashboard/staff/2").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/staff/2")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 403 when user is not an admin", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe("Access denied");
    });
    test("Should return 404 when staff member is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/staff/999")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "updatedusername",
          email: "updatedemail@example.com",
          role: "admin",
        })
        .expect(404);
      expect(msg).toBe("Staff member not found");
    });
  });
  describe("DELETE /api/dashboard/staff/:id", () => {
    test("Should return 200 with deleted staff member when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
    });
    test("Should return 400 when staff member ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/staff/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid staff member ID");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).delete("/api/dashboard/staff/2").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 403 when user is not an admin", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe("Access denied");
    });
    test("Should return 404 when staff member is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/staff/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Staff member not found");
    });
  });
  describe("PATCH /api/dashboard/staff/:id/role", () => {
    test("Should return 200 with updated staff member when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { staffMember },
      } = await request(app)
        .patch("/api/dashboard/staff/2/role")
        .set("Authorization", `Bearer ${token}`)
        .send({ role: "admin" })
        .expect(200);
      expect(staffMember.role).toBe("admin");
    });
    test("Should return 400 when staff member ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/notanumber/role")
        .set("Authorization", `Bearer ${token}`)
        .send({ role: "admin" })
        .expect(400);
      expect(msg).toBe("Invalid staff member ID");
    });
    test("Should return 400 when role is missing", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/2/role")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(400);
      expect(msg).toBe("Role is required");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).patch("/api/dashboard/staff/2/role").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/2/role")
        .set("Authorization", "Bearer invalid-token")
        .send({ role: "admin" })
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 403 when user is not an admin", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/2/role")
        .set("Authorization", `Bearer ${token}`)
        .send({ role: "admin" })
        .expect(403);
      expect(msg).toBe("Access denied");
    });
    test("Should return 404 when staff member is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/999/role")
        .set("Authorization", `Bearer ${token}`)
        .send({ role: "admin" })
        .expect(404);
      expect(msg).toBe("Staff member not found");
    });
  });
  describe("PATCH /api/dashboard/staff/:id/deactivate", () => {
    test("Should return 200 with updated staff member when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { staffMember },
      } = await request(app)
        .patch("/api/dashboard/staff/2/deactivate")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(staffMember.is_active).toBe(false);
    });
    test("Should return 400 when staff member ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/notanumber/deactivate")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid staff member ID");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/2/deactivate")
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/2/deactivate")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 403 when user is not an admin", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/2/deactivate")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe("Access denied");
    });
    test("Should return 404 when staff member is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/999/deactivate")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Staff member not found");
    });
  });
  describe("PATCH /api/dashboard/staff/:id/activate", () => {
    test("Should return 200 with updated staff member when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { staffMember },
      } = await request(app)
        .patch("/api/dashboard/staff/2/activate")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(staffMember.is_active).toBe(true);
    });
    test("Should return 400 when staff member ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/notanumber/activate")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid staff member ID");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/2/activate")
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/2/activate")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
    test("Should return 403 when user is not an admin", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/2/activate")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe("Access denied");
    });
    test("Should return 404 when staff member is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/dashboard/staff/999/activate")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Staff member not found");
    });
  });
});
