"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Event, EventFormValues } from "./types";
import { eventSchema } from "./types";
import { defaultEventValues, toDatetimeLocal } from "./events-utils";
import { EventCard } from "./EventCard";
import { EventFormDialog } from "./EventFormDialog";
import { DeleteEventDialog } from "./DeleteEventDialog";

export function EventsManagement() {
  const { token } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [targetEvent, setTargetEvent] = useState<Event | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const { data, ok } = await api<{ events?: Event[]; msg?: string }>(
      "/api/db/events",
      "GET",
      { token },
    );
    setLoading(false);
    if (ok && data?.events) {
      setEvents(data.events);
    } else {
      setError((data as { msg?: string })?.msg ?? "Failed to load events");
      setEvents([]);
    }
  }, [token]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const createForm = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultEventValues,
  });

  const editForm = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultEventValues,
  });

  const onCreateSubmit = async (values: EventFormValues) => {
    setActionError(null);
    setActionLoading(true);
    const body = {
      ...values,
      starts_at: values.starts_at
        ? new Date(values.starts_at).toISOString()
        : null,
      ends_at: values.ends_at ? new Date(values.ends_at).toISOString() : null,
    };
    const { data, ok } = await api("/api/db/events", "POST", {
      token,
      body,
    });
    setActionLoading(false);
    if (ok) {
      setCreateOpen(false);
      createForm.reset(defaultEventValues);
      fetchEvents();
    } else {
      setActionError(
        (data as { msg?: string })?.msg ?? "Failed to create event",
      );
    }
  };

  const onEditSubmit = async (values: EventFormValues) => {
    if (!targetEvent) return;
    setActionError(null);
    setActionLoading(true);
    const body = {
      ...values,
      starts_at: values.starts_at
        ? new Date(values.starts_at).toISOString()
        : null,
      ends_at: values.ends_at ? new Date(values.ends_at).toISOString() : null,
    };
    const { data, ok } = await api(`/api/db/events/${targetEvent.id}`, "PUT", {
      token,
      body,
    });
    setActionLoading(false);
    if (ok) {
      setEditOpen(false);
      setTargetEvent(null);
      fetchEvents();
    } else {
      setActionError(
        (data as { msg?: string })?.msg ?? "Failed to update event",
      );
    }
  };

  const onDeleteConfirm = async () => {
    if (!targetEvent) return;
    setActionError(null);
    setActionLoading(true);
    const { data, ok } = await api(
      `/api/db/events/${targetEvent.id}`,
      "DELETE",
      {
        token,
      },
    );
    setActionLoading(false);
    if (ok) {
      setDeleteOpen(false);
      setTargetEvent(null);
      fetchEvents();
    } else {
      setActionError(
        (data as { msg?: string })?.msg ?? "Failed to delete event",
      );
    }
  };

  const openEdit = (event: Event) => {
    setTargetEvent(event);
    editForm.reset({
      title: event.title,
      description: event.description,
      cover_image: event.cover_image ?? "",
      starts_at: event.starts_at ? toDatetimeLocal(event.starts_at) : undefined,
      ends_at: event.ends_at ? toDatetimeLocal(event.ends_at) : undefined,
      location: event.location,
      type: event.type,
      max_volunteers: event.max_volunteers ?? undefined,
    });
    setEditOpen(true);
  };

  const openDelete = (event: Event) => {
    setTargetEvent(event);
    setActionError(null);
    setDeleteOpen(true);
  };

  const handleCancelForm = () => {
    createForm.reset(defaultEventValues);
    editForm.reset(defaultEventValues);
    setCreateOpen(false);
    setEditOpen(false);
    setTargetEvent(null);
  };

  const sortedEvents = [...events].sort((a, b) => {
    const aTime = a.starts_at ? new Date(a.starts_at).getTime() : NaN;
    const bTime = b.starts_at ? new Date(b.starts_at).getTime() : NaN;
    const aVal = Number.isNaN(aTime) ? Infinity : aTime;
    const bVal = Number.isNaN(bTime) ? Infinity : bTime;
    return aVal - bVal;
  });

  return (
    <div className="flex flex-col bg-background p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All events</CardTitle>
          <Button onClick={() => setCreateOpen(true)}>Add event</Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground py-8 text-center">
              Loading events…
            </p>
          ) : error ? (
            <p className="text-destructive py-8 text-center">{error}</p>
          ) : events.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No events yet. Create one to get started.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={openEdit}
                  onDelete={openDelete}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EventFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Create event"
        description="Add a new event. All fields are required."
        form={createForm}
        onSubmit={onCreateSubmit}
        actionError={actionError}
        actionLoading={actionLoading}
        onCancel={handleCancelForm}
      />

      <EventFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit event"
        description="Update the event details."
        form={editForm}
        onSubmit={onEditSubmit}
        actionError={actionError}
        actionLoading={actionLoading}
        onCancel={handleCancelForm}
      />

      <DeleteEventDialog
        event={targetEvent}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setTargetEvent(null);
        }}
        onConfirm={onDeleteConfirm}
        actionError={actionError}
        actionLoading={actionLoading}
      />
    </div>
  );
}
