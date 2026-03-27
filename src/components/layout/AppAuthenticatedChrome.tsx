"use client";

import type { ReactNode } from "react";
import { useAuthUser } from "@/components/auth/useAuthUser";
import { AppSidebar } from "@/components/layout/AppSidebar";

/** Left sidebar for signed-in users on `(app)` routes. Search lives in `Header`. */
export function AppAuthenticatedChrome({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthUser();

  if (loading || !user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col md:flex-row">
      <AppSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
