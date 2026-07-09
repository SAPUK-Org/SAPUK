"use client";

import Link from "next/link";
import { useState } from "react";
import { SocialIcon } from "react-social-icons";
import { ChevronDown, Menu, X } from "lucide-react";
import { dropdownItems } from "@/lib/navigation";
import { useScroll, useDropdown, useActivePath } from "@/hooks";
import { HandHeart } from "reicon-react";

const SocialMediaLinks = () => (
  <div className="flex flex-row justify-center items-center gap-2 sm:gap-4">
    <SocialIcon
      network="x"
      url="https://x.com/suicideapuk"
      target="_blank"
      style={{ height: 18, width: 18 }}
    />
    <SocialIcon
      network="facebook"
      url="https://facebook.com/suicideapuk"
      target="_blank"
      style={{ height: 18, width: 18 }}
    />
    <SocialIcon
      network="pinterest"
      url="https://pinterest.com/danisacee"
      target="_blank"
      style={{ height: 18, width: 18 }}
    />
    <SocialIcon
      network="linkedin"
      url="https://linkedin.com/in/dan-shaw-36543119b"
      target="_blank"
      style={{ height: 18, width: 18 }}
    />
    <SocialIcon
      network="instagram"
      url="https://instagram.com/suicideapuk"
      target="_blank"
      style={{ height: 18, width: 18 }}
    />
  </div>
);

const DonateButton = () => (
  <Link
    href="/donate"
    className="flex items-center justify-center gap-4 text-sm md:text-base font-bold bg-yellow-400 hover:bg-yellow-500 text-zinc-800 hover:text-zinc-900 py-[5px] px-12"
  >
    <HandHeart size={20} weight="Filled" className="shrink-0" />
    <span>Donate</span>
  </Link>
);

const TopBar = ({ isScrolled }: { isScrolled: boolean }) => (
  <div
    className={`w-full h-[32px] sm:h-[36px] py-2 px-4 sm:px-8 lg:px-16 xl:px-72 bg-background flex flex-row justify-between items-center 
      transition-all duration-300 ease-in-out ${
        isScrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
      }`}
  >
    <SocialMediaLinks />
    <DonateButton />
  </div>
);

const DropdownMenuItem = ({
  item,
  onClose,
}: {
  item: { href: string; text: string };
  onClose: () => void;
}) => (
  <Link
    href={item.href}
    className="block px-4 py-2 font-bold text-[#FDFD96] hover:text-white transition-colors"
    role="menuitem"
    onClick={onClose}
  >
    {item.text}
  </Link>
);

const DesktopDropdown = ({
  id,
  label,
  menuItems,
  isActive,
  activeDropdown,
  onDropdownHover,
  onDropdownBlur,
  onDropdownFocus,
}: {
  id: string;
  label: string;
  menuItems: Array<{ href: string; text: string }>;
  isActive: (id: string) => boolean;
  activeDropdown: string | null;
  onDropdownHover: (id: string | null, delay?: number) => void;
  onDropdownBlur: (event: React.FocusEvent) => void;
  onDropdownFocus: (id: string | null) => void;
}) => (
  <div
    className="relative group dropdown-menu active:text-white"
    onMouseLeave={() => onDropdownHover(null, 300)}
  >
    <button
      className={`flex items-center dropdown-button text-lg transition-colors cursor-pointer duration-200 font-fuzzy-bubbles ${
        isActive(id) ? "text-white font-bold" : ""
      }`}
      onMouseEnter={() => onDropdownHover(id)}
      onFocus={() => onDropdownHover(id)}
      aria-expanded={activeDropdown === id}
      aria-controls={`${id}-menu`}
    >
      {label}
      <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-500 ease-in-out" />
    </button>

    {activeDropdown === id && (
      <div
        id={`${id}-menu`}
        className="absolute left-0 mt-2 w-56 bg-[#7cbddd] rounded-md shadow-lg py-1 z-50"
        role="menu"
        onMouseEnter={() => onDropdownHover(id)}
        onMouseLeave={() => onDropdownHover(null, 500)}
        onBlur={onDropdownBlur}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onDropdownFocus(null);
            const button = document.querySelector(
              `[aria-controls="${id}-menu"]`,
            ) as HTMLElement;
            if (button) button.focus();
          }
        }}
      >
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.href} item={item} onClose={() => {}} />
        ))}
      </div>
    )}
  </div>
);

const DesktopNavigation = ({
  dropdownItems,
  isActive,
  activeDropdown,
  onDropdownHover,
  onDropdownBlur,
  onDropdownFocus,
}: {
  dropdownItems: Array<{
    id: string;
    label: string;
    menuItems?: Array<{ href: string; text: string }>;
  }>;
  isActive: (id: string) => boolean;
  activeDropdown: string | null;
  onDropdownHover: (id: string | null, delay?: number) => void;
  onDropdownBlur: (event: React.FocusEvent) => void;
  onDropdownFocus: (id: string | null) => void;
}) => (
  <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-10 text-lg">
    {dropdownItems.map(({ id, label, menuItems }) =>
      menuItems ? (
        <DesktopDropdown
          key={id}
          id={id}
          label={label}
          menuItems={menuItems}
          isActive={isActive}
          activeDropdown={activeDropdown}
          onDropdownHover={onDropdownHover}
          onDropdownBlur={onDropdownBlur}
          onDropdownFocus={onDropdownFocus}
        />
      ) : (
        <Link
          key={id}
          href="/donate"
          className={`flex items-center transition-colors duration-200 ${
            id === "donate" ? "text-white font-bold" : ""
          }`}
        >
          {label}
        </Link>
      ),
    )}
  </div>
);

