import type { NextConfig } from "next";

const repo = "u-automate-site"; // ★GitHubのリポジトリ名に合わせて変更

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.GITHUB_PAGES === "true" ? `/${repo}` : "",
  assetPrefix: process.env.GITHUB_PAGES === "true" ? `/${repo}/` : "",
};

export default nextConfig;