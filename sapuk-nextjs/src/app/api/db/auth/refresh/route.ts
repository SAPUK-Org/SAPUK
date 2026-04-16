import { NextResponse } from "next/server";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:9090/api";

/**
 * Refresh access token – proxy to backend POST /api/auth/refresh
 *
 * Relies on HttpOnly refreshToken cookie already stored in the browser.
 * Returns: { success, token?, message? }
 */
export async function POST(req: Request) {
  try {
    // Forward cookies from the client to the backend so it can read refreshToken
    const cookieHeader = req.headers.get("cookie") ?? "";

    const backendRes = await fetch(`${BACKEND_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
      credentials: "include",
    });

    const data = await backendRes.json().catch(() => null);

    if (!backendRes.ok) {
      const message =
        (data && (data.msg || data.message)) ||
        "Failed to refresh access token";

      return NextResponse.json(
        { success: false, message },
        { status: backendRes.status },
      );
    }

    // Backend shape: { token }
    const res = NextResponse.json({
      success: true,
      token: data?.token,
    });

    // Forward any updated refreshToken cookie from backend
    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }

    return res;
  } catch (error) {
    console.error("Error in /api/db/auth/refresh POST:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

