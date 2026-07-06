import { getBackendApiUrl } from "@/lib/backend-api-url";
import type { CommunityCause, FundraisingChamp } from "@/types/cms";

const BACKEND_API_URL = getBackendApiUrl();

export async function fetchPublicFundraisingChamps(): Promise<
  FundraisingChamp[]
> {
  try {
    const res = await fetch(`${BACKEND_API_URL}/public/fundraising-champs`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { fundraising_champs?: FundraisingChamp[] };
    return Array.isArray(data.fundraising_champs) ? data.fundraising_champs : [];
  } catch {
    return [];
  }
}

export async function fetchPublicFundraisingChampBySlug(
  slug: string,
): Promise<FundraisingChamp | null> {
  try {
    const res = await fetch(
      `${BACKEND_API_URL}/public/fundraising-champs/${encodeURIComponent(slug)}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { fundraising_champ?: FundraisingChamp };
    return data.fundraising_champ ?? null;
  } catch {
    return null;
  }
}

export async function fetchPublicCommunityCauses(): Promise<CommunityCause[]> {
  try {
    const res = await fetch(`${BACKEND_API_URL}/public/community-causes`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { community_causes?: CommunityCause[] };
    return Array.isArray(data.community_causes) ? data.community_causes : [];
  } catch {
    return [];
  }
}
