"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
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

    const res = await fetch("/api/auth/register", {
      method: "POST",
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

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md w-full">
      <h1 className="text-2xl font-semibold">Register</h1>

      <label className="flex flex-col gap-1">
        <span>Username*</span>
        <input
          onBlur={() => setUserNameTouched(true)}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your username"
          className="border border-solid border-gray-300 w-full p-2 rounded"
        />
        {userNameTouched && userName.length < 3 ? (
          <div className="text-red-600 text-sm">Username must be at least 3 characters long</div>
        ) : null}
        {userNameTouched && userName.length > 15 ? (
          <div className="text-red-600 text-sm">Username must be less than 15 characters</div>
        ) : null}
      </label>

      <label className="flex flex-col gap-1">
        <span>Email</span>
        <input
          onBlur={() => setEmailTouched(true)}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="border border-solid border-gray-300 w-full p-2 rounded"
        />
        {emailTouched && !email.includes("@") ? <div className="text-red-600 text-sm">Email must contain an @ symbol</div> : null}
      </label>

      <label className="flex flex-col gap-1">
        <span>Password</span>
        <input
          onBlur={() => setPasswordTouched(true)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose a password"
          type="password"
          className="border border-solid border-gray-300 w-full p-2 rounded"
        />
        {passwordTouched && password.length < 8 ? (
          <div className="text-red-600 text-sm">Password must be at least 8 characters long</div>
        ) : null}
        {passwordTouched && password.length > 15 ? <div className="text-red-600 text-sm">Password must be less than 15 characters</div> : null}
      </label>

      <label className="flex flex-col gap-1">
        <span>Confirm Password</span>
        <input
          onBlur={() => setConfirmPasswordTouched(true)}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          type="password"
          className="border border-solid border-gray-300 w-full p-2 rounded"
        />
        {confirmPasswordTouched && confirmPassword !== password ? <div className="text-red-600 text-sm">Passwords do not match</div> : null}
      </label>

      {error ? (
        <div className="text-red-600 text-sm rounded border border-red-200 bg-red-50 p-2" role="alert">
          {error}
        </div>
      ) : null}

      <button type="submit" className="bg-[#6c47ff] text-white rounded px-4 py-2 mt-2">
        Create account
      </button>
    </form>
    <p>Already have an account? <Link href="/login">Login</Link></p>
    </>
  );
}

