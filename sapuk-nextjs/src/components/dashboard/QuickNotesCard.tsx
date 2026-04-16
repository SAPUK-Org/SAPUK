"use client";

import { useCallback, useEffect, useState } from "react";
import {
  StickyNote,
  Pencil,
  Check,
  Plus,
  Trash2,
  X,
  MessageSquare,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type {
  NoteWithCommentCount,
  Note,
  NoteComment,
} from "@/components/dashboard/types";

function AuthorAvatar({
  profilePicture,
  username,
  size = "sm",
}: {
  profilePicture?: string | null;
  username?: string | null;
  size?: "sm" | "md";
}) {
  const initials = username
    ? username.slice(0, 2).toUpperCase()
    : "?";
  const sizeClass = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  const textClass = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <Avatar className={`shrink-0 ${sizeClass}`}>
      <AvatarImage
        src={profilePicture ?? undefined}
        alt={username ? `Profile of ${username}` : "Author"}
      />
      <AvatarFallback className={`bg-primary/10 text-primary ${textClass}`}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

export function QuickNotesCard() {
  const { token, user } = useAuth();
  const [notes, setNotes] = useState<NoteWithCommentCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [modalNoteId, setModalNoteId] = useState<number | null>(null);
  const [modalNote, setModalNote] = useState<Note | null>(null);
  const [modalComments, setModalComments] = useState<NoteComment[]>([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  const fetchNotes = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const { data, ok } = await api<{
      notes?: NoteWithCommentCount[];
      msg?: string;
    }>("/api/db/notes", "GET", { token });
    setLoading(false);
    if (ok && data?.notes) {
      setNotes(data.notes);
    } else {
      setError((data as { msg?: string })?.msg ?? "Failed to load notes");
      setNotes([]);
    }
  }, [token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const fetchNoteWithComments = useCallback(
    async (id: number) => {
      if (!token) return;
      setModalLoading(true);
      const { data, ok } = await api<{
        note?: Note;
        comments?: NoteComment[];
        msg?: string;
      }>(`/api/db/notes/${id}`, "GET", { token });
      setModalLoading(false);
      if (ok && data?.note) {
        setModalNote(data.note);
        setModalComments(data.comments ?? []);
      } else {
        toast.error((data as { msg?: string })?.msg ?? "Failed to load note");
        setModalNoteId(null);
      }
    },
    [token],
  );

  const openModal = useCallback(
    (id: number) => {
      setModalNoteId(id);
      setModalNote(null);
      setModalComments([]);
      setNewComment("");
      setEditingCommentId(null);
      setEditingCommentContent("");
      fetchNoteWithComments(id);
    },
    [fetchNoteWithComments],
  );

  const closeModal = useCallback(() => {
    setModalNoteId(null);
    setModalNote(null);
    setModalComments([]);
    setNewComment("");
    setEditingCommentId(null);
    setEditingCommentContent("");
    fetchNotes();
  }, [fetchNotes]);

  const addNote = useCallback(async () => {
    if (!token || !newNote.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    const { data, ok } = await api<{ note?: Note; msg?: string }>(
      "/api/db/notes",
      "POST",
      {
        token,
        body: { title: newNote.title.trim(), content: newNote.content },
      },
    );
    setSaving(false);
    if (ok && data?.note) {
      setNotes((prev) => [{ ...data.note!, comment_count: 0 }, ...prev]);
      setNewNote({ title: "", content: "" });
      setAdding(false);
      toast.success("Note added");
    } else {
      toast.error((data as { msg?: string })?.msg ?? "Failed to add note");
    }
  }, [token, newNote]);

  const removeNote = useCallback(
    async (id: number) => {
      if (!token) return;
      setSaving(true);
      const { ok } = await api(`/api/db/notes/${id}`, "DELETE", { token });
      setSaving(false);
      if (ok) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        if (modalNoteId === id) closeModal();
        toast.success("Note removed");
      } else {
        toast.error("Failed to remove note");
      }
    },
    [token, modalNoteId, closeModal],
  );

  const addComment = useCallback(async () => {
    if (!token || modalNoteId == null || !newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    setAddingComment(true);
    const { data, ok } = await api<{ comment?: NoteComment; msg?: string }>(
      `/api/db/notes/${modalNoteId}/comments`,
      "POST",
      { token, body: { content: newComment.trim() } },
    );
    setAddingComment(false);
    if (ok && data?.comment) {
      setModalComments((prev) => [...prev, data.comment!]);
      setNewComment("");
      fetchNotes();
      toast.success("Comment added");
    } else {
      toast.error((data as { msg?: string })?.msg ?? "Failed to add comment");
    }
  }, [token, modalNoteId, newComment, fetchNotes]);

  const updateComment = useCallback(
    async (commentId: number, content: string) => {
      if (!token || modalNoteId == null || !content.trim()) {
        toast.error("Comment cannot be empty");
        return;
      }
      setAddingComment(true);
      const { data, ok, status } = await api<{
        comment?: NoteComment;
        msg?: string;
      }>(`/api/db/notes/${modalNoteId}/comments/${commentId}`, "PUT", {
        token,
        body: { content: content.trim() },
      });
      setAddingComment(false);
      if (ok && data?.comment) {
        setModalComments((prev) =>
          prev.map((c) => (c.id === commentId ? data.comment! : c)),
        );
        setEditingCommentId(null);
        setEditingCommentContent("");
        fetchNotes();
        toast.success("Comment updated");
      } else {
        toast.error(
          status === 403
            ? "You can only update your own comments"
            : ((data as { msg?: string })?.msg ?? "Failed to update comment"),
        );
      }
    },
    [token, modalNoteId, fetchNotes],
  );

  const removeComment = useCallback(
    async (commentId: number) => {
      if (!token || modalNoteId == null) return;
      setAddingComment(true);
      const { ok, status, data } = await api<{ msg?: string }>(
        `/api/db/notes/${modalNoteId}/comments/${commentId}`,
        "DELETE",
        { token },
      );
      setAddingComment(false);
      if (ok) {
        setModalComments((prev) => prev.filter((c) => c.id !== commentId));
        setEditingCommentId((id) => (id === commentId ? null : id));
        fetchNotes();
        toast.success("Comment removed");
      } else {
        toast.error(
          status === 403
            ? "You can only delete your own comments"
            : ((data as { msg?: string })?.msg ?? "Failed to remove comment"),
        );
      }
    },
    [token, modalNoteId, fetchNotes],
  );

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateStr;
    }
  };

  return (
    <>
      <Card className="h-full min-h-0 flex flex-col overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <StickyNote className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-foreground">Quick Notes</CardTitle>
          </div>
          <CardAction className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAdding(true)}
              disabled={saving}
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Create
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(!editing)}
            >
              {editing ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1" /> Done
                </>
              ) : (
                <>
                  <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                </>
              )}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 overflow-hidden p-6 pt-0">
          <ScrollArea className="h-full pr-3">
            <div className="flex flex-col gap-3">
              {adding && (
                <div className="flex flex-col gap-2 p-3 rounded-lg bg-secondary/50 border border-dashed border-border">
                  <Input
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    placeholder="Note title"
                    className="text-sm"
                    disabled={saving}
                  />
                  <Textarea
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                    placeholder="Write your note..."
                    className="text-sm min-h-[60px] resize-none"
                    disabled={saving}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setAdding(false)}
                      disabled={saving}
                    >
                      <X className="h-3.5 w-3.5 mr-1" /> Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={addNote}
                      className="bg-primary text-primary-foreground"
                      disabled={saving}
                    >
                      <Check className="h-3.5 w-3.5 mr-1" /> Save
                    </Button>
                  </div>
                </div>
              )}
              {loading ? (
                <p className="text-sm text-muted-foreground py-4">Loading...</p>
              ) : error ? (
                <p className="text-sm text-destructive py-4">{error}</p>
              ) : notes.length === 0 && !adding ? (
                <p className="text-sm text-muted-foreground py-4">
                  No notes yet.
                </p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => note.id != null && openModal(note.id)}
                    onKeyDown={(e) => {
                      if (
                        (e.key === "Enter" || e.key === " ") &&
                        note.id != null
                      ) {
                        e.preventDefault();
                        openModal(note.id);
                      }
                    }}
                    className="group rounded-lg border p-3 transition-colors hover:bg-secondary/60 cursor-pointer text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <AuthorAvatar
                        profilePicture={note.author_profile_picture}
                        username={note.author_username}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">
                          {note.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                          {note.content || "No content"}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 border-0 flex items-center gap-0.5 bg-primary/10 text-primary"
                          >
                            <MessageSquare className="h-3 w-3 text-primary" />
                            {note.comment_count ?? 0}
                          </Badge>
                          {note.created_at && (
                            <span className="text-[10px] text-primary">
                              {formatDate(note.created_at)}
                            </span>
                          )}
                        </div>
                      </div>
                      {editing &&
                        note.id != null &&
                        (note.author_id === user?.id ||
                          user?.role === "admin") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground hover:text-primary shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNote(note.id!);
                            }}
                            disabled={saving}
                          >
                            <Trash2 className="h-3 w-3 text-primary" />
                          </Button>
                        )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog
        open={modalNoteId != null}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col bg-zinc-200">
          <DialogHeader>
            <DialogTitle>
              {modalLoading ? "Loading..." : (modalNote?.title ?? "Note")}
            </DialogTitle>
          </DialogHeader>
          {modalLoading ? (
            <p className="text-sm text-muted-foreground py-4">Loading...</p>
          ) : modalNote ? (
            <div className="flex flex-col gap-4 overflow-hidden min-h-0 flex-1">
              <div className="flex items-center gap-2">
                <AuthorAvatar
                  profilePicture={modalNote.author_profile_picture}
                  username={modalNote.author_username}
                  size="md"
                />
                {modalNote.author_username && (
                  <span className="text-sm text-muted-foreground">
                    {modalNote.author_username}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {modalNote.content || "No content"}
              </p>
              {modalNote.created_at && (
                <p className="text-xs text-muted-foreground">
                  {formatDate(modalNote.created_at)}
                </p>
              )}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">
                  Comments ({modalComments.length})
                </h4>
                <ScrollArea className="max-h-[200px] pr-3">
                  <div className="flex flex-col gap-2">
                    {modalComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex flex-col gap-2 rounded-lg bg-secondary/50 p-2.5"
                      >
                        {editingCommentId === comment.id ? (
                          <>
                            <Textarea
                              value={editingCommentContent}
                              onChange={(e) =>
                                setEditingCommentContent(e.target.value)
                              }
                              placeholder="Edit comment..."
                              className="text-sm min-h-[60px] resize-none"
                              disabled={addingComment}
                              autoFocus
                            />
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditingCommentContent("");
                                }}
                                disabled={addingComment}
                              >
                                <X className="h-3.5 w-3.5 mr-1" /> Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  comment.id != null &&
                                  updateComment(
                                    comment.id,
                                    editingCommentContent,
                                  )
                                }
                                className="bg-primary text-primary-foreground"
                                disabled={
                                  addingComment || !editingCommentContent.trim()
                                }
                              >
                                <Check className="h-3.5 w-3.5 mr-1" /> Save
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-start justify-between gap-2">
                            <AuthorAvatar
                              profilePicture={comment.author_profile_picture}
                              username={comment.author_username}
                              size="sm"
                            />
                            <div className="flex-1 min-w-0">
                              {comment.author_username && (
                                <span className="text-xs font-medium text-muted-foreground block mb-0.5">
                                  {comment.author_username}
                                </span>
                              )}
                              <p className="text-sm">{comment.content}</p>
                            </div>
                            {comment.author_id === user?.id && (
                              <div className="flex gap-0.5 shrink-0">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6 text-muted-foreground hover:text-primary"
                                  onClick={() => {
                                    if (comment.id != null) {
                                      setEditingCommentId(comment.id);
                                      setEditingCommentContent(comment.content);
                                    }
                                  }}
                                  disabled={addingComment}
                                  title="Edit comment"
                                >
                                  <Pencil className="h-3 w-3 text-primary" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6 text-muted-foreground hover:text-primary"
                                  onClick={() =>
                                    comment.id != null &&
                                    removeComment(comment.id)
                                  }
                                  disabled={addingComment}
                                  title="Delete comment"
                                >
                                  <Trash2 className="h-3 w-3 text-primary" />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    {modalComments.length === 0 && (
                      <p className="text-xs text-muted-foreground py-2">
                        No comments yet.
                      </p>
                    )}
                  </div>
                </ScrollArea>
                <div className="flex gap-2 mt-2 items-center justify-center">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="text-sm"
                    disabled={addingComment}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        addComment();
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={addComment}
                    className="bg-primary text-primary-foreground shrink-0"
                    disabled={addingComment || !newComment.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
