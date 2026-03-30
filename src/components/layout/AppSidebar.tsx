"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthUser } from "@/components/auth/useAuthUser";
import {
  Info,
  LayoutDashboard,
  Library,
  Newspaper,
  Rss,
  SquarePen,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "__my_posts__", label: "My posts", icon: Library },
  { href: "/blog/new", label: "Add post", icon: SquarePen },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/news", label: "News", icon: Rss },
  { href: "/about", label: "About Us", icon: Info },
] as const;

function isActive(pathname: string, href: string, userName: string | null): boolean {
  if (href === "/blog/new") {
    return pathname === "/blog/new";
  }
  if (href === "/blog") {
    return pathname === "/blog";
  }
  if (href === "__my_posts__") {
    return userName !== null && pathname === `/${userName}/posts`;
  }
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return (
    pathname === href ||
    (href !== "/" && pathname.startsWith(`${href}/`))
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuthUser();
  const userName = user?.userName ?? null;

  const resolveHref = (href: string) =>
    href === "__my_posts__"
      ? userName
        ? `/${userName}/posts`
        : "/dashboard"
      : href;

  const linkClass = (href: string) =>
    isActive(pathname, href, userName)
      ? "bg-primary/15 text-primary"
      : "text-muted-foreground hover:bg-muted hover:text-foreground";

  return (
    <aside className="shrink-0 border-b border-border bg-card md:w-56 md:border-b-0 md:border-r">
      <nav
        className="flex gap-2 overflow-x-auto px-2 py-3 md:flex-col md:gap-0.5 md:p-3"
        aria-label="Main navigation"
      >
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={`${href}-${label}`}
            href={resolveHref(href)}
            className={`flex min-w-[5.25rem] shrink-0 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-center text-xs font-medium transition-colors md:min-w-0 md:flex-row md:justify-start md:gap-2 md:px-3 md:py-2.5 md:text-sm ${linkClass(href)}`}
          >
            <Icon className="size-4 shrink-0 opacity-80 md:size-4" aria-hidden />
            <span className="leading-tight">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
