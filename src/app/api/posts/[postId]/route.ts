import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { updatePostForAuthor } from "@/lib/postService";

function parsePostId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function PATCH(
  request: Request,
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Expected object body" }, { status: 400 });
  }

  const { title, content } = body as Record<string, unknown>;
  if (typeof title !== "string" || typeof content !== "string") {
    return Response.json(
      { error: "title and content must be strings" },
      { status: 400 }
    );
  }

  try {
    const post = await updatePostForAuthor(user.id, postId, { title, content });
    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }
    return Response.json({ post });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return Response.json({ error: message }, { status: 400 });
  }
}
