import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "U-Automate | 業務自動化ツール開発",
  description: "Excel・Google Sheets・AIで手作業を自動化。VBA/GAS/AI自動化の開発・導入支援。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
