import type { Metadata } from "next";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
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
      <body className="antialiased min-h-screen flex flex-col bg-black text-white overscroll-none overflow-x-hidden">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
