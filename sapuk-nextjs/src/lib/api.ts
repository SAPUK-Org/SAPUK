export type ApiOptions = {
  token?: string | null;
  body?: unknown;
  searchParams?: Record<string, string | number | boolean | undefined>;
};

const STORAGE_KEY_TOKEN = "sapuk_auth_token";
const STORAGE_KEY_USER = "sapuk_auth_user";
const AUTH_TOKEN_UPDATED_EVENT = "sapuk:auth-token-updated";
const AUTH_CLEARED_EVENT = "sapuk:auth-cleared";

function buildUrl(path: string, searchParams?: ApiOptions["searchParams"]): string {
  if (!searchParams || Object.keys(searchParams).length === 0) return path;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (v !== undefined && v !== "") params.set(k, String(v));
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

/** Client-side: call Next.js API routes with auth token. */
export async function api<T = unknown>(
  path: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  options: ApiOptions = {},
): Promise<{ data: T; ok: boolean; status: number }> {
  const url = buildUrl(path, options.searchParams);
  const makeRequest = async (token: string | null | undefined) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    return fetch(url, {
      method,
      headers,
      ...(options.body !== undefined && { body: JSON.stringify(options.body) }),
    });
  };

  let res = await makeRequest(options.token);
  let data = (await parseResponseData<T>(res)) as T;

  if (res.status === 401 && options.token) {
    const refreshedToken = await tryRefreshAccessToken();
    if (refreshedToken) {
      res = await makeRequest(refreshedToken);
      data = (await parseResponseData<T>(res)) as T;
    }
  }

  return { data, ok: res.ok, status: res.status };
}

async function parseResponseData<T>(res: Response): Promise<T | null> {
  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (isJson) {
    return (await res.json().catch(() => null)) as T | null;
  }

  const text = await res.text().catch(() => "");
  if (text.trim()) return { msg: text } as T;
  if (!res.ok && res.statusText) return { msg: res.statusText } as T;
  return null;
}

let refreshPromise: Promise<string | null> | null = null;

async function tryRefreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const res = await fetch("/api/db/auth/refresh", {
      method: "POST",
      credentials: "include",
    }).catch(() => null);

    if (!res?.ok) {
      clearStoredAuth();
      return null;
    }

    const data = (await parseResponseData<{ token?: string }>(res)) ?? null;
    const token = data?.token;
    if (!token) {
      clearStoredAuth();
      return null;
    }

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_TOKEN, token);
      } catch {
        // ignore storage errors
      }
      window.dispatchEvent(
        new CustomEvent(AUTH_TOKEN_UPDATED_EVENT, { detail: { token } }),
      );
    }

    return token;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

function clearStoredAuth() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
  } catch {
    // ignore storage errors
  }
  window.dispatchEvent(new Event(AUTH_CLEARED_EVENT));
}
