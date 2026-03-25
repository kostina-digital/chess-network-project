import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { togglePostLike } from "@/lib/postService";

function parsePostId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function POST(
  _request: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { postId: raw } = await context.params;
  const postId = parsePostId(raw);
  if (postId === null) {
    return Response.json({ error: "Invalid post id" }, { status: 400 });
  }
  try {
    const result = await togglePostLike(postId, user.id);
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}
