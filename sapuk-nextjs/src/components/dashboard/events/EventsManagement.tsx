"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { useUploadThing } from "@/lib/uploadthing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import type { Event, EventFormValues, EventGalleryResource } from "./types";
import { EVENT_ATTACHABLE_TYPE, eventSchema } from "./types";
import {
  defaultEventValues,
  eventEarliestStart,
  inferScheduleMode,
  normalizeEventLocations,
  toDatetimeLocal,
} from "./events-utils";
import { EventCard } from "./EventCard";
import { EventFormDialog } from "./EventFormDialog";
import { DeleteEventDialog } from "./DeleteEventDialog";

function toEventApiBody(values: EventFormValues) {
  const external_links = values.external_links
    .filter((l) => l.label.trim() && l.url.trim())
    .map((l) => ({
      label: l.label.trim(),
      url: l.url.trim(),
      kind: l.kind,
    }));

  const studio_partners = values.studio_partners
    .filter((p) => {
      const name = p.name.trim();
      const loc = (p.location ?? "").trim();
      const img = (p.imageSrc ?? "").trim();
      const desc = (p.description ?? "").trim();
      const hasSocial = (p.socialLinks ?? []).some(
        (s) => s.network.trim() && s.url.trim(),
      );
      return name || loc || img || desc || hasSocial;
    })
    .map((p) => ({
      name: p.name.trim(),
      location: (p.location ?? "").trim() || null,
      imageSrc: (p.imageSrc ?? "").trim() || null,
      description: (p.description ?? "").trim() || null,
      socialLinks: (p.socialLinks ?? [])
        .filter((s) => s.network.trim() && s.url.trim())
        .map((s) => ({
          network: s.network.trim(),
          url: s.url.trim(),
        })),
    }));

  const location = values.location.map((l) => l.trim()).filter(Boolean);
  const type = (values.type ?? "").trim() || null;
  const max_volunteers =
    values.max_volunteers != null && !Number.isNaN(values.max_volunteers)
      ? values.max_volunteers
      : null;

  const { schedule_mode, location: _locations, type: _type, max_volunteers: _max, ...rest } = values;

  if (schedule_mode === "single") {
    return {
      ...rest,
      location,
      type,
      max_volunteers,
      external_links,
      studio_partners,
      dates_description: null,
      schedule_slots: [],
      starts_at: new Date(values.starts_at).toISOString(),
      ends_at: new Date(values.ends_at).toISOString(),
    };
  }

  if (schedule_mode === "multiple") {
    return {
      ...rest,
      location,
      type,
      max_volunteers,
      external_links,
      studio_partners,
      dates_description: null,
      starts_at: null,
      ends_at: null,
      schedule_slots: values.schedule_slots.map((slot) => ({
        starts_at: new Date(slot.starts_at).toISOString(),
        ends_at: new Date(slot.ends_at).toISOString(),
      })),
    };
  }

  return {
    ...rest,
    location,
    type,
    max_volunteers,
    external_links,
    studio_partners,
    dates_description: (values.dates_description ?? "").trim() || null,
    schedule_slots: [],
    starts_at: null,
    ends_at: null,
  };
}

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
  const [createPendingFiles, setCreatePendingFiles] = useState<File[]>([]);
  const [editPendingFiles, setEditPendingFiles] = useState<File[]>([]);
  const [editGallery, setEditGallery] = useState<EventGalleryResource[]>([]);
  const [editGalleryLoading, setEditGalleryLoading] = useState(false);
  const [galleryRemovingId, setGalleryRemovingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const { startUpload, isUploading } = useUploadThing("resourceUploader", {
    onUploadError: (e) => {
      setActionError(e.message);
    },
  });

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

  const loadEditGallery = useCallback(
    async (eventId: number) => {
      if (!token) return;
      setEditGalleryLoading(true);
      const { data, ok } = await api<{ resources?: EventGalleryResource[] }>(
        "/api/resources",
        "GET",
        {
          token,
          searchParams: {
            attachable_type: EVENT_ATTACHABLE_TYPE,
            attachable_id: eventId,
          },
        },
      );
      setEditGalleryLoading(false);
      if (ok && Array.isArray(data?.resources)) {
        setEditGallery(
          data.resources.filter((r) => r.mime_type?.startsWith("image/")),
        );
      } else {
        setEditGallery([]);
      }
    },
    [token],
  );

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (!editOpen || !targetEvent?.id) {
      setEditGallery([]);
      return;
    }
    loadEditGallery(targetEvent.id);
  }, [editOpen, targetEvent?.id, loadEditGallery]);

  const createForm = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema) as unknown as Resolver<EventFormValues>,
    defaultValues: defaultEventValues,
  });

  const editForm = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema) as unknown as Resolver<EventFormValues>,
    defaultValues: defaultEventValues,
  });

  const formBusy = actionLoading || isUploading;

  const onCreateSubmit = async (values: EventFormValues) => {
    setActionError(null);
    setActionLoading(true);
    try {
      const body = toEventApiBody(values);
      const { data, ok } = await api<{ event?: { id: number }; msg?: string }>(
        "/api/db/events",
        "POST",
        {
          token,
          body,
        },
      );
      if (!ok) {
        setActionError(
          (data as { msg?: string })?.msg ?? "Failed to create event",
        );
        return;
      }
      const eventId = data?.event?.id;
      if (eventId == null || !Number.isFinite(eventId)) {
        setActionError("Invalid response from server");
        return;
      }

      if (createPendingFiles.length > 0) {
        const uploaded = await startUpload(createPendingFiles, {
          attachableType: EVENT_ATTACHABLE_TYPE,
          attachableId: eventId,
        });
        if (uploaded == null) {
          setActionError("Image upload was cancelled or failed.");
          return;
        }
        if (!values.cover_image?.trim()) {
          const first = uploaded[0];
          const firstUrl =
            first &&
            ("ufsUrl" in first && first.ufsUrl
              ? first.ufsUrl
              : "url" in first && first.url
                ? first.url
                : null);
          if (firstUrl) {
            await api(`/api/db/events/${eventId}`, "PUT", {
              token,
              body: { ...toEventApiBody(values), cover_image: firstUrl },
            });
          }
        }
      }

      setCreateOpen(false);
      setCreatePendingFiles([]);
      createForm.reset(defaultEventValues);
      fetchEvents();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Image upload failed",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const onEditSubmit = async (values: EventFormValues) => {
    if (!targetEvent) return;
    setActionError(null);
    setActionLoading(true);
    try {
      const body = toEventApiBody(values);
      const { data, ok } = await api<{ msg?: string }>(
        `/api/db/events/${targetEvent.id}`,
        "PUT",
        {
          token,
          body,
        },
      );
      if (!ok) {
        setActionError(
          (data as { msg?: string })?.msg ?? "Failed to update event",
        );
        return;
      }

      if (editPendingFiles.length > 0) {
        const uploaded = await startUpload(editPendingFiles, {
          attachableType: EVENT_ATTACHABLE_TYPE,
          attachableId: targetEvent.id,
        });
        if (uploaded == null) {
          setActionError("Image upload was cancelled or failed.");
          return;
        }
      }

      setEditOpen(false);
      setEditPendingFiles([]);
      setTargetEvent(null);
      fetchEvents();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Image upload failed",
      );
    } finally {
      setActionLoading(false);
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

  const onRemoveGalleryImage = async (resourceId: number) => {
    if (!token || !targetEvent) return;
    setGalleryRemovingId(resourceId);
    setActionError(null);
    const { data, ok } = await api(`/api/resources/${resourceId}`, "DELETE", {
      token,
    });
    setGalleryRemovingId(null);
    if (!ok) {
      setActionError(
        (data as { msg?: string })?.msg ?? "Failed to remove image",
      );
      return;
    }
    await loadEditGallery(targetEvent.id);
  };

  const openEdit = (event: Event) => {
    setTargetEvent(event);
    setEditPendingFiles([]);
    const mode = inferScheduleMode(event);
    editForm.reset({
      title: event.title,
      description: event.description,
      cover_image: event.cover_image ?? "",
      schedule_mode: mode,
      dates_description:
        mode === "prose" ? (event.dates_description ?? "") : "",
      starts_at:
        mode === "single" && event.starts_at
          ? toDatetimeLocal(event.starts_at)
          : "",
      ends_at:
        mode === "single" && event.ends_at
          ? toDatetimeLocal(event.ends_at)
          : "",
      schedule_slots:
        mode === "multiple"
          ? (event.schedule_slots ?? []).map((slot) => ({
              starts_at: toDatetimeLocal(slot.starts_at),
              ends_at: toDatetimeLocal(slot.ends_at),
            }))
          : [],
      location: (() => {
        const locs = normalizeEventLocations(event.location);
        return locs.length > 0 ? locs : [""];
      })(),
      type: event.type ?? "",
      max_volunteers: event.max_volunteers ?? undefined,
      is_active: event.is_active !== false,
      external_links: Array.isArray(event.external_links)
        ? event.external_links.map((l) => ({
            label: l.label,
            url: l.url,
            kind: l.kind,
          }))
        : [],
      studio_partners: Array.isArray(event.studio_partners)
        ? event.studio_partners.map((p) => ({
            name: p.name ?? "",
            location: p.location ?? "",
            imageSrc: p.imageSrc ?? "",
            description: p.description ?? "",
            socialLinks: Array.isArray(p.socialLinks)
              ? p.socialLinks.map((s) => ({
                  network: s.network,
                  url: s.url,
                }))
              : [],
          }))
        : [],
    });
    setEditOpen(true);
  };

  const openDelete = (event: Event) => {
    setTargetEvent(event);
    setActionError(null);
    setDeleteOpen(true);
  };

  const onToggleActive = async (event: Event) => {
    if (!token) return;
    const currentlyActive = event.is_active !== false;
    setTogglingId(event.id);
    setActionError(null);
    const { data, ok } = await api<{ msg?: string }>(
      `/api/db/events/${event.id}/active`,
      "PATCH",
      {
        token,
        body: { is_active: !currentlyActive },
      },
    );
    setTogglingId(null);
    if (!ok) {
      setActionError(
        (data as { msg?: string })?.msg ?? "Failed to update visibility",
      );
      return;
    }
    setActionError(null);
    await fetchEvents();
  };

  const handleCancelForm = () => {
    createForm.reset(defaultEventValues);
    editForm.reset(defaultEventValues);
    setCreatePendingFiles([]);
    setEditPendingFiles([]);
    setCreateOpen(false);
    setEditOpen(false);
    setTargetEvent(null);
  };

  const sortedEvents = [...events].sort((a, b) => {
    const aVal = eventEarliestStart(a) ?? Infinity;
    const bVal = eventEarliestStart(b) ?? Infinity;
    return aVal - bVal;
  });

  return (
    <div className="flex flex-col bg-background p-6">
      {actionError && !createOpen && !editOpen && !deleteOpen ? (
        <p className="mb-4 text-sm text-destructive" role="alert">
          {actionError}
        </p>
      ) : null}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All events</CardTitle>
          <Button
            onClick={() => {
              setCreatePendingFiles([]);
              setActionError(null);
              setCreateOpen(true);
            }}
          >
            Add event
          </Button>
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
                  onToggleActive={onToggleActive}
                  isToggleLoading={togglingId === event.id}
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
        onOpenChange={(open) => {
          setCreateOpen(open);
          if (!open) {
            setCreatePendingFiles([]);
            setActionError(null);
          }
        }}
        title="Create event"
        description="Add a new event. Required fields must be filled. Uncheck “Visible on public projects page” to hide it from the marketing site."
        form={createForm}
        onSubmit={onCreateSubmit}
        actionError={actionError}
        actionLoading={formBusy}
        onCancel={handleCancelForm}
        pendingImageFiles={createPendingFiles}
        onPendingImageFilesChange={setCreatePendingFiles}
        galleryResources={[]}
      />

      <EventFormDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) {
            setEditPendingFiles([]);
            setTargetEvent(null);
            setActionError(null);
          }
        }}
        title="Edit event"
        description="Update the event. Toggle visibility to show or hide it on the public projects page."
        form={editForm}
        onSubmit={onEditSubmit}
        actionError={actionError}
        actionLoading={formBusy}
        onCancel={handleCancelForm}
        pendingImageFiles={editPendingFiles}
        onPendingImageFilesChange={setEditPendingFiles}
        galleryResources={editGallery}
        galleryLoading={editGalleryLoading}
        onRemoveGalleryImage={onRemoveGalleryImage}
        galleryRemovingId={galleryRemovingId}
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
