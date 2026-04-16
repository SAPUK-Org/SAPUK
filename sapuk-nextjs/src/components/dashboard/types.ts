export type CrisisResourceType = "crisis" | "support";

export type CrisisResource = {
  id?: number;
  name: string;
  description?: string | null;
  phone_or_url: string;
  hours?: string | null;
  type: CrisisResourceType;
  sort_order?: number;
  is_active: boolean;
};

export type Note = {
  id?: number;
  title: string;
  content: string;
  author_id: number | null;
  author_username?: string | null;
  author_profile_picture?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type NoteWithCommentCount = Note & { comment_count: number };

export type NoteComment = {
  id?: number;
  note_id: number;
  author_id: number | null;
  author_username?: string | null;
  author_profile_picture?: string | null;
  content: string;
  created_at?: string;
};

export type UsefulLink = {
  id?: number;
  title: string;
  url: string;
  description?: string | null;
  sort_order?: number;
  is_active: boolean;
  metadata?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
};

export type DashboardLog = {
  id: number;
  user_id: number | null;
  action: string;
  resource_type: string;
  resource_id: number | null;
  method?: string | null;
  route?: string | null;
  status_code?: number | null;
  metadata?: Record<string, unknown> | null;
  ip?: string | null;
  created_at?: string;
};

