"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import type { CommunityCause } from "@/types/cms";
import {
  causeSchema,
  causeToFormValues,
  defaultCauseValues,
  toCauseApiBody,
  type CauseFormValues,
} from "./types";
import { CauseCard } from "./CauseCard";
import { CauseFormDialog } from "./CauseFormDialog";
import { DeleteCauseDialog } from "./DeleteCauseDialog";

export function CommunityCausesManagement() {
  const { token } = useAuth();
  const [causes, setCauses] = useState<CommunityCause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [targetCause, setTargetCause] = useState<CommunityCause | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const fetchCauses = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const { data, ok } = await api<{
      community_causes?: CommunityCause[];
      msg?: string;
    }>("/api/db/community-causes", "GET", { token });
    setLoading(false);
    if (ok && data?.community_causes) {
      setCauses(data.community_causes);
    } else {
      setError((data as { msg?: string })?.msg ?? "Failed to load causes");
      setCauses([]);
    }
  }, [token]);

  useEffect(() => {
    fetchCauses();
  }, [fetchCauses]);

  const createForm = useForm<CauseFormValues>({
    resolver: zodResolver(causeSchema) as unknown as Resolver<CauseFormValues>,
    defaultValues: defaultCauseValues,
  });

  const editForm = useForm<CauseFormValues>({
    resolver: zodResolver(causeSchema) as unknown as Resolver<CauseFormValues>,
    defaultValues: defaultCauseValues,
  });

  const onCreateSubmit = async (values: CauseFormValues) => {
    setActionError(null);
    setActionLoading(true);
    const { data, ok } = await api<{ msg?: string }>(
      "/api/db/community-causes",
      "POST",
      { token, body: toCauseApiBody(values) },
    );
    setActionLoading(false);
    if (!ok) {
      setActionError((data as { msg?: string })?.msg ?? "Failed to create cause");
      return;
    }
    setCreateOpen(false);
    createForm.reset(defaultCauseValues);
    fetchCauses();
  };

  const onEditSubmit = async (values: CauseFormValues) => {
    if (!targetCause) return;
    setActionError(null);
    setActionLoading(true);
    const { data, ok } = await api<{ msg?: string }>(
      `/api/db/community-causes/${targetCause.id}`,
      "PUT",
      { token, body: toCauseApiBody(values) },
    );
    setActionLoading(false);
    if (!ok) {
      setActionError((data as { msg?: string })?.msg ?? "Failed to update cause");
      return;
    }
    setEditOpen(false);
    setTargetCause(null);
    fetchCauses();
  };

  const onDeleteConfirm = async () => {
    if (!targetCause) return;
    setActionLoading(true);
    const { ok } = await api(
      `/api/db/community-causes/${targetCause.id}`,
      "DELETE",
      { token },
    );
    setActionLoading(false);
    if (ok) {
      setDeleteOpen(false);
      setTargetCause(null);
      fetchCauses();
    }
  };

  const onToggleActive = async (cause: CommunityCause) => {
    const currentlyActive = cause.is_active !== false;
    setTogglingId(cause.id);
    const { ok } = await api(
      `/api/db/community-causes/${cause.id}/active`,
      "PATCH",
      { token, body: { is_active: !currentlyActive } },
    );
    setTogglingId(null);
    if (ok) fetchCauses();
  };

  return (
    <div className="flex flex-col space-y-6 bg-background p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Community Causes</h1>
          <p className="text-sm text-muted-foreground">
            Manage causes and individuals featured on the community page.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>Add cause</Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : causes.length === 0 ? (
        <p className="text-sm text-muted-foreground">No community causes yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {causes.map((cause) => (
            <CauseCard
              key={cause.id}
              cause={cause}
              onToggleActive={onToggleActive}
              isToggleLoading={togglingId === cause.id}
              onEdit={(c) => {
                setTargetCause(c);
                editForm.reset(causeToFormValues(c));
                setEditOpen(true);
              }}
              onDelete={(c) => {
                setTargetCause(c);
                setDeleteOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <CauseFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Add community cause"
        description="Create a new cause or individual to feature on the community page."
        form={createForm}
        onSubmit={onCreateSubmit}
        actionError={actionError}
        actionLoading={actionLoading}
        onCancel={() => setCreateOpen(false)}
      />

      <CauseFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit community cause"
        description="Update this community cause profile."
        form={editForm}
        onSubmit={onEditSubmit}
        actionError={actionError}
        actionLoading={actionLoading}
        onCancel={() => setEditOpen(false)}
      />

      <DeleteCauseDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        cause={targetCause}
        onConfirm={onDeleteConfirm}
        loading={actionLoading}
      />
    </div>
  );
}
