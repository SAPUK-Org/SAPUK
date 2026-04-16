export type ApiOptions = {
  token?: string | null;
  body?: unknown;
  searchParams?: Record<string, string | number | boolean | undefined>;
};

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
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options.token) headers["Authorization"] = `Bearer ${options.token}`;

  const res = await fetch(url, {
    method,
    headers,
    ...(options.body !== undefined && { body: JSON.stringify(options.body) }),
  });

  const data = (await res.json().catch(() => null)) as T;
  return { data, ok: res.ok, status: res.status };
}
