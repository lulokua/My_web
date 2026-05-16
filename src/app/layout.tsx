import type { Metadata } from "next";

import SmoothScrollProvider from "@/shared/layout/providers/SmoothScrollProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "My Web",
  description: "Built with Next.js + TypeScript + Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col overflow-x-hidden overscroll-none bg-black text-white antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
