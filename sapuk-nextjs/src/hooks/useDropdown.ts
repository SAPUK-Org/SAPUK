import { useState, useRef, useEffect } from "react";

export const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const activeTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-menu")) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeDropdown) {
        setActiveDropdown(null);
        // Focus back to the dropdown button
        const button = document.querySelector(
          `[aria-controls="${activeDropdown}-menu"]`
        ) as HTMLElement;
        if (button) {
          button.focus();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (activeTimeout.current) clearTimeout(activeTimeout.current);
    };
  }, [activeDropdown]);

  const handleDropdownHover = (
    dropdownName: string | null,
    openDelay: number = 200,
    closeDelay: number = 100
  ) => {
    if (activeTimeout.current) clearTimeout(activeTimeout.current);

    if (dropdownName) {
      activeTimeout.current = setTimeout(() => {
        setActiveDropdown(dropdownName);
      }, openDelay);
    } else {
      activeTimeout.current = setTimeout(() => {
        setActiveDropdown(null);
      }, closeDelay);
    }
  };

  const handleDropdownFocus = (dropdownName: string | null) => {
    if (activeTimeout.current) clearTimeout(activeTimeout.current);
    setActiveDropdown(dropdownName);
  };

  const handleDropdownBlur = (event: React.FocusEvent) => {
    // This will be used for the menu blur, not the button blur
    const relatedTarget = event.relatedTarget as HTMLElement;
    const dropdownMenu = event.currentTarget.closest(
      ".dropdown-menu"
    ) as HTMLElement;

    // Close dropdown when focus moves outside the dropdown menu
    if (dropdownMenu && !dropdownMenu.contains(relatedTarget)) {
      activeTimeout.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 100);
    }
  };

  // For mobile devices, we don't need blur handling since there's no tab navigation
  const handleMobileDropdownToggle = (dropdownName: string | null) => {
    if (activeTimeout.current) clearTimeout(activeTimeout.current);
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return {
    activeDropdown,
    handleDropdownHover,
    handleDropdownFocus,
    handleDropdownBlur,
    handleMobileDropdownToggle,
  };
};
