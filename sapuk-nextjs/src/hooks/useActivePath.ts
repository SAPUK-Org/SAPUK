import { usePathname } from "next/navigation";
import { dropdownItems, pageTitles } from "@/lib/navigation";

export const useActivePath = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/bookings" && pathname === "/bookings") {
      return true;
    }

    // For dropdown parent items, check if the current path starts with any of their dropdown paths
    const dropdownParent = dropdownItems.find((item) => {
      if (!item.menuItems) return false;
      return item.menuItems.some((menuItem) =>
        pathname.startsWith(menuItem.href)
      );
    });

    if (dropdownParent) {
      // If this is the dropdown parent that matches the current path
      return dropdownParent.id === path;
    }

    return false;
  };

  const getPageTitle = () => {
    // Don't show title for home page
    if (pathname === "/") {
      return null;
    }

    // Return the page title if it exists in our mapping
    return pageTitles[pathname] || null;
  };

  return { isActive, pathname, getPageTitle };
};
