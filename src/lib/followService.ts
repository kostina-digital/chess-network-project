import { prisma } from "@/lib/auth/prisma";
import { Prisma } from "@/generated/prisma";
import type { UserListItem } from "@/types/feed";

type UserListItemRow = {
  id: number;
  userName: string;
  fullName: string | null;
  avatarUrl: string | null;
  bio: string | null;
};

function mapUserListItem(row: UserListItemRow): UserListItem {
  return {
    id: row.id,
    userName: row.userName,
    fullName: row.fullName,
    avatarUrl: row.avatarUrl,
    bio: row.bio,
  };
}

/** Raw SQL so follow works even if a hot-reloaded PrismaClient lacks `userFollow` delegate. */

export async function isFollowing(
  followerId: number,
  followingId: number
): Promise<boolean> {
  if (followerId === followingId) return false;
  const rows = await prisma.$queryRaw<{ one: number }[]>(
    Prisma.sql`
      SELECT 1 AS one
      FROM "UserFollow"
      WHERE "followerId" = ${followerId} AND "followingId" = ${followingId}
      LIMIT 1
    `
  );
  return rows.length > 0;
}

export async function followUser(
  followerId: number,
  followingId: number
): Promise<{ isFollowing: boolean; followersCount: number }> {
  if (followerId === followingId) {
    throw new Error("Cannot follow yourself");
  }

  return prisma.$transaction(async (tx) => {
    const insertedRows = await tx.$queryRaw<{ inserted: boolean }[]>(Prisma.sql`
      WITH ins AS (
        INSERT INTO "UserFollow" ("followerId", "followingId")
        VALUES (${followerId}, ${followingId})
        ON CONFLICT ("followerId", "followingId") DO NOTHING
        RETURNING 1
      )
      SELECT EXISTS (SELECT 1 FROM ins) AS inserted
    `);
    const inserted = insertedRows[0]?.inserted === true;

    if (!inserted) {
      const fc = await tx.$queryRaw<{ c: number }[]>(
        Prisma.sql`SELECT "followersCount" AS c FROM "User" WHERE id = ${followingId}`
      );
      return { isFollowing: true, followersCount: fc[0]?.c ?? 0 };
    }

    await tx.$executeRaw(
      Prisma.sql`UPDATE "User" SET "followersCount" = "followersCount" + 1 WHERE id = ${followingId}`
    );
    await tx.$executeRaw(
      Prisma.sql`UPDATE "User" SET "followingCount" = "followingCount" + 1 WHERE id = ${followerId}`
    );

    const fc = await tx.$queryRaw<{ c: number }[]>(
      Prisma.sql`SELECT "followersCount" AS c FROM "User" WHERE id = ${followingId}`
    );
    return { isFollowing: true, followersCount: fc[0]?.c ?? 0 };
  });
}

export async function unfollowUser(
  followerId: number,
  followingId: number
): Promise<{ isFollowing: boolean; followersCount: number }> {
  return prisma.$transaction(async (tx) => {
    const delRows = await tx.$queryRaw<{ deleted: boolean }[]>(Prisma.sql`
      WITH del AS (
        DELETE FROM "UserFollow"
        WHERE "followerId" = ${followerId} AND "followingId" = ${followingId}
        RETURNING 1
      )
      SELECT EXISTS (SELECT 1 FROM del) AS deleted
    `);
    const deleted = delRows[0]?.deleted === true;

    if (!deleted) {
      const fc = await tx.$queryRaw<{ c: number }[]>(
        Prisma.sql`SELECT "followersCount" AS c FROM "User" WHERE id = ${followingId}`
      );
      return { isFollowing: false, followersCount: fc[0]?.c ?? 0 };
    }

    await tx.$executeRaw(
      Prisma.sql`
        UPDATE "User"
        SET "followersCount" = GREATEST(0, "followersCount" - 1)
        WHERE id = ${followingId}
      `
    );
    await tx.$executeRaw(
      Prisma.sql`
        UPDATE "User"
        SET "followingCount" = GREATEST(0, "followingCount" - 1)
        WHERE id = ${followerId}
      `
    );

    const fc = await tx.$queryRaw<{ c: number }[]>(
      Prisma.sql`SELECT "followersCount" AS c FROM "User" WHERE id = ${followingId}`
    );
    return { isFollowing: false, followersCount: fc[0]?.c ?? 0 };
  });
}

export async function listFollowers(userId: number): Promise<UserListItem[]> {
  const rows = await prisma.$queryRaw<UserListItemRow[]>(Prisma.sql`
    SELECT
      u.id,
      u."userName",
      u."fullName",
      u."avatarUrl",
      u.bio
    FROM "UserFollow" uf
    INNER JOIN "User" u ON u.id = uf."followerId"
    WHERE uf."followingId" = ${userId}
    ORDER BY COALESCE(u."fullName", u."userName") ASC, u."userName" ASC
  `);

  return rows.map(mapUserListItem);
}

export async function listFollowing(userId: number): Promise<UserListItem[]> {
  const rows = await prisma.$queryRaw<UserListItemRow[]>(Prisma.sql`
    SELECT
      u.id,
      u."userName",
      u."fullName",
      u."avatarUrl",
      u.bio
    FROM "UserFollow" uf
    INNER JOIN "User" u ON u.id = uf."followingId"
    WHERE uf."followerId" = ${userId}
    ORDER BY COALESCE(u."fullName", u."userName") ASC, u."userName" ASC
  `);

  return rows.map(mapUserListItem);
}
