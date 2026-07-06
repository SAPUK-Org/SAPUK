import { NextResponse } from "next/server";

import { getBackendApiUrl } from "@/lib/backend-api-url";

const BACKEND_API_URL = getBackendApiUrl();

function getAuthHeader(req: Request): string | null {
  return req.headers.get("authorization");
}

async function proxy(
  req: Request,
  id: string,
  method: "GET" | "PUT" | "DELETE",
  body?: unknown,
) {
  const authHeader = getAuthHeader(req);
  if (!authHeader) {
    return NextResponse.json(
      { msg: "Authentication required" },
      { status: 401 },
    );
  }

  const opts: RequestInit = {
    method,
    headers: {
      Authorization: authHeader,
      ...(body !== undefined && {
        "Content-Type": "application/json",
      }),
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  };

  const res = await fetch(
    `${BACKEND_API_URL}/dashboard/fundraising-champs/${id}`,
    opts,
  );
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(data ?? { msg: "Request failed" }, {
      status: res.status,
    });
  }
  return NextResponse.json(data);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxy(req, id, "GET");
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  return proxy(req, id, "PUT", body);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxy(req, id, "DELETE");
}
