import { unlink } from "fs/promises";
import path from "path";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { prisma } from "@/lib/auth/prisma";
import {
  AVATAR_FILENAME_RE,
  saveAvatarImage,
} from "@/lib/saveAvatarImage";

export const runtime = "nodejs";

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

async function deleteStoredAvatarIfLocal(avatarUrl: string | null) {
  if (!avatarUrl?.startsWith("/api/uploads/avatars/")) return;
  const name = avatarUrl.split("/").pop() ?? "";
  if (!AVATAR_FILENAME_RE.test(name)) return;
  const dir = path.join(process.cwd(), "public", "uploads", "avatars");
  const fp = path.join(dir, name);
  const resolvedDir = path.resolve(dir);
  const resolvedFile = path.resolve(fp);
  if (path.dirname(resolvedFile) !== resolvedDir) return;
  await unlink(resolvedFile).catch(() => {});
}

export async function POST(request: Request) {
  const session = await getCurrentUser();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ct = request.headers.get("content-type") ?? "";
  if (!ct.includes("multipart/form-data")) {
    return Response.json(
      { error: "Expected multipart/form-data with field avatar" },
      { status: 400 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const raw = form.get("avatar");
  if (!isNonEmptyBlob(raw)) {
    return Response.json({ error: "Missing avatar file" }, { status: 400 });
  }

  let publicUrl: string;
  try {
    publicUrl = await saveAvatarImage(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    return Response.json({ error: message }, { status: 400 });
  }

  const before = await prisma.user.findUnique({
    where: { id: session.id },
    select: { avatarUrl: true },
  });

  try {
    await prisma.user.update({
      where: { id: session.id },
      data: { avatarUrl: publicUrl },
    });
  } catch {
    return Response.json({ error: "Could not update profile" }, { status: 500 });
  }

  if (before?.avatarUrl) {
    void deleteStoredAvatarIfLocal(before.avatarUrl);
  }

  return Response.json({ avatarUrl: publicUrl });
}
