export type ChampType = "individual" | "business";

export type FundraisingChamp = {
  id: number;
  slug: string;
  name: string;
  champ_type: ChampType;
  summary: string;
  body?: string | null;
  image?: string | null;
  logo?: string | null;
  website_url?: string | null;
  sort_order: number;
  is_active: boolean;
  created_by?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type CommunityCause = {
  id: number;
  name: string;
  summary: string;
  image?: string | null;
  link_url?: string | null;
  sort_order: number;
  is_active: boolean;
  created_by?: number | null;
  created_at?: string;
  updated_at?: string;
};
