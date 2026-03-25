import { prisma } from "@/lib/auth/prisma";
import { Prisma } from "@/generated/prisma";
import { normalizePostImageUrls } from "@/lib/postImageUrl";
import type { FeedAuthor, FeedComment, FeedPost, ProfileUser } from "@/types/feed";

/** Row shape from raw profile SQL (Postgres bigint for count). */
type ProfileUserRow = {
  id: number;
  userName: string;
  fullName: string | null;
  bio: string | null;
  rating: number | null;
  favoriteOpening: string | null;
  avatarUrl: string | null;
  followersCount: number;
  followingCount: number;
  postsCount: bigint | number;
};

function mapProfileRow(row: ProfileUserRow): ProfileUser {
  return {
    id: row.id,
    userName: row.userName,
    fullName: row.fullName,
    bio: row.bio,
    rating: row.rating,
    favoriteOpening: row.favoriteOpening,
    avatarUrl: row.avatarUrl,
    followersCount: row.followersCount,
    followingCount: row.followingCount,
    postsCount: Number(row.postsCount),
  };
}

function mapAuthor(u: {
  id: number;
  userName: string;
  fullName: string | null;
  avatarUrl: string | null;
}): FeedAuthor {
  return {
    id: u.id,
    userName: u.userName,
    fullName: u.fullName,
    avatarUrl: u.avatarUrl,
  };
}

export async function listFeedPosts(
  viewerId: number | null,
  take = 50
): Promise<FeedPost[]> {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take,
    include: {
      author: {
        select: { id: true, userName: true, fullName: true, avatarUrl: true },
      },
      _count: { select: { comments: true, likes: true } },
      ...(viewerId
        ? {
            likes: { where: { userId: viewerId }, select: { id: true } },
          }
        : {}),
    },
  });

  return posts.map((p) => ({
    id: String(p.id),
    author: mapAuthor(p.author),
    title: p.title,
    content: p.content,
    imageUrls: normalizePostImageUrls(p.imageUrls),
    timestamp: p.createdAt.toISOString(),
    likes: p._count.likes,
    isLiked:
      viewerId && "likes" in p && Array.isArray(p.likes) ? p.likes.length > 0 : false,
    commentsCount: p._count.comments,
  }));
}

export async function listPostsByAuthor(
  authorId: number,
  viewerId: number | null
): Promise<FeedPost[]> {
  const posts = await prisma.post.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      author: {
        select: { id: true, userName: true, fullName: true, avatarUrl: true },
      },
      _count: { select: { comments: true, likes: true } },
      ...(viewerId
        ? {
            likes: { where: { userId: viewerId }, select: { id: true } },
          }
        : {}),
    },
  });

  return posts.map((p) => ({
    id: String(p.id),
    author: mapAuthor(p.author),
    title: p.title,
    content: p.content,
    imageUrls: normalizePostImageUrls(p.imageUrls),
    timestamp: p.createdAt.toISOString(),
    likes: p._count.likes,
    isLiked:
      viewerId && "likes" in p && Array.isArray(p.likes) ? p.likes.length > 0 : false,
    commentsCount: p._count.comments,
  }));
}

export type CreatePostInput = {
  title: string;
  content: string;
  imageUrls: string[];
};

export async function createPost(
  authorId: number,
  input: CreatePostInput
): Promise<FeedPost> {
  const title = input.title.trim();
  const trimmed = input.content.trim();
  if (!title) throw new Error("Title is required");
  if (!trimmed) throw new Error("Content is required");
  if (input.imageUrls.length > 3) {
    throw new Error("You can attach up to 3 images per post");
  }

  const p = await prisma.post.create({
    data: { authorId, title, content: trimmed, imageUrls: input.imageUrls },
    include: {
      author: {
        select: { id: true, userName: true, fullName: true, avatarUrl: true },
      },
    },
  });
  return {
    id: String(p.id),
    author: mapAuthor(p.author),
    title: p.title,
    content: p.content,
    imageUrls: normalizePostImageUrls(p.imageUrls),
    timestamp: p.createdAt.toISOString(),
    likes: 0,
    isLiked: false,
    commentsCount: 0,
  };
}

