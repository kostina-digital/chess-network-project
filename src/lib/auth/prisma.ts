import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { createHash } from "crypto";
import type { PoolConfig } from "pg";
import { parse } from "pg-connection-string";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaConfigSignature?: string;
};

/** One concrete client per module instance (serverless / worker). */
let prismaSingleton: PrismaClient | null = null;
let prismaConfigSignatureSingleton: string | null = null;

function normalizeRawDatabaseUrl(value: string): string {
  let v = value.trim().replace(/^\uFEFF/, "");
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

function getDatabaseUrl() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("Missing DATABASE_URL env var.");
  const url = normalizeRawDatabaseUrl(raw);
  if (!url) throw new Error("Missing DATABASE_URL env var.");
  return url;
}

type PoolConfigWithChannelBinding = PoolConfig & { enableChannelBinding?: boolean };

function deleteSearchParamsCaseInsensitive(
  params: URLSearchParams,
  names: string[],
): void {
  const want = new Set(names.map((n) => n.toLowerCase()));
  for (const key of [...params.keys()]) {
    if (want.has(key.toLowerCase())) {
      params.delete(key);
    }
  }
}

function hasSearchParamCaseInsensitive(
  params: URLSearchParams,
  name: string,
): boolean {
  const n = name.toLowerCase();
  for (const key of params.keys()) {
    if (key.toLowerCase() === n) return true;
  }
  return false;
}

function normalizeConnectionStringForPgParser(connectionString: string): string {
  const url = new URL(connectionString);

  // In pg/libpq query params override authority: ?Host=base forces host "base".
  // Remove host/port/channel_binding and any sslmode duplicates regardless of key case.
  deleteSearchParamsCaseInsensitive(url.searchParams, [
    "host",
    "port",
    "channel_binding",
    "sslmode",
  ]);

  // Canonical TLS mode for Neon-compatible strings; avoids pg@8 warnings for sslmode=require.
  url.searchParams.set("sslmode", "verify-full");
  if (!hasSearchParamCaseInsensitive(url.searchParams, "connect_timeout")) {
    url.searchParams.set("connect_timeout", "60");
  }

  return url.toString();
}

function parseDatabaseConfig(connectionString: string): PoolConfigWithChannelBinding {
  const normalizedConnectionString = normalizeConnectionStringForPgParser(connectionString);
  const parsed = parse(normalizedConnectionString) as PoolConfigWithChannelBinding;
  return parsed;
}

function getPrismaConfigSignature(connectionString: string): string {
  const normalized = normalizeConnectionStringForPgParser(connectionString);
  const digest = createHash("sha256").update(normalized).digest("hex");
  return `pg:${digest}`;
}

function createPrismaClient() {
  const config = parseDatabaseConfig(getDatabaseUrl());

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
  const connectionString = getDatabaseUrl();
  const desiredSignature = getPrismaConfigSignature(connectionString);

  if (prismaSingleton && prismaConfigSignatureSingleton === desiredSignature) {
    return prismaSingleton;
  }
  if (prismaSingleton && prismaConfigSignatureSingleton !== desiredSignature) {
    void prismaSingleton.$disconnect().catch(() => {});
    prismaSingleton = null;
    prismaConfigSignatureSingleton = null;
  }

  const existing = globalForPrisma.prisma;
  const existingSignature = globalForPrisma.prismaConfigSignature;
  const reuseExisting =
    existing &&
    existingSignature === desiredSignature &&
    (process.env.NODE_ENV === "production" || clientHasUserFollow(existing));

  if (reuseExisting) {
    prismaSingleton = existing;
    prismaConfigSignatureSingleton = desiredSignature;
    return prismaSingleton;
  }

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    if (existing && !clientHasUserFollow(existing)) {
      void existing.$disconnect().catch(() => {});
    }
    globalForPrisma.prisma = client;
    globalForPrisma.prismaConfigSignature = desiredSignature;
  }

  prismaSingleton = client;
  prismaConfigSignatureSingleton = desiredSignature;
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
