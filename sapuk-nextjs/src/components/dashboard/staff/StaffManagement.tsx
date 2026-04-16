"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type StaffMember,
  type CreateStaffValues,
  type EditStaffValues,
  createStaffSchema,
  editStaffSchema,
} from "./types";
import { StaffFilters } from "./StaffFilters";
import { StaffTable } from "./StaffTable";
import { StaffCardList } from "./StaffCardList";
import { StaffPagination } from "./StaffPagination";
import { CreateStaffDialog } from "./CreateStaffDialog";
import { EditStaffDialog } from "./EditStaffDialog";
import { DeleteStaffDialog } from "./DeleteStaffDialog";

export function StaffManagement({ token }: { token: string }) {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, activeFilter]);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [targetStaff, setTargetStaff] = useState<StaffMember | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, ok, status } = await api<{
      staffMembers?: StaffMember[];
      total?: number;
      msg?: string;
    }>("/api/db/staff", "GET", {
      token,
      searchParams: {
        page,
        limit,
        ...(search && { search }),
        ...(roleFilter !== "all" && { role: roleFilter }),
        ...(activeFilter !== "all" && {
          is_active: activeFilter === "active",
        }),
      },
    });
    setLoading(false);
    if (ok && data?.staffMembers) {
      setStaff(data.staffMembers);
      setTotal(data.total ?? data.staffMembers.length);
    } else if (status === 404) {
      setStaff([]);
      setTotal(0);
    } else {
      setError((data as { msg?: string })?.msg ?? "Failed to load staff");
      setStaff([]);
    }
  }, [token, page, limit, search, roleFilter, activeFilter]);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const createForm = useForm<CreateStaffValues>({
    resolver: zodResolver(createStaffSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "staff",
    },
  });

  const editForm = useForm<EditStaffValues>({
    resolver: zodResolver(editStaffSchema),
    defaultValues: { username: "", email: "", role: "staff" },
  });

  const onCreateSubmit = async (values: CreateStaffValues) => {
    setActionError(null);
    setActionLoading(true);
    const { data, ok } = await api("/api/db/staff", "POST", {
      token,
      body: values,
    });
    setActionLoading(false);
    if (ok) {
      setCreateOpen(false);
      createForm.reset();
      fetchStaff();
    } else {
      setActionError((data as { msg?: string })?.msg ?? "Failed to create");
    }
  };

  const onEditSubmit = async (values: EditStaffValues) => {
    if (!targetStaff) return;
    setActionError(null);
    setActionLoading(true);
    const { data, ok } = await api(`/api/db/staff/${targetStaff.id}`, "PUT", {
      token,
      body: values,
    });
    setActionLoading(false);
    if (ok) {
      setEditOpen(false);
      setTargetStaff(null);
      fetchStaff();
    } else {
      setActionError((data as { msg?: string })?.msg ?? "Failed to update");
    }
  };

  const onDeleteConfirm = async () => {
    if (!targetStaff) return;
    setActionError(null);
    setActionLoading(true);
    const { data, ok } = await api(
      `/api/db/staff/${targetStaff.id}`,
      "DELETE",
      { token },
    );
    setActionLoading(false);
    if (ok) {
      setDeleteOpen(false);
      setTargetStaff(null);
      fetchStaff();
    } else {
      setActionError((data as { msg?: string })?.msg ?? "Failed to delete");
    }
  };

  const changeRole = async (id: number, role: string) => {
    setActionError(null);
    const { data, ok } = await api(`/api/db/staff/${id}/role`, "PATCH", {
      token,
      body: { role },
    });
    if (ok) {
      fetchStaff();
    } else {
      setActionError(
        (data as { msg?: string })?.msg ?? "Failed to update role",
      );
    }
  };

  const toggleActive = async (member: StaffMember) => {
    setActionError(null);
    const path = member.is_active ? "deactivate" : "activate";
    const { data, ok } = await api(
      `/api/db/staff/${member.id}/${path}`,
      "PATCH",
      { token },
    );
    if (ok) {
      fetchStaff();
    } else {
      setActionError((data as { msg?: string })?.msg ?? "Failed to update");
    }
  };

  const openEdit = (member: StaffMember) => {
    setTargetStaff(member);
    editForm.reset({
      username: member.username,
      email: member.email,
      role: member.role as "admin" | "editor" | "staff",
    });
    setEditOpen(true);
  };

  const openDelete = (member: StaffMember) => {
    setTargetStaff(member);
    setActionError(null);
    setDeleteOpen(true);
  };

  const handleCreateCancel = () => {
    setCreateOpen(false);
  };

  const handleEditCancel = () => {
    setEditOpen(false);
    setTargetStaff(null);
  };

  return (
    <Card className="my-6">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Volunteer management</CardTitle>
          <CardDescription>Manage volunteer accounts and roles</CardDescription>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="w-full sm:w-auto"
        >
          Add volunteer
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {actionError && (
          <p className="text-sm text-destructive font-medium">{actionError}</p>
        )}
        <StaffFilters
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearch={() => setSearch(searchInput)}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          activeFilter={activeFilter}
          onActiveFilterChange={setActiveFilter}
        />
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : staff.length === 0 ? (
          <p className="text-muted-foreground">No volunteers found</p>
        ) : (
          <>
            <div className="md:hidden">
              <StaffCardList
                staff={staff}
                onChangeRole={changeRole}
                onToggleActive={toggleActive}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            </div>
            <div className="hidden md:block">
              <StaffTable
                staff={staff}
                onChangeRole={changeRole}
                onToggleActive={toggleActive}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            </div>
          </>
        )}
        <StaffPagination
          page={page}
          total={total}
          limit={limit}
          onPrevious={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      </CardContent>

      <CreateStaffDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        form={createForm}
        onSubmit={onCreateSubmit}
        actionLoading={actionLoading}
        onCancel={handleCreateCancel}
      />

      <EditStaffDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        form={editForm}
        onSubmit={onEditSubmit}
        actionLoading={actionLoading}
        onCancel={handleEditCancel}
      />

      <DeleteStaffDialog
        staff={targetStaff}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={onDeleteConfirm}
        actionLoading={actionLoading}
      />
    </Card>
  );
}
