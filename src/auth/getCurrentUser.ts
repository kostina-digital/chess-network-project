import { cookies } from "next/headers";
import { getUserById } from "./userStore";
import { getCookieName, verifySession } from "./session";

export type SessionUser = {
  id: number;
  email: string;
};

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(getCookieName())?.value;
  if (!cookieValue) return null;

  const session = verifySession(cookieValue);
  if (!session) return null;

  const userId = Number.parseInt(session.userId, 10);
  if (!Number.isInteger(userId) || userId < 1) return null;

  const user = await getUserById(userId);
  if (!user) return null;

  return { id: user.id, email: user.email };
}

