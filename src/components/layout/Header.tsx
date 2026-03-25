"use client";

import RootNav from "@/app/AppNav";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/components/auth/useAuthUser";
import SignInBtn from "@/components/buttons/signInBtn";
import SignUpBtn from "@/components/buttons/signUpBtn";

export default function Header() {
  const router = useRouter();
  const { user, refresh } = useAuthUser();
  const displayName = user ? (user.userName || user.email) : "";

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    await refresh();
    router.replace("/");
    router.refresh();
  }

  return (
    <header className="w-full border-b border-border bg-background text-foreground">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <RootNav />
        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => router.replace("/dashboard")}
                className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                Hello, {displayName}!
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border-2 border-foreground/35 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <SignInBtn tone="chrome" />
              <SignUpBtn tone="chrome" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
