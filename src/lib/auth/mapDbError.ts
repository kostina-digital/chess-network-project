import { Prisma } from "@/generated/prisma";

/**
 * P2002 `meta.target` varies by driver: field names, or DB index names like `User_email_key`.
 * Normalize so the UI can say which input is duplicated.
 */
function uniqueViolationHint(error: Prisma.PrismaClientKnownRequestError): "email" | "userName" | null {
  const chunks: string[] = [error.message];
  const target = error.meta?.target;
  if (Array.isArray(target)) {
    chunks.push(...target.map(String));
  } else if (target != null) {
    chunks.push(String(target));
  }

  const haystack = chunks.join(" ").toLowerCase();

  // Postgres indexes: User_email_key → user_email_key; User_userName_key → user_username_key
  const hitsEmail =
    /\bemail\b/.test(haystack) || haystack.includes("user_email") || haystack.includes("_email_key");
  const hitsUserName =
    haystack.includes("username") ||
    haystack.includes("user_name") ||
    haystack.includes("user_username");

  if (hitsEmail && !hitsUserName) return "email";
  if (hitsUserName && !hitsEmail) return "userName";
  if (hitsEmail) return "email";
  if (hitsUserName) return "userName";
  return null;
}

/**
 * Turns Prisma / DB errors into something actionable for the UI.
 */
export function mapDbErrorToMessage(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2021") {
      return "Database table missing. Run: npx prisma migrate deploy";
    }
    // Unique constraint (race: two signups at once)
    if (error.code === "P2002") {
      const hint = uniqueViolationHint(error);
      if (hint === "email") return "This email is already registered.";
      if (hint === "userName") return "This username is already taken.";
      return "This email or username is already registered. Try signing in or use different values.";
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
    if (/Missing \w+ env var/i.test(msg)) {
      return process.env.NODE_ENV === "production"
        ? "Configure DATABASE_URL and AUTH_SECRET in Vercel: Project → Settings → Environment Variables (Production), then redeploy."
        : msg;
    }
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
