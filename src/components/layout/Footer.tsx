import Logo from "@/components/layout/Logo";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo width={32} height={32} className="h-8 w-8" />
              <span className="font-semibold text-foreground">ChessConnect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 ChessConnect. A social network for chess enthusiasts.
            </p>
          </div>
        </div>
      </footer>
  );
}
