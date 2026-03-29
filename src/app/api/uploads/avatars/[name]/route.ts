import { readFile } from "fs/promises";
import path from "path";
import { AVATAR_FILENAME_RE, AVATAR_STORAGE_DIR } from "@/lib/saveAvatarImage";

export const runtime = "nodejs";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

function contentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return MIME[ext] ?? "application/octet-stream";
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;
  if (
    !name ||
    name.includes("/") ||
    name.includes("..") ||
    !AVATAR_FILENAME_RE.test(name)
  ) {
    return new Response("Not found", { status: 404 });
  }

  const dir = AVATAR_STORAGE_DIR;
  const fp = path.join(dir, name);
  const resolvedDir = path.resolve(dir);
  const resolvedFile = path.resolve(fp);
  if (path.dirname(resolvedFile) !== resolvedDir) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const buf = await readFile(resolvedFile);
    return new Response(buf, {
      headers: {
        "Content-Type": contentType(name),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
