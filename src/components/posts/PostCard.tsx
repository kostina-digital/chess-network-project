"use client";

import {
  Heart,
  ImagePlus,
  MessageSquare,
  Pencil,
  Send,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import type { FeedComment, FeedPost } from "@/types/feed";
import { resolveAvatarUrl } from "@/lib/avatarUrl";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type PostCardProps = {
  post: FeedPost;
  /** Logged-in user id, or null — likes/comments disabled when null. */
  viewerId: number | null;
  onPostUpdated?: () => void;
  /** Called with the post returned by the server after a successful edit. */
  onPostSaved?: (post: FeedPost) => void;
};

type CommentRow = FeedComment;

/** Long posts are collapsed in the feed until the user expands them. */
const PREVIEW_MAX_CHARS = 160;
const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

function truncatePostContent(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastBreak = Math.max(slice.lastIndexOf("\n"), slice.lastIndexOf(" "));
  const cut =
    lastBreak > max * 0.5 ? slice.slice(0, lastBreak) : slice.trimEnd();
  return `${cut.trimEnd()}…`;
}

export function PostCard({
  post,
  viewerId,
  onPostUpdated,
  onPostSaved,
}: PostCardProps) {
  const [savedOverride, setSavedOverride] = useState<FeedPost | null>(null);
  const displayPost = savedOverride ?? post;

  const [isLiked, setIsLiked] = useState(displayPost.isLiked);
  const [likesCount, setLikesCount] = useState(displayPost.likes);
  const [commentsCount, setCommentsCount] = useState(displayPost.commentsCount);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [modalComments, setModalComments] = useState<CommentRow[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [draftExistingImages, setDraftExistingImages] = useState<string[]>([]);
  const [draftNewImages, setDraftNewImages] = useState<File[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputId = useId();

  const author = displayPost.author;
  const displayName = author.fullName ?? author.userName;
  const avatarSrc = resolveAvatarUrl(author.userName, author.avatarUrl);
  const ts = new Date(displayPost.timestamp);
  const isAuthor = viewerId !== null && viewerId === author.id;

  const needsBodyTruncation = displayPost.content.length > PREVIEW_MAX_CHARS;
  const shownBody =
    !needsBodyTruncation || bodyExpanded
      ? displayPost.content
      : truncatePostContent(displayPost.content, PREVIEW_MAX_CHARS);

  const draftNewImagePreviewUrls = useMemo(
    () => draftNewImages.map((file) => URL.createObjectURL(file)),
    [draftNewImages]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      draftNewImagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [draftNewImagePreviewUrls]);

  useEffect(() => {
    setSavedOverride(null);
  }, [post.id, post.content, post.title, post.imageUrls]);

  useEffect(() => {
    setBodyExpanded(false);
  }, [displayPost.id]);

  useEffect(() => {
    setIsLiked(displayPost.isLiked);
    setLikesCount(displayPost.likes);
    setCommentsCount(displayPost.commentsCount);
  }, [
    displayPost.id,
    displayPost.isLiked,
    displayPost.likes,
    displayPost.commentsCount,
  ]);

  useEffect(() => {
    setEditing(false);
  }, [post.id]);

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

  const startEditing = () => {
    setDraftTitle(displayPost.title);
    setDraftContent(displayPost.content);
    setDraftExistingImages(displayPost.imageUrls ?? []);
    setDraftNewImages([]);
    setSaveError(null);
    setEditing(true);
    setBodyExpanded(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setDraftExistingImages([]);
    setDraftNewImages([]);
    setSaveError(null);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const addDraftImages = (list: FileList | null) => {
    if (!list?.length) return;
    setSaveError(null);

    const selectedFiles = Array.from(list);
    const totalCount =
      draftExistingImages.length + draftNewImages.length + selectedFiles.length;
    if (totalCount > MAX_IMAGES) {
      setSaveError(`You can attach up to ${MAX_IMAGES} images per post.`);
      if (editFileInputRef.current) editFileInputRef.current.value = "";
      return;
    }

    const invalidType = selectedFiles.find((file) => {
      const mime = file.type.trim().toLowerCase();
      return mime.length > 0 && !ALLOWED_IMAGE_TYPES.has(mime);
    });
    if (invalidType) {
      setSaveError("Only JPEG, PNG, GIF, and WebP images are supported.");
      if (editFileInputRef.current) editFileInputRef.current.value = "";
      return;
    }

    const oversized = selectedFiles.find((file) => file.size > MAX_IMAGE_BYTES);
    if (oversized) {
      setSaveError("Each image must be 2 MB or smaller.");
      if (editFileInputRef.current) editFileInputRef.current.value = "";
      return;
    }

    setDraftNewImages((prev) => [...prev, ...selectedFiles]);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const removeDraftExistingImage = (src: string) => {
    setSaveError(null);
    setDraftExistingImages((prev) => prev.filter((imageUrl) => imageUrl !== src));
  };

  const removeDraftNewImageAt = (index: number) => {
    setSaveError(null);
    setDraftNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveEdit = async () => {
    const title = draftTitle.trim();
    const content = draftContent.trim();
    if (!title || !content || saving) return;
    setSaving(true);
    setSaveError(null);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("content", content);
      draftExistingImages.forEach((imageUrl) => {
        fd.append("keepImageUrls", imageUrl);
      });
      draftNewImages.forEach((file) => {
        fd.append("images", file, file.name);
      });

      const res = await fetch(`/api/posts/${displayPost.id}`, {
        method: "PATCH",
        body: fd,
      });
      const data = (await res.json()) as { post?: FeedPost; error?: string };
      if (!res.ok || !data.post) {
        setSaveError(data.error ?? "Could not save.");
        return;
      }
      setSavedOverride(data.post);
      setEditing(false);
      setDraftExistingImages([]);
      setDraftNewImages([]);
      if (editFileInputRef.current) editFileInputRef.current.value = "";
      onPostSaved?.(data.post);
      onPostUpdated?.();
    } catch {
      setSaveError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const handleLike = async () => {
    if (!viewerId) return;
    const prevLiked = isLiked;
    const prevCount = likesCount;
    setIsLiked(!prevLiked);
    setLikesCount(prevLiked ? prevCount - 1 : prevCount + 1);
    try {
      const res = await fetch(`/api/posts/${displayPost.id}/like`, { method: "POST" });
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
      const res = await fetch(`/api/posts/${displayPost.id}/comments`);
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
      const res = await fetch(`/api/posts/${displayPost.id}/comments`, {
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
            className="absolute inset-0 bg-graphite/60 backdrop-blur-[1px]"
            aria-label="Close comments"
            onClick={() => setCommentsOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`comments-title-${displayPost.id}`}
            className="relative z-10 flex max-h-[min(80vh,28rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-muted px-4 py-3">
              <h2
                id={`comments-title-${displayPost.id}`}
                className="text-lg font-semibold text-foreground"
              >
                Comments
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({commentsCount})
                </span>
              </h2>
              <button
                type="button"
                onClick={() => setCommentsOpen(false)}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="m-0 flex-1 list-none overflow-y-auto bg-card p-0">
              {commentsLoading ? (
                <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Loading…
                </li>
              ) : modalComments.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No comments yet.
                </li>
              ) : (
                modalComments.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-start gap-3 border-b border-border px-4 py-3 last:border-b-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {c.authorName}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
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
                            ? "bg-primary/15 text-primary"
                            : "text-muted-foreground hover:bg-muted"
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
                            ? "bg-destructive/15 text-destructive"
                            : "text-muted-foreground hover:bg-muted"
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
            <div className="shrink-0 border-t border-border bg-muted p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Add a comment
              </p>
              {!viewerId ? (
                <p className="text-xs text-muted-foreground">
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
                    className="min-h-[2.5rem] flex-1 resize-y rounded-lg border border-border bg-input-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="New comment"
                  />
                  <button
                    type="button"
                    onClick={() => void handleAddComment()}
                    disabled={!newCommentText.trim()}
                    className="inline-flex h-10 shrink-0 items-center justify-center self-end rounded-lg bg-primary px-3 text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
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

  const imageCount = (displayPost.imageUrls ?? []).length;
  const profileHref = `/${encodeURIComponent(author.userName)}`;
  const imagesChanged =
    draftNewImages.length > 0 ||
    draftExistingImages.length !== (displayPost.imageUrls ?? []).length ||
    draftExistingImages.some(
      (imageUrl, index) => imageUrl !== (displayPost.imageUrls ?? [])[index]
    );
  const canSaveEdit =
    draftTitle.trim().length > 0 &&
    draftContent.trim().length > 0 &&
    (draftTitle.trim() !== displayPost.title.trim() ||
      draftContent.trim() !== displayPost.content.trim() ||
      imagesChanged);

  return (
    <div className="rounded-lg border border-border/80 bg-card/50 p-3 shadow-none sm:p-4">
      <div className="flex items-start gap-2.5 sm:gap-3">
        <Link
          href={profileHref}
          className="shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-8 w-8 rounded-full transition-opacity hover:opacity-80"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="mb-1 text-xs text-muted-foreground">
            <Link
              href={profileHref}
              className="font-medium text-foreground hover:underline"
            >
              {displayName}
            </Link>
            <span> @{author.userName}</span>
            <span> · </span>
            <span>{formatDistanceToNow(ts, { addSuffix: true })}</span>
          </div>

          {editing ? (
            <div className="mb-2 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Title
                </label>
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  maxLength={200}
                  className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Content
                </label>
                <textarea
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  rows={6}
                  className="w-full resize-y rounded-lg border border-border bg-input-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-foreground">
                  Images
                  <span className="ml-1 font-normal text-muted-foreground">
                    (up to {MAX_IMAGES}, 2 MB each)
                  </span>
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    ref={editFileInputRef}
                    id={editFileInputId}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => addDraftImages(e.target.files)}
                    disabled={
                      saving ||
                      draftExistingImages.length + draftNewImages.length >=
                        MAX_IMAGES
                    }
                  />
                  <label
                    htmlFor={editFileInputId}
                    className={`inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted ${
                      saving ||
                      draftExistingImages.length + draftNewImages.length >=
                        MAX_IMAGES
                        ? "pointer-events-none opacity-40"
                        : "cursor-pointer"
                    }`}
                  >
                    <ImagePlus className="h-3.5 w-3.5" />
                    Add images
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {draftExistingImages.length + draftNewImages.length} /{" "}
                    {MAX_IMAGES}
                  </span>
                </div>

                {draftExistingImages.length > 0 || draftNewImages.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-3">
                    {draftExistingImages.map((src) => (
                      <li
                        key={src}
                        className="relative h-20 w-20 overflow-hidden rounded-md border border-border"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt="Current post image"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeDraftExistingImage(src)}
                          className="absolute right-0.5 top-0.5 rounded bg-graphite/70 p-0.5 text-chrome-foreground hover:bg-graphite"
                          aria-label="Remove current image"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                    {draftNewImages.map((file, index) => (
                      <li
                        key={`${file.name}-${file.size}-${index}`}
                        className="relative h-20 w-20 overflow-hidden rounded-md border border-border"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={draftNewImagePreviewUrls[index] ?? ""}
                          alt="New post image"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeDraftNewImageAt(index)}
                          className="absolute right-0.5 top-0.5 rounded bg-graphite/70 p-0.5 text-chrome-foreground hover:bg-graphite"
                          aria-label="Remove new image"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-muted-foreground">
                    No images will remain in this post after saving.
                  </p>
                )}
              </div>
              {saveError ? (
                <p className="text-xs text-destructive" role="alert">
                  {saveError}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void handleSaveEdit()}
                  disabled={!canSaveEdit || saving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {displayPost.title.trim() ? (
                <h3 className="mb-1.5 text-sm font-bold leading-normal text-foreground">
                  {displayPost.title}
                </h3>
              ) : null}

              {imageCount > 0 ? (
                <div
                  className={`mb-2 grid gap-1.5 ${
                    imageCount === 1
                      ? "w-full max-w-md grid-cols-1 sm:max-w-lg"
                      : imageCount === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-3"
                  }`}
                >
                  {(displayPost.imageUrls ?? []).map((src) => (
                    <a
                      key={src}
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block overflow-hidden rounded-md border border-border bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={
                          displayPost.title.trim()
                            ? `Image: ${displayPost.title}`
                            : "Post image"
                        }
                        className="max-h-36 w-full object-cover object-center sm:max-h-40"
                      />
                    </a>
                  ))}
                </div>
              ) : null}

              <p className="mb-2 text-xs leading-relaxed text-foreground sm:text-[13px]">
                <span className="whitespace-pre-wrap">{shownBody}</span>
                {needsBodyTruncation ? (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setBodyExpanded((v) => !v)}
                      className="inline cursor-pointer border-0 bg-transparent p-0 align-baseline text-xs font-medium text-primary underline-offset-2 hover:text-primary-hover hover:underline"
                    >
                      {bodyExpanded ? "Show less" : "Read full"}
                    </button>
                  </>
                ) : null}
              </p>
            </>
          )}

          <div className="flex flex-wrap items-center gap-1.5 border-t border-border/70 pt-2">
            {isAuthor && !editing ? (
              <button
                type="button"
                onClick={startEditing}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Edit post"
              >
                <Pencil className="h-3.5 w-3.5 shrink-0" />
                Edit
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => void handleLike()}
              disabled={!viewerId || editing}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                isLiked
                  ? "bg-primary/15 text-primary hover:bg-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
              <span>
                {likesCount} {likesCount === 1 ? "like" : "likes"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => void openComments()}
              disabled={editing}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`View ${commentsCount} ${commentsLabel}`}
              aria-haspopup="dialog"
            >
              <MessageSquare className="h-3.5 w-3.5 shrink-0" />
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
