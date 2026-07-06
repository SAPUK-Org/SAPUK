"use client";

import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";
import type { CauseFormValues } from "./types";

type CauseFormProps = {
  form: UseFormReturn<CauseFormValues>;
  onSubmit: (values: CauseFormValues) => Promise<void>;
  actionError: string | null;
  actionLoading: boolean;
  onCancel: () => void;
};

export function CauseForm({
  form,
  onSubmit,
  actionError,
  actionLoading,
  onCancel,
}: CauseFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { startUpload, isUploading } = useUploadThing("resourceUploader");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const handleUpload = async (files: File[]) => {
    const uploaded = await startUpload(files, {});
    const first = uploaded?.[0];
    const url =
      first &&
      ("ufsUrl" in first && first.ufsUrl
        ? first.ufsUrl
        : "url" in first && first.url
          ? first.url
          : null);
    if (url) setValue("image", url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {actionError ? (
        <p className="text-sm text-destructive">{actionError}</p>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} disabled={actionLoading} />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          rows={4}
          {...register("summary")}
          disabled={actionLoading}
        />
        {errors.summary ? (
          <p className="text-xs text-destructive">{errors.summary.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <div className="flex gap-2">
          <Input
            id="image"
            {...register("image")}
            placeholder="https://..."
            disabled={actionLoading || isUploading}
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length) void handleUpload(files);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="outline"
            disabled={actionLoading || isUploading}
            onClick={() => fileRef.current?.click()}
          >
            Upload
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="link_url">Link URL (optional)</Label>
        <Input
          id="link_url"
          {...register("link_url")}
          placeholder="https://..."
          disabled={actionLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort order</Label>
          <Input
            id="sort_order"
            type="number"
            min={0}
            {...register("sort_order")}
            disabled={actionLoading}
          />
        </div>
        <div className="flex items-end gap-2 pb-2">
          <input
            id="is_active"
            type="checkbox"
            className="h-4 w-4"
            {...register("is_active")}
            disabled={actionLoading}
          />
          <Label htmlFor="is_active">Visible on community page</Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={actionLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={actionLoading}>
          {actionLoading ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
}
