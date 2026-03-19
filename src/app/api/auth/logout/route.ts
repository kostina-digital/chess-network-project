import { cookies } from "next/headers";
import { getCookieName } from "@/auth/session";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(getCookieName(), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return Response.json({ ok: true });
}

