export type LocalRegion = {
  slug: string;
  name: string;
  area: string;
  summary: string;
  coverage: string;
  availability: string;
  email: string;
  image: {
    src: string;
    alt: string;
  };
  services: string[];
  accent: "blue" | "purple";
  available: boolean;
};

export const localRegions: LocalRegion[] = [
  {
    slug: "dewsbury",
    name: "Dewsbury",
    area: "Kirklees",
    summary:
      "Safe spaces, walk and talk, board game club, food pantries, and virtual safe space support.",
    coverage: "Dewsbury and Kirklees",
    availability: "Regular groups and new dates added when confirmed",
    email: "dewsburyoffice@suicideapuk.co.uk",
    image: {
      src: "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNPHrAUNWLi3vBmhrD0MVN4cbfCuRa1P7JgwZX",
      alt: "Walk and Talk group outside Leggers Inn in Dewsbury",
    },
    services: [
      "Safe spaces",
      "Walk & Talk",
      "Board Game Club",
      "Food pantry",
    ],
    accent: "blue",
    available: true,
  },
  {
    slug: "lancashire",
    name: "Lancashire",
    area: "Lancashire",
    summary:
      "Safe spaces, walk and talk, Longridge days out, art week, and community events across Lancashire.",
    coverage: "Preston, Lancaster, Burnley, Blackburn, Leyland and more",
    availability: "Upcoming dates and recurring community support",
    email: "lancashireoffice@suicideapuk.co.uk",
    image: {
      src: "/local/lancashire-hero.png",
      alt: "Soft illustrated Lancashire hills and viaduct",
    },
    services: ["Safe spaces", "Semicolon Project", "Talk & Walk", "Art Week"],
    accent: "purple",
    available: true,
  },
];
