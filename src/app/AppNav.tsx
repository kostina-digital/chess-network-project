
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthUser } from "@/components/auth/useAuthUser";

export default function RootNav() {
  const pathname = usePathname();
  const { user } = useAuthUser();

  if (pathname === "/" || pathname === "/home") {
    return null;
  }

  const linkClassName = (path: string) => {
    const active =
      pathname === path ||
      (path !== "/" && pathname.startsWith(path + "/"));

    return active
      ? "px-2 font-medium text-primary"
      : "px-2 text-chrome-muted transition-colors hover:text-primary";
  };

  return (
    <nav className="flex justify-center flex-wrap gap-2">
      <Link href="/" className={linkClassName("/")}>
        Home
      </Link>

      {user ? (
        <Link href="/dashboard" className={linkClassName("/dashboard")}>
          Dashboard
        </Link>
      ) : null}

      <Link href="/blog" className={linkClassName("/blog")}>
        Blog
      </Link>
      <Link href="/news" className={linkClassName("/news")}>
        News
      </Link>
      <Link href="/about" className={linkClassName("/about")}>
        About Us
      </Link>
    </nav>
  );
}
