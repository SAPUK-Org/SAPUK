"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export type FileRejectReason = "max_files" | "max_size" | "accept" | "duplicate";

export interface FileState {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  preview?: string;
  error?: string;
  controller?: AbortController;
}

export interface UseFileUploadOptions<TUploadResult = void> {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  maxConcurrentUploads?: number;
  onUpload?: (
    file: File,
    onProgress: (progress: number) => void,
    signal: AbortSignal,
  ) => Promise<TUploadResult>;
  onUploadSuccess?: (
    file: File,
    fileState: FileState,
    result: TUploadResult,
  ) => void;
  onUploadError?: (file: File, error: Error, fileState: FileState) => void;
  onFilesChange?: (files: File[]) => void;
  onFilesStateChange?: (files: FileState[]) => void;
  onFileRemove?: (file: File) => void | Promise<void>;
  onFileReject?: (file: File, reason: FileRejectReason) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2);
}

function fileMatchesAccept(file: File, accept?: string) {
  if (!accept) return true;
  return accept.split(",").some((type) => {
    type = type.trim();
    if (!type) return true;
    if (type.endsWith("/*")) {
      return file.type.startsWith(type.replace("/*", ""));
    }
    return file.type === type;
  });
}

function isDuplicate(file: File, existing: FileState[]) {
  return existing.some(
    (f) =>
      f.file.name === file.name &&
      f.file.size === file.size &&
      f.file.lastModified === file.lastModified,
  );
}

export function removeQueuedFile<T extends { id: string }>(
  queue: T[],
  id: string,
): T[] {
  return queue.filter((queued) => queued.id !== id);
}

export function useFileUpload<TUploadResult = void>({
  maxFiles = 10,
  maxSize,
  accept,
  maxConcurrentUploads = 3,
  onUpload,
  onUploadSuccess,
  onUploadError,
  onFilesChange,
  onFilesStateChange,
  onFileRemove,
  onFileReject,
}: UseFileUploadOptions<TUploadResult> = {}) {
  const [files, setFiles] = useState<FileState[]>([]);
  const queueRef = useRef<FileState[]>([]);
  const activeUploads = useRef(0);
  const filesRef = useRef(files);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const processQueue = useCallback(() => {
    if (!onUpload) return;

    while (
      activeUploads.current < maxConcurrentUploads &&
      queueRef.current.length > 0
    ) {
      const next = queueRef.current.shift();
      if (!next) return;

      activeUploads.current++;

      setFiles((prev) =>
        prev.map((f) => (f.id === next.id ? { ...f, status: "uploading" } : f)),
      );

      const controller = new AbortController();

      onUpload(
        next.file,
        (progress) => {
          setFiles((prev) =>
            prev.map((f) => (f.id === next.id ? { ...f, progress } : f)),
          );
        },
        controller.signal,
      )
        .then((result) => {
          let successfulFileState: FileState | undefined;

          setFiles((prev) => {
            const updated = prev.map((f) =>
              f.id === next.id
                ? { ...f, status: "success" as UploadStatus, progress: 100 }
                : f,
            );
            successfulFileState = updated.find((f) => f.id === next.id);
            return updated;
          });

          if (successfulFileState) {
            onUploadSuccess?.(next.file, successfulFileState, result);
          }
        })
        .catch((err) => {
          if (controller.signal.aborted) return;

          const error =
            err instanceof Error && err.message.trim()
              ? err
              : new Error("Upload failed.");

          let failedFileState: FileState | undefined;

          setFiles((prev) => {
            const updated = prev.map((f) =>
              f.id === next.id
                ? {
                    ...f,
                    status: "error" as UploadStatus,
                    error: error.message,
                  }
                : f,
            );
            failedFileState = updated.find((f) => f.id === next.id);
            return updated;
          });

          if (failedFileState) {
            onUploadError?.(next.file, error, failedFileState);
          }
        })
        .finally(() => {
          activeUploads.current--;
          // eslint-disable-next-line react-hooks/immutability -- recursive queue drain
          processQueue();
        });

      setFiles((prev) =>
        prev.map((f) => (f.id === next.id ? { ...f, controller } : f)),
      );
    }
  }, [
    onUpload,
    onUploadSuccess,
    onUploadError,
    maxConcurrentUploads,
  ]);

  const addFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const currentFiles = filesRef.current;
      const newFiles: FileState[] = [];

      Array.from(fileList).forEach((file) => {
        if (currentFiles.length + newFiles.length >= maxFiles) {
          onFileReject?.(file, "max_files");
          return;
        }
        if (!fileMatchesAccept(file, accept)) {
          onFileReject?.(file, "accept");
          return;
        }
        if (maxSize && file.size > maxSize) {
          onFileReject?.(file, "max_size");
          return;
        }
        if (isDuplicate(file, [...currentFiles, ...newFiles])) {
          onFileReject?.(file, "duplicate");
          return;
        }

        newFiles.push({
          id: generateId(),
          file,
          progress: 0,
          status: "idle",
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        });
      });

      if (newFiles.length === 0) return;

      setFiles((prev) => [...prev, ...newFiles]);
      queueRef.current.push(...newFiles);

      processQueue();
    },
    [maxFiles, maxSize, accept, onFileReject, processQueue],
  );

  const removeFile = useCallback(
    (id: string) => {
      const file = filesRef.current.find((candidate) => candidate.id === id);
      if (!file) return;

      queueRef.current = removeQueuedFile(queueRef.current, id);
      file.controller?.abort();
      if (file.preview) URL.revokeObjectURL(file.preview);
      setFiles((prev) => prev.filter((candidate) => candidate.id !== id));
      void onFileRemove?.(file.file);
    },
    [onFileRemove],
  );

  const retryFile = useCallback(
    (id: string) => {
      const file = filesRef.current.find((f) => f.id === id);
      if (!file) return;

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, status: "idle", progress: 0, error: undefined }
            : f,
        ),
      );
      queueRef.current.push({
        ...file,
        status: "idle" as UploadStatus,
        progress: 0,
        error: undefined,
      });
      processQueue();
    },
    [processQueue],
  );

  const clearFiles = useCallback(() => {
    filesRef.current.forEach((file) => {
      file.controller?.abort();
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    queueRef.current = [];
    setFiles([]);
  }, []);

  const isUploading = files.some((file) => file.status === "uploading");

  useEffect(() => {
    onFilesChange?.(files.map((fileState) => fileState.file));
  }, [files, onFilesChange]);

  useEffect(() => {
    onFilesStateChange?.(files);
  }, [files, onFilesStateChange]);

  return {
    files,
    addFiles,
    removeFile,
    retryFile,
    clearFiles,
    isUploading,
  };
}

export type UseFileUploadReturn = ReturnType<typeof useFileUpload>;
