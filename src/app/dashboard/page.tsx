"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  UserPlus,
  UserMinus,
  Edit2,
  FileText,
  Users,
  UserCheck,
} from "lucide-react";
import {
  getUserByUsername,
  getPostsByUserId,
  currentUser,
} from "@/app/data/mockData";
import { PostCard } from "@/components/PostCard";

export default function ProfilePage() {
  const params = useParams<{ username?: string }>();
  const username = params.username;
  const user = username ? getUserByUsername(username) : undefined;
  const isOwnProfile = user?.id === currentUser.id;
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing ?? false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="mb-4 text-foreground">User Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The user you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  const userPosts = getPostsByUserId(user.id);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 rounded-lg border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="h-24 w-24 flex-shrink-0 rounded-full"
            />

            <div className="min-w-0 flex-1">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="mb-1 text-foreground">{user.fullName}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>

                {isOwnProfile ? (
                  <Link
                    href="/profile/edit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleFollowToggle}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 transition-colors ${
                      isFollowing
                        ? "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                        : "bg-primary text-primary-foreground hover:opacity-90"
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
                )}
              </div>

              <p className="mb-4 leading-relaxed text-foreground">{user.bio}</p>

              <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-muted/50 px-4 py-3">
                  <p className="mb-1 text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold text-foreground">{user.rating}</p>
                </div>
                <div className="col-span-2 rounded-lg bg-muted/50 px-4 py-3 sm:col-span-1">
                  <p className="mb-1 text-sm text-muted-foreground">Opening</p>
                  <p className="text-sm font-semibold text-foreground">
                    {user.favoriteOpening}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    <span className="font-semibold">{user.postsCount}</span>{" "}
                    posts
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    <span className="font-semibold">{user.followersCount}</span>{" "}
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
          <h2 className="text-foreground">Posts by {user.fullName}</h2>
        </div>

        <div className="space-y-6">
          {userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
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
