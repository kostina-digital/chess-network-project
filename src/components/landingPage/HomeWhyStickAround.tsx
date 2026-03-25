import { Target, Users, Lightbulb } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";

export function HomeWhyStickAround() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why players stick around
          </h2>
          <p className="mt-4 text-muted-foreground">
            ChessConnect is a social layer on top of your study and play — not
            another isolated app.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={Target}
            title="Analyze games"
            description="Share your games and get feedback from the community. Learn from mistakes and celebrate wins together."
          />
          <FeatureCard
            icon={Users}
            title="Find your people"
            description="Connect across skill levels, follow players you admire, and grow a network that matches your goals."
          />
          <FeatureCard
            icon={Lightbulb}
            title="Share insights"
            description="Openings, tactics, and training ideas — post what you discover and learn from others in return."
          />
        </div>
      </div>
    </section>
  );
}
