import app from "../../app";
import request from "supertest";
import db from "../../db/connection";
import seed from "../../db/seeds/seed";
import { testData } from "../../db/data/test-data";
import { AuditLog } from "../../utils/logAudit";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

const loginAsAdmin = async () => {
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email: "alice@example.com", password: "password" })
    .expect(200);
  return loginRes.body.token as string;
};

const getLogs = async (token: string) => {
  const { body } = await request(app)
    .get("/api/dashboard/logs")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
  return body.logs as AuditLog[];
};

describe("Logs API Endpoints", () => {
  describe("GET /api/dashboard/logs", () => {
    test("Should return 200 with logs when a valid token is provided", async () => {
      const token = await loginAsAdmin();
      await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
      const logs = await getLogs(token);
      expect(logs).toBeDefined();
      expect(logs.length).toBeGreaterThan(0);
      logs.forEach((log: AuditLog) => {
        expect(log.id).toBeDefined();
        expect(log.user_id).toBeDefined();
        expect(log.action).toBeDefined();
        expect(log.resource_type).toBeDefined();
        expect(log.resource_id).toBeDefined();
      });
    });
    test("Should log delete staff member and return it in GET logs", async () => {
      const token = await loginAsAdmin();
      await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
      const logs = await getLogs(token);
      const deleteLog = logs.find(
        (l) => l.action === "delete staff member" && l.resource_id === 2,
      );
      expect(deleteLog).toBeDefined();
      expect(deleteLog?.resource_type).toBe("user");
      expect(deleteLog?.user_id).toBe(1);
    });
    test("Should log create event and return it in GET logs", async () => {
      const token = await loginAsAdmin();
      const { body } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Audit Test Event",
          description: "Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: "Location",
          type: "workshop",
          max_volunteers: 5,
        })
        .expect(201);
      const eventId = body.event.id;
      const logs = await getLogs(token);
      const createLog = logs.find(
        (l) => l.action === "create event" && l.resource_id === eventId,
      );
      expect(createLog).toBeDefined();
      expect(createLog?.resource_type).toBe("event");
      expect(createLog?.user_id).toBe(1);
    });
    test("Should log create staff member and return it in GET logs", async () => {
      const token = await loginAsAdmin();
      const { body } = await request(app)
        .post("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "newstaff",
          email: "newstaff@example.com",
          password: "password",
          role: "staff",
        })
        .expect(201);
      const staffId = body.staffMember.id;
      const logs = await getLogs(token);
      const createLog = logs.find(
        (l) => l.action === "create staff member" && l.resource_id === staffId,
      );
      expect(createLog).toBeDefined();
      expect(createLog?.resource_type).toBe("user");
      expect(createLog?.user_id).toBe(1);
    });
    test("Should log patch staff member role and return it in GET logs", async () => {
      const token = await loginAsAdmin();
      await request(app)
        .patch("/api/dashboard/staff/2/role")
        .set("Authorization", `Bearer ${token}`)
        .send({ role: "editor" })
        .expect(200);
      const logs = await getLogs(token);
      const patchLog = logs.find(
        (l) => l.action === "patch staff member role" && l.resource_id === 2,
      );
      expect(patchLog).toBeDefined();
      expect(patchLog?.resource_type).toBe("user");
      expect(patchLog?.user_id).toBe(1);
    });
    test("Should log create useful link and return it in GET logs", async () => {
      const token = await loginAsAdmin();
      const { body } = await request(app)
        .post("/api/dashboard/useful-links")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Audit Test Link",
          url: "https://example.com",
        })
        .expect(201);
      const linkId = body.useful_link.id;
      const logs = await getLogs(token);
      const createLog = logs.find(
        (l) => l.action === "create useful link" && l.resource_id === linkId,
      );
      expect(createLog).toBeDefined();
      expect(createLog?.resource_type).toBe("useful_link");
      expect(createLog?.user_id).toBe(1);
    });
    test("Should log login and return it in GET logs after fetching logs", async () => {
      const token = await loginAsAdmin();
      const logs = await getLogs(token);
      const loginLog = logs.find((l) => l.action === "login");
      expect(loginLog).toBeDefined();
      expect(loginLog?.resource_type).toBe("user");
      expect(loginLog?.user_id).toBe(1);
    });
    test("Should filter logs by user_id", async () => {
      const token = await loginAsAdmin();

      await request(app)
        .post("/api/dashboard/staff")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "filteruser",
          email: "filteruser@example.com",
          password: "password",
          role: "staff",
        })
        .expect(201);

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ user_id: "1" })
        .expect(200);

      const logs = body.logs as AuditLog[];
      expect(logs.length).toBeGreaterThan(0);
      logs.forEach((log) => {
        expect(log.user_id).toBe(1);
      });
    });
    test("Should filter logs by action", async () => {
      const token = await loginAsAdmin();

      const { body: createEventBody } = await request(app)
        .post("/api/dashboard/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Filter Event",
          description: "Description",
          starts_at: new Date(),
          ends_at: new Date(),
          location: "Location",
          type: "workshop",
          max_volunteers: 5,
        })
        .expect(201);

      const eventId = createEventBody.event.id;

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ action: "create event" })
        .expect(200);

      const logs = body.logs as AuditLog[];
      expect(logs.length).toBeGreaterThan(0);
      logs.forEach((log) => {
        expect(log.action).toBe("create event");
        if (log.action === "create event") {
          expect(log.resource_id).toBe(eventId);
        }
      });
    });
    test("Should filter logs by resource_type", async () => {
      const token = await loginAsAdmin();

      await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ resource_type: "user" })
        .expect(200);

      const logs = body.logs as AuditLog[];
      expect(logs.length).toBeGreaterThan(0);
      logs.forEach((log) => {
        expect(log.resource_type).toBe("user");
      });
    });
    test("Should filter logs by resource_id", async () => {
      const token = await loginAsAdmin();

      await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ resource_id: "2" })
        .expect(200);

      const logs = body.logs as AuditLog[];
      expect(logs.length).toBeGreaterThan(0);
      logs.forEach((log) => {
        expect(log.resource_id).toBe(2);
      });
    });
    test("Should filter logs by method", async () => {
      const token = await loginAsAdmin();

      await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ method: "DELETE" })
        .expect(200);

      const logs = body.logs as AuditLog[];
      expect(logs.length).toBeGreaterThan(0);
      logs.forEach((log) => {
        expect(log.method).toBe("DELETE");
      });
    });
    test("Should filter logs by partial route match", async () => {
      const token = await loginAsAdmin();

      await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ route: "/api/dashboard/staff" })
        .expect(200);

      const logs = body.logs as AuditLog[];
      expect(logs.length).toBeGreaterThan(0);
      logs.forEach((log) => {
        expect(log.route).toEqual(
          expect.stringContaining("/api/dashboard/staff"),
        );
      });
    });
    test("Should support combining multiple filters", async () => {
      const token = await loginAsAdmin();

      await request(app)
        .delete("/api/dashboard/staff/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ user_id: "1", action: "delete staff member" })
        .expect(200);

      const logs = body.logs as AuditLog[];
      expect(logs.length).toBeGreaterThan(0);
      logs.forEach((log) => {
        expect(log.user_id).toBe(1);
        expect(log.action).toBe("delete staff member");
      });
    });
    test("Should return 404 when no logs match filters", async () => {
      const token = await loginAsAdmin();

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ user_id: "99999" })
        .expect(404);

      expect(body).toEqual({ msg: "No logs found" });
    });
    test("Should return 400 for invalid user_id query parameter", async () => {
      const token = await loginAsAdmin();

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ user_id: "abc" })
        .expect(400);

      expect(body).toEqual({ msg: "Invalid user_id query parameter" });
    });
    test("Should return 400 for invalid resource_id query parameter", async () => {
      const token = await loginAsAdmin();

      const { body } = await request(app)
        .get("/api/dashboard/logs")
        .set("Authorization", `Bearer ${token}`)
        .query({ resource_id: "-1" })
        .expect(400);

      expect(body).toEqual({ msg: "Invalid resource_id query parameter" });
    });
  });
});
