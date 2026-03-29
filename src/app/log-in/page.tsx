"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuthUser } from "@/components/auth/useAuthUser";

function safeInternalPath(path: string | null): string | null {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return null;
  return path;
}

function isValidEmail(value: string) {
  const t = value.trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailInvalid =
    emailTouched &&
    (email.trim() === "" || !isValidEmail(email));
  const passwordInvalid = passwordTouched && password.length === 0;

  const emailMessage = emailTouched
    ? email.trim() === ""
      ? "Email is required"
      : !isValidEmail(email)
        ? "Enter a valid email address"
        : null
    : null;

  const passwordMessage = passwordTouched
    ? password.length === 0
      ? "Password is required"
      : null
    : null;

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-lg border bg-input-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
      invalid ? "border-red-600" : "border-border"
    }`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEmailTouched(true);
    setPasswordTouched(true);

    if (email.trim() === "" || !isValidEmail(email) || password.length === 0) {
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
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
    await refresh();
    router.replace(next);
    router.refresh();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 flex w-full max-w-[min(50vw,700px)] flex-col gap-3 rounded-xl bg-card p-6 shadow-sm"
      >
        <h1 className="h1-style">Login</h1>

        <label className="flex w-full flex-col gap-1 text-sm text-foreground">
          <span>Email</span>
          <input
            name="email"
            autoComplete="email"
            required
            value={email}
            onBlur={() => setEmailTouched(true)}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldClass(Boolean(emailInvalid))}
            aria-invalid={emailInvalid || undefined}
            aria-describedby={emailMessage ? "login-email-error" : undefined}
          />
          {emailMessage ? (
            <div id="login-email-error" className="text-sm text-red-600">
              {emailMessage}
            </div>
          ) : null}
        </label>

        <label className="flex w-full flex-col gap-1 text-sm text-foreground">
          <span>Password</span>
          <input
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onBlur={() => setPasswordTouched(true)}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••"
            type="password"
            className={fieldClass(Boolean(passwordInvalid))}
            aria-invalid={passwordInvalid || undefined}
            aria-describedby={
              passwordMessage ? "login-password-error" : undefined
            }
          />
          {passwordMessage ? (
            <div id="login-password-error" className="text-sm text-destructive">
              {passwordMessage}
            </div>
          ) : null}
        </label>

        {error ? (
          <div className="text-sm text-red-600" role="alert">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Login
        </button>
      </form>
      <div className="m-auto mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:text-primary-hover hover:underline"
          >
            Sign Up
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
