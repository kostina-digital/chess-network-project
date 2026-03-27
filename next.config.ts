import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: true,
  // If another lockfile exists higher in the tree, Next may pick the wrong root; then
  // PostCSS/Tailwind would scan the wrong repo and utilities would not appear in CSS.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
