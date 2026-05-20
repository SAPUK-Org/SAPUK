export type LocalRegion = {
  slug: string;
  name: string;
  area: string;
  summary: string;
  available: boolean;
};

export const localRegions: LocalRegion[] = [
  {
    slug: "dewsbury",
    name: "Dewsbury",
    area: "Kirklees",
    summary:
      "Safe spaces, walk and talk, board game club, food pantries, and virtual safe space support.",
    available: true,
  },
];
