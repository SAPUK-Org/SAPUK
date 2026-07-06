export const DEFAULT_MEMBER_IMAGE =
  "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwKoYcLufdxS9c2GgL1WqeDa7UV6P8pCjQtYof";

export type TeamTab =
  | "all"
  | "directors"
  | "management"
  | "supervisors"
  | "admins";

export const TEAM_TABS: { id: TeamTab; label: string }[] = [
  { id: "all", label: "All Teams" },
  { id: "directors", label: "Directors" },
  { id: "management", label: "Management Team" },
  { id: "supervisors", label: "Supervisors" },
  { id: "admins", label: "Admins" },
];

export const TEAM_TAB_LABELS = TEAM_TABS.map((tab) => tab.label);

export function teamTabFromLabel(label: string): TeamTab {
  return TEAM_TABS.find((tab) => tab.label === label)?.id ?? "all";
}

export function teamTabLabel(id: TeamTab): string {
  return TEAM_TABS.find((tab) => tab.id === id)?.label ?? "All Teams";
}
