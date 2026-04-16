import { RequestHandler, Router } from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  addComment,
  updateComment,
  deleteComment,
} from "../../controllers/notes-controller";
import {
  requireCommentAuthor,
  requireNoteAuthorOrAdmin,
} from "../../middleware/auth";

const notesRouter = Router();

notesRouter.get("/", getNotes as RequestHandler);
notesRouter.post("/", createNote as RequestHandler);
notesRouter.post("/:id/comments", addComment as RequestHandler);
notesRouter.put(
  "/:id/comments/:commentId",
  requireCommentAuthor,
  updateComment as RequestHandler,
);
notesRouter.delete(
  "/:id/comments/:commentId",
  requireCommentAuthor,
  deleteComment as RequestHandler,
);
notesRouter.get("/:id", getNote as RequestHandler);
notesRouter.put("/:id", updateNote as RequestHandler);
notesRouter.delete(
  "/:id",
  requireNoteAuthorOrAdmin,
  deleteNote as RequestHandler,
);

export default notesRouter;
