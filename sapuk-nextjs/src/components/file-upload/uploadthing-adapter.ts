"use client";

export type UploadThingStartUpload<TInput extends Record<string, unknown>> = (
  files: File[],
  input: TInput,
) => Promise<unknown[] | undefined>;

export function createUploadThingOnUpload<
  TInput extends Record<string, unknown> = Record<string, never>,
  TResult = unknown,
>(
  startUpload: UploadThingStartUpload<TInput>,
  input: TInput,
) {
  return async (
    file: File,
    onProgress: (progress: number) => void,
    _signal: AbortSignal,
  ): Promise<TResult> => {
    onProgress(10);
    const result = await startUpload([file], input);
    const uploaded = result?.[0];
    if (!uploaded) {
      throw new Error("Upload failed");
    }
    onProgress(90);
    return uploaded as TResult;
  };
}
