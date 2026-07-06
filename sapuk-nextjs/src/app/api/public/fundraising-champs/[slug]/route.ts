import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

import { getBackendApiUrl } from "@/lib/backend-api-url";

const BACKEND_API_URL = getBackendApiUrl();

const noStore = { "Cache-Control": "no-store, max-age=0" } as const;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const res = await fetch(
      `${BACKEND_API_URL}/public/fundraising-champs/${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        data ?? { msg: "Fundraising champ request failed" },
        { status: res.status, headers: noStore },
      );
    }
    return NextResponse.json(data, { headers: noStore });
  } catch (err) {
    console.error("Public fundraising champ GET error:", err);
    return NextResponse.json(
      { msg: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
