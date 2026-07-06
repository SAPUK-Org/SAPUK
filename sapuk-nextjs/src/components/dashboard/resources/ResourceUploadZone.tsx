"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  FileUpload,
  type FileRejectReason,
  createUploadThingOnUpload,
  useFileUpload,
} from "@/components/file-upload";
import type { Resource } from "@/components/dashboard/resources/ResourceDisplay";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { useUploadThing } from "@/lib/uploadthing";

const MAX_FILE_SIZE = 64 * 1024 * 1024;

type UploadedThingFile = {
  url?: string;
  ufsUrl?: string;
  type?: string;
  name?: string;
  key?: string;
};

type ResourceUploadZoneProps = {
  onUploadComplete: () => void | Promise<void>;
  onUploadError: (error: Error) => void;
};

export function ResourceUploadZone({
  onUploadComplete,
  onUploadError,
}: ResourceUploadZoneProps) {
  const { token } = useAuth();
  const settledBatchRef = useRef<string | null>(null);
  const { startUpload } = useUploadThing("resourceUploader");

  const uploadToUploadThing = useMemo(
    () => createUploadThingOnUpload(startUpload, { persist: false }),
    [startUpload],
  );

  const upload = useFileUpload({
    maxFiles: 10,
    maxSize: MAX_FILE_SIZE,
    accept: "",
    onUpload: async (file, onProgress, signal) => {
      if (!token) {
        throw new Error("You need to be logged in to upload resources.");
      }

      const uploaded = getUploadedThingFile(
        await uploadToUploadThing(file, onProgress, signal),
      );
      const url = uploaded.ufsUrl ?? uploaded.url;
      const fileName = uploaded.name ?? file.name;
      const mimeType = uploaded.type ?? file.type;
      if (!url || !fileName || !mimeType) {
        throw new Error("UploadThing did not return complete file details.");
      }

      onProgress(95);
      const { data, ok } = await api<{ resource?: Resource; msg?: string }>(
        "/api/resources",
        "POST",
        {
          token,
          body: {
            url,
            mime_type: mimeType,
            file_name: fileName,
            file_key: uploaded.key ?? null,
          },
        },
      );

      if (!ok || !data?.resource) {
        throw new Error(data?.msg ?? "Upload completed but resource was not saved.");
      }
    },
    onUploadError: (_file, error) => onUploadError(error),
    onFileReject: (file, reason) => {
      onUploadError(new Error(getFileRejectMessage(file, reason)));
    },
  });

  const { files, clearFiles, removeFile } = upload;

  useEffect(() => {
    if (files.length === 0) {
      settledBatchRef.current = null;
      return;
    }

    const stillActive = files.some(
      (file) => file.status === "uploading" || file.status === "idle",
    );
    if (stillActive) return;

    const batchKey = files.map((file) => `${file.id}:${file.status}`).join("|");
    if (settledBatchRef.current === batchKey) return;
    settledBatchRef.current = batchKey;

    const successes = files.filter((file) => file.status === "success");
    const failures = files.filter((file) => file.status === "error");

    void (async () => {
      if (successes.length > 0) {
        await onUploadComplete();
      }

      if (failures.length === 0) {
        clearFiles();
        settledBatchRef.current = null;
        return;
      }

      successes.forEach((file) => removeFile(file.id));
    })();
  }, [files, clearFiles, removeFile, onUploadComplete]);

  return (
    <div className="mt-4 space-y-4">
      <FileUpload
        {...upload}
        maxFiles={10}
        maxSize={MAX_FILE_SIZE}
        accept=""
      />
      <p className="text-xs text-muted-foreground">
        Images, PDFs, videos, or other documents (up to 10 files, 8MB images,
        16MB documents, 64MB videos)
      </p>
    </div>
  );
}

function getUploadedThingFile(result: unknown): UploadedThingFile {
  if (!result || typeof result !== "object") {
    return {};
  }
  return result as UploadedThingFile;
}

function getFileRejectMessage(file: File, reason: FileRejectReason) {
  switch (reason) {
    case "max_files":
      return "You can upload up to 10 files at a time.";
    case "max_size":
      return `${file.name} is larger than the 64MB upload limit.`;
    case "accept":
      return `${file.name} is not an accepted file type.`;
    case "duplicate":
      return `${file.name} is already in the upload list.`;
  }
}
