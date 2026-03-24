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

/** When multipart is parsed in Node, MIME is often missing — sniff magic bytes. */
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

function isNonEmptyBlob(v: unknown): v is Blob {
  return (
    typeof v === "object" &&
    v !== null &&
    "size" in v &&
    typeof (v as Blob).size === "number" &&
    (v as Blob).size > 0 &&
    typeof (v as Blob).arrayBuffer === "function"
  );
}

/** Saves images under public/uploads/posts. Returns public paths like /uploads/posts/…. */
export async function savePostImages(files: Blob[]): Promise<string[]> {
  if (files.length > MAX_FILES) {
    throw new Error(`You can attach up to ${MAX_FILES} images per post`);
  }

  const dir = path.join(process.cwd(), "public", "uploads", "posts");
  await mkdir(dir, { recursive: true });

  const urls: string[] = [];

  for (const file of files) {
    if (file.size > MAX_BYTES) {
      throw new Error("Each image must be 2 MB or smaller");
    }

    const buf = Buffer.from(await file.arrayBuffer());
    let mime = file.type?.trim() ?? "";
    if (!mime || !ALLOWED.has(mime)) {
      mime = detectImageMime(buf) ?? "";
    }
    if (!ALLOWED.has(mime)) {
      throw new Error(
        "Only JPEG, PNG, GIF, and WebP images are allowed (or the file type could not be detected)"
      );
    }

    const ext = EXT[mime];
    const name = `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`;
    await writeFile(path.join(dir, name), buf);
    urls.push(`/api/uploads/posts/${name}`);
  }

  return urls;
}

/** Collect file parts from multipart (field names vary by browser). */
export function collectImageBlobsFromForm(form: FormData): Blob[] {
  const out: Blob[] = [];
  const push = (v: FormDataEntryValue) => {
    if (isNonEmptyBlob(v)) out.push(v);
  };

  for (const v of form.getAll("images")) push(v);

  if (out.length === 0) {
    for (const [key, value] of form.entries()) {
      if (
        key === "images" ||
        key === "images[]" ||
        key.startsWith("images")
      ) {
        push(value);
      }
    }
  }

  return out.slice(0, MAX_FILES);
}

export { isNonEmptyBlob };
