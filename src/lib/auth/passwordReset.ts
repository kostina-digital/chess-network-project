import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/auth/prisma";
import { normalizeEmail, setUserPassword } from "@/lib/auth/userStore";

const RESET_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

export function hashResetToken(raw: string) {
  return createHash("sha256").update(raw, "utf8").digest("hex");
}

/**
 * Creates a reset token for the user with this email, or returns null if no user.
 * Returns the raw token (for email or dev logging only — never store it in plain form in DB).
 */
export async function createPasswordResetRequest(
  email: string
): Promise<string | null> {
  const normalized = normalizeEmail(email);
  const user = await prisma.user.findUnique({ where: { email: normalized } });
  if (!user) return null;

  const raw = randomBytes(32).toString("base64url");
  const tokenHash = hashResetToken(raw);
  const expiresAt = new Date(Date.now() + RESET_EXPIRY_MS);

  await prisma.$transaction([
    prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
    prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    }),
  ]);

  return raw;
}

export async function resetPasswordWithToken(rawToken: string, password: string) {
  const trimmed = rawToken.trim();
  if (!trimmed) {
    throw new Error("Invalid or expired reset link.");
  }

  const tokenHash = hashResetToken(trimmed);
  const row = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
  });

  if (!row || row.expiresAt < new Date()) {
    throw new Error("Invalid or expired reset link.");
  }

  await setUserPassword(row.userId, password);
  await prisma.passwordResetToken.delete({ where: { id: row.id } });
}
