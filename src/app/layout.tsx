import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col bg-background text-foreground antialiased">
        <AuthProvider>
          <main className="min-h-0 w-full flex-1 px-4 py-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
