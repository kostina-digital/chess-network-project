import { getCurrentUser } from "@/auth/getCurrentUser";
import { createPost, listFeedPosts } from "@/lib/postService";
import { savePostImages } from "@/lib/savePostImages";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const posts = await listFeedPosts(user?.id ?? null);
    return Response.json({ posts });
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
  const rawImages = form.getAll("images");
  const files = rawImages.filter(
    (x): x is File => x instanceof File && x.size > 0
  );

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
    const message = e instanceof Error ? e.message : String(e);
    return Response.json({ error: message }, { status: 400 });
  }
}
