import { getCurrentUser } from "@/auth/getCurrentUser";
import { toggleCommentDislike, toggleCommentLike } from "@/lib/postService";

function parseCommentId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ commentId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { commentId: raw } = await context.params;
  const commentId = parseCommentId(raw);
  if (commentId === null) {
    return Response.json({ error: "Invalid comment id" }, { status: 400 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const kind =
    typeof body === "object" &&
    body !== null &&
    "kind" in body &&
    ((body as { kind: unknown }).kind === "like" ||
      (body as { kind: unknown }).kind === "dislike")
      ? (body as { kind: "like" | "dislike" }).kind
      : null;
  if (!kind) {
    return Response.json({ error: 'Body must include kind: "like" | "dislike"' }, { status: 400 });
  }
  try {
    const updated =
      kind === "like"
        ? await toggleCommentLike(commentId, user.id)
        : await toggleCommentDislike(commentId, user.id);
    return Response.json({ comment: updated });
  } catch {
    return Response.json({ error: "Failed to update reaction" }, { status: 500 });
  }
}
