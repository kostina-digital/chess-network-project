"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/posts/PostCard";
import type { FeedPost, UserListItem } from "@/types/feed";
import { useAuthUser } from "@/components/auth/useAuthUser";
import { resolveAvatarUrl } from "@/lib/avatarUrl";

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
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (q: string) => {
    if (!q) {
      setPosts([]);
      setUsers([]);
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
      const data = await parseJson<{
        posts?: FeedPost[];
        users?: UserListItem[];
        error?: string;
      }>(res);
      if (!res.ok) {
        setPosts([]);
        setUsers([]);
        setError(data?.error ?? "Could not search.");
        return;
      }
      setPosts(Array.isArray(data?.posts) ? data.posts : []);
      setUsers(Array.isArray(data?.users) ? data.users : []);
    } catch {
      setPosts([]);
      setUsers([]);
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(raw);
  }, [raw, load]);

  return (
    <div className="w-full min-w-0 space-y-6 p-4">
      <h1 className="h1-style">Search</h1>

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
      ) : posts.length === 0 && users.length === 0 ? (
        <p className="text-muted-foreground">
          Nothing found for <span className="font-medium text-foreground">&quot;{raw}&quot;</span>.
        </p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {users.length + posts.length} result
            {users.length + posts.length === 1 ? "" : "s"} for{" "}
            <span className="font-medium text-foreground">&quot;{raw}&quot;</span>
          </p>
          {users.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Users</h2>
              <ul className="list-none space-y-3 p-0">
                {users.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/${encodeURIComponent(item.userName)}`}
                      className="flex items-center gap-3 rounded-lg border border-border bg-card/60 px-4 py-3 transition-colors hover:bg-muted/50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveAvatarUrl(item.userName, item.avatarUrl)}
                        alt={item.fullName ?? item.userName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">
                          {item.fullName ?? item.userName}
                        </p>
                        <p className="truncate text-sm text-muted-foreground">
                          @{item.userName}
                        </p>
                        <p className="truncate text-sm text-muted-foreground">
                          {item.bio?.trim() || "Chess player"}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {posts.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Posts</h2>
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
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
