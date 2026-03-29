/** JSON-safe shapes for the feed / PostCard (backed by Prisma). */

export type FeedAuthor = {
  id: number;
  userName: string;
  fullName: string | null;
  avatarUrl: string | null;
};

export type FeedComment = {
  id: string;
  authorName: string;
  authorUserName?: string;
  text: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  userVote: "like" | "dislike" | null;
};

export type FeedPost = {
  id: string;
  author: FeedAuthor;
  title: string;
  content: string;
  /** Public paths under /uploads/posts/… (max 3). */
  imageUrls: string[];
  timestamp: string;
  likes: number;
  isLiked: boolean;
  commentsCount: number;
};

export type ProfileUser = {
  id: number;
  userName: string;
  fullName: string | null;
  bio: string | null;
  rating: number | null;
  favoriteOpening: string | null;
  avatarUrl: string | null;
  followersCount: number;
  followingCount: number;
  postsCount: number;
};

export type UserListItem = {
  id: number;
  userName: string;
  fullName: string | null;
  avatarUrl: string | null;
  bio: string | null;
};
