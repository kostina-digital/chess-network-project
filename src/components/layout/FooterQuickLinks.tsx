"use client";

import Link from "next/link";
import { useAuthUser } from "@/components/auth/useAuthUser";

const quickLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About Us" },
] as const;

/** "Quick Links" column — shown only when the user is signed in. */
export function FooterQuickLinks() {
  const { user } = useAuthUser();
  if (!user) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
      <ul className="space-y-3 text-sm">
        {quickLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-foreground transition-colors hover:text-primary"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
