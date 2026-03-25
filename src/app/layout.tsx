import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { PublicFooterGate } from "@/components/layout/PublicFooterGate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto flex min-h-screen max-w-[1440px] flex-col bg-background text-foreground antialiased">
        <AuthProvider>
          <main className="min-h-0 w-full flex-1 px-4 py-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <PublicFooterGate />
        </AuthProvider>
      </body>
    </html>
  );
}