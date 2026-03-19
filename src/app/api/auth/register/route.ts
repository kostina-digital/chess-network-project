import { cookies } from "next/headers";
import { signSession } from "@/auth/session";
import { getCookieName } from "@/auth/session";
import { mapDbErrorToMessage } from "@/auth/mapDbError";
import { registerUser } from "@/auth/userStore";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email ?? "";
  const password = body?.password ?? "";

  try {
    const user = await registerUser(email, password);

    // Auto-login after registration
    const exp = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    const sessionValue = signSession({ userId: String(user.id), exp });

    const cookieStore = await cookies();
    cookieStore.set(getCookieName(), sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(exp),
    });

    return Response.json({ ok: true });
  } catch (e) {
    const message = mapDbErrorToMessage(e);
    return Response.json({ ok: false, error: message }, { status: 400 });
  }
}

