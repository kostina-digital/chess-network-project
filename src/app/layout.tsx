import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import HeaderPublic from "@/components/layout/HeaderPublic";
import FooterPublic from "@/components/layout/FooterPublic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <AuthProvider>
          <HeaderPublic />
          <main className="mx-auto min-h-0 w-full max-w-[1440px] flex-1 px-4 py-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <FooterPublic />
        </AuthProvider>
      </body>
    </html>
  );
}