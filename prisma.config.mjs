import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

const root = path.dirname(fileURLToPath(import.meta.url));

// Prisma CLI does not use Next’s env merge: load `.env` first so `DATABASE_URL` (e.g. Neon) wins.
// `.env.local` only fills vars that are still unset — local Next.js still overrides for `next dev` via Next’s own loading.
loadEnv({ path: path.join(root, ".env") });
loadEnv({ path: path.join(root, ".env.local") });

/**
 * Plain .mjs so Vercel/`npm install` can load config without a TypeScript loader.
 * `prisma generate` does not need a reachable DB; a placeholder is enough if env is missing.
 */
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://placeholder:placeholder@127.0.0.1:5432/placeholder";

export default defineConfig({
  schema: path.join(root, "prisma", "schema.prisma"),
  datasource: {
    url: databaseUrl,
  },
});
