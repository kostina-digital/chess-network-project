"use client";

import FooterPublic from "@/components/layout/FooterPublic";
import { useAuthUser } from "@/components/auth/useAuthUser";

/** Renders the marketing footer only for guests (hidden after sign-in). */
export function PublicFooterGate() {
  const { user } = useAuthUser();
  if (user) return null;
  return <FooterPublic />;
}
