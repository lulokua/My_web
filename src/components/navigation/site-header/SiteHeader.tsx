import { ExploreNavigation } from "@/components/navigation/explore";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black">
      <ExploreNavigation />
    </header>
  );
}
