"use client";

import Logo from "@/components/layout/Logo";
import FooterLegalModals from "@/components/layout/FooterLegalModals";
import { FooterQuickLinks } from "@/components/layout/FooterQuickLinks";
import { FooterContact } from "@/components/layout/FooterContact";
import { FooterFollow } from "@/components/layout/FooterFollow";


export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:gap-10">
          <div className="flex flex-col gap-4">
            <Logo />
          </div>
          <FooterQuickLinks />
          <FooterFollow />
          <FooterContact />
          
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p className="p-style-xsmall">© 2026 ChessConnect. All rights reserved.</p>
      <FooterLegalModals />
    </div>
      </div>
    </footer>
  );
}
