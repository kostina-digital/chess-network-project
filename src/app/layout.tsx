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
      <body className="w-full bg-background text-foreground antialiased">
        <AuthProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col">
            <main className="min-h-0 w-full flex-1 py-4">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
