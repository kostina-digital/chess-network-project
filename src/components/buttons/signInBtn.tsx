"use client";

import { useRouter } from "next/navigation";

type SignInBtnProps = {
  /** Dark graphite header / footer */
  tone?: "default" | "chrome";
};

export default function SignInBtn({ tone = "default" }: SignInBtnProps) {
  const router = useRouter();

  const chrome =
    "inline-flex h-10 items-center justify-center rounded-lg border-2 border-primary/80 bg-transparent px-8 text-sm font-medium text-primary transition-colors hover:bg-primary/12";
  const light =
    "inline-flex h-10 items-center justify-center rounded-lg bg-secondary px-8 text-sm font-medium text-secondary-foreground transition-colors hover:bg-graphite hover:text-primary";

  return (
    <button
      type="button"
      onClick={() => router.replace("/login")}
      className={tone === "chrome" ? chrome : light}
    >
      Log in
    </button>
  );
}
