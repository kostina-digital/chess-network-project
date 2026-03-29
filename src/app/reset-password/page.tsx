"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordInvalid =
    passwordTouched &&
    (password.length === 0 ||
      password.length < 8 ||
      password.length > 15);
  const confirmInvalid =
    confirmTouched &&
    (confirmPassword.length === 0 || confirmPassword !== password);

  const passwordMessages = passwordTouched
    ? password.length === 0
      ? ["Password is required"]
      : password.length < 8
        ? ["Password must be at least 8 characters long"]
        : password.length > 15
          ? ["Password must be at most 15 characters"]
          : []
    : [];

  const confirmMessage = confirmTouched
    ? confirmPassword.length === 0
      ? "Please confirm your password"
      : confirmPassword !== password
        ? "Passwords do not match"
        : null
    : null;

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-lg border bg-input-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
      invalid ? "border-red-600" : "border-border"
    }`;

  const tokenMissing = !token;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPasswordTouched(true);
    setConfirmTouched(true);

    if (
      tokenMissing ||
      password.length < 8 ||
      password.length > 15
    ) {
      return;
    }
    if (confirmPassword !== password) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Could not reset password.");
        return;
      }

      router.replace("/log-in");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="mx-auto mt-10 flex w-full max-w-[min(50vw,700px)] flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <h1 className="h1-style">New password</h1>

        {tokenMissing ? (
          <p className="text-sm text-red-600" role="alert">
            This reset link is invalid or incomplete. Request a new link from
            the forgot password page.
          </p>
        ) : (
          <p className="text-sm text-foreground">
            Choose a new password for your account (8–15 characters).
          </p>
        )}

        <label className="flex w-full flex-col gap-1 text-sm text-foreground">
          <span>New password*</span>
          <input
            name="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={15}
            value={password}
            onBlur={() => setPasswordTouched(true)}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            type="password"
            disabled={tokenMissing}
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
            value={confirmPassword}
            onBlur={() => setConfirmTouched(true)}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            type="password"
            disabled={tokenMissing}
            className={fieldClass(Boolean(confirmInvalid))}
            aria-invalid={confirmInvalid || undefined}
          />
          {confirmMessage ? (
            <div className="text-sm text-red-600">{confirmMessage}</div>
          ) : null}
        </label>

        {error ? (
          <div className="text-sm text-red-600" role="alert">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting || tokenMissing}
          className="mt-1 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Update password"}
        </button>
      </form>

      <div className="m-auto mt-4 text-center text-sm text-muted-foreground">
        <Link
          href="/log-in"
          className="font-medium text-primary hover:text-primary-hover hover:underline"
        >
          Back to log in
        </Link>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Loading…
        </p>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
