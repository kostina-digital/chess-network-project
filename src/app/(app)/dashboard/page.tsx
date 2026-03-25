import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import {
  getProfileUserById,
  listPostsByAuthor,
} from "@/lib/postService";
import { UserProfileView } from "@/components/dashboard/UserProfileView";

export default async function DashboardPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/log-in");

  const profile = await getProfileUserById(session.id);
  if (!profile) redirect("/log-in");

  const posts = await listPostsByAuthor(session.id, session.id);

  return (
    <UserProfileView
      user={profile}
      posts={posts}
      viewerId={session.id}
    />
  );
}
