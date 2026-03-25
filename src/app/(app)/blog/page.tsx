"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PostCard } from "@/components/PostCard";
import type { FeedPost } from "@/types/feed";
import { ImagePlus, Send, X } from "lucide-react";

const MAX_IMAGES = 3;

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
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [viewerId, setViewerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [feedError, setFeedError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imagePreviewUrls = useMemo(
    () => imageFiles.map((f) => URL.createObjectURL(f)),
    [imageFiles]
  );

  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [imagePreviewUrls]);

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

  const addImagesFromList = (list: FileList | null) => {
    if (!list?.length) return;
    setImageFiles((prev) => {
      const next = [...prev];
      for (let i = 0; i < list.length && next.length < MAX_IMAGES; i++) {
        next.push(list[i]);
      }
      return next;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImageAt = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    const t = title.trim();
    const c = postContent.trim();
    if (!t || !c) return;
    setPublishError(null);
    setPublishSuccess(null);
    setPublishing(true);
    const attachedCount = imageFiles.length;
    try {
      const fd = new FormData();
      fd.append("title", t);
      fd.append("content", c);
      imageFiles.forEach((file) => fd.append("images", file));

      const res = await fetch("/api/posts", {
        method: "POST",
        body: fd,
      });
      const data = await parseJsonSafe<{ post?: FeedPost; error?: string }>(
        res
      );
      if (!data) {
        setPublishError("Could not publish (invalid or empty response).");
        return;
      }
      if (!res.ok) {
        setPublishError(data.error ?? "Could not publish");
        return;
      }
      if (data.post) {
        setFeedPosts((prev) => [data.post!, ...prev]);
        const saved = data.post.imageUrls?.length ?? 0;
        if (saved > 0) {
          setPublishSuccess(
            saved === 1
              ? "Post published with 1 image."
              : `Post published with ${saved} images.`
          );
        } else if (attachedCount > 0) {
          setPublishError(
            "Photos were not saved. Try smaller JPEG/PNG files (max 2 MB each)."
          );
        } else {
          setPublishSuccess("Post published.");
        }
      }
      setTitle("");
      setPostContent("");
      setImageFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setPublishError("Network error");
    } finally {
      setPublishing(false);
    }
  };

  const canPublish =
    Boolean(viewerId) &&
    title.trim().length > 0 &&
    postContent.trim().length > 0 &&
    !publishing;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-foreground">Share your chess insights</h2>
          {!viewerId ? (
            <p className="mb-4 text-sm text-muted-foreground">
              <a href="/login" className="underline">
                Sign in
              </a>{" "}
              to publish posts.
            </p>
          ) : null}

          <label className="mb-2 block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a clear title…"
            className="mb-4 w-full rounded-lg border border-border bg-input-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={!viewerId}
            maxLength={200}
          />

          <label className="mb-2 block text-sm font-medium text-foreground">
            Content
          </label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Game analysis, tactical ideas, or anything chess-related…"
            className="w-full resize-none rounded-lg border border-border bg-input-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            rows={4}
            disabled={!viewerId}
          />

          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-foreground">
              Images{" "}
              <span className="font-normal text-muted-foreground">
                (optional, up to {MAX_IMAGES} — JPEG, PNG, GIF, WebP, max 2 MB each)
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="blog-post-images"
                disabled={!viewerId || imageFiles.length >= MAX_IMAGES}
                onChange={(e) => addImagesFromList(e.target.files)}
              />
              <label
                htmlFor="blog-post-images"
                className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted/50 ${
                  !viewerId || imageFiles.length >= MAX_IMAGES
                    ? "pointer-events-none opacity-40"
                    : ""
                }`}
              >
                <ImagePlus className="h-4 w-4" />
                Add images
              </label>
              {imageFiles.length > 0 ? (
                <span className="text-xs font-medium text-foreground">
                  {imageFiles.length} / {MAX_IMAGES} photo
                  {imageFiles.length === 1 ? "" : "s"} will be uploaded
                </span>
              ) : null}
            </div>
            {imageFiles.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-3">
                {imageFiles.map((file, i) => (
                  <li
                    key={`${file.name}-${file.size}-${i}`}
                    className="relative h-20 w-20 overflow-hidden rounded-md border border-border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreviewUrls[i] ?? ""}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageAt(i)}
                      className="absolute right-0.5 top-0.5 rounded bg-graphite/70 p-0.5 text-chrome-foreground hover:bg-graphite"
                      aria-label={`Remove image ${i + 1}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {publishError ? (
            <p className="mt-2 text-sm text-destructive" role="alert">
              {publishError}
            </p>
          ) : null}
          {publishSuccess ? (
            <p
              className="mt-2 text-sm text-emerald-700 dark:text-emerald-400"
              role="status"
            >
              {publishSuccess}
            </p>
          ) : null}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => void handlePublish()}
              disabled={!canPublish}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {publishing ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
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
