import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";
import { prisma } from "./prisma";

export type AuthUser = {
  id: number;
  userName: string;
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

function normalizeUserName(userName: string) {
  return userName.trim();
}

export async function registerUser(email: string, userName: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedUserName = normalizeUserName(userName);

  if (normalizedUserName.length < 3) throw new Error("Username must be at least 3 characters long.");
  if (normalizedEmail.length < 4) throw new Error("Email is too short.");
  if (password.length < 8) throw new Error("Password must be at least 8 characters long.");

  const [existingEmail, existingName] = await Promise.all([
    prisma.user.findUnique({ where: { email: normalizedEmail } }),
    prisma.user.findUnique({ where: { userName: normalizedUserName } }),
  ]);

  if (existingEmail && existingName) {
    throw new Error("This email and username are already registered.");
  }
  if (existingEmail) {
    throw new Error("This email is already registered.");
  }
  if (existingName) {
    throw new Error("This username is already taken.");
  }

  const saltBytes = randomBytes(16);
  const passwordHashB64 = hashPassword(password, saltBytes);
  const saltB64 = saltBytes.toString("base64");

  const user = await prisma.user.create({
    data: {
      userName: normalizedUserName,
      email: normalizedEmail,
      passwordHashB64,
      saltB64,
    },
  });

  return user;
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

