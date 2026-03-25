import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import FooterPublic from "@/components/layout/FooterPublic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased max-w-[1440px] mx-auto">
        <AuthProvider>
          <main className="min-h-0 w-full flex-1 px-4 py-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <FooterPublic />
        </AuthProvider>
      </body>
    </html>
  );
}