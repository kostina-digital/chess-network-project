import type { ReactNode } from "react";

type AppPageProps = {
  children: ReactNode;
  className?: string;
};

export function AppPage({ children, className = "" }: AppPageProps) {
  return (
    <div className="w-full bg-background">
      <div className={`mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}
