import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { listFollowers, listFollowing } from "@/lib/followService";

export const runtime = "nodejs";

function parseUserId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: raw } = await context.params;
  const userId = parseUserId(raw);
  if (userId === null) {
    return Response.json({ error: "Invalid user id" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const kind = (searchParams.get("kind") ?? "").trim().toLowerCase();

  try {
    if (kind === "followers") {
      const users = await listFollowers(userId);
      return Response.json({ users });
    }
    if (kind === "following") {
      const users = await listFollowing(userId);
      return Response.json({ users });
    }
    return Response.json(
      { error: "kind must be followers or following" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[GET /api/users/[id]/network]", error);
    return Response.json({ error: "Failed to load users" }, { status: 500 });
  }
}
