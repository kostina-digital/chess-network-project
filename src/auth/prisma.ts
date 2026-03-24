import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

// Avoid creating a new PrismaClient on every hot reload in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: getDatabaseUrl() }),
    // log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing DATABASE_URL env var.");
  return url;
}

