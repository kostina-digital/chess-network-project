
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthUser } from "@/components/auth/useAuthUser";

export default function RootNav() {
  const pathname = usePathname();
  const { user } = useAuthUser();

  const linkClassName = (path: string) => {
    const active =
      pathname === path ||
      (path !== "/" && pathname.startsWith(path + "/"));

    return active
      ? "text-gray-400 px-2"
      : "text-blue-500 hover:underline px-2";
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
      <Link href="/about-us" className={linkClassName("/about-us")}>
        About Us
      </Link>
    </nav>
  );
}
