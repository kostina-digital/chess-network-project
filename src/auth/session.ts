import crypto from "crypto";

const COOKIE_NAME = "auth_session";

export type SessionPayload = {
  userId: string;
  exp: number; // unix ms
};

function base64urlEncode(input: string) {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64urlDecode(input: string) {
  const base64 = input.replaceAll("-", "+").replaceAll("_", "/");
  // Pad to multiple of 4
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    // Fail loudly so auth can't silently run insecurely.
    throw new Error("Missing AUTH_SECRET env var.");
  }
  return secret;
}

export function signSession(payload: SessionPayload) {
  const payloadStr = JSON.stringify(payload);
  const encoded = base64urlEncode(payloadStr);
  const signature = crypto.createHmac("sha256", getSecret()).update(encoded).digest("base64");
  const signatureB64Url = signature.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  return `${encoded}.${signatureB64Url}`;
}

export function verifySession(cookieValue: string): SessionPayload | null {
  try {
    const parts = cookieValue.split(".");
    if (parts.length !== 2) return null;
    const [encoded, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", getSecret())
      .update(encoded)
      .digest("base64")
      .replaceAll("+", "-")
      .replaceAll("/", "_")
      .replaceAll("=", "");

    if (
      signature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    ) {
      return null;
    }

    const payloadStr = base64urlDecode(encoded);
    const payload = JSON.parse(payloadStr) as { userId?: unknown; exp?: unknown };
    if (payload?.userId == null || typeof payload.exp !== "number") return null;
    if (Date.now() > payload.exp) return null;
    const userId = String(payload.userId);
    if (!userId) return null;
    return { userId, exp: payload.exp };
  } catch {
    return null;
  }
}

export function getCookieName() {
  return COOKIE_NAME;
}

