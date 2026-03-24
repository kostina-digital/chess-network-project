import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "prisma/config";

const root = path.dirname(fileURLToPath(import.meta.url));

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
