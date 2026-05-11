import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:9090/api";

const noStore = { "Cache-Control": "no-store, max-age=0" } as const;

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/public/events`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(data ?? { msg: "Events request failed" }, {
        status: res.status,
        headers: noStore,
      });
    }
    return NextResponse.json(data, { headers: noStore });
  } catch (err) {
    console.error("Public events GET error:", err);
    return NextResponse.json(
      { msg: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
