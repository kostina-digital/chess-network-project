import Link from "next/link";
import { Edit2, Library, SquarePen } from "lucide-react";

const staticCards = [
  {
    key: "my-posts",
    label: "My posts",
    description: "Open your public profile with the full list of posts.",
    icon: Library,
  },
  {
    key: "create",
    href: "/blog#compose-post" as const,
    label: "Create post",
    description: "Open the blog composer to write something new.",
    icon: SquarePen,
  },
  {
    key: "edit",
    href: "/dashboard/edit" as const,
    label: "Edit profile",
    description: "Bio, avatar, rating, and other profile fields.",
    icon: Edit2,
  },
] as const;

type DashboardHubProps = {
  myPostsHref: string;
};

export function DashboardHub({ myPostsHref }: DashboardHubProps) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Jump to your posts, start writing, or update how others see you.
      </p>
      <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {staticCards.map(({ key, label, description, icon: Icon, ...rest }) => {
          const href = "href" in rest ? rest.href : myPostsHref;
          return (
          <li key={key}>
            <Link
              href={href}
              className="flex h-full min-h-[8.5rem] flex-col gap-2 rounded-lg border border-border bg-card p-6 shadow-sm outline-none transition-colors hover:border-primary/40 hover:bg-muted/20 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon
                className="size-8 shrink-0 text-primary"
                aria-hidden
              />
              <span className="font-semibold text-foreground">{label}</span>
              <span className="text-sm leading-snug text-muted-foreground">
                {description}
              </span>
            </Link>
          </li>
          );
        })}
      </ul>
    </header>
  );
}
