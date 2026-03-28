import { Prisma } from "@/generated/prisma";
import { cookies } from "next/headers";
import { getCookieName, signSession } from "@/lib/auth/session";
import { mapDbErrorToMessage } from "@/lib/auth/mapDbError";
import { normalizeEmail, registerUser } from "@/lib/auth/userStore";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: string; userName?: string; password?: string; confirmPassword?: string }
    | null;

  const userName = body?.userName ?? "";
  const email = body?.email ?? "";
  const password = body?.password ?? "";
  const confirmPassword = body?.confirmPassword ?? "";

  if (userName.trim().length < 3) {
    return Response.json(
      { ok: false, error: "Username must be at least 3 characters long" },
      { status: 400 },
    );
  }

  const normalizedEmail = normalizeEmail(email);
  if (normalizedEmail.length < 4) {
    return Response.json({ ok: false, error: "Email is too short" }, { status: 400 });
  }
  if (!normalizedEmail.includes("@")) {
    return Response.json({ ok: false, error: "Email must contain an @ symbol" }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return Response.json({ ok: false, error: "Passwords do not match" }, { status: 400 });
  }

  if (password.length < 8) {
    return Response.json(
      { ok: false, error: "Password must be at least 8 characters long" },
      { status: 400 },
    );
  }

  try {
    console.log("[auth/register] Attempt", {
      userName: userName.trim(),
      email: normalizedEmail,
      passwordLength: password.length,
      nodeEnv: process.env.NODE_ENV,
    });

    // userName, email, password (confirm already validated above). DB: userName, email, hash, salt — no plain password / confirm stored.
    const user = await registerUser(normalizedEmail, userName.trim(), password);

    const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const sessionValue = signSession({ userId: String(user.id), exp });

    const cookieStore = await cookies();
    cookieStore.set(getCookieName(), sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(exp),
    });

    console.log("[auth/register] Success", {
      userId: user.id,
      userName: user.userName,
      email: user.email,
    });

    return Response.json({ ok: true });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("[auth/register] Prisma known error", {
        code: e.code,
        meta: e.meta,
        message: e.message,
      });
    } else {
      console.log("[auth/register] Unknown error", e);
    }

    const message = mapDbErrorToMessage(e);
    return Response.json({ ok: false, error: message }, { status: 400 });
  }
}
