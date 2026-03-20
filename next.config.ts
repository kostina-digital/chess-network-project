import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Якщо вище по дереву є інший lockfile, Next може взяти не той root — тоді
  // PostCSS/Tailwind сканують не цей репозиторій і утиліти не з’являються в CSS.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
