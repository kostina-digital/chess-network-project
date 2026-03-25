const steps = [
  {
    step: "1",
    title: "Create your profile",
    body: "Sign up with email, pick a username, and add rating, openings, or a short bio so others know you.",
  },
  {
    step: "2",
    title: "Share your chess",
    body: "Publish posts with text and up to three images — game notes, puzzles, or lessons for the feed.",
  },
  {
    step: "3",
    title: "Follow & engage",
    body: "Follow players you like, like posts, and join comment threads as the community grows.",
  },
] as const;

export function HomeHowItWorks() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three simple steps from signup to being part of the conversation.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(({ step, title, body }) => (
            <div
              key={step}
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {step}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
