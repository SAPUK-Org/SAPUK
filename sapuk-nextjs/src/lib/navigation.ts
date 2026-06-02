import { DropdownItem } from "@/types/common/navigation";

export const dropdownItems: DropdownItem[] = [
  {
    id: "hub",
    label: "SAPUK HUB",
    menuItems: [
      { href: "/sapukhub/students", text: "Students" },
      {
        href: "/sapukhub/supporting-suicidal-thoughts",
        text: "Supporting Someone",
      },
      { href: "/sapukhub/suicidology", text: "Suicidology" },
      { href: "/sapukhub/newsletter", text: "Newsletter" },
    ],
  },
  {
    id: "help-you",
    label: "HOW WE CAN HELP YOU",
    menuItems: [
      { href: "/how-we-can-help-you/projects", text: "Projects" },
      { href: "/how-we-can-help-you/local", text: "Local Services" },
      { href: "/how-we-can-help-you/community", text: "Blogs/Community" },
      {
        href: "/how-we-can-help-you/downloadable-media",
        text: "Downloadable Media",
      },
      { href: "/how-we-can-help-you/contact-us", text: "Contact Us" },
    ],
  },
  {
    id: "help-us",
    label: "HOW YOU CAN HELP US",
    menuItems: [
      { href: "/volunteer", text: "Volunteer" },
      { href: "/donate", text: "Donate" },
      { href: "/fundraise", text: "Fundraise" },
    ],
  },
  {
    id: "est",
    label: "EST 2016:",
    menuItems: [
      { href: "/sapevolution", text: "The Beginning" },
      { href: "/sapfamily", text: "The Team" },
    ],
  },
];

export type FooterLink = { href: string; label: string };

export type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

/** Public site routes for the footer (excludes staff dashboard). */
export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "How we can help you",
    links: [
      { href: "/how-we-can-help-you/projects", label: "Projects" },
      { href: "/how-we-can-help-you/local", label: "Local services" },
      { href: "/how-we-can-help-you/local/dewsbury", label: "Dewsbury" },
      { href: "/how-we-can-help-you/local/lancashire", label: "Lancashire" },
      { href: "/how-we-can-help-you/community", label: "Blogs & community" },
      {
        href: "/how-we-can-help-you/downloadable-media",
        label: "Downloadable media",
      },
      { href: "/how-we-can-help-you/contact-us", label: "Contact us" },
      { href: "/bookings", label: "Bookings" },
    ],
  },
  {
    title: "SAPUK Hub",
    links: [
      { href: "/sapukhub/students", label: "Students" },
      {
        href: "/sapukhub/supporting-suicidal-thoughts",
        label: "Supporting someone",
      },
      { href: "/sapukhub/suicidology", label: "Suicidology" },
      { href: "/sapukhub/sapheals", label: "My healing checklist" },
      { href: "/sapukhub/newsletter", label: "Newsletter" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { href: "/donate", label: "Donate" },
      { href: "/volunteer", label: "Volunteer" },
      { href: "/fundraise", label: "Fundraise" },
    ],
  },
  {
    title: "About SAPUK",
    links: [
      { href: "/", label: "Home" },
      { href: "/sapevolution", label: "The beginning" },
      { href: "/sapfamily", label: "The team" },
    ],
  },
];

export const pageTitles: Record<string, string> = {
  "/sapukhub/students": "Student Support Hub",
  "/sapukhub/supporting-suicidal-thoughts": "Supporting Someone",
  "/sapukhub/sapheals": "My Healing Checklist",
  "/sapukhub/suicidology": "Suicidology",
  "/sapukhub/newsletter": "Newsletter",
  "/sapevolution": "The Beginning",
  "/sapfamily": "The Team",
  "/projects/idkae": "I Don't Know Anybody Either",
  "/projects/foodpantry": "The Food Pantry",
  "/projects/safe-spaces": "Safe Spaces",
  "/projects/sapukwarriors": "SAPUK Warriors",
  "/projects/suicidology-seminar": "Suicidology Seminar",
  "/projects/the-semicolon-fest": "The Semicolon Fest",
  "/projects/the-semicolon-project": "The Semicolon Project",
  "/sapservices/thesapchat": "SAPChat",
  "/sapservices/community": "Blogs/Community",
  "/sapservices/downloadable-media": "Downloadable Media",
  "/sapservices/contact-us": "Contact Us",
  "/volunteer": "Volunteer With Us",
  "/why-donate": "Why Donate to Us?",
  "/fundraise": "Fundraising",
  "/bookings": "Bookings",
};
