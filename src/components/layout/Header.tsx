"use client";

import { Suspense } from "react";
import RootNav from "@/app/AppNav";
import Logo from "./Logo";
import { SiteSearchBar } from "@/components/layout/SiteSearchBar";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/components/auth/useAuthUser";
import SignInBtn from "@/components/buttons/signInBtn";
import SignUpBtn from "@/components/buttons/signUpBtn";

export default function Header() {
  const router = useRouter();
  const { user, refresh, clearUser } = useAuthUser();
  const displayName = user ? (user.userName || user.email) : "";

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    clearUser();
    await refresh();
    router.replace("/");
    router.refresh();
  }

  return (
    <header className="w-full border-b border-border bg-background px-4 py-3 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3">
        <Logo />
        <div className="order-3 w-full min-w-0 sm:order-2 sm:flex-1 sm:px-2 lg:px-4">
          {!user ? (
            <RootNav />
          ) : (
            <Suspense
              fallback={
                <div
                  className="h-9 w-full max-w-xl shrink rounded-lg border border-border bg-muted/40"
                  aria-hidden
                />
              }
            >
              <SiteSearchBar />
            </Suspense>
          )}
        </div>
        <div className="order-2 ml-auto flex shrink-0 items-center gap-2 sm:order-3">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => router.replace("/dashboard")}
                className="max-w-[11rem] truncate rounded-lg bg-muted px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary sm:px-4"
              >
                Hello, {displayName}!
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border-2 border-foreground/35 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground sm:px-4"
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
