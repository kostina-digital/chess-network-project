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
        className="flex gap-1 overflow-x-auto p-3 md:flex-col md:gap-0.5"
        aria-label="Main navigation"
      >
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={`${href}-${label}`}
            href={resolveHref(href)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:py-2.5 ${linkClass(href)}`}
          >
            <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
