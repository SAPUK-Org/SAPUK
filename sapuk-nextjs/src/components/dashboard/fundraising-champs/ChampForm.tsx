"use client";

import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUploadThing } from "@/lib/uploadthing";
import type { ChampFormValues } from "./types";
import { CHAMP_PUBLIC_PATH_PREFIX, getChampPublicPath, slugify } from "./types";

type ChampFormProps = {
  form: UseFormReturn<ChampFormValues>;
  onSubmit: (values: ChampFormValues) => Promise<void>;
  actionError: string | null;
  actionLoading: boolean;
  onCancel: () => void;
  slugAuto?: boolean;
};

function ImageUrlField({
  form,
  name,
  label,
  disabled,
}: {
  form: UseFormReturn<ChampFormValues>;
  name: "image" | "logo";
  label: string;
  disabled?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { startUpload, isUploading } = useUploadThing("resourceUploader");

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
    if (url) form.setValue(name, url);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={name}
          {...form.register(name)}
          placeholder="https://..."
          disabled={disabled || isUploading}
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
          disabled={disabled || isUploading}
          onClick={() => fileRef.current?.click()}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export function ChampForm({
  form,
  onSubmit,
  actionError,
  actionLoading,
  onCancel,
  slugAuto = true,
}: ChampFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {actionError ? (
        <p className="text-sm text-destructive">{actionError}</p>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name", {
            onChange: (e) => {
              if (slugAuto) {
                setValue("slug", slugify(e.target.value));
              }
            },
          })}
          disabled={actionLoading}
        />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL slug</Label>
        <p className="text-xs text-muted-foreground">
          Only edit the last part of the address. The page is always published
          under {CHAMP_PUBLIC_PATH_PREFIX}/.
        </p>
        <div className="flex overflow-hidden rounded-md border border-input bg-background">
          <span className="flex shrink-0 items-center border-r border-input bg-secondary/50 px-3 text-sm text-primary">
            {CHAMP_PUBLIC_PATH_PREFIX}/
          </span>
          <Input
            id="slug"
            className="rounded-none border-0 focus-visible:ring-0"
            {...register("slug")}
            disabled={actionLoading}
            placeholder="james"
          />
        </div>
        {errors.slug ? (
          <p className="text-xs text-destructive">{errors.slug.message}</p>
        ) : null}
        <p className="text-xs text-muted-foreground">
          Public page:{" "}
          <span className="font-medium text-foreground">
            {getChampPublicPath(watch("slug"))}
          </span>
        </p>
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <Select
          value={watch("champ_type")}
          onValueChange={(v) =>
            setValue("champ_type", v as ChampFormValues["champ_type"])
          }
          disabled={actionLoading}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          rows={3}
          {...register("summary")}
          disabled={actionLoading}
        />
        {errors.summary ? (
          <p className="text-xs text-destructive">{errors.summary.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Full story (optional)</Label>
        <Textarea
          id="body"
          rows={6}
          {...register("body")}
          disabled={actionLoading}
        />
      </div>

      <ImageUrlField
        form={form}
        name="image"
        label="Photo"
        disabled={actionLoading}
      />
      <ImageUrlField
        form={form}
        name="logo"
        label="Logo"
        disabled={actionLoading}
      />

      <div className="space-y-2">
        <Label htmlFor="website_url">Website URL (optional)</Label>
        <Input
          id="website_url"
          {...register("website_url")}
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
          <Label htmlFor="is_active">Visible on public site</Label>
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
