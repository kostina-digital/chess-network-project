"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import type { FeedPost } from "@/types/feed";
import { useAuthUser } from "@/components/auth/useAuthUser";

async function parseJson<T>(res: Response): Promise<T | null> {
  const text = await res.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export function SearchPageContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("q")?.trim() ?? "";
  const { user } = useAuthUser();
  const viewerId = user?.id ?? null;

  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (q: string) => {
    if (!q) {
      setPosts([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}`,
        { credentials: "include" }
      );
      const data = await parseJson<{ posts?: FeedPost[]; error?: string }>(res);
      if (!res.ok) {
        setPosts([]);
        setError(data?.error ?? "Could not search.");
        return;
      }
      setPosts(Array.isArray(data?.posts) ? data.posts : []);
    } catch {
      setPosts([]);
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(raw);
  }, [raw, load]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-6">
      <h1 className="text-2xl font-semibold text-foreground">Search</h1>

      {!raw ? (
        <p className="text-muted-foreground">
          Type a query in the bar above, or open a section directly.
        </p>
      ) : loading ? (
        <p className="text-sm text-muted-foreground">Searching…</p>
      ) : error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">
          No posts match <span className="font-medium text-foreground">&quot;{raw}&quot;</span>.
        </p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {posts.length} result{posts.length === 1 ? "" : "s"} for{" "}
            <span className="font-medium text-foreground">&quot;{raw}&quot;</span>
          </p>
          <ul className="list-none space-y-6 p-0">
            {posts.map((post) => (
              <li key={post.id}>
                <PostCard
                  post={post}
                  viewerId={viewerId}
                  onPostUpdated={() => void load(raw)}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      <ul className="list-none space-y-2 border-t border-border pt-6 text-sm">
        <li>
          <Link href="/blog" className="font-medium text-primary hover:underline">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/news" className="font-medium text-primary hover:underline">
            News
          </Link>
        </li>
        <li>
          <Link href="/about" className="font-medium text-primary hover:underline">
            About Us
          </Link>
        </li>
      </ul>
    </div>
  );
}
