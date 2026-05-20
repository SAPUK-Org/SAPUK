import { NextResponse } from "next/server";

import { getBackendApiUrl } from "@/lib/backend-api-url";

const BACKEND_API_URL = getBackendApiUrl();

function getAuthHeader(req: Request): string | null {
  return req.headers.get("authorization");
}

export async function PUT(
  req: Request,
  {
    params,
  }: { params: Promise<{ id: string; commentId: string }> },
) {
  try {
    const authHeader = getAuthHeader(req);
    if (!authHeader) {
      return NextResponse.json(
        { msg: "Authentication required" },
        { status: 401 },
      );
    }

    const { id, commentId } = await params;
    const body = await req.json().catch(() => null);
    if (!body || typeof body.content !== "string") {
      return NextResponse.json(
        { msg: "Content is required" },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${BACKEND_API_URL}/dashboard/notes/${id}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: body.content.trim() }),
      },
    );

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        data ?? { msg: "Failed to update comment" },
        { status: res.status },
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Note comment PUT error:", err);
    return NextResponse.json(
      { msg: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: Promise<{ id: string; commentId: string }> },
) {
  try {
    const authHeader = getAuthHeader(req);
    if (!authHeader) {
      return NextResponse.json(
        { msg: "Authentication required" },
        { status: 401 },
      );
    }

    const { id, commentId } = await params;

    const res = await fetch(
      `${BACKEND_API_URL}/dashboard/notes/${id}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: { Authorization: authHeader },
      },
    );

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        data ?? { msg: "Failed to delete comment" },
        { status: res.status },
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Note comment DELETE error:", err);
    return NextResponse.json(
      { msg: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