const MobileMenuToggle = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className="text-white focus:outline-none lg:hidden"
    aria-label="Toggle mobile menu"
  >
    <div className="relative w-6 h-6">
      <Menu
        className={`absolute inset-0 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-0 rotate-90 scale-75"
            : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <X
        className={`absolute inset-0 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-75"
        }`}
      />
    </div>
  </button>
);

const MobileDropdown = ({
  id,
  label,
  menuItems,
  isActive,
  activeDropdown,
  onMobileDropdownToggle,
  onClose,
}: {
  id: string;
  label: string;
  menuItems: Array<{ href: string; text: string }>;
  isActive: (id: string) => boolean;
  activeDropdown: string | null;
  onMobileDropdownToggle: (id: string | null) => void;
  onClose: () => void;
}) => (
  <div className="dropdown-menu">
    <button
      className={`flex items-center justify-between w-full transition-colors duration-200 font-fuzzy-bubbles ${
        isActive(id) ? "text-white font-bold" : ""
      }`}
      onClick={() => onMobileDropdownToggle(id)}
      aria-expanded={activeDropdown === id}
      aria-controls={`${id}-menu-mobile`}
    >
      <span>{label}</span>
      <ChevronDown
        className={`w-4 h-4 ml-1 transition-transform duration-300 ease-in-out ${
          activeDropdown === id ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>

    {activeDropdown === id && (
      <div
        id={`${id}-menu-mobile`}
        className="py-2 px-2 bg-white/10 rounded mt-2"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onMobileDropdownToggle(null);
            const button = document.querySelector(
              `[aria-controls="${id}-menu-mobile"]`,
            ) as HTMLElement;
            if (button) button.focus();
          }
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block py-2 text-sm"
            onClick={() => {
              onClose();
              onMobileDropdownToggle(null);
            }}
          >
            {item.text}
          </Link>
        ))}
      </div>
    )}
  </div>
);

const MobileNavigation = ({
  isOpen,
  dropdownItems,
  isActive,
  activeDropdown,
  onMobileDropdownToggle,
  onClose,
}: {
  isOpen: boolean;
  dropdownItems: Array<{
    id: string;
    label: string;
    menuItems?: Array<{ href: string; text: string }>;
  }>;
  isActive: (id: string) => boolean;
  activeDropdown: string | null;
  onMobileDropdownToggle: (id: string | null) => void;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="mt-4 flex flex-col gap-4 lg:hidden">
      {dropdownItems.map(({ id, label, menuItems }) =>
        menuItems ? (
          <MobileDropdown
            key={id}
            id={id}
            label={label}
            menuItems={menuItems}
            isActive={isActive}
            activeDropdown={activeDropdown}
            onMobileDropdownToggle={onMobileDropdownToggle}
            onClose={onClose}
          />
        ) : (
          <Link
            key={id}
            href="/donate"
            className={`px-2 transition-colors duration-200 font-fuzzy-bubbles ${
              id === "donate" ? "text-white font-bold" : ""
            }`}
            onClick={onClose}
          >
            {label}
          </Link>
        ),
      )}
    </div>
  );
};

const PageTitle = ({ title }: { title: string | null }) => {
  if (!title) return null;

  return (
    <div className="w-full flex justify-start md:justify-center items-center py-2 bg-amber backdrop-blur-sm">
      <h1 className="text-lg font-semibold text-zinc-900 px-4">{title}</h1>
    </div>
  );
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isScrolled = useScroll();
  const {
    activeDropdown,
    handleDropdownHover,
    handleDropdownFocus,
    handleDropdownBlur,
    handleMobileDropdownToggle,
  } = useDropdown();
  const { isActive, getPageTitle } = useActivePath();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="text-secondary-foreground fixed w-full top-0 left-0 z-50">
      <TopBar isScrolled={isScrolled} />

      <div
        className={`w-full flex flex-col transition-all duration-300 ease-in-out ${
          isScrolled ? "transform -translate-y-[36px]" : ""
        }`}
      >
        <nav
          className={`w-full px-4 sm:px-8 lg:px-10 xl:px-20 2xl:px-52 flex flex-col lg:flex-row justify-between bg-header transition-all duration-300 ease-in-out ${
            isScrolled ? "py-3 sm:py-4 shadow-md" : "py-6 sm:py-8"
          }`}
        >
          <div className="w-full flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold"
              onClick={closeMobileMenu}
            >
              SAPUK
            </Link>

            <DesktopNavigation
              dropdownItems={dropdownItems}
              isActive={isActive}
              activeDropdown={activeDropdown}
              onDropdownHover={handleDropdownHover}
              onDropdownBlur={handleDropdownBlur}
              onDropdownFocus={handleDropdownFocus}
            />

            <MobileMenuToggle
              isOpen={isMobileMenuOpen}
              onToggle={toggleMobileMenu}
            />
          </div>

          <MobileNavigation
            isOpen={isMobileMenuOpen}
            dropdownItems={dropdownItems}
            isActive={isActive}
            activeDropdown={activeDropdown}
            onMobileDropdownToggle={handleMobileDropdownToggle}
            onClose={closeMobileMenu}
          />
        </nav>

        <PageTitle title={getPageTitle()} />
      </div>
    </header>
  );
}
