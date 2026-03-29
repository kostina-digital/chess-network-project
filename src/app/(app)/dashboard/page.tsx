import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getProfileUserById } from "@/lib/postService";
import { DashboardHub } from "@/components/dashboard/DashboardHub";
import { UserProfileView } from "@/components/dashboard/UserProfileView";
import { AppPage } from "@/components/layout/AppPage";

export default async function DashboardPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/log-in");

  const profile = await getProfileUserById(session.id);
  if (!profile) redirect("/log-in");

  return (
    <AppPage>
      <UserProfileView
        embedded
        showPosts={false}
        user={profile}
        posts={[]}
        viewerId={session.id}
      />
      <DashboardHub myPostsHref={`/${profile.userName}/posts`} />
    </AppPage>
  );
}
