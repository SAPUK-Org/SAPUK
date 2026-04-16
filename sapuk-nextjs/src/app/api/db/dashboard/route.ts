import { NextResponse } from "next/server";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:9090/api";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { msg: "Authentication required" },
        { status: 401 },
      );
    }

    const res = await fetch(`${BACKEND_API_URL}/dashboard`, {
      method: "GET",
      headers: { Authorization: authHeader },
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(data ?? { msg: "Dashboard request failed" }, {
        status: res.status,
      });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Dashboard GET error:", err);
    return NextResponse.json(
      { msg: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
