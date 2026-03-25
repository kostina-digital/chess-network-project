import { createPasswordResetRequest } from "@/lib/auth/passwordReset";

function isValidEmail(value: string) {
  const t = value.trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

/**
 * Always responds with the same shape so email existence is not leaked.
 * In development, logs a reset URL when a user is found (no email provider yet).
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email ?? "";

  if (!isValidEmail(email)) {
    return Response.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    const raw = await createPasswordResetRequest(email);

    if (process.env.NODE_ENV === "development" && raw) {
      const base = new URL(req.url).origin;
      console.info(
        `[password reset] Open: ${base}/reset-password?token=${encodeURIComponent(raw)}`
      );
    }

    return Response.json({
      ok: true,
      message:
        "If an account exists for this email, you will receive password reset instructions shortly.",
    });
  } catch {
    return Response.json({
      ok: true,
      message:
        "If an account exists for this email, you will receive password reset instructions shortly.",
    });
  }
}
