import { NextResponse } from "next/server";

import { getBackendApiUrl } from "@/lib/backend-api-url";

const BACKEND_API_URL = getBackendApiUrl();

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { msg: "Authentication required" },
      { status: 401 },
    );
  }

  const body = await req.json().catch(() => ({}));

  const res = await fetch(`${BACKEND_API_URL}/dashboard/staff/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(data ?? { msg: "Failed to update role" }, {
      status: res.status,
    });
  }
  return NextResponse.json(data);
}
