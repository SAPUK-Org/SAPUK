export type Image = {
  src: string;
  alt: string;
};

export type PricingTier = {
  range: string;
  price: string;
};

export type Facilitator = {
  name: string;
  title: string;
};

export type ResourceLink = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

export type ContentSection = {
  title: string;
  content: string;
};

export type SidebarCard = {
  content: string;
};

export type Quote = {
  text: string;
  author: string;
  title: string;
};

export type TeamMember = {
  role?: string;
  name: string;
  location?: string;
  email?: string;
  image?: string;
  bio?: string;
  handle?: string;
};
