import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

import { getBackendApiUrl } from "@/lib/backend-api-url";

const BACKEND_API_URL = getBackendApiUrl();

const noStore = { "Cache-Control": "no-store, max-age=0" } as const;

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/public/fundraising-champs`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        data ?? { msg: "Fundraising champs request failed" },
        { status: res.status, headers: noStore },
      );
    }
    return NextResponse.json(data, { headers: noStore });
  } catch (err) {
    console.error("Public fundraising champs GET error:", err);
    return NextResponse.json(
      { msg: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
