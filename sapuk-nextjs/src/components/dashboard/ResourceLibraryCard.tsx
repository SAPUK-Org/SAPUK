"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  Pencil,
  Check,
  Trash2,
  FileText,
  Video,
  Image,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import type { Resource } from "@/components/dashboard/resources/ResourceDisplay";
import { EditResourceDialog } from "@/components/dashboard/resources/EditResourceDialog";

function ResourceTypeIcon({
  resourceType,
}: {
  resourceType: Resource["resource_type"];
}) {
  switch (resourceType) {
    case "image":
      return <Image className="h-4 w-4" />;
    case "document":
      return <FileText className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}

const typeColors: Record<string, string> = {
  document: "bg-chart-5/15 text-chart-5",
  video: "bg-primary/10 text-primary",
  image: "bg-accent/15 text-accent-foreground",
  other: "bg-chart-3/15 text-chart-3",
};

function isNewResource(createdAt?: string): boolean {
  if (!createdAt) return false;
  const created = new Date(createdAt).getTime();
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return created > weekAgo;
}

export function ResourceLibraryCard() {
  const { token } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);
  const [editFileName, setEditFileName] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [savingId, setSavingId] = useState<number | null>(null);

  const startEdit = useCallback((resource: Resource) => {
    setResourceToEdit(resource);
    setEditFileName(resource.file_name);
    setEditNotes(resource.notes ?? "");
  }, []);

  const closeEdit = useCallback(() => {
    setResourceToEdit(null);
    setEditFileName("");
    setEditNotes("");
  }, []);

  const saveEdit = useCallback(
    async () => {
      if (!token || !resourceToEdit) return;
      const trimmed = editFileName.trim();
      if (!trimmed) {
        toast.error("File name is required");
        return;
      }
      setSavingId(resourceToEdit.id);
      const { data, ok } = await api<{ resource?: Resource; msg?: string }>(
        `/api/resources/${resourceToEdit.id}`,
        "PATCH",
        {
          token,
          body: {
            url: resourceToEdit.url,
            mime_type: resourceToEdit.mime_type,
            file_name: trimmed,
            file_key: resourceToEdit.file_key ?? null,
            uploaded_by: resourceToEdit.uploaded_by ?? null,
            attachable_type: resourceToEdit.attachable_type ?? null,
            attachable_id: resourceToEdit.attachable_id ?? null,
            metadata: resourceToEdit.metadata ?? null,
            notes: editNotes.trim() || null,
          },
        },
      );
      setSavingId(null);
      if (ok && data?.resource) {
        setResources((prev) =>
          prev.map((r) => (r.id === resourceToEdit.id ? data.resource! : r)),
        );
        closeEdit();
        toast.success("Resource updated");
      } else {
        toast.error(
          (data as { msg?: string })?.msg ?? "Failed to update resource",
        );
      }
    },
    [token, resourceToEdit, editFileName, editNotes, closeEdit],
  );

  const fetchResources = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const { data, ok } = await api<{ resources?: Resource[]; msg?: string }>(
      "/api/resources",
      "GET",
      { token },
    );
    setLoading(false);
    if (ok && data?.resources) {
      setResources(data.resources);
    } else {
      setError((data as { msg?: string })?.msg ?? "Failed to load resources");
      setResources([]);
    }
  }, [token]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const removeResource = useCallback(
    async (id: number) => {
      if (!token) return;
      setDeletingId(id);
      const { ok } = await api(`/api/resources/${id}`, "DELETE", { token });
      setDeletingId(null);
      if (ok) {
        setResources((prev) => prev.filter((r) => r.id !== id));
        toast.success("Resource removed");
      } else {
        toast.error("Failed to remove resource");
      }
    },
    [token],
  );

  return (
    <>
    <Card className="h-full min-h-0 flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-chart-5/15">
            <BookOpen className="h-4 w-4 text-chart-5" />
          </div>
          <CardTitle className="text-foreground">Resource Library</CardTitle>
        </div>
        <CardAction>
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
          <div className="flex flex-col gap-2">
            {loading ? (
              <p className="text-sm text-muted-foreground py-4">Loading...</p>
            ) : error ? (
              <p className="text-sm text-destructive py-4">{error}</p>
            ) : resources.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                No resources yet.{" "}
                <Link
                  href="/dashboard/resources"
                  className="text-primary hover:underline"
                >
                  Upload files
                </Link>{" "}
                to add them.
              </p>
            ) : (
              resources.map((resource) => (
                <div
                  key={resource.id}
                  className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-secondary/60"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${
                      typeColors[resource.resource_type] ?? typeColors.other
                    }`}
                  >
                    <ResourceTypeIcon resourceType={resource.resource_type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate"
                      >
                        {resource.file_name}
                      </a>
                      {isNewResource(resource.created_at) && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0"
                        >
                          New
                        </Badge>
                      )}
                      <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {resource.notes || resource.mime_type}
                    </p>
                  </div>
                  {editing && (
                    <div className="flex gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground hover:text-primary shrink-0"
                        onClick={() => startEdit(resource)}
                        disabled={savingId === resource.id}
                      >
                        <Pencil className="h-3 w-3 text-primary" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => removeResource(resource.id)}
                        disabled={deletingId === resource.id}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
            <Link
              href="/dashboard/resources"
              className="text-sm text-primary hover:underline mt-1"
            >
              Manage resources
            </Link>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>

    <EditResourceDialog
      resource={resourceToEdit}
      open={!!resourceToEdit}
      onOpenChange={(open) => !open && closeEdit()}
      editFileName={editFileName}
      onEditFileNameChange={setEditFileName}
      editNotes={editNotes}
      onEditNotesChange={setEditNotes}
      onSave={saveEdit}
      isSaving={!!resourceToEdit && savingId === resourceToEdit.id}
    />
    </>
  );
}
