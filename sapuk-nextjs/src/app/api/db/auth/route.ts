import { NextResponse } from "next/server";

function normalizeBackendBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, "");
}

/**
 * On Vercel, BACKEND_API_URL must be set — serverless has no localhost API.
 * Locally, default matches backend/listener default port.
 */
function resolveBackendApiBaseUrl():
  | { ok: true; url: string }
  | { ok: false; reason: "missing_on_vercel" } {
  const trimmed = process.env.BACKEND_API_URL?.trim();
  if (trimmed) {
    return { ok: true, url: normalizeBackendBaseUrl(trimmed) };
  }
  if (process.env.VERCEL === "1") {
    return { ok: false, reason: "missing_on_vercel" };
  }
  return { ok: true, url: normalizeBackendBaseUrl("http://localhost:9090/api") };
}

function logAuthRouteError(method: "POST" | "GET", error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  let cause: string | undefined;
  if (error instanceof Error && error.cause !== undefined) {
    cause =
      error.cause instanceof Error
        ? error.cause.message
        : String(error.cause);
  }
  console.error(`Error in /api/db/auth ${method}:`, { message, cause, stack });
}

function isLikelyFetchFailure(error: unknown): boolean {
  if (!(error instanceof TypeError)) return false;
  const m = error.message.toLowerCase();
  return m.includes("fetch") || m.includes("network");
}

function rewriteAuthCookiePath(setCookie: string): string {
  return setCookie.replace(/Path=\/api\/auth/gi, "Path=/api/db/auth");
}

function missingBackendUrlResponse() {
  console.error(
    "/api/db/auth: BACKEND_API_URL is unset on Vercel. Set it to your public API base URL including /api (for example https://your-service.onrender.com/api).",
  );
  return NextResponse.json(
    {
      success: false,
      message: "Login is temporarily unavailable. Please try again later.",
    },
    { status: 503 },
  );
}

/**
 * Login – proxy to backend POST /api/auth/login
 *
 * Expects JSON body: { email: string, password: string }
 * Returns: { success, user?, token?, message? }
 */
export async function POST(req: Request) {
  try {
    const resolved = resolveBackendApiBaseUrl();
    if (!resolved.ok) {
      return missingBackendUrlResponse();
    }
    const backendBase = resolved.url;

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    const backendRes = await fetch(`${backendBase}/auth/login`, {
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
    logAuthRouteError("POST", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 },
      );
    }
    if (isLikelyFetchFailure(error)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Could not reach the login service. Please try again later.",
        },
        { status: 503 },
      );
    }
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
    const resolved = resolveBackendApiBaseUrl();
    if (!resolved.ok) {
      return missingBackendUrlResponse();
    }
    const backendBase = resolved.url;

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Missing Authorization header" },
        { status: 401 },
      );
    }

    const backendRes = await fetch(`${backendBase}/users/me`, {
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
    logAuthRouteError("GET", error);
    if (isLikelyFetchFailure(error)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Could not reach the login service. Please try again later.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

