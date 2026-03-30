"use client";

import Logo from "@/components/layout/Logo";
import FooterLegalModals from "@/components/layout/FooterLegalModals";
import { FooterContact } from "@/components/layout/FooterContact";
import { FooterFollow } from "@/components/layout/FooterFollow";
import { FooterQuickLinks } from "@/components/layout/FooterQuickLinks";
import { useAuthUser } from "@/components/auth/useAuthUser";

export default function Footer() {
  const { user } = useAuthUser();

  return (
    <footer className="mt-auto w-full border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 ${
            user ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-[16rem] justify-center">
              <Logo className="h-16 w-auto" />
            </div>
          </div>
          {user ? (
            <div className="flex w-full justify-center">
              <div className="flex w-full max-w-[16rem] justify-center">
                <FooterQuickLinks />
              </div>
            </div>
          ) : null}
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-[16rem] justify-center">
              <FooterFollow />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-[16rem] justify-center">
              <FooterContact />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-border px-0 pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-left">
            © 2026 ChessConnect. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <FooterLegalModals />
          </div>
        </div>
      </div>
    </footer>
  );
}
