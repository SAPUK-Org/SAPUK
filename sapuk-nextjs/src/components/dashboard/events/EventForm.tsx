"use client";

import { useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import type { EventFormProps } from "./types";

const MAX_GALLERY_IMAGES = 10;

function isImageFile(f: File) {
  return f.type.startsWith("image/");
}

export function EventForm({
  form,
  onSubmit,
  actionError,
  actionLoading,
  onCancel,
  pendingImageFiles,
  onPendingImageFilesChange,
  galleryResources,
  galleryLoading,
  onRemoveGalleryImage,
  galleryRemovingId,
}: EventFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const existingImageCount = galleryResources.filter((r) =>
    r.mime_type.startsWith("image/"),
  ).length;
  const maxPendingSlots = Math.max(0, MAX_GALLERY_IMAGES - existingImageCount);
  const slotsLeft = Math.max(0, maxPendingSlots - pendingImageFiles.length);

  const addPendingFiles = (list: FileList | File[]) => {
    const incoming = [...list].filter(isImageFile);
    if (incoming.length === 0) return;
    const merged = [...pendingImageFiles, ...incoming].slice(0, maxPendingSlots);
    onPendingImageFilesChange(merged);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cover_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover image</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="Optional hero image URL (or leave blank to use first gallery image)"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                {field.value && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => field.onChange("")}
                    aria-label="Remove cover image"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2 rounded-lg border border-zinc-300/80 bg-zinc-100/50 p-3">
          <FormLabel className="text-base">Gallery images</FormLabel>
          <p className="text-xs text-muted-foreground">
            Up to {MAX_GALLERY_IMAGES} images total (existing + new). Images are
            uploaded when you save.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={slotsLeft === 0 || actionLoading}
            onChange={(e) => {
              const fl = e.target.files;
              if (fl?.length) addPendingFiles(fl);
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={slotsLeft === 0 || actionLoading}
            onClick={() => fileInputRef.current?.click()}
          >
            Add images
          </Button>
          {pendingImageFiles.length > 0 && (
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              {pendingImageFiles.map((f) => (
                <li key={`${f.name}-${f.size}-${f.lastModified}`} className="truncate">
                  {f.name}
                </li>
              ))}
            </ul>
          )}
          {pendingImageFiles.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={() => onPendingImageFilesChange([])}
            >
              Clear pending images
            </Button>
          )}
          {galleryLoading ? (
            <p className="text-sm text-muted-foreground">Loading gallery…</p>
          ) : galleryResources.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {galleryResources.map((r) => (
                <div
                  key={r.id}
                  className="relative h-20 w-20 overflow-hidden rounded-md border bg-muted"
                >
                  {r.mime_type.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element -- arbitrary UploadThing hostnames
                    <img
                      src={r.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center p-1 text-center text-[10px] text-muted-foreground">
                      {r.file_name}
                    </span>
                  )}
                  {onRemoveGalleryImage && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-0.5 top-0.5 h-6 w-6 min-h-6 min-w-6"
                      disabled={actionLoading || galleryRemovingId === r.id}
                      aria-label={`Remove ${r.file_name}`}
                      onClick={() => onRemoveGalleryImage(r.id)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Event description" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="starts_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starts at</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ends_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ends at</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Event location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Pantry, Walk, Coffee morning"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_volunteers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max volunteers</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || 1)
                    }
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {actionError && (
          <p className="text-sm text-destructive font-medium">{actionError}</p>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={actionLoading}>
            {actionLoading ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
