import { NextResponse } from "next/server";

import { getBackendApiUrl } from "@/lib/backend-api-url";

const BACKEND_API_URL = getBackendApiUrl();

function rewriteAuthCookiePath(setCookie: string): string {
  return setCookie.replace(/Path=\/api\/auth/gi, "Path=/api/db/auth");
}

/**
 * Login – proxy to backend POST /api/auth/login
 *
 * Expects JSON body: { email: string, password: string }
 * Returns: { success, user?, token?, message? }
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    const backendRes = await fetch(`${BACKEND_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Important: let the backend set HttpOnly cookies (refreshToken)
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await backendRes.json().catch(() => null);

    if (!backendRes.ok) {
      const message =
        (data && (data.msg || data.message)) || "Login failed on backend";

      return NextResponse.json(
        { success: false, message },
        { status: backendRes.status },
      );
    }

    // Backend shape: { user, token }
    const res = NextResponse.json({
      success: true,
      user: data?.user,
      token: data?.token,
    });

    // Forward refreshToken cookie from backend -> browser
    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", rewriteAuthCookiePath(setCookie));
    }

    return res;
  } catch (error) {
    console.error("Error in /api/db/auth POST:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

/**
 * Get current user – proxy to backend GET /api/users/me
 *
 * Requires Authorization header: "Bearer <token>"
 * Returns: { success, user?, message? }
 */
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Missing Authorization header" },
        { status: 401 },
      );
    }

    const backendRes = await fetch(`${BACKEND_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
      credentials: "include",
    });

    const data = await backendRes.json().catch(() => null);

    if (!backendRes.ok) {
      const message =
        (data && (data.msg || data.message)) ||
        "Failed to fetch current user from backend";

      return NextResponse.json(
        { success: false, message },
        { status: backendRes.status },
      );
    }

    // Backend shape: { user }
    return NextResponse.json({
      success: true,
      user: data?.user ?? data,
    });
  } catch (error) {
    console.error("Error in /api/db/auth GET:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

