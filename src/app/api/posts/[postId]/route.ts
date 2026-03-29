import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { updatePostForAuthor } from "@/lib/postService";
import {
  collectImageBlobsFromForm,
  deleteStoredPostImages,
  savePostImages,
} from "@/lib/savePostImages";

export const runtime = "nodejs";

function parsePostId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId: raw } = await context.params;
  const postId = parsePostId(raw);
  if (postId === null) {
    return Response.json({ error: "Invalid post id" }, { status: 400 });
  }

  const ct = request.headers.get("content-type") ?? "";

  let title = "";
  let content = "";
  let imageUrls: string[] = [];
  let previousImageUrls: string[] = [];

  try {
    if (ct.includes("multipart/form-data")) {
      let form: FormData;
      try {
        form = await request.formData();
      } catch {
        return Response.json({ error: "Invalid form data" }, { status: 400 });
      }

      title = String(form.get("title") ?? "").trim();
      content = String(form.get("content") ?? "").trim();
      previousImageUrls = form
        .getAll("keepImageUrls")
        .map((value) => String(value).trim())
        .filter(Boolean);

      const files = collectImageBlobsFromForm(form);
      const newImageUrls = files.length > 0 ? await savePostImages(files) : [];
      imageUrls = [...previousImageUrls, ...newImageUrls];
    } else {
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return Response.json({ error: "Invalid JSON body" }, { status: 400 });
      }

      if (!body || typeof body !== "object") {
        return Response.json({ error: "Expected object body" }, { status: 400 });
      }

      const json = body as Record<string, unknown>;
      if (typeof json.title !== "string" || typeof json.content !== "string") {
        return Response.json(
          { error: "title and content must be strings" },
          { status: 400 }
        );
      }

      title = json.title;
      content = json.content;
      imageUrls = Array.isArray(json.imageUrls)
        ? json.imageUrls
            .filter((value): value is string => typeof value === "string")
            .map((value) => value.trim())
            .filter(Boolean)
        : [];
      previousImageUrls = imageUrls;
    }

    if (imageUrls.length > 3) {
      return Response.json(
        { error: "You can attach up to 3 images per post" },
        { status: 400 }
      );
    }

    const post = await updatePostForAuthor(user.id, postId, {
      title,
      content,
      imageUrls,
    });
    if (!post) {
      if (ct.includes("multipart/form-data")) {
        await deleteStoredPostImages(
          imageUrls.filter((url) => !previousImageUrls.includes(url))
        );
      }
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    if (ct.includes("multipart/form-data")) {
      const removedImageUrls = previousImageUrls.filter(
        (url) => !imageUrls.includes(url)
      );
      if (removedImageUrls.length > 0) {
        void deleteStoredPostImages(removedImageUrls);
      }
    }

    return Response.json({ post });
  } catch (e) {
    if (ct.includes("multipart/form-data")) {
      await deleteStoredPostImages(
        imageUrls.filter((url) => !previousImageUrls.includes(url))
      );
    }
    const message = e instanceof Error ? e.message : String(e);
    return Response.json({ error: message }, { status: 400 });
  }
}
