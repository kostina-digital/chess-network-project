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
} from "lucide-react";
import type { FeedPost, ProfileUser } from "@/types/feed";
import { resolveAvatarUrl } from "@/lib/avatarUrl";
import { PostCard } from "@/components/PostCard";

type UserProfileViewProps = {
  user: ProfileUser;
  posts: FeedPost[];
  viewerId: number | null;
  /** Mock follow state until Follow table exists */
  isFollowingInitial?: boolean;
};

export function UserProfileView({
  user,
  posts,
  viewerId,
  isFollowingInitial = false,
}: UserProfileViewProps) {
  const isOwnProfile = viewerId !== null && user.id === viewerId;
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const [followBusy, setFollowBusy] = useState(false);
  const displayName = user.fullName ?? user.userName;
  const avatarSrc = resolveAvatarUrl(user.userName, user.avatarUrl);

  useEffect(() => {
    setIsFollowing(isFollowingInitial);
    setFollowersCount(user.followersCount);
  }, [user.id, user.followersCount, isFollowingInitial]);

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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Card className="mb-8" padding="lg">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <img
              src={avatarSrc}
              alt={displayName}
              className="h-24 w-24 flex-shrink-0 rounded-full"
            />

            <div className="min-w-0 flex-1">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="mb-1 text-foreground">{displayName}</h1>
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
                    href="/login"
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
                  <p className="font-semibold text-foreground">
                    {user.rating ?? "—"}
                  </p>
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
                    <span className="font-semibold">{user.postsCount}</span> posts
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    <span className="font-semibold">{followersCount}</span>{" "}
                    followers
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    <span className="font-semibold">{user.followingCount}</span>{" "}
                    following
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-foreground">Posts by {displayName}</h2>
        </div>

        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                viewerId={viewerId}
              />
            ))
          ) : (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
