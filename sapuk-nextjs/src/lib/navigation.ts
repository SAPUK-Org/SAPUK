import { DropdownItem } from "@/types/common/navigation";

export const dropdownItems: DropdownItem[] = [
  {
    id: "hub",
    label: "SAPUK HUB",
    menuItems: [
      { href: "/sapukhub/projects", text: "Projects" },
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
    id: "services",
    label: "HOW WE CAN HELP YOU",
    menuItems: [
      { href: "/sapservices/community", text: "Blogs/Community" },
      { href: "/sapservices/downloadable-media", text: "Downloadable Media" },
      { href: "/sapservices/contact-us", text: "Contact Us" },
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
