import { getCurrentUser } from "@/auth/getCurrentUser";

export async function GET() {
  const user = await getCurrentUser();
  return Response.json({ user });
}

