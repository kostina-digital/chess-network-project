import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { listFeedPosts } from "@/lib/postService";
import { BlogFeedPage } from "@/components/posts/BlogFeedPage";

export default async function FeedPage() {
  const user = await getCurrentUser();
  const viewerId = user?.id ?? null;
  const initialPosts = viewerId ? await listFeedPosts(viewerId) : [];

  return <BlogFeedPage initialPosts={initialPosts} viewerId={viewerId} />;
}