export async function listCommentsForPost(
  postId: number,
  viewerId: number | null
): Promise<FeedComment[]> {
  const comments = await prisma.postComment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
    include: {
      author: { select: { fullName: true, userName: true } },
      reactions: { select: { kind: true, userId: true } },
    },
  });

  return comments.map((c) => {
    let userVote: "like" | "dislike" | null = null;
    if (viewerId !== null) {
      const mine = c.reactions.find((r) => r.userId === viewerId);
      if (mine?.kind === "LIKE") userVote = "like";
      else if (mine?.kind === "DISLIKE") userVote = "dislike";
    }
    return {
      id: String(c.id),
      authorName: c.author.fullName ?? c.author.userName,
      text: c.content,
      likes: c.reactions.filter((r) => r.kind === "LIKE").length,
      dislikes: c.reactions.filter((r) => r.kind === "DISLIKE").length,
      userVote,
    };
  });
}

export async function addPostComment(
  postId: number,
  authorId: number,
  content: string
) {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Comment is required");
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");
  return prisma.postComment.create({
    data: { postId, authorId, content: trimmed },
    include: {
      author: { select: { fullName: true, userName: true } },
      reactions: { select: { kind: true, userId: true } },
    },
  });
}

export async function togglePostLike(postId: number, userId: number) {
  const existing = await prisma.postLike.findUnique({
    where: { postId_userId: { postId, userId } },
  });
  if (existing) {
    await prisma.postLike.delete({
      where: { postId_userId: { postId, userId } },
    });
  } else {
    await prisma.postLike.create({ data: { postId, userId } });
  }
  const likes = await prisma.postLike.count({ where: { postId } });
  return { liked: !existing, likes };
}

function kindToVote(
  k: "LIKE" | "DISLIKE" | undefined
): "like" | "dislike" | null {
  if (k === "LIKE") return "like";
  if (k === "DISLIKE") return "dislike";
  return null;
}

export async function toggleCommentLike(commentId: number, userId: number) {
  const row = await prisma.commentReaction.findUnique({
    where: { commentId_userId: { commentId, userId } },
  });
  const was = kindToVote(row?.kind);

  if (was === "like") {
    await prisma.commentReaction.delete({
      where: { commentId_userId: { commentId, userId } },
    });
  } else if (was === "dislike") {
    await prisma.commentReaction.update({
      where: { commentId_userId: { commentId, userId } },
      data: { kind: "LIKE" },
    });
  } else {
    await prisma.commentReaction.create({
      data: { commentId, userId, kind: "LIKE" },
    });
  }

  return listCommentsForPost(
    (
      await prisma.postComment.findUniqueOrThrow({
        where: { id: commentId },
        select: { postId: true },
      })
    ).postId,
    userId
  ).then((all) => all.find((c) => c.id === String(commentId))!);
}

export async function toggleCommentDislike(commentId: number, userId: number) {
  const row = await prisma.commentReaction.findUnique({
    where: { commentId_userId: { commentId, userId } },
  });
  const was = kindToVote(row?.kind);

  if (was === "dislike") {
    await prisma.commentReaction.delete({
      where: { commentId_userId: { commentId, userId } },
    });
  } else if (was === "like") {
    await prisma.commentReaction.update({
      where: { commentId_userId: { commentId, userId } },
      data: { kind: "DISLIKE" },
    });
  } else {
    await prisma.commentReaction.create({
      data: { commentId, userId, kind: "DISLIKE" },
    });
  }

  const postId = (
    await prisma.postComment.findUniqueOrThrow({
      where: { id: commentId },
      select: { postId: true },
    })
  ).postId;

  return listCommentsForPost(postId, userId).then((all) =>
    all.find((c) => c.id === String(commentId))!
  );
}

export async function getProfileUserById(
  id: number
): Promise<ProfileUser | null> {
  const rows = await prisma.$queryRaw<ProfileUserRow[]>(Prisma.sql`
    SELECT
      u.id,
      u."userName",
      u."fullName",
      u.bio,
      u.rating,
      u."favoriteOpening",
      u."avatarUrl",
      u."followersCount",
      u."followingCount",
      (SELECT COUNT(*)::bigint FROM "Post" p WHERE p."authorId" = u.id) AS "postsCount"
    FROM "User" u
    WHERE u.id = ${id}
  `);
  const row = rows[0];
  return row ? mapProfileRow(row) : null;
}

export async function getProfileUserByUserName(
  userName: string
): Promise<ProfileUser | null> {
  const rows = await prisma.$queryRaw<ProfileUserRow[]>(Prisma.sql`
    SELECT
      u.id,
      u."userName",
      u."fullName",
      u.bio,
      u.rating,
      u."favoriteOpening",
      u."avatarUrl",
      u."followersCount",
      u."followingCount",
      (SELECT COUNT(*)::bigint FROM "Post" p WHERE p."authorId" = u.id) AS "postsCount"
    FROM "User" u
    WHERE u."userName" = ${userName}
  `);
  const row = rows[0];
  return row ? mapProfileRow(row) : null;
}
