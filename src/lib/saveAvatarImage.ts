import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

const MAX_BYTES = 2 * 1024 * 1024;
/** Writable directory for avatar files (works on serverless, falls back to /tmp). */
export const AVATAR_STORAGE_DIR =
  process.env.AVATAR_STORAGE_DIR || path.join("/tmp", "uploads", "avatars");

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

const EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
};

function detectImageMime(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    buf[0] === 0x47 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x38
  ) {
    return "image/gif";
  }
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

/** Saves one file under public/uploads/avatars. Returns public path /api/uploads/avatars/…. */
export async function saveAvatarImage(file: Blob): Promise<string> {
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be 2 MB or smaller");
  }

  const buf = Buffer.from(await file.arrayBuffer());
  let mime = file.type?.trim() ?? "";
  if (!mime || !ALLOWED.has(mime)) {
    mime = detectImageMime(buf) ?? "";
  }
  if (!ALLOWED.has(mime)) {
    throw new Error(
      "Only JPEG, PNG, GIF, and WebP images are allowed (or the type could not be detected)"
    );
  }

  await mkdir(AVATAR_STORAGE_DIR, { recursive: true });

  const ext = EXT[mime];
  const name = `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`;
  await writeFile(path.join(AVATAR_STORAGE_DIR, name), buf);
  return `/api/uploads/avatars/${name}`;
}

/** Match filenames produced by saveAvatarImage (same pattern as post uploads). */
export const AVATAR_FILENAME_RE =
  /^\d+-[a-f0-9]{16}\.(jpg|jpeg|png|gif|webp)$/i;
