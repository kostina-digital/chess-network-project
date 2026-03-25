"use client";

import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/components/auth/useAuthUser";

export default function Header() {

  return (
    <header className="w-full border-b border-border bg-background text-foreground">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        
      </div>
    </header>
  );
}
