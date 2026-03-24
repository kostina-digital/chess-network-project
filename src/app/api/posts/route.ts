import { getCurrentUser } from "@/auth/getCurrentUser";
import { createPost, listFeedPosts } from "@/lib/postService";

export async function GET() {
  const user = await getCurrentUser();
  const posts = await listFeedPosts(user?.id ?? null);
  return Response.json({ posts });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
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
    const post = await createPost(user.id, content);
    return Response.json({ post });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return Response.json({ error: message }, { status: 400 });
  }
}
