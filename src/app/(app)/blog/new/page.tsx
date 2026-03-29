import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { AppPage } from "@/components/layout/AppPage";
import { ComposePostSection } from "@/components/posts/ComposePostSection";
import BackButton from "@/components/buttons/BackButton";

export default async function NewPostPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/log-in?redirect=%2Fblog%2Fnew");
  }

  return (
    <AppPage className="max-w-4xl">

      <div className="mb-6 px-1">
        <h1 className="h1-style">Create a new post</h1>
        <p className="p-style-small max-w-2xl">
          Share analysis, lessons, ideas, or memorable moments from your chess journey.
        </p>
      </div>

      <ComposePostSection
        viewerId={user.id}
        defaultOpen
        className="rounded-xl"
        redirectOnPublishHref="/blog"
      />

      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="h3-style">Publishing tips</h2>
        <p className="p-style-small">
          Use a clear title, keep the structure readable, and attach up to three images if they help explain the position or idea.
        </p>
        <div className="mt-4">
          <Link
            href={`/${encodeURIComponent(user.userName)}/posts`}
            className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Open my posts
          </Link>
        </div>
      </div>
    </AppPage>
  );
}
