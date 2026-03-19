import { Prisma } from "@prisma/client";

/**
 * Turns Prisma / DB errors into something actionable for the UI.
 */
export function mapDbErrorToMessage(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // e.g. table missing
    if (error.code === "P2021") {
      return "Database table missing. Run: npx prisma migrate deploy";
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    const msg = error.message;
    if (/denied access|P1010|authentication failed|password/i.test(msg)) {
      return "Cannot connect to PostgreSQL: wrong DATABASE_URL (user/password) or access denied. On Mac with Homebrew try: postgresql://YOUR_MAC_USERNAME@localhost:5432/chessnet?schema=public (run whoami for the username).";
    }
    if (/P1001|Can't reach database/i.test(msg)) {
      return "PostgreSQL is not running or wrong host/port. Start it (brew services start postgresql@14) and check DATABASE_URL.";
    }
    return `Database error: ${msg}`;
  }

  if (error instanceof Error) {
    const msg = error.message;
    if (/denied access|P1010|User was denied access/i.test(msg)) {
      return "PostgreSQL denied access — fix DATABASE_URL (user/password must match your local Postgres). Homebrew: often postgresql://$(whoami)@localhost:5432/chessnet?schema=public";
    }
    if (/P1001|Can't reach database/i.test(msg)) {
      return "Cannot reach PostgreSQL. Start the server and check DATABASE_URL.";
    }
    return msg;
  }

  return "Something went wrong.";
}
