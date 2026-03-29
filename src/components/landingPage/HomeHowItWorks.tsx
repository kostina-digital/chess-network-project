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
    <section className="bg-muted/30 py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="h2-style">
            How it works
          </h2>
          <p className="p-style-small">
            Three simple steps from signup to being part of the conversation.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map(({ step, title, body }) => (
            <article
              key={step}
              className="relative flex flex-col gap-2 rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="h3-style m-0">
                {step}. <b>{title}</b>
              </h3>
              <p className="p-style-small">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
