import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getProfileUserById } from "@/lib/postService";
import { DashboardHub } from "@/components/dashboard/DashboardHub";
import { UserProfileView } from "@/components/dashboard/UserProfileView";

export default async function DashboardPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/log-in");

  const profile = await getProfileUserById(session.id);
  if (!profile) redirect("/log-in");

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full min-w-0 p-4">
      <UserProfileView
          embedded
          showPosts={false}
          user={profile}
          posts={[]}
          viewerId={session.id}
        />
        <DashboardHub myPostsHref={`/${profile.userName}#my-posts`} />
        
      </div>
    </div>
  );
}
