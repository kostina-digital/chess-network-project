import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: getDatabaseUrl() }),
  });
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing DATABASE_URL env var.");
  return url;
}

/** Dev HMR can keep an old PrismaClient without newer model delegates (e.g. `userFollow`). */
function clientHasUserFollow(client: PrismaClient): boolean {
  return typeof (client as { userFollow?: { findUnique?: unknown } }).userFollow
    ?.findUnique === "function";
}

const existing = globalForPrisma.prisma;
const reuseExisting =
  existing &&
  (process.env.NODE_ENV === "production" || clientHasUserFollow(existing));

export const prisma = reuseExisting ? existing : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  if (existing && !reuseExisting) {
    void existing.$disconnect().catch(() => {});
  }
  globalForPrisma.prisma = prisma;
}
