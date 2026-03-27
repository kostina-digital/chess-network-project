import { Suspense } from "react";
import { SearchPageContent } from "./SearchPageContent";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-w-0 p-4">
          <h1 className="text-2xl font-semibold text-foreground">Search</h1>
          <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
