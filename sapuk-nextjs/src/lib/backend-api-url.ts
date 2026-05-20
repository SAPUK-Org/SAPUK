/** Base URL for the Express API (must end with `/api`, no trailing slash after that). */
export function getBackendApiUrl(): string {
  const raw =
    process.env.BACKEND_API_URL?.trim() || "http://localhost:9090/api";
  const withoutTrailingSlash = raw.replace(/\/+$/, "");
  if (withoutTrailingSlash.endsWith("/api")) {
    return withoutTrailingSlash;
  }
  return `${withoutTrailingSlash}/api`;
}
