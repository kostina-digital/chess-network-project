"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

/** Compact site search for the header (signed-in users). */
export function SiteSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const href = `/search?q=${encodeURIComponent(q)}`;
    router.push(href);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-w-0 max-w-xl"
      role="search"
    >
      <div
        className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-ring"
      >
        <Search
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          autoComplete="off"
          className="min-w-0 flex-1 border-0 bg-transparent py-0.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          aria-label="Search the site"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Search
        </button>
      </div>
    </form>
  );
}
