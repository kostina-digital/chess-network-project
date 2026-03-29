export default function AboutUsPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 p-4 sm:p-6">
        <header className="rounded-2xl border border-border bg-card px-6 py-8 shadow-sm">
          <h1 className="h1-style">About ChessConnect</h1>
          <p className="p-style max-w-3xl">
            ChessConnect is a social platform for adults who want chess to feel
            personal, thoughtful, and community-driven.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="h3-style">Purpose</h2>
            <p className="p-style-small">
              We built ChessConnect for players who want more than a board and
              a clock. The goal is to create a place where ideas, progress, and
              people matter as much as the result of a game.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="h3-style">Community</h2>
            <p className="p-style-small">
              Members can publish posts, follow strong voices, discuss games,
              and stay close to the wider chess conversation without leaving the
              platform.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="h3-style">Experience</h2>
            <p className="p-style-small">
              The product is designed to feel calm, elegant, and readable, with
              a visual language that reflects strategy, clarity, and focus.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-card px-6 py-8 shadow-sm">
          <h2 className="h2-style">What makes the platform special</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="h4-style">A social layer for chess</h3>
              <p className="p-style-small">
                Players can build a profile, share writing, react to posts, and
                follow other users. This turns learning and discussion into an
                ongoing social experience.
              </p>
            </div>
            <div>
              <h3 className="h4-style">Content that stays useful</h3>
              <p className="p-style-small">
                News, commentary, and personal posts live side by side. The app
                supports both quick discovery and deeper reading.
              </p>
            </div>
            <div>
              <h3 className="h4-style">Built for improvement</h3>
              <p className="p-style-small">
                Whether someone is a casual player or an ambitious improver,
                ChessConnect gives them space to learn, publish, and connect.
              </p>
            </div>
            <div>
              <h3 className="h4-style">Designed around consistency</h3>
              <p className="p-style-small">
                The interface aims to stay coherent across the product, so every
                page feels like part of one system rather than a collection of
                separate screens.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-muted/40 px-6 py-8">
          <h2 className="h2-style">Our direction</h2>
          <p className="p-style max-w-3xl">
            ChessConnect is growing into a place for thinkers, creators, and
            competitors who want meaningful interaction around chess. The long
            term focus is a smarter social experience with stronger content,
            cleaner workflows, and a more connected community.
          </p>
        </section>
      </div>
    </div>
  );
}
