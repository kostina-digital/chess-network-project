import Link from "next/link";
import SignUpBtn from "../buttons/signUpBtn";

export function HomeCtaBand() {
  return (
    <section className="border-t border-border bg-gradient-to-b from-primary/5 to-background py-12 sm:py-14">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Ready to join the conversation?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Registration is free. Sign in to read the feed, publish posts, follow
          others, and comment — there is no guest access to community content.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3">
          <SignUpBtn />
          <Link
            href="/log-in?redirect=%2Fblog"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
