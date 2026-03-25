"use client";

import { useRouter } from "next/navigation";

type BackToHomeBtnProps = {
  /** Dark graphite header / footer */
  tone?: "default" | "chrome";
};

export default function BackToHomeBtn({ tone = "default" }: BackToHomeBtnProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.replace("/")}
      className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
    >
      <b>Back to Home</b>
    </button>
  );
}
