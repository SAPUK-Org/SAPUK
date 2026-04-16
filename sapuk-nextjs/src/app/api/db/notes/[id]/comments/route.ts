import { NextResponse } from "next/server";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:9090/api";

function getAuthHeader(req: Request): string | null {
  return req.headers.get("authorization");
}

export async function POST(
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
    const body = await req.json().catch(() => ({}));

    const res = await fetch(
      `${BACKEND_API_URL}/dashboard/notes/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        data ?? { msg: "Failed to add comment" },
        { status: res.status },
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Note comment POST error:", err);
    return NextResponse.json(
      { msg: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
