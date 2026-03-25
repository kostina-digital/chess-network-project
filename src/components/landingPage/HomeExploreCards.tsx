import Link from "next/link";
import { FileText, Newspaper, Info } from "lucide-react";

const items = [
  {
    href: "/login?redirect=%2Fblog",
    title: "Community feed",
    description:
      "Posts, profiles, and comments are for members only. Sign in (or register) to read and take part.",
    icon: FileText,
    cta: "Sign in for feed →",
  },
  {
    href: "/news",
    title: "Chess news",
    description:
      "Headlines from the chess world, refreshed regularly — no account needed.",
    icon: Newspaper,
    cta: "Open →",
  },
  {
    href: "/about",
    title: "About ChessConnect",
    description:
      "Why we built this network and what you can expect as a member.",
    icon: Info,
    cta: "Open →",
  },
] as const;

export function HomeExploreCards() {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            News, about &amp; the member feed
          </h2>
          <p className="mt-4 text-muted-foreground">
            <strong className="font-medium text-foreground">News</strong> and{" "}
            <strong className="font-medium text-foreground">About</strong> are
            open to everyone. The{" "}
            <strong className="font-medium text-foreground">
              community feed
            </strong>{" "}
            and player profiles require a free account — that is where posts
            and discussions live.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ href, title, description, icon: Icon, cta }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <span className="mt-4 text-sm font-medium text-primary">
                {cta}
              </span>
            </Link>
          ))}
        </div>

    </section>
  );
}
