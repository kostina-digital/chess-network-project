import { getCurrentUser } from "@/auth/getCurrentUser";
import { followUser, unfollowUser } from "@/lib/followService";

function parseUserId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: raw } = await context.params;
  const followingId = parseUserId(raw);
  if (followingId === null) {
    return Response.json({ error: "Invalid user id" }, { status: 400 });
  }
  if (followingId === user.id) {
    return Response.json({ error: "Cannot follow yourself" }, { status: 400 });
  }

  try {
    const result = await followUser(user.id, followingId);
    return Response.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Follow failed";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: raw } = await context.params;
  const followingId = parseUserId(raw);
  if (followingId === null) {
    return Response.json({ error: "Invalid user id" }, { status: 400 });
  }

  try {
    const result = await unfollowUser(user.id, followingId);
    return Response.json(result);
  } catch {
    return Response.json({ error: "Unfollow failed" }, { status: 400 });
  }
}
