import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { isFollowing } from "@/lib/followService";
import {
  getProfileUserByUserName,
  listPostsByAuthor,
} from "@/lib/postService";
import { UserProfileView } from "@/components/dashboard/UserProfileView";
import { AppPage } from "@/components/layout/AppPage";
import BackButton from "@/components/buttons/BackButton";

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserDashboardPage({ params }: PageProps) {
  const { username: raw } = await params;
  const username = decodeURIComponent(raw);
  const session = await getCurrentUser();
  if (!session) {
    redirect(
      `/log-in?redirect=${encodeURIComponent(`/${username}`)}`
    );
  }

  const profile = await getProfileUserByUserName(username);

  if (!profile) {
    return (
      <AppPage className="max-w-4xl">
          <h1 className="h1-style mb-4">User Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The user you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Back to Feed
          </Link>
      </AppPage>
    );
  }

  const viewerId = session.id;
  const posts = await listPostsByAuthor(profile.id, viewerId);
  const isFollowingInitial = await isFollowing(viewerId, profile.id);

  return (
    <AppPage>
      <div className="mb-4">
        <BackButton fallbackHref="/blog" label="Back" />
      </div>
      <UserProfileView
        embedded
        user={profile}
        posts={posts}
        viewerId={viewerId}
        isFollowingInitial={isFollowingInitial}
      />
    </AppPage>
  );
}
