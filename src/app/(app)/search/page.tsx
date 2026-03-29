import { Suspense } from "react";
import { SearchPageContent } from "./SearchPageContent";
import { AppPage } from "@/components/layout/AppPage";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <AppPage>
          <h1 className="h1-style">Search</h1>
          <p className="p-style-small">Loading…</p>
        </AppPage>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
