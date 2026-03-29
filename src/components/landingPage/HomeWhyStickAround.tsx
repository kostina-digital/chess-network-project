import { Target, Users, Lightbulb } from "lucide-react";

export function HomeWhyStickAround() {
  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-6 text-center shadow-sm">
            <h3 className="h3-style flex items-center gap-2">
              <Target /> <b>Analyze games</b>
            </h3>
            <p className="p-style-small">
              Share your games and get feedback from the community. Learn from
              mistakes and celebrate wins together.
            </p>
          </article>
          <article className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-6 text-center shadow-sm">
            <h3 className="h3-style flex items-center gap-2">
              <Users /> <b>Find your people</b>
            </h3>
            <p className="p-style-small">
              Connect across skill levels, follow players you admire, and grow
              a network that matches your goals.
            </p>
          </article>
          <article className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-6 text-center shadow-sm">
            <h3 className="h3-style flex items-center gap-2">
              <Lightbulb /> <b>Share insights</b>
            </h3>
            <p className="p-style-small">
              Openings, tactics, and training ideas. Post what you discover and
              learn from others in return.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
