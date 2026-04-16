import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { selectUserById } from "../models/users-models";
import { selectNoteCommentById } from "../models/note-comments-model";
import { selectNoteByIdWithComments } from "../models/notes-model";
import { sanitizeUser } from "../utils/databaseHelpers";
import { User } from "../types";
import { JwtPayload } from "../types";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;

    if (!token) {
      return res.status(401).send({ msg: "Authentication required" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).send({ msg: "Server configuration error" });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, secret) as JwtPayload;
    } catch {
      return res.status(401).send({ msg: "Invalid or expired token" });
    }

    const user = await selectUserById(decoded.userId);
    if (!user) {
      return res.status(401).send({ msg: "User not found" });
    }

    req.user = sanitizeUser(user as User);
    next();
  } catch (err) {
    next(err);
  }
};

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send({ msg: "Access denied" });
  }
  next();
};

export const requireEditor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "editor") {
    return res.status(403).send({ msg: "Access denied" });
  }
  next();
};

export const requireAdminOrEditor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin" && req.user?.role !== "editor") {
    return res.status(403).send({
      msg: "Access denied. You must be an admin or editor to access this resource.",
    });
  }
  next();
};

export const requireAuthOrUploadCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const secret = req.headers["x-upload-callback-secret"];
  if (
    secret &&
    process.env.UPLOAD_CALLBACK_SECRET &&
    secret === process.env.UPLOAD_CALLBACK_SECRET
  ) {
    (req as Request & { isUploadCallback?: boolean }).isUploadCallback = true;
    return next();
  }
  return requireAuth(req, res, next);
};

/** Ensures the current user is the note author or an admin before allowing delete. */
export const requireNoteAuthorOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const noteId = Number(req.params.id);
  if (isNaN(noteId)) {
    return res.status(400).send({ msg: "Invalid note ID" });
  }
  const result = await selectNoteByIdWithComments(noteId);
  if (!result) {
    return res.status(404).send({ msg: "Note not found" });
  }
  const { note } = result;
  const isAuthor = note.author_id === req.user?.id;
  const isAdmin = req.user?.role === "admin";
  if (!isAuthor && !isAdmin) {
    return res.status(403).send({
      msg: "Only the note author or an admin can delete this note",
    });
  }
  next();
};

/** Ensures the current user is the author of the comment before allowing delete. */
export const requireCommentAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const noteId = Number(req.params.id);
  const commentId = Number(req.params.commentId);
  if (isNaN(noteId) || isNaN(commentId)) {
    return res.status(400).send({
      msg: isNaN(noteId) ? "Invalid note ID" : "Invalid comment ID",
    });
  }
  const comment = await selectNoteCommentById(commentId);
  if (!comment || comment.note_id !== noteId) {
    return res.status(404).send({ msg: "Comment not found" });
  }
  if (comment.author_id !== req.user?.id) {
    const action =
      req.method === "PUT" || req.method === "PATCH" ? "update" : "delete";
    return res.status(403).send({
      msg: `You can only ${action} your own comments`,
    });
  }
  next();
};

export const requireCommentAuthorOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const commentId = Number(req.params.commentId);
  if (isNaN(commentId)) {
    return res.status(400).send({ msg: "Invalid comment ID" });
  }
  const comment = await selectNoteCommentById(commentId);
  if (!comment) {
    return res.status(404).send({ msg: "Comment not found" });
  }
  if (comment.author_id !== req.user?.id) {
    return res.status(403).send({
      msg: "You can only update your own comments",
    });
  }
  next();
};

export const requireValidUploadSecret = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const secret = req.headers["x-upload-callback-secret"];
  const expected = process.env.UPLOAD_CALLBACK_SECRET;
  if (!expected) {
    return res.status(500).send({ msg: "Server configuration error" });
  }
  if (!secret || secret !== expected) {
    return res.status(401).send({ msg: "Authentication required" });
  }
  next();
};
