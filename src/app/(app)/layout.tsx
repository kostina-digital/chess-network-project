import Header from "@/components/layout/Header";
import { AppAuthenticatedChrome } from "@/components/layout/AppAuthenticatedChrome";

/** App shell: shared header. Signed-in users get sidebar + site search. */
export default function AppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <AppAuthenticatedChrome>{children}</AppAuthenticatedChrome>
    </>
  );
}
