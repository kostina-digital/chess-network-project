import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { countFeedPosts, listFeedPosts } from "@/lib/postService";
import { BlogFeedPage } from "@/components/posts/BlogFeedPage";

const POSTS_PER_PAGE = 10;

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string };
}) {
  const sp = await Promise.resolve(searchParams);
  const parsed = Number.parseInt(sp.page ?? "1", 10);
  const pageFromQuery =
    Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1;
  const user = await getCurrentUser();
  const viewerId = user?.id ?? null;
  const totalCount = viewerId ? await countFeedPosts() : 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));
  const page = Math.min(pageFromQuery, totalPages);
  const initialPosts = viewerId
    ? await listFeedPosts(viewerId, POSTS_PER_PAGE, (page - 1) * POSTS_PER_PAGE)
    : [];

  return (
    <BlogFeedPage
      initialPosts={initialPosts}
      viewerId={viewerId}
      page={page}
      totalPages={totalPages}
    />
  );
}
