"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function safeInternalPath(path: string | null): string | null {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return null;
  return path;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;
    if (!res.ok || !data?.ok) {
      setError(data?.error ?? "Login failed.");
      return;
    }

    const next =
      safeInternalPath(searchParams.get("redirect")) ?? "/dashboard";
    router.replace(next);
    router.refresh();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-foreground">Login</h1>

        <label className="flex flex-col gap-1 text-sm text-foreground">
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-foreground">
          <span>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••"
            type="password"
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        {error ? (
          <div className="text-sm text-destructive" role="alert">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Login
        </button>
      </form>
      <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary-hover hover:underline"
          >
            Register
          </Link>
        </p>
        <p>
          Forgot your password?{" "}
          <Link href="/forgot-password" className="text-primary hover:underline">
            Reset
          </Link>
        </p>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-muted-foreground">Loading sign-in…</p>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
