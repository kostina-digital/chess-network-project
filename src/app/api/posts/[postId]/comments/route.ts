import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { addPostComment, listCommentsForPost } from "@/lib/postService";
import type { FeedComment } from "@/types/feed";

function parsePostId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId: raw } = await context.params;
  const postId = parsePostId(raw);
  if (postId === null) {
    return Response.json({ error: "Invalid post id" }, { status: 400 });
  }
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const comments = await listCommentsForPost(postId, user.id);
  return Response.json({ comments });
}

export async function POST(
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
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const content =
    typeof body === "object" &&
    body !== null &&
    "content" in body &&
    typeof (body as { content: unknown }).content === "string"
      ? (body as { content: string }).content
      : "";
  try {
    const row = await addPostComment(postId, user.id, content);
    const comment: FeedComment = {
      id: String(row.id),
      authorName: row.author.fullName ?? row.author.userName,
      authorUserName: row.author.userName,
      text: row.content,
      timestamp: row.createdAt.toISOString(),
      likes: 0,
      dislikes: 0,
      userVote: null,
    };
    return Response.json({ comment });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const status = message === "Post not found" ? 404 : 400;
    return Response.json({ error: message }, { status });
  }
}
