"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userNameTouched, setUserNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/auth/sing-up", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, userName, password, confirmPassword }),
    });

    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!res.ok || !data?.ok) {
      setError(data?.error ?? "Register failed.");
      return;
    }

    router.replace("/dashboard");
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-input-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-foreground">Sign Up</h1>

        <label className="flex flex-col gap-1 text-sm text-foreground">
          <span>Username*</span>
          <input
            onBlur={() => setUserNameTouched(true)}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            className={inputClass}
          />
          {userNameTouched && userName.length < 3 ? (
            <div className="text-sm text-destructive">
              Username must be at least 3 characters long
            </div>
          ) : null}
          {userNameTouched && userName.length > 15 ? (
            <div className="text-sm text-destructive">
              Username must be less than 15 characters
            </div>
          ) : null}
        </label>

        <label className="flex flex-col gap-1 text-sm text-foreground">
          <span>Email</span>
          <input
            onBlur={() => setEmailTouched(true)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
          {emailTouched && !email.includes("@") ? (
            <div className="text-sm text-destructive">
              Email must contain an @ symbol
            </div>
          ) : null}
        </label>

        <label className="flex flex-col gap-1 text-sm text-foreground">
          <span>Password</span>
          <input
            onBlur={() => setPasswordTouched(true)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password"
            type="password"
            className={inputClass}
          />
          {passwordTouched && password.length < 8 ? (
            <div className="text-sm text-destructive">
              Password must be at least 8 characters long
            </div>
          ) : null}
          {passwordTouched && password.length > 15 ? (
            <div className="text-sm text-destructive">
              Password must be less than 15 characters
            </div>
          ) : null}
        </label>

        <label className="flex flex-col gap-1 text-sm text-foreground">
          <span>Confirm Password</span>
          <input
            onBlur={() => setConfirmPasswordTouched(true)}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            type="password"
            className={inputClass}
          />
          {confirmPasswordTouched && confirmPassword !== password ? (
            <div className="text-sm text-destructive">Passwords do not match</div>
          ) : null}
        </label>

        {error ? (
          <div
            className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Create account
        </button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/log-in"
          className="font-medium text-primary hover:text-primary-hover hover:underline"
        >
          LogIn
        </Link>
      </p>
    </>
  );
}
