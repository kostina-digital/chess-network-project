"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  UserPlus,
  UserMinus,
  Edit2,
  FileText,
  Users,
  UserCheck,
  X,
} from "lucide-react";
import type { FeedPost, ProfileUser, UserListItem } from "@/types/feed";
import { resolveAvatarUrl } from "@/lib/avatarUrl";
import { PostCard } from "@/components/posts/PostCard";
import { ComposePostSection } from "@/components/posts/ComposePostSection";

type UserProfileViewProps = {
  user: ProfileUser;
  posts: FeedPost[];
  viewerId: number | null;
  isFollowingInitial?: boolean;
  embedded?: boolean;
  showPosts?: boolean;
};

export function UserProfileView({
  user,
  posts,
  viewerId,
  isFollowingInitial = false,
  embedded = false,
  showPosts = true,
}: UserProfileViewProps) {
  const isOwnProfile = viewerId !== null && user.id === viewerId;
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const [followingCount, setFollowingCount] = useState(user.followingCount);
  const [followBusy, setFollowBusy] = useState(false);
  const [networkModal, setNetworkModal] = useState<"followers" | "following" | null>(null);
  const [networkUsers, setNetworkUsers] = useState<UserListItem[]>([]);
  const [networkLoading, setNetworkLoading] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const displayName = user.fullName ?? user.userName;
  const avatarSrc = resolveAvatarUrl(user.userName, user.avatarUrl);

  const [postsState, setPostsState] = useState(posts);
  const [postsCountDisplay, setPostsCountDisplay] = useState(user.postsCount);

  useEffect(() => {
    setPostsState(posts);
  }, [posts]);

  useEffect(() => {
    setPostsCountDisplay(user.postsCount);
  }, [user.postsCount]);

  useEffect(() => {
    setIsFollowing(isFollowingInitial);
    setFollowersCount(user.followersCount);
    setFollowingCount(user.followingCount);
  }, [user.id, user.followersCount, user.followingCount, isFollowingInitial]);

  const handleFollowToggle = async () => {
    if (!viewerId || followBusy) return;
    setFollowBusy(true);
    try {
      const method = isFollowing ? "DELETE" : "POST";
      const res = await fetch(`/api/users/${user.id}/follow`, { method });
      const data = (await res.json()) as {
        isFollowing?: boolean;
        followersCount?: number;
        error?: string;
      };
      if (!res.ok) {
        console.error(data.error ?? "Follow request failed");
        return;
      }
      if (typeof data.isFollowing === "boolean") {
        setIsFollowing(data.isFollowing);
        setFollowingCount((prev) =>
          data.isFollowing ? prev + 1 : Math.max(0, prev - 1)
        );
      }
      if (typeof data.followersCount === "number") {
        setFollowersCount(data.followersCount);
      }
    } catch {
      /* ignore */
    } finally {
      setFollowBusy(false);
    }
  };

  const openNetworkModal = async (kind: "followers" | "following") => {
    setNetworkModal(kind);
    setNetworkUsers([]);
    setNetworkError(null);
    setNetworkLoading(true);
    try {
      const res = await fetch(`/api/users/${user.id}/network?kind=${kind}`, {
        credentials: "include",
      });
      const data = (await res.json()) as {
        users?: UserListItem[];
        error?: string;
      };
      if (!res.ok) {
        setNetworkError(data.error ?? "Could not load users.");
        return;
      }
      setNetworkUsers(Array.isArray(data.users) ? data.users : []);
    } catch {
      setNetworkError("Network error.");
    } finally {
      setNetworkLoading(false);
    }
  };

  const inner = (
    <>
      <div className="mb-8 rounded-lg border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-24 w-24 flex-shrink-0 rounded-full"
          />

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="h1-style mb-1">{displayName}</h1>
                <p className="text-muted-foreground">@{user.userName}</p>
              </div>

              {isOwnProfile ? (
                <Link
                  href="/dashboard/edit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Link>
              ) : viewerId ? (
                <button
                  type="button"
                  onClick={() => void handleFollowToggle()}
                  disabled={followBusy}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    isFollowing
                      ? "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary-hover"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Follow
                    </>
                  )}
                </button>
              ) : (
                <Link
                  href="/log-in"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign in to follow
                </Link>
              )}
            </div>

            <p className="mb-4 leading-relaxed text-foreground">
              {user.bio?.trim() ? (
                user.bio
              ) : (
                <span className="text-muted-foreground">No bio yet.</span>
              )}
            </p>

            <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-muted/50 px-4 py-3">
                <p className="mb-1 text-sm text-muted-foreground">Rating</p>
                <p className="font-semibold text-foreground">{user.rating ?? "—"}</p>
              </div>
              <div className="col-span-2 rounded-lg bg-muted/50 px-4 py-3 sm:col-span-1">
                <p className="mb-1 text-sm text-muted-foreground">Opening</p>
                <p className="text-sm font-semibold text-foreground">
                  {user.favoriteOpening?.trim() ? user.favoriteOpening : "—"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">
                  <span className="font-semibold">{postsCountDisplay}</span> posts
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => void openNetworkModal("followers")}
                  className="text-foreground transition-colors hover:text-primary"
                >
                  <span className="font-semibold">{followersCount}</span> followers
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => void openNetworkModal("following")}
                  className="text-foreground transition-colors hover:text-primary"
                >
                  <span className="font-semibold">{followingCount}</span> following
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPosts ? (
        <>
          {isOwnProfile ? (
            <div className="mb-8">
              <h2 className="h3-style mb-3">Add post</h2>
              <ComposePostSection
                viewerId={viewerId}
                onPublished={(post) => {
                  setPostsState((prev) => [post, ...prev]);
                  setPostsCountDisplay((count) => count + 1);
                }}
                className="mb-0"
              />
            </div>
          ) : null}

          <div className="mb-6">
            <h2 className="h3-style">Posts by {displayName}</h2>
          </div>

          <div className="space-y-6">
            {postsState.length > 0 ? (
              postsState.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  viewerId={viewerId}
                  onPostSaved={(updated) =>
                    setPostsState((prev) =>
                      prev.map((p) => (p.id === updated.id ? updated : p))
                    )
                  }
                />
              ))
            ) : (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No posts yet</p>
              </div>
            )}
          </div>
        </>
      ) : null}

      {networkModal ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-graphite/60 backdrop-blur-[1px]"
            aria-label="Close network list"
            onClick={() => setNetworkModal(null)}
          />
          <div className="relative z-10 flex max-h-[85vh] w-full max-w-lg min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-3">
              <h2 className="text-lg font-semibold text-foreground">
                {networkModal === "followers" ? "Followers" : "Following"}
              </h2>
              <button
                type="button"
                onClick={() => setNetworkModal(null)}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {networkLoading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : networkError ? (
                <p className="text-sm text-destructive" role="alert">
                  {networkError}
                </p>
              ) : networkUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No users here yet.</p>
              ) : (
                <ul className="list-none space-y-2 p-0">
                  {networkUsers.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/${encodeURIComponent(item.userName)}`}
                        onClick={() => setNetworkModal(null)}
                        className="flex items-center gap-3 rounded-lg border border-border bg-card/60 px-3 py-2 transition-colors hover:bg-muted/50"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={resolveAvatarUrl(item.userName, item.avatarUrl)}
                          alt={item.fullName ?? item.userName}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {item.fullName ?? item.userName}{" "}
                            <span className="font-normal text-muted-foreground">
                              @{item.userName}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );

  if (embedded) {
    return inner;
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full min-w-0 p-4">{inner}</div>
    </div>
  );
}
