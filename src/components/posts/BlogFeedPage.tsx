"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { PostCard } from "@/components/posts/PostCard";
import type { FeedPost } from "@/types/feed";
import { AppPage } from "@/components/layout/AppPage";

async function parseJsonSafe<T>(res: Response): Promise<T | null> {
  const text = await res.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

type BlogFeedPageProps = {
  initialPosts: FeedPost[];
  viewerId: number | null;
  page: number;
  totalPages: number;
};

function BlogPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-8"
      aria-label="Blog pagination"
    >
      {prev !== null ? (
        <Link
          href={prev === 1 ? "/blog" : `/blog?page=${prev}`}
          className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/60"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-md border border-transparent px-4 py-2 text-sm text-muted-foreground">
          Previous
        </span>
      )}
      <span className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </span>
      {next !== null ? (
        <Link
          href={`/blog?page=${next}`}
          className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/60"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md border border-transparent px-4 py-2 text-sm text-muted-foreground">
          Next
        </span>
      )}
    </nav>
  );
}

export function BlogFeedPage({
  initialPosts,
  viewerId,
  page,
  totalPages,
}: BlogFeedPageProps) {
  const [feedPosts, setFeedPosts] = useState(initialPosts);
  const [feedError, setFeedError] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    setFeedError(null);
    const postsRes = await fetch(`/api/posts?page=${page}&take=10`);
    const postsJson = await parseJsonSafe<{
      posts?: FeedPost[];
      page?: number;
      totalPages?: number;
      error?: string;
    }>(postsRes);

    if (!postsJson) {
      setFeedPosts([]);
      setFeedError("Could not load posts (invalid or empty response).");
      return;
    }

    if (Array.isArray(postsJson.posts)) {
      setFeedPosts(postsJson.posts);
      if (postsJson.error) setFeedError(postsJson.error);
      return;
    }

    setFeedPosts([]);
    if (postsJson.error) setFeedError(postsJson.error);
  }, [page]);

  return (
    <AppPage>
      <div className="mb-6 flex flex-col gap-4 px-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="h1-style">Blog</h1>
          <p className="p-style-small max-w-2xl">
            Read the latest posts from the community, open discussions, and follow strong chess ideas.
          </p>
        </div>
        <Link
          href="/blog/new"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Create post
        </Link>
      </div>

      <div className="p-1 sm:p-0">
        <div className="space-y-4 sm:space-y-5">
          {feedError ? (
            <p
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {feedError}
            </p>
          ) : null}

          {feedPosts.length > 0 ? (
            feedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                viewerId={viewerId}
                onPostUpdated={loadFeed}
              />
            ))
      ) : (
            <p className="text-center text-muted-foreground">No posts yet.</p>
          )}
        </div>
        <BlogPagination page={page} totalPages={totalPages} />
      </div>
    </AppPage>
  );
}
