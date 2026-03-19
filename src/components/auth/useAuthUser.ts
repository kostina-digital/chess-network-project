"use client";

import { useEffect, useState } from "react";

export type ClientUser = { id: number; email: string } | null;

export function useAuthUser() {
  const [user, setUser] = useState<ClientUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/auth/me");
        const data = (await res.json().catch(() => null)) as { user?: ClientUser } | null;
        if (cancelled) return;
        setUser(data?.user ?? null);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading };
}

