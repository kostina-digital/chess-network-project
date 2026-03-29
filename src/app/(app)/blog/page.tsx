"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PostCard } from "@/components/posts/PostCard";
import { ComposePostSection } from "@/components/posts/ComposePostSection";
import type { FeedPost } from "@/types/feed";

async function parseJsonSafe<T>(res: Response): Promise<T | null> {
  const text = await res.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export default function FeedPage() {
  const router = useRouter();
  const [composeOpen, setComposeOpen] = useState(false);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [viewerId, setViewerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    setFeedError(null);
    const [meRes, postsRes] = await Promise.all([
      fetch("/api/auth/me"),
      fetch("/api/posts"),
    ]);

    const meJson = await parseJsonSafe<{ user: { id: number } | null }>(meRes);
    setViewerId(meJson?.user?.id ?? null);

    const postsJson = await parseJsonSafe<{
      posts?: FeedPost[];
      error?: string;
    }>(postsRes);
    if (!postsJson) {
      setFeedPosts([]);
      setFeedError("Could not load posts (invalid or empty response).");
    } else if (Array.isArray(postsJson.posts)) {
      setFeedPosts(postsJson.posts);
      if (postsJson.error) setFeedError(postsJson.error);
    } else {
      setFeedPosts([]);
      if (postsJson.error) setFeedError(postsJson.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadFeed();
  }, [loadFeed]);

  useEffect(() => {
    const fromHash = () => {
      if (typeof window === "undefined") return;
      if (window.location.hash === "#compose-post") setComposeOpen(true);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const openCompose = useCallback(() => {
    setComposeOpen(true);
    if (typeof window !== "undefined") {
      window.location.hash = "compose-post";
    }
  }, []);

  const closeCompose = useCallback(() => {
    setComposeOpen(false);
    if (
      typeof window !== "undefined" &&
      window.location.hash === "#compose-post"
    ) {
      router.replace("/blog", { scroll: false });
    }
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full min-w-0 p-4">
        <ComposePostSection
          viewerId={viewerId}
          open={composeOpen}
          onOpenChange={(next) => {
            if (next) openCompose();
            else closeCompose();
          }}
          onPublished={(post) => setFeedPosts((prev) => [post, ...prev])}
          className="mb-5"
          sectionId="compose-post"
        />

        <div className="space-y-4 sm:space-y-5">
          {feedError ? (
            <p
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {feedError}
            </p>
          ) : null}
          {loading ? (
            <p className="text-center text-muted-foreground">Loading feed…</p>
          ) : feedPosts.length > 0 ? (
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
      </div>
    </div>
  );
}
