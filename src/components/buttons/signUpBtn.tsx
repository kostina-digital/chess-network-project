"use client";

import { useRouter } from "next/navigation";

type SignUpBtnProps = {
  tone?: "default" | "chrome";
};

export default function SignUpBtn({ tone = "default" }: SignUpBtnProps) {
  const router = useRouter();

  const base =
    "inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover";
  const chromeShadow = tone === "chrome" ? " shadow-sm shadow-black/20" : "";

  return (
    <button
      type="button"
      onClick={() => router.replace("/register")}
      className={base + chromeShadow}
    >
      <b>Sign Up</b>  
    </button>
  );
}
