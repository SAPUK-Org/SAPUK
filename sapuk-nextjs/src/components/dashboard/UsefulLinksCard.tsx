"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Link2,
  ExternalLink,
  Pencil,
  Check,
  X,
  Plus,
  Trash2,
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { UsefulLink } from "@/components/dashboard/types";

const categoryColors: Record<string, string> = {
  internal:
    "bg-sidebar-accent text-primary-foreground hover:bg-sidebar-accent/80 hover:cursor-default",
  training:
    "bg-button-blue/80 text-primary-foreground hover:bg-button-blue/60 hover:cursor-default",
  guidelines:
    "bg-sidebar-accent text-primary-foreground hover:bg-sidebar-accent/80 hover:cursor-default",
  general: "bg-amber text-primary hover:bg-amber/80 hover:cursor-default",
};

export function UsefulLinksCard() {
  const { token } = useAuth();
  const [links, setLinks] = useState<UsefulLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    title?: string;
    url?: string;
    description?: string;
  }>({});
  const [adding, setAdding] = useState(false);
  const [newLink, setNewLink] = useState<{
    title: string;
    url: string;
    description: string;
  }>({ title: "", url: "", description: "" });
  const [saving, setSaving] = useState(false);

  const fetchLinks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const { data, ok } = await api<{
      useful_links?: UsefulLink[];
      msg?: string;
    }>("/api/db/useful-links", "GET", { token });
    setLoading(false);
    if (ok && data?.useful_links) {
      setLinks(data.useful_links.filter((l) => l.is_active !== false) ?? []);
    } else {
      setError((data as { msg?: string })?.msg ?? "Failed to load links");
      setLinks([]);
    }
  }, [token]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const startEdit = (link: UsefulLink) => {
    if (link.id == null) return;
    setEditingLinkId(link.id);
    setEditValues({
      title: link.title,
      url: link.url,
      description: link.description ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingLinkId(null);
    setEditValues({});
  };

  const saveEdit = useCallback(
    async (id: number) => {
      if (!token || !editValues.title || !editValues.url) {
        toast.error("Title and URL are required");
        return;
      }
      setSaving(true);
      const { data, ok } = await api<{
        useful_link?: UsefulLink;
        msg?: string;
      }>(`/api/db/useful-links/${id}`, "PUT", {
        token,
        body: {
          title: editValues.title,
          url: editValues.url,
          description: editValues.description || null,
          sort_order: 0,
          is_active: true,
        },
      });
      setSaving(false);
      if (ok && data?.useful_link) {
        setLinks((prev) =>
          prev.map((l) => (l.id === id ? data.useful_link! : l)),
        );
        setEditingLinkId(null);
        setEditValues({});
        toast.success("Link updated");
      } else {
        toast.error((data as { msg?: string })?.msg ?? "Failed to update");
      }
    },
    [token, editValues],
  );

  const addLink = useCallback(async () => {
    if (!token || !newLink.title || !newLink.url) {
      toast.error("Title and URL are required");
      return;
    }
    setSaving(true);
    const { data, ok } = await api<{
      useful_link?: UsefulLink;
      msg?: string;
    }>("/api/db/useful-links", "POST", {
      token,
      body: {
        title: newLink.title,
        url: newLink.url,
        description: newLink.description || null,
        sort_order: links.length,
        is_active: true,
      },
    });
    setSaving(false);
    if (ok && data?.useful_link) {
      setLinks((prev) => [data.useful_link!, ...prev]);
      setNewLink({ title: "", url: "", description: "" });
      setAdding(false);
      toast.success("Link added");
    } else {
      toast.error((data as { msg?: string })?.msg ?? "Failed to add link");
    }
  }, [token, newLink, links.length]);

  const removeLink = useCallback(
    async (id: number) => {
      if (!token) return;
      setSaving(true);
      const { ok } = await api(`/api/db/useful-links/${id}`, "DELETE", {
        token,
      });
      setSaving(false);
      if (ok) {
        setLinks((prev) => prev.filter((l) => l.id !== id));
        setEditingLinkId(null);
        toast.success("Link removed");
      } else {
        toast.error("Failed to remove link");
      }
    },
    [token],
  );

  const category = (link: UsefulLink) =>
    (link.metadata?.category as string) || "general";

  return (
    <Card className="h-full min-h-0 flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <Link2 className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-foreground">Useful Links</CardTitle>
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
            onClick={() => {
              if (editing) cancelEdit();
              setEditing(!editing);
            }}
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
              <div className="flex flex-col gap-2 p-2.5 rounded-lg bg-secondary/50 border border-dashed border-border">
                <Input
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink({ ...newLink, title: e.target.value })
                  }
                  placeholder="Link title"
                  className="text-sm"
                  disabled={saving}
                />
                <Input
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                  placeholder="URL (e.g., https://...)"
                  className="text-sm"
                  disabled={saving}
                />
                <Input
                  value={newLink.description}
                  onChange={(e) =>
                    setNewLink({ ...newLink, description: e.target.value })
                  }
                  placeholder="Description (optional)"
                  className="text-sm"
                  disabled={saving}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={addLink}
                    className="bg-primary text-primary-foreground"
                    disabled={saving}
                  >
                    <Check className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setAdding(false)}
                    disabled={saving}
                  >
                    <X className="h-3.5 w-3.5 mr-1" /> Cancel
                  </Button>
                </div>
              </div>
            )}
            {loading ? (
              <p className="text-sm text-muted-foreground py-4">Loading...</p>
            ) : error ? (
              <p className="text-sm text-destructive py-4">{error}</p>
            ) : links.length === 0 && !adding ? (
              <p className="text-sm text-muted-foreground py-4">
                No useful links yet.
              </p>
            ) : (
              links.map((link, i) => (
                <div key={link.id ?? i} className="group">
                  {link.id != null && editingLinkId === link.id ? (
                    <div className="flex flex-col gap-2 p-2 rounded-lg bg-secondary/50">
                      <Input
                        value={editValues.title ?? ""}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            title: e.target.value,
                          })
                        }
                        placeholder="Link title"
                        className="text-sm"
                        disabled={saving}
                      />
                      <Input
                        value={editValues.url ?? ""}
                        onChange={(e) =>
                          setEditValues({ ...editValues, url: e.target.value })
                        }
                        placeholder="URL"
                        className="text-sm"
                        disabled={saving}
                      />
                      <Input
                        value={editValues.description ?? ""}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description (optional)"
                        className="text-sm"
                        disabled={saving}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => saveEdit(link.id!)}
                          className="bg-primary text-primary-foreground"
                          disabled={saving}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={cancelEdit}
                          disabled={saving}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-secondary/60">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate"
                          >
                            {link.title}
                          </a>
                          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                        {link.description && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {link.description}
                          </p>
                        )}
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] shrink-0 border-0 ${categoryColors[category(link)] || "bg-secondary text-secondary-foreground"}`}
                      >
                        {category(link)}
                      </Badge>
                      {editing && link.id != null && (
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={() => startEdit(link)}
                            disabled={saving}
                          >
                            <Pencil className="h-3 w-3 text-primary" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => removeLink(link.id!)}
                            disabled={saving}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
