import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { searchPosts, searchUsers } from "@/lib/postService";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  if (!q) {
    return Response.json({ posts: [] as const, users: [] as const });
  }

  try {
    const [posts, users] = await Promise.all([
      searchPosts(user.id, q),
      searchUsers(q),
    ]);
    return Response.json({ posts, users });
  } catch (e) {
    console.error("[GET /api/search]", e);
    return Response.json(
      { posts: [], users: [], error: "Search failed" },
      { status: 500 }
    );
  }
}
