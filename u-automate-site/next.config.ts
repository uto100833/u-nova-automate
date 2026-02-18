import type { NextConfig } from "next";

const repo = "YOUR_REPO_NAME"; // ★例: u-automate-site（リポジトリ名に変更）

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.GITHUB_PAGES === "true" ? `/${repo}` : "",
  assetPrefix: process.env.GITHUB_PAGES === "true" ? `/${repo}/` : "",
};

export default nextConfig;
