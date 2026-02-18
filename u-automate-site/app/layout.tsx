import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.brand} | 業務自動化ツール開発`,
  description: site.subheadline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
