export type User = {
  id?: number;
  username: string;
  email: string;
  profile_picture?: string | null;
  password_hash: string;
  role: StaffRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export type EventExternalLinkKind = "web" | "tiktok" | "image";

export type EventExternalLink = {
  label: string;
  url: string;
  kind: EventExternalLinkKind;
};

export type EventStudioSocialLink = {
  network: string;
  url: string;
};

export type EventStudioPartner = {
  name: string;
  location?: string | null;
  imageSrc?: string | null;
  description?: string | null;
  socialLinks?: EventStudioSocialLink[];
};

export type EventScheduleSlot = {
  starts_at: string;
  ends_at: string;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  cover_image?: string | null;
  dates_description?: string | null;
  schedule_slots?: EventScheduleSlot[];
  starts_at?: Date | null;
  ends_at?: Date | null;
  location: string[];
  type?: string | null;
  max_volunteers?: number | null;
  /** When false, event is hidden from public projects page. */
  is_active: boolean;
  external_links?: EventExternalLink[] | null;
  studio_partners?: EventStudioPartner[] | null;
  created_at: Date;
  updated_at: Date;
  created_by: number;
};

/** Event shape for seed files — id is assigned by the database on insert. */
export type SeedEvent = Omit<Event, "id"> & { id?: number };

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

export type CrisisResourceType = "crisis" | "support";

export type UsefulLink = {
  id?: number;
  title: string;
  url: string;
  description?: string | null;
  sort_order?: number;
  is_active: boolean;
  metadata?: Record<string, unknown> | null;
  created_at?: Date;
  updated_at?: Date;
};

export type ResourceType = "image" | "document" | "video" | "other";

export type Resource = {
  id: number;
  url: string;
  mime_type: string;
  resource_type: ResourceType;
  file_name: string;
  file_key: string | null;
  uploaded_by: number | null;
  attachable_type: string | null;
  attachable_id: number | null;
  metadata: Record<string, unknown> | null;
  notes?: string | null;
  created_at: Date;
};

export type Note = {
  id?: number;
  title: string;
  content: string;
  author_id: number | null;
  author_username?: string | null;
  author_profile_picture?: string | null;
  created_at?: Date;
  updated_at?: Date;
};

export type NoteComment = {
  id?: number;
  note_id: number;
  author_id: number | null;
  author_username?: string | null;
  author_profile_picture?: string | null;
  content: string;
  created_at?: Date;
};

export type NoteWithCommentCount = Note & { comment_count: number };

export type SanitizedUser = Omit<User, "password_hash">;

export type StaffRole = "admin" | "editor" | "staff";

export type JwtPayload = {
  userId: number;
  username: string;
};

export type ChampType = "individual" | "business";

export type FundraisingChamp = {
  id?: number;
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
  created_at?: Date;
  updated_at?: Date;
};

export type CommunityCause = {
  id?: number;
  name: string;
  summary: string;
  image?: string | null;
  link_url?: string | null;
  sort_order: number;
  is_active: boolean;
  created_by?: number | null;
  created_at?: Date;
  updated_at?: Date;
};

export interface SeedData {
  users: User[];
  events?: SeedEvent[];
  notes?: Omit<Note, "id" | "created_at" | "updated_at">[];
  note_comments?: Omit<NoteComment, "id" | "created_at">[];
  crisis_resources?: CrisisResource[];
  useful_links?: UsefulLink[];
  fundraising_champs?: Omit<
    FundraisingChamp,
    "id" | "created_at" | "updated_at"
  >[];
  community_causes?: Omit<CommunityCause, "id" | "created_at" | "updated_at">[];
}
