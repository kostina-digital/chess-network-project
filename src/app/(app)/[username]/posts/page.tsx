import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { isFollowing } from "@/lib/followService";
import { getProfileUserByUserName, listPostsByAuthor } from "@/lib/postService";
import { UserProfileView } from "@/components/dashboard/UserProfileView";
import { AppPage } from "@/components/layout/AppPage";
import BackButton from "@/components/buttons/BackButton";

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserPostsPage({ params }: PageProps) {
  const { username: raw } = await params;
  const username = decodeURIComponent(raw);
  const session = await getCurrentUser();
  if (!session) {
    redirect(`/log-in?redirect=${encodeURIComponent(`/${username}/posts`)}`);
  }

  const profile = await getProfileUserByUserName(username);
  if (!profile) {
    return (
      <AppPage className="max-w-4xl">
        <h1 className="h1-style mb-4">User Not Found</h1>
        <p className="p-style-small">
          The user you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Back to blog
          </Link>
        </div>
      </AppPage>
    );
  }

  const posts = await listPostsByAuthor(profile.id, session.id);
  const isFollowingInitial = await isFollowing(session.id, profile.id);

  return (
    <AppPage>
  
      <UserProfileView
        embedded
        user={profile}
        posts={posts}
        viewerId={session.id}
        isFollowingInitial={isFollowingInitial}
      />
    </AppPage>
  );
}
