"use client";

import { useCallback, useEffect, useState } from "react";
import { PostCard } from "@/components/PostCard";
import type { FeedPost } from "@/types/feed";
import { Send } from "lucide-react";

export default function FeedPage() {
  const [postContent, setPostContent] = useState("");
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [viewerId, setViewerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishError, setPublishError] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    const [meRes, postsRes] = await Promise.all([
      fetch("/api/auth/me"),
      fetch("/api/posts"),
    ]);
    const meJson = (await meRes.json()) as { user: { id: number } | null };
    setViewerId(meJson.user?.id ?? null);

    const postsJson = (await postsRes.json()) as { posts?: FeedPost[] };
    if (Array.isArray(postsJson.posts)) {
      setFeedPosts(postsJson.posts);
    } else {
      setFeedPosts([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadFeed();
  }, [loadFeed]);

  const handlePublish = async () => {
    if (!postContent.trim()) return;
    setPublishError(null);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: postContent }),
      });
      const data = (await res.json()) as { post?: FeedPost; error?: string };
      if (!res.ok) {
        setPublishError(data.error ?? "Could not publish");
        return;
      }
      if (data.post) {
        setFeedPosts((prev) => [data.post!, ...prev]);
      }
      setPostContent("");
    } catch {
      setPublishError("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-foreground">Share Your Chess Insights</h2>
          {!viewerId ? (
            <p className="mb-4 text-sm text-muted-foreground">
              <a href="/login" className="underline">
                Sign in
              </a>{" "}
              to publish posts.
            </p>
          ) : null}
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your chess mind? Share a game analysis, tactical insight, or chess thought..."
            className="w-full resize-none rounded-lg border border-border bg-input-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            rows={4}
            disabled={!viewerId}
          />
          {publishError ? (
            <p className="mt-2 text-sm text-destructive" role="alert">
              {publishError}
            </p>
          ) : null}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => void handlePublish()}
              disabled={!postContent.trim() || !viewerId}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Publish
            </button>
          </div>
        </div>

        <div className="space-y-6">
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
