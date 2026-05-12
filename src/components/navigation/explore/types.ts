export type ExploreLink = {
  name: string;
  href?: string;
  subItems?: ExploreLink[];
};

export type FeaturedExploreCard = {
  image: string;
  readTime: string;
  title: string;
  type: string;
  date: string;
  href?: string;
};
