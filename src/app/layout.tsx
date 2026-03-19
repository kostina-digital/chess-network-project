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
      <body className="max-w-[1440px] mx-auto p-4 gap-4">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}