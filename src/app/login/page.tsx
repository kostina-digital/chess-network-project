"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      setError(data?.error ?? "Login failed.");
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md w-full">
      <h1 className="text-2xl font-semibold">Login</h1>

      <label className="flex flex-col gap-1">
        <span>Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="border border-solid border-gray-300 w-full p-2 rounded"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span>Password</span>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••"
          type="password"
          className="border border-solid border-gray-300 w-full p-2 rounded"
        />
      </label>

      {error ? <div className="text-red-600 text-sm">{error}</div> : null}

      <button type="submit" className="bg-[#6c47ff] text-white rounded px-4 py-2 mt-2">
        Login
      </button>
    </form>
  );
}