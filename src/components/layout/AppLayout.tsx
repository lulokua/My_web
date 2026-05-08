import type { ReactNode } from "react";
import { ExploreNavigation } from "@/components/navigation/explore";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="bg-black">
      <ExploreNavigation />
      {children}
    </main>
  );
}
