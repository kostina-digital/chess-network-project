import { getCurrentUser } from "@/auth/getCurrentUser";
import { prisma } from "@/auth/prisma";

export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const u = await prisma.user.findUnique({ where: { id: session.id } });
  if (!u) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json({
    fullName: u.fullName ?? "",
    username: u.userName,
    bio: u.bio ?? "",
    rating: u.rating != null ? String(u.rating) : "",
    favoriteOpening: u.favoriteOpening ?? "",
    avatarUrl: u.avatarUrl ?? "",
  });
}

export async function PATCH(request: Request) {
  const session = await getCurrentUser();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fullName =
    typeof body.fullName === "string" ? body.fullName.trim() || null : undefined;
  const bio = typeof body.bio === "string" ? body.bio : undefined;
  const username =
    typeof body.username === "string" ? body.username.trim() : undefined;
  const ratingRaw = body.rating;
  const favoriteOpening =
    typeof body.favoriteOpening === "string"
      ? body.favoriteOpening.trim() || null
      : undefined;
  const avatarUrl =
    typeof body.avatarUrl === "string" ? body.avatarUrl.trim() || null : undefined;

  if (username !== undefined && username.length < 3) {
    return Response.json(
      { error: "Username must be at least 3 characters" },
      { status: 400 }
    );
  }

  if (username !== undefined) {
    const taken = await prisma.user.findFirst({
      where: { userName: username, NOT: { id: session.id } },
    });
    if (taken) {
      return Response.json({ error: "Username is already taken" }, { status: 400 });
    }
  }

  let rating: number | null | undefined;
  if (ratingRaw === "" || ratingRaw === null) {
    rating = null;
  } else if (typeof ratingRaw === "string") {
    const n = Number.parseInt(ratingRaw, 10);
    if (Number.isNaN(n) || n < 0) {
      return Response.json({ error: "Invalid rating" }, { status: 400 });
    }
    rating = n;
  } else if (typeof ratingRaw === "number") {
    rating = ratingRaw;
  }

  try {
    await prisma.user.update({
      where: { id: session.id },
      data: {
        ...(fullName !== undefined ? { fullName } : {}),
        ...(bio !== undefined ? { bio } : {}),
        ...(username !== undefined ? { userName: username } : {}),
        ...(rating !== undefined ? { rating } : {}),
        ...(favoriteOpening !== undefined ? { favoriteOpening } : {}),
        ...(avatarUrl !== undefined ? { avatarUrl } : {}),
      },
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Could not update profile" }, { status: 500 });
  }
}
