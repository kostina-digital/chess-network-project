"use client";

import RootNav from "@/app/RootNav";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/components/auth/useAuthUser";

export default function Header() {
  const router = useRouter();
  const { user } = useAuthUser();
  const userName = user?.userName ?? user?.email;

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
              Hello, {user.userName ? user.userName : user.email}!
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
            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => router.replace("/register")}
              className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-10 px-5 cursor-pointer"
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
    </>
  );
}
