import Header from "@/components/layout/Header";

/** App shell: shared header. Auth state comes from the root `AuthProvider` in `app/layout.tsx`. */
export default function AppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
