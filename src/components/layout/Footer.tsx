import Link from "next/link";
import Logo from "@/components/layout/Logo";
import FooterLegalModals from "@/components/layout/FooterLegalModals";
import { ArrowRight } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About Us" },
] as const;



export default function Footer() {
  return (
    <footer className=" text-neutral-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo width={100} height={100} className="h-40 w-40 rounded-lg" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              A social network for chess players of every level. Share games,
              follow news, and grow your strategic thinking together.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <p className="text-sm mb-1">Email: info@chessconnect.com</p>
            <p className="text-sm mb-5">Phone: +1 (555) 123-4567</p>
            <Link
              href="mailto:info@chessconnect.com?subject=ChessConnect%20contact"
              className="inline-flex items-center gap-1 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
            >
              Contact us
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 ChessConnect. All rights reserved.</p>
          <FooterLegalModals />
        </div>
      </div>
    </footer>
  );
}
