import type { ExploreLink, FeaturedExploreCard } from "./types";

export const exploreLinks: ExploreLink[] = [
  { name: "Home", href: "/" },
  { name: "Missions", href: "#missions" },
  { name: "Moments", href: "#moments" },
];

export const featuredExploreCards: FeaturedExploreCard[] = [
  {
    image:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=1000",
    readTime: "4 MIN READ",
    title: "For NASA's TESS, Stellar Eclipses Shed Light on Possible New Worlds",
    type: "ARTICLE",
    date: "3 DAYS AGO",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
    readTime: "6 MIN READ",
    title: "650 NASA Volunteers Have Co-Authored Scientific Papers",
    type: "ARTICLE",
    date: "2 DAYS AGO",
  },
  {
    image:
      "https://images.unsplash.com/photo-1532664189809-02133fee6988?auto=format&fit=crop&q=80&w=1000",
    readTime: "3 MIN READ",
    title: "What's Up: May 2026 Skywatching Tips from NASA",
    type: "ARTICLE",
    date: "7 DAYS AGO",
  },
];
