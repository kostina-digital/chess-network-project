import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { Prisma } from "@/generated/prisma";
import { mapDbErrorToMessage } from "@/lib/auth/mapDbError";
import { countFeedPosts, createPost, listFeedPosts } from "@/lib/postService";
import { collectImageBlobsFromForm, savePostImages } from "@/lib/savePostImages";

/** Needs Node fs — not Edge. */
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
    const parsedTake = Number.parseInt(searchParams.get("take") ?? "10", 10);
    const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const take =
      Number.isFinite(parsedTake) && parsedTake > 0
        ? Math.min(parsedTake, 50)
        : 10;
    const totalCount = await countFeedPosts();
    const totalPages = Math.max(1, Math.ceil(totalCount / take));
    const safePage = Math.min(page, totalPages);
    const posts = await listFeedPosts(user.id, take, (safePage - 1) * take);
    return Response.json({ posts, page: safePage, totalPages, totalCount });
  } catch (e) {
    console.error("[GET /api/posts]", e);
    const message =
      e instanceof Error ? e.message : "Failed to load posts";
    return Response.json({ posts: [], error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ct = request.headers.get("content-type") ?? "";
  if (!ct.includes("multipart/form-data")) {
    return Response.json(
      { error: "Expected multipart/form-data (title, content, images)" },
      { status: 400 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const title = String(form.get("title") ?? "").trim();
  const content = String(form.get("content") ?? "").trim();
  const files = collectImageBlobsFromForm(form);

  if (!title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }
  if (!content) {
    return Response.json({ error: "Content is required" }, { status: 400 });
  }
  if (files.length > 3) {
    return Response.json(
      { error: "You can attach up to 3 images per post" },
      { status: 400 }
    );
  }

  let imageUrls: string[] = [];
  try {
    imageUrls = files.length > 0 ? await savePostImages(files) : [];
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    return Response.json({ error: message }, { status: 400 });
  }

  try {
    const post = await createPost(user.id, { title, content, imageUrls });
    return Response.json({ post });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("[POST /api/posts] prisma error", {
        code: e.code,
        message: e.message,
        meta: e.meta,
      });
    } else {
      console.error("[POST /api/posts] create failed", e);
    }
    const message = mapDbErrorToMessage(e);
    return Response.json({ error: message }, { status: 400 });
  }
}
