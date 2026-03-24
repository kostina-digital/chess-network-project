/** Uploaded files are served via API so dev/prod reliably return new files (not only build-time `public/`). */
export function normalizePostImageUrl(stored: string): string {
  if (!stored) return stored;
  if (stored.startsWith("/api/uploads/posts/")) return stored;
  const prefix = "/uploads/posts/";
  if (stored.startsWith(prefix)) {
    return `/api/uploads/posts/${stored.slice(prefix.length)}`;
  }
  return stored;
}

export function normalizePostImageUrls(urls: string[] | null | undefined): string[] {
  if (!urls?.length) return [];
  return urls.map(normalizePostImageUrl);
}
