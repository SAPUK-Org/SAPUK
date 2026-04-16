import { Request, Response, NextFunction } from "express";
import {
  insertNote,
  selectNoteByIdWithComments,
  selectNotes,
  updateNoteById,
  deleteNoteById,
} from "../models/notes-model";
import {
  insertNoteComment,
  deleteNoteCommentById,
  patchNoteCommentByIdAndReturnWithAuthor,
} from "../models/note-comments-model";
import { logAudit } from "../utils/logAudit";

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const notes = await selectNotes();
    res.status(200).send({ notes });
  } catch (err) {
    next(err);
  }
};

export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ msg: "Invalid note ID" });
    }
    const result = await selectNoteByIdWithComments(id);
    if (!result) {
      return res.status(404).send({ msg: "Note not found" });
    }
    res.status(200).send({ note: result.note, comments: result.comments });
  } catch (err) {
    next(err);
  }
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!title || typeof title !== "string") {
      return res.status(400).send({ msg: "Title is required" });
    }
    const author_id = req.user?.id ?? null;
    const note = await insertNote(
      title,
      typeof content === "string" ? content : "",
      author_id,
    );
    await logAudit({
      userId: req.user?.id,
      action: "create note",
      resourceType: "note",
      resourceId: note.id as number,
      method: req.method,
      route: req.originalUrl,
      statusCode: 201,
      metadata: { title: note.title },
      ip: req.ip as string,
    });
    const noteWithAuthor = {
      ...note,
      author_username: req.user?.username ?? null,
      author_profile_picture: req.user?.profile_picture ?? null,
    };
    res.status(201).send({ note: noteWithAuthor });
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ msg: "Invalid note ID" });
    }
    const existing = await selectNoteByIdWithComments(id);
    if (!existing) {
      return res.status(404).send({ msg: "Note not found" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Request body cannot be empty" });
    }
    if (!title || typeof title !== "string") {
      return res.status(400).send({ msg: "Title is required" });
    }
    const note = await updateNoteById(
      id,
      title,
      typeof content === "string" ? content : "",
    );
    if (!note) {
      return res.status(404).send({ msg: "Note not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "update note",
      resourceType: "note",
      resourceId: id,
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { title: note.title },
      ip: req.ip as string,
    });
    res.status(200).send({ note });
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const note = await deleteNoteById(id);
    if (!note) {
      return res.status(404).send({ msg: "Note not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "delete note",
      resourceType: "note",
      resourceId: id,
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { title: note.title },
      ip: req.ip as string,
    });
    res.status(200).send({ note });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const noteId = Number(req.params.id);
    const { content } = req.body;
    if (isNaN(noteId)) {
      return res.status(400).send({ msg: "Invalid note ID" });
    }
    const existing = await selectNoteByIdWithComments(noteId);
    if (!existing) {
      return res.status(404).send({ msg: "Note not found" });
    }
    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).send({ msg: "Content is required" });
    }
    const author_id = req.user?.id ?? null;
    const comment = await insertNoteComment(noteId, author_id, content.trim());
    await logAudit({
      userId: req.user?.id,
      action: "add note comment",
      resourceType: "note_comment",
      resourceId: comment.id as number,
      method: req.method,
      route: req.originalUrl,
      statusCode: 201,
      metadata: {
        note_id: noteId,
        content_preview: content.trim().slice(0, 100),
      },
      ip: req.ip as string,
    });
    const commentWithAuthor = {
      ...comment,
      author_username: req.user?.username ?? null,
      author_profile_picture: req.user?.profile_picture ?? null,
    };
    res.status(201).send({ comment: commentWithAuthor });
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const commentId = Number(req.params.commentId);
    const { content } = req.body;
    if (isNaN(commentId)) {
      return res.status(400).send({ msg: "Invalid comment ID" });
    }
    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).send({ msg: "Content is required" });
    }
    const comment = await patchNoteCommentByIdAndReturnWithAuthor(
      commentId,
      content.trim(),
    );
    if (!comment) {
      return res.status(404).send({ msg: "Comment not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "update note comment",
      resourceType: "note_comment",
      resourceId: commentId,
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { note_id: comment.note_id },
      ip: req.ip as string,
    });
    res.status(200).send({ comment });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const commentId = Number(req.params.commentId);
    if (isNaN(commentId)) {
      return res.status(400).send({ msg: "Invalid comment ID" });
    }
    const deleted = await deleteNoteCommentById(commentId);
    if (!deleted) {
      return res.status(404).send({ msg: "Comment not found" });
    }
    await logAudit({
      userId: req.user?.id,
      action: "delete note comment",
      resourceType: "note_comment",
      resourceId: commentId,
      method: req.method,
      route: req.originalUrl,
      statusCode: 204,
      metadata: { note_id: deleted.note_id },
      ip: req.ip as string,
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
