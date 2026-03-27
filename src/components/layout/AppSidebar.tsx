"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  { href: "/dashboard#my-posts", label: "My posts", icon: Library },
  { href: "/blog#compose-post", label: "Add post", icon: SquarePen },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/news", label: "News", icon: Rss },
  { href: "/about", label: "About Us", icon: Info },
] as const;

function isActive(pathname: string, hash: string, href: string): boolean {
  if (href === "/blog#compose-post") {
    return pathname === "/blog" && hash === "#compose-post";
  }
  if (href === "/blog") {
    return pathname === "/blog" && hash !== "#compose-post";
  }
  if (href === "/dashboard#my-posts") {
    return pathname === "/dashboard" && hash === "#my-posts";
  }
  if (href === "/dashboard") {
    return pathname === "/dashboard" && hash !== "#my-posts";
  }
  return (
    pathname === href ||
    (href !== "/" && pathname.startsWith(`${href}/`))
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const linkClass = (href: string) =>
    isActive(pathname, hash, href)
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
            href={href}
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
