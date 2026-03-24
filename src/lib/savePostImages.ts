import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

const MAX_FILES = 3;
const MAX_BYTES = 2 * 1024 * 1024;

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

/** Saves images under public/uploads/posts. Returns public paths like /uploads/posts/…. */
export async function savePostImages(files: File[]): Promise<string[]> {
  if (files.length > MAX_FILES) {
    throw new Error(`You can attach up to ${MAX_FILES} images per post`);
  }

  const dir = path.join(process.cwd(), "public", "uploads", "posts");
  await mkdir(dir, { recursive: true });

  const urls: string[] = [];

  for (const file of files) {
    if (!ALLOWED.has(file.type)) {
      throw new Error(
        "Only JPEG, PNG, GIF, and WebP images are allowed"
      );
    }
    if (file.size > MAX_BYTES) {
      throw new Error("Each image must be 2 MB or smaller");
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const ext = EXT[file.type] ?? ".img";
    const name = `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`;
    await writeFile(path.join(dir, name), buf);
    urls.push(`/uploads/posts/${name}`);
  }

  return urls;
}
