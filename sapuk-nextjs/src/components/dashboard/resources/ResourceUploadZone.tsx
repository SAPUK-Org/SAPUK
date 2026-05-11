"use client";

import { UploadDropzone } from "@/lib/uploadthing";

type ResourceUploadZoneProps = {
  onUploadComplete: () => void;
  onUploadError: (error: Error) => void;
};

export function ResourceUploadZone({
  onUploadComplete,
  onUploadError,
}: ResourceUploadZoneProps) {
  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-6">
        <UploadDropzone
          endpoint="resourceUploader"
          input={{}}
          onClientUploadComplete={onUploadComplete}
          onUploadError={onUploadError}
          config={{
            mode: "auto",
            appendOnPaste: true,
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Drag and drop or click to upload images, PDFs, videos, or other
        documents (up to 10 files, 8MB images, 16MB documents, 64MB videos)
      </p>
    </div>
  );
}
