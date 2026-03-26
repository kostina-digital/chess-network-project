import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FooterContact() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">Contact</h3>
      <p className="text-sm text-foreground">Email: info@chessconnect.com</p>
      <p className="text-sm text-foreground">Phone: +1 (555) 123-4567</p>
      <Link
        href="mailto:info@chessconnect.com?subject=ChessConnect%20contact"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
      >
        Contact us
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
