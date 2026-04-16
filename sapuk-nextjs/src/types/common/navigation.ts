export type MenuItem = {
  href: string;
  text: string;
};

export type DropdownItem = {
  id: string;
  label: string;
  href?: string;
  menuItems?: MenuItem[];
};
