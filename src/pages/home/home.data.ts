import {
  Camera,
  Globe,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

type HeroSocialLink = {
  label: string;
  Icon: LucideIcon;
};

export const heroSocialLinks: HeroSocialLink[] = [
  { label: "Instagram", Icon: Camera },
  { label: "Twitter", Icon: MessageCircle },
  { label: "Website", Icon: Globe },
];
