import Link from "next/link";
import { getCurrentUser } from "@/auth/getCurrentUser";
import {
  getProfileUserByUserName,
  listPostsByAuthor,
} from "@/lib/postService";
import { UserProfileView } from "@/components/dashboard/UserProfileView";

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserDashboardPage({ params }: PageProps) {
  const { username: raw } = await params;
  const username = decodeURIComponent(raw);
  const profile = await getProfileUserByUserName(username);

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="mb-4 text-foreground">User Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The user you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  const session = await getCurrentUser();
  const viewerId = session?.id ?? null;
  const posts = await listPostsByAuthor(profile.id, viewerId);

  return (
    <UserProfileView
      user={profile}
      posts={posts}
      viewerId={viewerId}
      isFollowingInitial={false}
    />
  );
}
