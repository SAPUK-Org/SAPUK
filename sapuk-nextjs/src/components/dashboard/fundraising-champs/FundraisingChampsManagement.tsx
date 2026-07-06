"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import type { FundraisingChamp } from "@/types/cms";
import {
  champSchema,
  champToFormValues,
  defaultChampValues,
  toChampApiBody,
  type ChampFormValues,
} from "./types";
import { ChampCard } from "./ChampCard";
import { ChampFormDialog } from "./ChampFormDialog";
import { DeleteChampDialog } from "./DeleteChampDialog";

export function FundraisingChampsManagement() {
  const { token } = useAuth();
  const [champs, setChamps] = useState<FundraisingChamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [targetChamp, setTargetChamp] = useState<FundraisingChamp | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const fetchChamps = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const { data, ok } = await api<{
      fundraising_champs?: FundraisingChamp[];
      msg?: string;
    }>("/api/db/fundraising-champs", "GET", { token });
    setLoading(false);
    if (ok && data?.fundraising_champs) {
      setChamps(data.fundraising_champs);
    } else {
      setError((data as { msg?: string })?.msg ?? "Failed to load champs");
      setChamps([]);
    }
  }, [token]);

  useEffect(() => {
    fetchChamps();
  }, [fetchChamps]);

  const createForm = useForm<ChampFormValues>({
    resolver: zodResolver(champSchema) as unknown as Resolver<ChampFormValues>,
    defaultValues: defaultChampValues,
  });

  const editForm = useForm<ChampFormValues>({
    resolver: zodResolver(champSchema) as unknown as Resolver<ChampFormValues>,
    defaultValues: defaultChampValues,
  });

  const onCreateSubmit = async (values: ChampFormValues) => {
    setActionError(null);
    setActionLoading(true);
    const { data, ok } = await api<{ msg?: string }>(
      "/api/db/fundraising-champs",
      "POST",
      { token, body: toChampApiBody(values) },
    );
    setActionLoading(false);
    if (!ok) {
      setActionError((data as { msg?: string })?.msg ?? "Failed to create champ");
      return;
    }
    setCreateOpen(false);
    createForm.reset(defaultChampValues);
    fetchChamps();
  };

  const onEditSubmit = async (values: ChampFormValues) => {
    if (!targetChamp) return;
    setActionError(null);
    setActionLoading(true);
    const { data, ok } = await api<{ msg?: string }>(
      `/api/db/fundraising-champs/${targetChamp.id}`,
      "PUT",
      { token, body: toChampApiBody(values) },
    );
    setActionLoading(false);
    if (!ok) {
      setActionError((data as { msg?: string })?.msg ?? "Failed to update champ");
      return;
    }
    setEditOpen(false);
    setTargetChamp(null);
    fetchChamps();
  };

  const onDeleteConfirm = async () => {
    if (!targetChamp) return;
    setActionLoading(true);
    const { ok } = await api(
      `/api/db/fundraising-champs/${targetChamp.id}`,
      "DELETE",
      { token },
    );
    setActionLoading(false);
    if (ok) {
      setDeleteOpen(false);
      setTargetChamp(null);
      fetchChamps();
    }
  };

  const onToggleActive = async (champ: FundraisingChamp) => {
    const currentlyActive = champ.is_active !== false;
    setTogglingId(champ.id);
    const { ok } = await api(
      `/api/db/fundraising-champs/${champ.id}/active`,
      "PATCH",
      { token, body: { is_active: !currentlyActive } },
    );
    setTogglingId(null);
    if (ok) fetchChamps();
  };

  return (
    <div className="flex flex-col space-y-6 bg-background p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Fundraising Champs</h1>
          <p className="text-sm text-muted-foreground">
            Manage individuals and businesses featured on the fundraise pages.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>Add champ</Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : champs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No fundraising champs yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {champs.map((champ) => (
            <ChampCard
              key={champ.id}
              champ={champ}
              onToggleActive={onToggleActive}
              isToggleLoading={togglingId === champ.id}
              onEdit={(c) => {
                setTargetChamp(c);
                editForm.reset(champToFormValues(c));
                setEditOpen(true);
              }}
              onDelete={(c) => {
                setTargetChamp(c);
                setDeleteOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <ChampFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Add fundraising champ"
        description="Create a new fundraising champion profile for the public site."
        form={createForm}
        onSubmit={onCreateSubmit}
        actionError={actionError}
        actionLoading={actionLoading}
        onCancel={() => setCreateOpen(false)}
      />

      <ChampFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit fundraising champ"
        description="Update this fundraising champion profile."
        form={editForm}
        onSubmit={onEditSubmit}
        actionError={actionError}
        actionLoading={actionLoading}
        onCancel={() => setEditOpen(false)}
        slugAuto={false}
      />

      <DeleteChampDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        champ={targetChamp}
        onConfirm={onDeleteConfirm}
        loading={actionLoading}
      />
    </div>
  );
}
