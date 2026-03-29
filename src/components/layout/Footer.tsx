"use client";

import Logo from "@/components/layout/Logo";
import FooterLegalModals from "@/components/layout/FooterLegalModals";
import { FooterQuickLinks } from "@/components/layout/FooterQuickLinks";
import { FooterContact } from "@/components/layout/FooterContact";
import { FooterFollow } from "@/components/layout/FooterFollow";
import { useAuthUser } from "@/components/auth/useAuthUser";

export default function Footer() {
  const { user } = useAuthUser();

  return (
    <footer className="mt-auto w-full border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:justify-between lg:gap-10 ${
            user ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          <div className="flex flex-col gap-3">
            <Logo className="h-16 w-auto" />
          </div>
          <FooterQuickLinks />
          <FooterFollow />
          <FooterContact />
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border px-8 pt-6 text-xs text-muted-foreground mx-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-muted-foreground">
            © 2026 ChessConnect. All rights reserved.
          </p>
          <FooterLegalModals />
        </div>
      </div>
    </footer>
  );
}
