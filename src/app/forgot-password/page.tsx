"use client";

import Link from "next/link";
import { useState } from "react";

function isValidEmail(value: string) {
  const t = value.trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const emailInvalid =
    emailTouched && (email.trim() === "" || !isValidEmail(email));

  const emailMessage = emailTouched
    ? email.trim() === ""
      ? "Email is required"
      : !isValidEmail(email)
        ? "Enter a valid email address"
        : null
    : null;

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-lg border bg-input-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
      invalid ? "border-red-600" : "border-border"
    }`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setEmailTouched(true);

    if (email.trim() === "" || !isValidEmail(email)) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; message?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Something went wrong. Try again.");
        return;
      }

      setSuccessMessage(
        data.message ??
          "If an account exists for this email, you will receive password reset instructions shortly."
      );
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
        <h1 className="h1-style">Reset password</h1>
        <p className="text-sm text-foreground">
          Enter the email you used to register. We&apos;ll send you a link to
          choose a new password (in development, check the server terminal for
          the link).
        </p>

        <label className="flex w-full flex-col gap-1 text-sm text-foreground">
          <span>Email*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onBlur={() => setEmailTouched(true)}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={Boolean(successMessage)}
            className={fieldClass(Boolean(emailInvalid))}
            aria-invalid={emailInvalid || undefined}
            aria-describedby={emailMessage ? "forgot-email-error" : undefined}
          />
          {emailMessage ? (
            <div id="forgot-email-error" className="text-sm text-red-600">
              {emailMessage}
            </div>
          ) : null}
        </label>

        {error ? (
          <div className="text-sm text-red-600" role="alert">
            {error}
          </div>
        ) : null}

        {successMessage ? (
          <div
            className="rounded-lg border border-border bg-muted/40 p-3 text-sm text-foreground"
            role="status"
          >
            {successMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting || Boolean(successMessage)}
          className="mt-1 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Sending…" : "Send reset link"}
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
