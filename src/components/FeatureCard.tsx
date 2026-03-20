import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: Icon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
