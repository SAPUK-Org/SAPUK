"use client";

import { useRef, useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EventFormProps, EventFormValues } from "./types";
import Image from "next/image";

const MAX_GALLERY_IMAGES = 10;

function isImageFile(f: File) {
  return f.type.startsWith("image/");
}

/** Split pasted text into candidate URL strings (one per line, comma, or semicolon). */
function splitUrlBatch(raw: string): string[] {
  const parts = raw
    .split(/[\n,;]+/g)
    .map((s) => s.trim())
    .filter(Boolean);
  return [...new Set(parts)];
}

function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function defaultLabelForImageUrl(url: string, index: number): string {
  try {
    const u = new URL(url);
    const seg = u.pathname.split("/").filter(Boolean).pop();
    if (seg) {
      const decoded = decodeURIComponent(seg);
      if (decoded.length > 0 && decoded.length <= 120) return decoded;
    }
  } catch {
    /* ignore */
  }
  return `Gallery image ${index}`;
}

function StudioPartnerCard({
  nestIndex,
  form,
  onRemoveStudio,
  disabled,
}: {
  nestIndex: number;
  form: UseFormReturn<EventFormValues>;
  onRemoveStudio: () => void;
  disabled?: boolean;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `studio_partners.${nestIndex}.socialLinks`,
  });

  return (
    <div className="space-y-3 rounded-lg border border-zinc-300/80 bg-zinc-50/80 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <FormLabel className="text-base">
          Partner studio {nestIndex + 1}
        </FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={onRemoveStudio}
        >
          Remove studio
        </Button>
      </div>
      <FormField
        control={form.control}
        name={`studio_partners.${nestIndex}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Studio name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormField
          control={form.control}
          name={`studio_partners.${nestIndex}.location`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="City or area"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`studio_partners.${nestIndex}.imageSrc`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://…"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`studio_partners.${nestIndex}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Short description for the public card"
                rows={2}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="space-y-2">
        <FormLabel className="text-sm font-medium">Social links</FormLabel>
        {fields.length === 0 ? (
          <p className="text-xs text-muted-foreground">No social links yet.</p>
        ) : (
          <ul className="space-y-2">
            {fields.map((row, si) => (
              <li
                key={row.id}
                className="flex flex-col gap-2 sm:flex-row sm:items-end"
              >
                <FormField
                  control={form.control}
                  name={`studio_partners.${nestIndex}.socialLinks.${si}.network`}
                  render={({ field }) => (
                    <FormItem className="min-w-0 flex-1">
                      <FormLabel className="text-xs">Network</FormLabel>
                      <FormControl>
                        <Input placeholder="Instagram" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`studio_partners.${nestIndex}.socialLinks.${si}.url`}
                  render={({ field }) => (
                    <FormItem className="min-w-0 flex-[2]">
                      <FormLabel className="text-xs">URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  disabled={disabled}
                  onClick={() => remove(si)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => append({ network: "", url: "" })}
        >
          Add social link
        </Button>
      </div>
    </div>
  );
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
  const [imageUrlBatch, setImageUrlBatch] = useState("");
  const [imageUrlBatchHint, setImageUrlBatchHint] = useState<string | null>(
    null,
  );

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control: form.control,
    name: "external_links",
  });

  const {
    fields: studioFields,
    append: appendStudio,
    remove: removeStudio,
  } = useFieldArray({
    control: form.control,
    name: "studio_partners",
  });

  const externalLinks = form.watch("external_links") ?? [];

  const existingImageCount = galleryResources.filter((r) =>
    r.mime_type.startsWith("image/"),
  ).length;
  const maxPendingSlots = Math.max(0, MAX_GALLERY_IMAGES - existingImageCount);
  const slotsLeft = Math.max(0, maxPendingSlots - pendingImageFiles.length);

  const addPendingFiles = (list: FileList | File[]) => {
    const incoming = [...list].filter(isImageFile);
    if (incoming.length === 0) return;
    const merged = [...pendingImageFiles, ...incoming].slice(
      0,
      maxPendingSlots,
    );
    onPendingImageFilesChange(merged);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addBatchImageUrls = () => {
    setImageUrlBatchHint(null);
    const candidates = splitUrlBatch(imageUrlBatch);
    const valid = candidates.filter(isHttpUrl);
    if (valid.length === 0) {
      setImageUrlBatchHint(
        candidates.length === 0
          ? "Paste at least one http(s) image URL."
          : "No valid http(s) URLs found. Check each line or separator.",
      );
      return;
    }
    const existing = form.getValues("external_links") ?? [];
    const seen = new Set(existing.map((l) => l.url.trim()).filter(Boolean));
    const toAdd: { label: string; url: string; kind: "image" }[] = [];
    let labelIdx = existing.filter((l) => l.kind === "image").length + 1;
    for (const url of valid) {
      if (seen.has(url)) continue;
      seen.add(url);
      toAdd.push({
        label: defaultLabelForImageUrl(url, labelIdx),
        url,
        kind: "image",
      });
      labelIdx += 1;
    }
    if (toAdd.length === 0) {
      setImageUrlBatchHint("Those URLs are already in outbound links.");
      return;
    }
    for (const row of toAdd) {
      appendLink(row);
    }
    setImageUrlBatch("");
    setImageUrlBatchHint(
      `Added ${toAdd.length} image URL${toAdd.length === 1 ? "" : "s"}. They appear as thumbnails above; edit labels under Outbound links if needed.`,
    );
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
            Thumbnails below include uploaded files (up to {MAX_GALLERY_IMAGES}{" "}
            per event) and image URLs stored on the event (no separate limit).
            Uploads use UploadThing; URLs are saved as image links and also
            appear on the public projects carousel.
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
                <li
                  key={`${f.name}-${f.size}-${f.lastModified}`}
                  className="truncate"
                >
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
            <p className="text-sm text-muted-foreground">
              Loading uploaded gallery…
            </p>
          ) : null}
          {(() => {
            const urlImageSlots = linkFields
              .map((row, i) => {
                const link = externalLinks[i];
                if (
                  !link ||
                  link.kind !== "image" ||
                  !String(link.url ?? "").trim()
                ) {
                  return null;
                }
                return { row, i, link };
              })
              .filter(
                (
                  x,
                ): x is {
                  row: (typeof linkFields)[number];
                  i: number;
                  link: { label: string; url: string; kind: "image" };
                } => x != null,
              );

            const hasUploadThumbs =
              !galleryLoading && galleryResources.length > 0;
            if (!hasUploadThumbs && urlImageSlots.length === 0) {
              return null;
            }
            return (
              <div className="flex flex-wrap gap-2 pt-1">
                {hasUploadThumbs
                  ? galleryResources.map((r) => (
                      <div
                        key={r.id}
                        className="relative h-20 w-20 overflow-hidden rounded-md border bg-muted"
                      >
                        {r.mime_type.startsWith("image/") ? (
                          <Image
                            src={r.url}
                            alt={r.file_name}
                            className="object-cover"
                            fill
                            unoptimized
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
                            disabled={
                              actionLoading || galleryRemovingId === r.id
                            }
                            aria-label={`Remove ${r.file_name}`}
                            onClick={() => onRemoveGalleryImage(r.id)}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))
                  : null}
                {urlImageSlots.map(({ row, i, link }) => (
                  <div
                    key={row.id}
                    className="relative h-20 w-20 overflow-hidden rounded-md border bg-muted"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary image URL hostnames */}
                    <img
                      src={link.url.trim()}
                      alt={link.label?.trim() || "Gallery image URL"}
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-0.5 top-0.5 h-6 w-6 min-h-6 min-w-6"
                      disabled={actionLoading}
                      aria-label={`Remove image URL: ${link.label || link.url}`}
                      onClick={() => removeLink(i)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            );
          })()}
          <div className="space-y-2 border-t border-zinc-300/80 pt-3">
            <FormLabel className="text-sm font-medium">
              Add gallery images by URL (batch)
            </FormLabel>
            <p className="text-xs text-muted-foreground">
              One URL per line, or separate with commas or semicolons. Only
              http(s) links are accepted. Duplicates and URLs already listed in
              outbound links are skipped.
            </p>
            <Textarea
              value={imageUrlBatch}
              onChange={(e) => {
                setImageUrlBatch(e.target.value);
                setImageUrlBatchHint(null);
              }}
              placeholder={
                "https://example.com/photo1.jpg\nhttps://example.com/photo2.png"
              }
              rows={4}
              disabled={actionLoading}
              className="font-mono text-xs sm:text-sm"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={actionLoading || !imageUrlBatch.trim()}
                onClick={addBatchImageUrls}
              >
                Add URLs as image links
              </Button>
              {imageUrlBatch.trim() ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={actionLoading}
                  onClick={() => {
                    setImageUrlBatch("");
                    setImageUrlBatchHint(null);
                  }}
                  className="bg-zinc-100/50 hover:bg-zinc-100/80 text-zinc-500 hover:text-zinc-600"
                >
                  Clear
                </Button>
              ) : null}
            </div>
            {imageUrlBatchHint ? (
              <p
                className={
                  imageUrlBatchHint.startsWith("Added")
                    ? "text-xs text-emerald-800"
                    : "text-xs text-destructive"
                }
              >
                {imageUrlBatchHint}
              </p>
            ) : null}
          </div>
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
        <div className="space-y-3 rounded-lg border border-zinc-300/80 bg-zinc-100/50 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <FormLabel className="text-base">
              Outbound links and embeds
            </FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={actionLoading}
              onClick={() => appendLink({ label: "", url: "", kind: "web" })}
            >
              Add link
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Choose TikTok for TikTok video URLs, Image for extra image URLs
            (shown in a carousel), or Web for ordinary links.
          </p>
          {linkFields.length === 0 ? (
            <p className="text-sm text-muted-foreground">No links yet.</p>
          ) : (
            <ul className="space-y-3">
              {linkFields.map((row, i) => (
                <li
                  key={row.id}
                  className="flex flex-col gap-2 rounded-md border border-zinc-200 bg-background p-3 sm:flex-row sm:items-center"
                >
                  <FormField
                    control={form.control}
                    name={`external_links.${i}.label`}
                    render={({ field }) => (
                      <FormItem className="min-w-0 flex-1">
                        <FormLabel className="text-xs">Label</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. SAPUK on TikTok"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`external_links.${i}.url`}
                    render={({ field }) => (
                      <FormItem className="min-w-0 flex-[2]">
                        <FormLabel className="text-xs">URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://…" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`external_links.${i}.kind`}
                    render={({ field }) => (
                      <FormItem className="flex w-full shrink-0 flex-col gap-1.5 space-y-0 sm:w-36">
                        <FormLabel className="text-xs">Kind</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={actionLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="mb-0 py-1.5">
                              <SelectValue placeholder="Kind" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper" sideOffset={4}>
                            <SelectItem value="web">Web</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 sm:self-end"
                    disabled={actionLoading}
                    onClick={() => removeLink(i)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="space-y-3 rounded-lg border border-zinc-300/80 bg-zinc-100/50 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <FormLabel className="text-base">Partner studios</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={actionLoading}
              onClick={() =>
                appendStudio({
                  name: "",
                  location: "",
                  imageSrc: "",
                  description: "",
                  socialLinks: [],
                })
              }
            >
              Add studio
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Optional cards for tattoo-studio style partners (name, image,
            socials).
          </p>
          {studioFields.length === 0 ? (
            <p className="text-sm text-muted-foreground">No partner studios.</p>
          ) : (
            <div className="space-y-4">
              {studioFields.map((row, i) => (
                <StudioPartnerCard
                  key={row.id}
                  nestIndex={i}
                  form={form}
                  disabled={actionLoading}
                  onRemoveStudio={() => removeStudio(i)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="space-y-3 rounded-lg border border-zinc-300/80 bg-zinc-100/50 p-3">
          <FormLabel className="text-base">Schedule (optional)</FormLabel>
          <p className="text-xs text-muted-foreground">
            Use the text area for several dates, recurring wording, or when
            exact times are not fixed yet. Optionally add one primary start and
            end below for sorting and a single-session line on the public page.
          </p>
          <FormField
            control={form.control}
            name="dates_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dates description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='e.g. "Last Saturday and Sunday of each month" or list specific dates'
                    rows={3}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="starts_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary start (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                  <FormLabel>Primary end (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border border-zinc-300/80 bg-zinc-50/80 p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(v === true)}
                  disabled={actionLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-snug">
                <FormLabel className="font-medium cursor-pointer">
                  Visible on public projects page
                </FormLabel>
                <p className="text-sm text-muted-foreground font-normal">
                  Uncheck to hide this event from How we can help you → Projects
                  (it remains in the dashboard).
                </p>
              </div>
            </FormItem>
          )}
        />
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
