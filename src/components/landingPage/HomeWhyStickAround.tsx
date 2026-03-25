import { Target, Users, Lightbulb } from "lucide-react";

export function HomeWhyStickAround() {
  return (
    <section className="py-16 sm:py-20">
  
        <div className="grid gap-8 md:grid-cols-3 px-6">
          <article className="flex flex-col gap-2 border border-border rounded-lg p-6 bg-card center items-center justify-center ">
            <h3 className="h3-style flex items-center gap-2"><Target /> <b>Analyze games</b></h3>
            <p className="p-style">Share your games and get feedback from the community. Learn from mistakes and celebrate wins together.</p>
          </article>
          <article className="flex flex-col gap-2 border border-border rounded-lg p-6 bg-card center items-center justify-center ">
            <h3 className="h3-style flex items-center gap-2"><Users /> <b>Find your people</b></h3>
            <p className="p-style">Connect across skill levels, follow players you admire, and grow a network that matches your goals.</p>
          </article>
          <article className="flex flex-col gap-2 border border-border rounded-lg p-6 bg-card center items-center justify-center ">
            <h3 className="h3-style flex items-center gap-2"><Lightbulb /> <b>Share insights</b></h3>
            <p className="p-style">Openings, tactics, and training ideas — post what you discover and learn from others in return.</p>
          </article>
        </div>
    </section>
  );
}
