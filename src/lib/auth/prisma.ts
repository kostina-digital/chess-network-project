import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import type { PoolConfig } from "pg";
import { parse } from "pg-connection-string";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** One concrete client per module instance (serverless / worker). */
let prismaSingleton: PrismaClient | null = null;

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing DATABASE_URL env var.");
  return url;
}

type PoolConfigWithChannelBinding = PoolConfig & { enableChannelBinding?: boolean };

function normalizeConnectionStringForPgParser(connectionString: string): string {
  const url = new URL(connectionString);

  // `pg-connection-string` warns for sslmode=require/prefer/verify-ca in pg@8,
  // because those are currently treated as verify-full aliases and will change in pg@9.
  // We normalize to verify-full so startup logs stay clean and semantics are explicit.
  if (url.searchParams.get("sslmode") === "require") {
    url.searchParams.set("sslmode", "verify-full");
  }

  return url.toString();
}

function parseDatabaseConfig(connectionString: string): PoolConfigWithChannelBinding {
  const normalizedConnectionString = normalizeConnectionStringForPgParser(connectionString);
  const parsed = parse(normalizedConnectionString) as PoolConfigWithChannelBinding;
  const params = new URL(connectionString).searchParams;

  const sslMode = params.get("sslmode");
  if ((sslMode === "require" || sslMode === "verify-full") && !parsed.ssl) {
    parsed.ssl = { rejectUnauthorized: false };
  }

  const channelBinding = params.get("channel_binding");
  if (channelBinding === "require" || channelBinding === "prefer") {
    parsed.enableChannelBinding = true;
  }

  return parsed;
}


function logDatabaseConfigDebug(connectionString: string, config: PoolConfigWithChannelBinding) {
  const url = new URL(connectionString);
  console.log("[db/prisma] Database config", {
    host: url.hostname,
    port: url.port || "5432",
    database: url.pathname.replace(/^\//, ""),
    sslmode: url.searchParams.get("sslmode") ?? "(not set)",
    channelBinding: url.searchParams.get("channel_binding") ?? "(not set)",
    sslEnabled: Boolean(config.ssl),
    enableChannelBinding: Boolean(config.enableChannelBinding),
  });
}

function createPrismaClient() {
  const databaseUrl = getDatabaseUrl();
  const config = parseDatabaseConfig(databaseUrl);

  logDatabaseConfigDebug(databaseUrl, config);

  return new PrismaClient({
    adapter: new PrismaPg(config),
  });
}

/** Dev HMR can keep an old PrismaClient without newer model delegates (e.g. `userFollow`). */
function clientHasUserFollow(client: PrismaClient): boolean {
  return typeof (client as { userFollow?: { findUnique?: unknown } }).userFollow
    ?.findUnique === "function";
}

function resolvePrismaClient(): PrismaClient {
  if (prismaSingleton) {
    return prismaSingleton;
  }

  const existing = globalForPrisma.prisma;
  const reuseExisting =
    existing &&
    (process.env.NODE_ENV === "production" || clientHasUserFollow(existing));

  if (reuseExisting) {
    prismaSingleton = existing;
    return prismaSingleton;
  }

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    if (existing && !clientHasUserFollow(existing)) {
      void existing.$disconnect().catch(() => {});
    }
    globalForPrisma.prisma = client;
  }

  prismaSingleton = client;
  return client;
}

/**
 * Lazy Prisma: avoid throwing at import time when DATABASE_URL is unset (e.g. misconfigured deploy).
 * First real DB access still requires a valid `DATABASE_URL`.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = resolvePrismaClient();
    const value = Reflect.get(client as object, prop, client);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
