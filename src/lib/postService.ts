import { prisma } from "@/auth/prisma";
import type { FeedAuthor, FeedComment, FeedPost, ProfileUser } from "@/types/feed";

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
    content: p.content,
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
    content: p.content,
    timestamp: p.createdAt.toISOString(),
    likes: p._count.likes,
    isLiked:
      viewerId && "likes" in p && Array.isArray(p.likes) ? p.likes.length > 0 : false,
    commentsCount: p._count.comments,
  }));
}

export async function createPost(
  authorId: number,
  content: string
): Promise<FeedPost> {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Content is required");
  const p = await prisma.post.create({
    data: { authorId, content: trimmed },
    include: {
      author: {
        select: { id: true, userName: true, fullName: true, avatarUrl: true },
      },
    },
  });
  return {
    id: String(p.id),
    author: mapAuthor(p.author),
    content: p.content,
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
  const u = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      userName: true,
      fullName: true,
      bio: true,
      rating: true,
      favoriteOpening: true,
      avatarUrl: true,
      followersCount: true,
      followingCount: true,
      _count: { select: { posts: true } },
    },
  });
  if (!u) return null;
  return {
    id: u.id,
    userName: u.userName,
    fullName: u.fullName,
    bio: u.bio,
    rating: u.rating,
    favoriteOpening: u.favoriteOpening,
    avatarUrl: u.avatarUrl,
    followersCount: u.followersCount,
    followingCount: u.followingCount,
    postsCount: u._count.posts,
  };
}

export async function getProfileUserByUserName(
  userName: string
): Promise<ProfileUser | null> {
  const u = await prisma.user.findUnique({
    where: { userName },
    select: {
      id: true,
      userName: true,
      fullName: true,
      bio: true,
      rating: true,
      favoriteOpening: true,
      avatarUrl: true,
      followersCount: true,
      followingCount: true,
      _count: { select: { posts: true } },
    },
  });
  if (!u) return null;
  return {
    id: u.id,
    userName: u.userName,
    fullName: u.fullName,
    bio: u.bio,
    rating: u.rating,
    favoriteOpening: u.favoriteOpening,
    avatarUrl: u.avatarUrl,
    followersCount: u.followersCount,
    followingCount: u.followingCount,
    postsCount: u._count.posts,
  };
}
