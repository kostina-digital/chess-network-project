import { Suspense } from "react";
import { SearchPageContent } from "./SearchPageContent";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-w-0 p-4">
          <h1 className="h1-style">Search</h1>
          <p className="p-style-small">Loading…</p>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
