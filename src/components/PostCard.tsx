"use client";

import {
  Heart,
  MessageSquare,
  Send,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import type { FeedComment, FeedPost } from "@/types/feed";
import { resolveAvatarUrl } from "@/lib/avatarUrl";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type PostCardProps = {
  post: FeedPost;
  /** Logged-in user id, or null — likes/comments disabled when null. */
  viewerId: number | null;
  onPostUpdated?: () => void;
};

type CommentRow = FeedComment;

export function PostCard({ post, viewerId, onPostUpdated }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [modalComments, setModalComments] = useState<CommentRow[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [mounted, setMounted] = useState(false);

  const author = post.author;
  const displayName = author.fullName ?? author.userName;
  const avatarSrc = resolveAvatarUrl(author.userName, author.avatarUrl);
  const ts = new Date(post.timestamp);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likes);
    setCommentsCount(post.commentsCount);
  }, [post.id, post.isLiked, post.likes, post.commentsCount]);

  useEffect(() => {
    if (!commentsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCommentsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commentsOpen]);

  useEffect(() => {
    if (!commentsOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [commentsOpen]);

  const handleLike = async () => {
    if (!viewerId) return;
    const prevLiked = isLiked;
    const prevCount = likesCount;
    setIsLiked(!prevLiked);
    setLikesCount(prevLiked ? prevCount - 1 : prevCount + 1);
    try {
      const res = await fetch(`/api/posts/${post.id}/like`, { method: "POST" });
      const data = (await res.json()) as { liked?: boolean; likes?: number };
      if (!res.ok) throw new Error();
      if (typeof data.likes === "number") setLikesCount(data.likes);
      if (typeof data.liked === "boolean") setIsLiked(data.liked);
      onPostUpdated?.();
    } catch {
      setIsLiked(prevLiked);
      setLikesCount(prevCount);
    }
  };

  const loadComments = async () => {
    setCommentsLoading(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/comments`);
      const data = (await res.json()) as { comments?: FeedComment[] };
      if (res.ok && Array.isArray(data.comments)) {
        setModalComments(data.comments);
      } else {
        setModalComments([]);
      }
    } catch {
      setModalComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };

  const openComments = async () => {
    setNewCommentText("");
    setCommentsOpen(true);
    await loadComments();
  };

  const handleAddComment = async () => {
    const text = newCommentText.trim();
    if (!text || !viewerId) return;
    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const data = (await res.json()) as { comment?: FeedComment; error?: string };
      if (!res.ok || !data.comment) return;
      setModalComments((m) => [...m, data.comment!]);
      setCommentsCount((c) => c + 1);
      setNewCommentText("");
      onPostUpdated?.();
    } catch {
      /* ignore */
    }
  };

  const handleCommentVote = async (
    commentId: string,
    vote: "like" | "dislike"
  ) => {
    if (!viewerId) return;
    try {
      const res = await fetch(`/api/comments/${commentId}/reaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: vote }),
      });
      const data = (await res.json()) as { comment?: FeedComment };
      if (!res.ok || !data.comment) return;
      setModalComments((prev) =>
        prev.map((c) => (c.id === commentId ? data.comment! : c))
      );
    } catch {
      /* ignore */
    }
  };

  const commentsLabel = commentsCount === 1 ? "comment" : "comments";

  const commentsModal =
    mounted && commentsOpen ? (
      createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
            aria-label="Close comments"
            onClick={() => setCommentsOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`comments-title-${post.id}`}
            className="relative z-10 flex max-h-[min(80vh,28rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-600 dark:bg-zinc-800">
              <h2
                id={`comments-title-${post.id}`}
                className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Comments
                <span className="ml-2 text-sm font-normal text-zinc-500 dark:text-zinc-400">
                  ({commentsCount})
                </span>
              </h2>
              <button
                type="button"
                onClick={() => setCommentsOpen(false)}
                className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="m-0 flex-1 list-none overflow-y-auto bg-white p-0 dark:bg-zinc-900">
              {commentsLoading ? (
                <li className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  Loading…
                </li>
              ) : modalComments.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  No comments yet.
                </li>
              ) : (
                modalComments.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-start gap-3 border-b border-zinc-100 px-4 py-3 last:border-b-0 dark:border-zinc-700"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {c.authorName}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {c.text}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-row items-center gap-2 self-start pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleCommentVote(c.id, "like")}
                        disabled={!viewerId}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors disabled:opacity-40 ${
                          c.userVote === "like"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                            : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        }`}
                        aria-pressed={c.userVote === "like"}
                        aria-label="Like comment"
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {c.likes}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCommentVote(c.id, "dislike")}
                        disabled={!viewerId}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors disabled:opacity-40 ${
                          c.userVote === "dislike"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                            : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        }`}
                        aria-pressed={c.userVote === "dislike"}
                        aria-label="Dislike comment"
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                        {c.dislikes}
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div className="shrink-0 border-t border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-600 dark:bg-zinc-800">
              <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Add a comment
              </p>
              {!viewerId ? (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Sign in to comment.
                </p>
              ) : (
                <div className="flex gap-2">
                  <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void handleAddComment();
                      }
                    }}
                    placeholder="Write something…"
                    rows={2}
                    className="min-h-[2.5rem] flex-1 resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-600"
                    aria-label="New comment"
                  />
                  <button
                    type="button"
                    onClick={() => void handleAddComment()}
                    disabled={!newCommentText.trim()}
                    className="inline-flex h-10 shrink-0 items-center justify-center self-end rounded-lg bg-zinc-900 px-3 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
                    aria-label="Post comment"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )
    ) : null;

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <Link
          href={`/dashboard/${encodeURIComponent(author.userName)}`}
          className="shrink-0"
        >
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-12 w-12 rounded-full transition-opacity hover:opacity-80"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <Link
              href={`/dashboard/${encodeURIComponent(author.userName)}`}
              className="font-semibold text-foreground hover:underline"
            >
              {displayName}
            </Link>
            <span className="text-muted-foreground"> @{author.userName}</span>
            <span className="text-muted-foreground"> · </span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(ts, { addSuffix: true })}
            </span>
          </div>

          {post.title.trim() ? (
            <h3 className="mb-3 text-lg font-semibold leading-snug text-foreground">
              {post.title}
            </h3>
          ) : null}

          {post.imageUrls.length > 0 ? (
            <div
              className={`mb-4 grid gap-2 ${
                post.imageUrls.length === 1
                  ? "grid-cols-1"
                  : post.imageUrls.length === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-3"
              }`}
            >
              {post.imageUrls.map((src) => (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block overflow-hidden rounded-lg border border-border bg-muted"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={
                      post.title.trim()
                        ? `Image: ${post.title}`
                        : "Post image"
                    }
                    className="max-h-72 w-full object-cover object-center"
                  />
                </a>
              ))}
            </div>
          ) : null}

          <p className="mb-4 whitespace-pre-wrap leading-relaxed text-foreground">
            {post.content}
          </p>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => void handleLike()}
              disabled={!viewerId}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                isLiked
                  ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-sm">
                {likesCount} {likesCount === 1 ? "like" : "likes"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => void openComments()}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={`View ${commentsCount} ${commentsLabel}`}
              aria-haspopup="dialog"
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span>
                {commentsCount} {commentsLabel}
              </span>
            </button>
          </div>
        </div>
      </div>

      {commentsModal}
    </div>
  );
}
