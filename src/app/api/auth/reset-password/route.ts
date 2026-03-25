import { mapDbErrorToMessage } from "@/lib/auth/mapDbError";
import { resetPasswordWithToken } from "@/lib/auth/passwordReset";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { token?: string; password?: string; confirmPassword?: string }
    | null;

  const token = body?.token ?? "";
  const password = body?.password ?? "";
  const confirmPassword = body?.confirmPassword ?? "";

  if (!token.trim()) {
    return Response.json(
      { ok: false, error: "Reset link is missing or invalid." },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return Response.json(
      { ok: false, error: "Passwords do not match." },
      { status: 400 }
    );
  }

  try {
    await resetPasswordWithToken(token, password);
    return Response.json({ ok: true });
  } catch (e) {
    const message = mapDbErrorToMessage(e);
    return Response.json({ ok: false, error: message }, { status: 400 });
  }
}
