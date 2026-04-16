import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:9090/api";

function getAuthHeader(req: Request): string | null {
  return req.headers.get("authorization");
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = getAuthHeader(req);
    if (!authHeader) {
      return NextResponse.json(
        { msg: "Authentication required" },
        { status: 401 },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ msg: "Request body is required" }, {
        status: 400,
      });
    }

    const { id } = await params;
    const res = await fetch(`${BACKEND_API_URL}/dashboard/resources/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(data ?? { msg: "Patch request failed" }, {
        status: res.status,
      });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Resources PATCH error:", err);
    return NextResponse.json(
      { msg: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = getAuthHeader(req);
    if (!authHeader) {
      return NextResponse.json(
        { msg: "Authentication required" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const res = await fetch(`${BACKEND_API_URL}/dashboard/resources/${id}`, {
      method: "DELETE",
      headers: { Authorization: authHeader },
    });

    const data = (await res.json().catch(() => null)) as {
      resource?: { file_key?: string | null };
      msg?: string;
    };
    if (!res.ok) {
      return NextResponse.json(data ?? { msg: "Delete request failed" }, {
        status: res.status,
      });
    }

    // Remove file from UploadThing storage if it has a file_key
    const fileKey = data?.resource?.file_key;
    if (fileKey && typeof fileKey === "string") {
      try {
        const utapi = new UTApi();
        await utapi.deleteFiles(fileKey);
      } catch (utErr) {
        console.error("UploadThing delete failed (DB record already removed):", utErr);
        // Best-effort: DB delete succeeded; do not fail the request
      }
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Resources DELETE error:", err);
    return NextResponse.json(
      { msg: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
