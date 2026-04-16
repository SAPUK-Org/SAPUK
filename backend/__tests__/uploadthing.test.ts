import app from "../app";
import request from "supertest";
import db from "../db/connection";
import seed from "../db/seeds/seed";
import { testData } from "../db/data/test-data";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

describe("Uploadthing API Endpoints", () => {
  describe("POST /api/uploadthing", () => {
    test("Should return 200 and presigned URL data when a valid file is requested for upload", async () => {
      const { body } = await request(app)
        .post("/api/uploadthing")
        .query({ slug: "fileUpload", actionType: "upload" })
        .set("Content-Type", "application/json")
        .send({
          files: [
            {
              name: "test.pdf",
              size: 1024,
              type: "application/pdf",
              lastModified: Date.now(),
            },
          ],
          input: null,
        })
        .expect(200);

      expect(Array.isArray(body)).toBe(true);
      expect(body[0]).toEqual(
        expect.objectContaining({
          url: expect.any(String),
          key: expect.any(String),
          name: "test.pdf",
        }),
      );
    });
  });
});
