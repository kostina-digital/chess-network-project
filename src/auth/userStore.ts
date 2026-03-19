import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";
import { prisma } from "./prisma";

export type AuthUser = {
  id: number;
  email: string;
  passwordHashB64: string;
  saltB64: string;
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPassword(password: string, saltBytes: Buffer) {
  // Reasonable defaults for dev. Increase iterations for production.
  const hash = pbkdf2Sync(password, saltBytes, 310_000, 32, "sha256");
  return hash.toString("base64");
}

export async function registerUser(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  if (normalizedEmail.length < 4) throw new Error("Email is too short.");
  if (password.length < 4) throw new Error("Password is too short.");

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) throw new Error("User already exists.");

  const saltBytes = randomBytes(16);
  const passwordHashB64 = hashPassword(password, saltBytes);
  const saltB64 = saltBytes.toString("base64");

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      passwordHashB64,
      saltB64,
    },
  });

  return user as AuthUser;
}

export async function authenticateUser(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) throw new Error("Invalid email or password.");

  const saltBytes = Buffer.from(user.saltB64, "base64");
  const attemptedHashB64 = hashPassword(password, saltBytes);
  const attemptedHash = Buffer.from(attemptedHashB64, "base64");
  const storedHash = Buffer.from(user.passwordHashB64, "base64");

  if (attemptedHash.length !== storedHash.length || !timingSafeEqual(attemptedHash, storedHash)) {
    throw new Error("Invalid email or password.");
  }

  return user;
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

