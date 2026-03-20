"use client";

import RootNav from "@/app/RootNav";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/components/auth/useAuthUser";

export default function Header() {
  const router = useRouter();
  const { user } = useAuthUser();
  const displayName = user ? (user.userName || user.email) : "";

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    router.replace("/login");
  }

  return (
    <>
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <Logo />
      <RootNav />
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <button
              type="button"
              onClick={() => router.replace("/dashboard")}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium"
            >
              Hello, {displayName}!
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-200 hover:bg-red-300 px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <SignInBtn />
            <SignUpBtn />
          </>
        )}
      </div>
    </header>
    </>
  );
}
