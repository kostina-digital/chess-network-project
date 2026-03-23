"use client";

import {
  Heart,
  MessageSquare,
  Send,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import {
  Post,
  currentUser,
  getUserById,
  type PostComment,
} from "@/app/data/mockData";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

type CommentRow = PostComment & {
  userVote: "like" | "dislike" | null;
};

function initCommentRows(items: PostComment[]): CommentRow[] {
  return items.map((c) => ({
    ...c,
    likes: c.likes ?? 0,
    dislikes: c.dislikes ?? 0,
    userVote: null,
  }));
}

export function PostCard({ post }: PostCardProps) {
  const author = getUserById(post.authorId);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [modalComments, setModalComments] = useState<CommentRow[]>([]);
  /** Comments added in this session (kept when reopening the modal). */
  const [persistedExtraComments, setPersistedExtraComments] = useState<
    CommentRow[]
  >([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPersistedExtraComments([]);
  }, [post.id]);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const openComments = () => {
    setModalComments([
      ...initCommentRows(post.commentItems),
      ...persistedExtraComments.map(
        (c): CommentRow => ({ ...c, userVote: null })
      ),
    ]);
    setNewCommentText("");
    setCommentsOpen(true);
  };

  const handleAddComment = () => {
    const text = newCommentText.trim();
    if (!text) return;
    const row: CommentRow = {
      id: `local-${post.id}-${Date.now()}`,
      authorName: currentUser.fullName,
      text,
      likes: 0,
      dislikes: 0,
      userVote: null,
    };
    setPersistedExtraComments((p) => [...p, row]);
    setModalComments((m) => [...m, row]);
    setNewCommentText("");
  };

  const handleCommentVote = (commentId: string, vote: "like" | "dislike") => {
    setModalComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;
        const was = c.userVote;

        if (vote === "like") {
          if (was === "like") {
            return { ...c, likes: Math.max(0, c.likes - 1), userVote: null };
          }
          if (was === "dislike") {
            return {
              ...c,
              likes: c.likes + 1,
              dislikes: Math.max(0, c.dislikes - 1),
              userVote: "like",
            };
          }
          return { ...c, likes: c.likes + 1, userVote: "like" };
        }

        if (was === "dislike") {
          return {
            ...c,
            dislikes: Math.max(0, c.dislikes - 1),
            userVote: null,
          };
        }
        if (was === "like") {
          return {
            ...c,
            likes: Math.max(0, c.likes - 1),
            dislikes: c.dislikes + 1,
            userVote: "dislike",
          };
        }
        return { ...c, dislikes: c.dislikes + 1, userVote: "dislike" };
      })
    );
  };

  if (!author) return null;

  const commentsCount =
    post.commentItems.length + persistedExtraComments.length;
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
              {modalComments.length === 0 ? (
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
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
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
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
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
              <div className="flex gap-2">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                  placeholder="Write something…"
                  rows={2}
                  className="min-h-[2.5rem] flex-1 resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-600"
                  aria-label="New comment"
                />
                <button
                  type="button"
                  onClick={handleAddComment}
                  disabled={!newCommentText.trim()}
                  className="inline-flex h-10 shrink-0 items-center justify-center self-end rounded-lg bg-zinc-900 px-3 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
                  aria-label="Post comment"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    ) : null;

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <Link href={`/profile/${author.username}`}>
          <img
            src={author.avatarUrl}
            alt={author.fullName}
            className="h-12 w-12 flex-shrink-0 rounded-full transition-opacity hover:opacity-80"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <Link
              href={`/profile/${author.username}`}
              className="font-semibold text-foreground hover:underline"
            >
              {author.fullName}
            </Link>
            <span className="text-muted-foreground"> @{author.username}</span>
            <span className="text-muted-foreground"> · </span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(post.timestamp, { addSuffix: true })}
            </span>
          </div>

          <p className="mb-4 whitespace-pre-wrap leading-relaxed text-foreground">
            {post.content}
          </p>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={handleLike}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
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
              onClick={openComments}
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
