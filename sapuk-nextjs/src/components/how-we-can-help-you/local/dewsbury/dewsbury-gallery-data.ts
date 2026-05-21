export type DewsburyGallerySlide = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

/** Replace `src` values with real Uploadthing / site URLs when photos are ready. */
export const DEWSBURY_GALLERY_SLIDES: DewsburyGallerySlide[] = [
  {
    id: "dewsbury-team",
    src: "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNwukYwdpVaYsH8R0Toum2A4Qe3nFUGdJDgKSv",
    alt: "SAPUK Dewsbury team",
    caption: "Our Dewsbury volunteer team",
  },
  {
    id: "walk-talk",
    src: "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNPHrAUNWLi3vBmhrD0MVN4cbfCuRa1P7JgwZX",
    alt: "Walk and Talk group outside Leggers Inn",
    caption: "Walk & Talk: meet outside Leggers Inn, then tea and coffee",
  },
  {
    id: "board-games",
    src: "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNQDsBBCEUAe7SVryDMTLIxitbzNjoE4nC36lf",
    alt: "Board game club at the Three Strand Cafe",
    caption: "Board Game Club — second Saturday each month, Three Strand Cafe",
  },
  {
    id: "community-stall",
    src: "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNTsWgI1jLz5HsW7p1MjvwBa8RxQV6J0ENkuAr",
    alt: "SAPUK community stall at Dewsbury Moor Children's Centre",
    caption: "Community stalls and holiday food pantries across Kirklees",
  },
  {
    id: "food-pantry",
    src: "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNyrrPxEHk3E89gHsFCaqbnfw5LlhJ20vRYjez",
    alt: "SAPUK food pantry at Dewsbury Moor Children's Centre",
    caption: "Holiday food pantries across Kirklees",
  },
  {
    id: "summer-food-pantry",
    src: "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMN0W36V4DzKpQyTlM5Y9rC3gIVt8sbjuxod6PL",
    alt: "SAPUK summer food pantry at Dewsbury Moor Children's Centre",
    caption: "Summer food pantries across Kirklees",
  },
];
