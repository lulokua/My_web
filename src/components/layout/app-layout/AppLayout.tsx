import type { ReactNode } from "react";
import { SiteHeader } from "@/components/navigation/site-header";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      <SiteHeader />
      {children}
    </main>
  );
}
