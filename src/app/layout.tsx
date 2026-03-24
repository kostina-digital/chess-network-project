import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[1440px] mx-auto p-4 gap-4 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 min-h-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}