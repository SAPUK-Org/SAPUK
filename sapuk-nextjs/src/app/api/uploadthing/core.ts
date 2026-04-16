import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:9090/api";
const UPLOAD_CALLBACK_SECRET = process.env.UPLOAD_CALLBACK_SECRET;

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

async function persistResourceToBackend(
  file: { url?: string; ufsUrl?: string; type: string; name: string; key: string },
  metadata: { userId: string; attachableType?: string; attachableId?: number },
) {
  if (!UPLOAD_CALLBACK_SECRET) {
    console.warn("UPLOAD_CALLBACK_SECRET not set; skipping resource persistence");
    return;
  }
  const url = file.ufsUrl ?? file.url;
  if (!url) {
    console.error("File has no url or ufsUrl");
    return;
  }
  const body = {
    url,
    mime_type: file.type,
    file_name: file.name,
    file_key: file.key,
    uploaded_by: metadata.userId ? Number(metadata.userId) : null,
    attachable_type: metadata.attachableType ?? null,
    attachable_id: metadata.attachableId ?? null,
  };
  const res = await fetch(`${BACKEND_API_URL}/upload-callback/resources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Upload-Callback-Secret": UPLOAD_CALLBACK_SECRET,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("Failed to persist resource to backend:", res.status, err);
  }
}

// Shared onUploadComplete logic for all file routes
function createUploadCompleteHandler() {
  return async ({
    metadata,
    file,
  }: {
    metadata: { userId: string; attachableType?: string; attachableId?: number };
    file: { url?: string; ufsUrl?: string; type: string; name: string; key: string };
  }) => {
    await persistResourceToBackend(file, metadata);
    return { uploadedBy: metadata.userId };
  };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(createUploadCompleteHandler()),

  fileUploader: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(createUploadCompleteHandler()),

  videoUploader: f({
    video: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(createUploadCompleteHandler()),

  /** Unified uploader: images, PDFs, videos, and other documents in one endpoint */
  resourceUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
    pdf: { maxFileSize: "16MB", maxFileCount: 10 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
    blob: { maxFileSize: "16MB", maxFileCount: 10 },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(createUploadCompleteHandler()),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
