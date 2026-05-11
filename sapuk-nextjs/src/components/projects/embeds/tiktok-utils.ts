/** TikTok share URLs usually contain `/video/<numeric id>`. */
export function tiktokVideoIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (!u.hostname.includes("tiktok.com")) return null;
    const m = u.pathname.match(/\/video\/(\d+)/);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}
