"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Resource } from "@/components/dashboard/resources/ResourceDisplay";
import { toast } from "sonner";
import { ResourceCard } from "./ResourceCard";
import { EditResourceDialog } from "./EditResourceDialog";
import { DeleteResourceDialog } from "./DeleteResourceDialog";
import { ResourceUploadZone } from "./ResourceUploadZone";

export function ResourcesManagement() {
  const { token } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(
    null,
  );
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);
  const [editFileName, setEditFileName] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [savingId, setSavingId] = useState<number | null>(null);

  const fetchResources = useCallback(async (options?: { silent?: boolean }) => {
    if (!token) return;
    if (!options?.silent) {
      setLoading(true);
      setError(null);
    }
    const { data, ok } = await api<{ resources?: Resource[]; msg?: string }>(
      "/api/resources",
      "GET",
      { token },
    );
    if (!options?.silent) {
      setLoading(false);
    }
    if (ok && data?.resources) {
      setResources(data.resources);
    } else if (!options?.silent) {
      setError((data as { msg?: string })?.msg ?? "Failed to load resources");
      setResources([]);
    }
  }, [token]);

  const handleDelete = useCallback(
    async (resource: Resource) => {
      if (!token) return;
      setResourceToDelete(null);
      setDeletingId(resource.id);
      const { data, ok } = await api<{ resource?: Resource; msg?: string }>(
        `/api/resources/${resource.id}`,
        "DELETE",
        { token },
      );
      setDeletingId(null);
      if (ok) {
        toast.success("Resource deleted");
        fetchResources();
      } else {
        toast.error(
          (data as { msg?: string })?.msg ?? "Failed to delete resource",
        );
      }
    },
    [token, fetchResources],
  );

  const handleEditOpen = useCallback((resource: Resource) => {
    setResourceToEdit(resource);
    setEditFileName(resource.file_name);
    setEditNotes(resource.notes ?? "");
  }, []);

  const handleEditClose = useCallback(() => {
    setResourceToEdit(null);
    setEditFileName("");
    setEditNotes("");
  }, []);

  const handleEditSave = useCallback(async () => {
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
    if (ok) {
      toast.success("Resource updated");
      handleEditClose();
      fetchResources();
    } else {
      toast.error(
        (data as { msg?: string })?.msg ?? "Failed to update resource",
      );
    }
  }, [token, resourceToEdit, editFileName, editNotes, handleEditClose, fetchResources]);

  const handleUploadComplete = useCallback(async () => {
    await fetchResources({ silent: true });
  }, [fetchResources]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return (
    <div className="flex flex-col bg-background">
      <Card>
        <CardHeader>
          <CardTitle>All resources</CardTitle>
          <CardDescription>
            Resources are added automatically when you upload via the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground py-8 text-center">
              Loading resources…
            </p>
          ) : error ? (
            <p className="text-destructive py-8 text-center">{error}</p>
          ) : resources.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No resources yet. Upload files to add them.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onEdit={handleEditOpen}
                  onDelete={setResourceToDelete}
                  isDeleting={deletingId === resource.id}
                />
              ))}
            </div>
          )}

          <EditResourceDialog
            resource={resourceToEdit}
            open={!!resourceToEdit}
            onOpenChange={(open) => !open && handleEditClose()}
            editFileName={editFileName}
            onEditFileNameChange={setEditFileName}
            editNotes={editNotes}
            onEditNotesChange={setEditNotes}
            onSave={handleEditSave}
            isSaving={!!resourceToEdit && savingId === resourceToEdit.id}
          />

          <DeleteResourceDialog
            resource={resourceToDelete}
            open={!!resourceToDelete}
            onOpenChange={(open) => !open && setResourceToDelete(null)}
            onConfirm={() => resourceToDelete && handleDelete(resourceToDelete)}
          />

          <ResourceUploadZone
            onUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
              toast.error(`Upload failed: ${error.message}`);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
