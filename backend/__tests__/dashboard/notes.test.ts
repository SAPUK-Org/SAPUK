import app from "../../app";
import request from "supertest";
import db from "../../db/connection";
import seed from "../../db/seeds/seed";
import { testData } from "../../db/data/test-data";
import { Note, NoteComment } from "../../types";

beforeEach(() => seed(testData));

afterAll(async () => {
  await db.end();
});

describe("Notes API Endpoints", () => {
  describe("GET /api/dashboard/notes", () => {
    test("Should return 200 with notes including comment_count when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { notes },
      } = await request(app)
        .get("/api/dashboard/notes")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(notes)).toBe(true);
      notes.forEach((note: Note & { comment_count: number }) => {
        expect(note.title).toBeDefined();
        expect(note.content).toBeDefined();
        expect(note.comment_count).toBeDefined();
        expect(typeof note.comment_count).toBe("number");
      });
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/dashboard/notes").expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 401 when token is invalid", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/notes")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
      expect(msg).toBe("Invalid or expired token");
    });
  });
  describe("POST /api/dashboard/notes", () => {
    test("Should return 201 with note when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/notes")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "New Note", content: "Note content" })
        .expect(201);
      expect(body.note.title).toBe("New Note");
      expect(body.note.content).toBe("Note content");
      expect(body.note.author_id).toBeDefined();
      expect(body.note.id).toBeDefined();
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
        .post("/api/dashboard/notes")
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
        .post("/api/dashboard/notes")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Some content" })
        .expect(400);
      expect(msg).toBe("Title is required");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/notes")
        .send({ title: "New Note", content: "Content" })
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
  });
  describe("GET /api/dashboard/notes/:id", () => {
    test("Should return 200 with note and comments when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { note, comments },
      } = await request(app)
        .get("/api/dashboard/notes/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(note.title).toBeDefined();
      expect(note.content).toBeDefined();
      expect(note.id).toBe(1);
      expect(Array.isArray(comments)).toBe(true);
      comments.forEach((c: NoteComment) => {
        expect(c.content).toBeDefined();
        expect(c.note_id).toBe(1);
      });
    });
    test("Should return 400 when note ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/notes/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
      expect(msg).toBe("Invalid note ID");
    });
    test("Should return 404 when note is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .get("/api/dashboard/notes/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Note not found");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/dashboard/notes/1").expect(401);
      expect(msg).toBe("Authentication required");
    });
  });
  describe("PUT /api/dashboard/notes/:id", () => {
    test("Should return 200 with updated note when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { note },
      } = await request(app)
        .put("/api/dashboard/notes/1")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Updated Title", content: "Updated content" })
        .expect(200);
      expect(note.title).toBe("Updated Title");
      expect(note.content).toBe("Updated content");
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
        .put("/api/dashboard/notes/1")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(400);
      expect(msg).toBe("Request body cannot be empty");
    });
    test("Should return 404 when note is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/notes/999")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Title", content: "Content" })
        .expect(404);
      expect(msg).toBe("Note not found");
    });
  });
  describe("DELETE /api/dashboard/notes/:id", () => {
    test("Should return 200 when note author deletes their own note", async () => {
      // Note 2: author_id 2 (bob)
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      await request(app)
        .delete("/api/dashboard/notes/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
    test("Should return 200 when admin deletes any note", async () => {
      // Alice (admin) deletes note 2 (bob's note) - admin can delete any note
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      await request(app)
        .delete("/api/dashboard/notes/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
    test("Should return 403 when non-author non-admin tries to delete note", async () => {
      // Charlie (staff) tries to delete note 1 (alice's note)
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "charlie@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/notes/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe("Only the note author or an admin can delete this note");
    });
    test("Should return 404 when note is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/notes/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Note not found");
    });
  });
  describe("POST /api/dashboard/notes/:id/comments", () => {
    test("Should return 201 with comment when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .post("/api/dashboard/notes/1/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "New comment" })
        .expect(201);
      expect(body.comment.content).toBe("New comment");
      expect(body.comment.note_id).toBe(1);
      expect(body.comment.id).toBeDefined();
    });
    test("Should return 400 when content is empty", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/notes/1/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "" })
        .expect(400);
      expect(msg).toBe("Content is required");
    });
    test("Should return 404 when note is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/notes/999/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Comment" })
        .expect(404);
      expect(msg).toBe("Note not found");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .post("/api/dashboard/notes/1/comments")
        .send({ content: "Comment" })
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
  });
  describe("PUT /api/dashboard/notes/:id/comments/:commentId", () => {
    test("Should return 200 with updated comment when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const { body } = await request(app)
        .put("/api/dashboard/notes/1/comments/1")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Updated comment" })
        .expect(200);
      expect(body.comment.content).toBe("Updated comment");
      expect(body.comment.note_id).toBe(1);
      expect(body.comment.id).toBe(1);
    });
    test("Should return 400 when comment ID is not a number", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/notes/1/comments/notanumber")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Updated comment" })
        .expect(400);
      expect(msg).toBe("Invalid comment ID");
    });
    test("Should return 400 when content is empty", async () => {
      // Comment 1 belongs to note 1 and is authored by bob; use bob's token
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/notes/1/comments/1")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "" })
        .expect(400);
      expect(msg).toBe("Content is required");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/notes/1/comments/1")
        .send({ content: "Updated comment" })
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 403 when user tries to update another user's comment", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/notes/1/comments/1")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Updated comment" })
        .expect(403);
      expect(msg).toBe("You can only update your own comments");
    });
    test("Should return 404 when note is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/notes/1/comments/999")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Updated comment" })
        .expect(404);
      expect(msg).toBe("Comment not found");
    });
    test("Should return 404 when comment is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .put("/api/dashboard/notes/1/comments/999")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Updated comment" })
        .expect(404);
      expect(msg).toBe("Comment not found");
    });
  });
  describe("DELETE /api/dashboard/notes/:id/comments/:commentId", () => {
    test("Should return 204 when comment author deletes their own comment", async () => {
      // Comment 1: note_id 1, author_id 2 (bob)
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "bob@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      await request(app)
        .delete("/api/dashboard/notes/1/comments/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
    });
    test("Should return 403 when user tries to delete another user's comment", async () => {
      // Comment 1: author_id 2 (bob). Alice (id 1) tries to delete it.
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/notes/1/comments/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(msg).toBe("You can only delete your own comments");
    });
    test("Should return 404 when comment is not found", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/notes/1/comments/999")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Comment not found");
    });
    test("Should return 401 when no token is provided", async () => {
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/notes/1/comments/1")
        .expect(401);
      expect(msg).toBe("Authentication required");
    });
    test("Should return 404 when comment belongs to different note", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "password" })
        .expect(200);
      const { token } = loginRes.body;
      // Comment 1 belongs to note 1. Try to delete comment 1 via note 2
      const {
        body: { msg },
      } = await request(app)
        .delete("/api/dashboard/notes/2/comments/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(msg).toBe("Comment not found");
    });
  });
});
