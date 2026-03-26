"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthUser } from "@/components/auth/useAuthUser";

function isValidEmail(value: string) {
  const t = value.trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

export default function SignUpPage() {
  const router = useRouter();
  const { refresh } = useAuthUser();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userNameTouched, setUserNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-lg border bg-input-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
      invalid ? "border-red-600" : "border-border"
    }`;

  const userNameTrim = userName.trim();
  const userNameInvalid =
    userNameTouched &&
    (userNameTrim.length === 0 ||
      userNameTrim.length < 3 ||
      userNameTrim.length > 15);
  const emailInvalid =
    emailTouched && (email.trim() === "" || !isValidEmail(email));
  const passwordInvalid =
    passwordTouched &&
    (password.length === 0 || password.length < 8 || password.length > 15);
  const confirmInvalid =
    confirmPasswordTouched &&
    (confirmPassword.length === 0 || confirmPassword !== password);

  const userNameMessages = userNameTouched
    ? userNameTrim.length === 0
      ? ["Username is required"]
      : userNameTrim.length < 3
        ? ["Username must be at least 3 characters long"]
        : userNameTrim.length > 15
          ? ["Username must be at most 15 characters"]
          : []
    : [];

  const emailMessage = emailTouched
    ? email.trim() === ""
      ? "Email is required"
      : !isValidEmail(email)
        ? "Enter a valid email address"
        : null
    : null;

  const passwordMessages = passwordTouched
    ? password.length === 0
      ? ["Password is required"]
      : password.length < 8
        ? ["Password must be at least 8 characters long"]
        : password.length > 15
          ? ["Password must be at most 15 characters"]
          : []
    : [];

  const confirmMessage = confirmPasswordTouched
    ? confirmPassword.length === 0
      ? "Please confirm your password"
      : confirmPassword !== password
        ? "Passwords do not match"
        : null
    : null;

  function formValid() {
    const u = userName.trim();
    return (
      u.length >= 3 &&
      u.length <= 15 &&
      isValidEmail(email) &&
      password.length >= 8 &&
      password.length <= 15 &&
      confirmPassword === password
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setUserNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!formValid()) return;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        userName: userName.trim(),
        password,
        confirmPassword,
      }),
    });

    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!res.ok || !data?.ok) {
      setError(data?.error ?? "Register failed.");
      return;
    }

    await refresh();
    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex w-full max-w-[min(50vw,700px)] flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <h1 className="text-2xl font-semibold text-foreground">Sign Up</h1>

          <label className="flex w-full flex-col gap-1 text-sm text-foreground">
            <span>Username*</span>
            <input
              name="userName"
              autoComplete="username"
              required
              minLength={3}
              maxLength={15}
              onBlur={() => setUserNameTouched(true)}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              className={fieldClass(Boolean(userNameInvalid))}
              aria-invalid={userNameInvalid || undefined}
            />
            {userNameMessages.map((msg) => (
              <div key={msg} className="text-sm text-red-600">
                {msg}
              </div>
            ))}
          </label>

          <label className="flex w-full flex-col gap-1 text-sm text-foreground">
            <span>Email*</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              onBlur={() => setEmailTouched(true)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={fieldClass(Boolean(emailInvalid))}
              aria-invalid={emailInvalid || undefined}
            />
            {emailMessage ? (
              <div className="text-sm text-red-600">{emailMessage}</div>
            ) : null}
          </label>

          <label className="flex w-full flex-col gap-1 text-sm text-foreground">
            <span>Password*</span>
            <input
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={15}
              onBlur={() => setPasswordTouched(true)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              type="password"
              className={fieldClass(Boolean(passwordInvalid))}
              aria-invalid={passwordInvalid || undefined}
            />
            {passwordMessages.map((msg) => (
              <div key={msg} className="text-sm text-red-600">
                {msg}
              </div>
            ))}
          </label>

          <label className="flex w-full flex-col gap-1 text-sm text-foreground">
            <span>Confirm password*</span>
            <input
              name="confirmPassword"
              autoComplete="new-password"
              required
              onBlur={() => setConfirmPasswordTouched(true)}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              type="password"
              className={fieldClass(Boolean(confirmInvalid))}
              aria-invalid={confirmInvalid || undefined}
            />
            {confirmMessage ? (
              <div className="text-sm text-red-600">{confirmMessage}</div>
            ) : null}
          </label>

          {error ? (
            <div
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              role="alert"
            >
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            className="mt-1 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
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
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}
