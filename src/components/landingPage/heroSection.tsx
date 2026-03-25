import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import HeroImg from "../../../public/images/HeroImg.jpeg";
import SignInBtn from "../buttons/signInBtn";
import SignUpBtn from "../buttons/signUpBtn";

export default function HeroSection() {
  return (
    <section className="relative border-b border-border bg-gradient-to-b from-primary/5 to-background">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-6 flex items-center gap-2">
              <Crown className="h-9 w-9 text-primary sm:h-10 sm:w-10" aria-hidden />
              <span className="text-xl font-semibold text-foreground sm:text-2xl">
                ChessConnect
              </span>
            </div>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              Connect, analyze, and master chess together
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Join a thriving community of chess enthusiasts. Share your game
              analysis, learn from others, and connect with players around the
              world.
            </p>
            <ul className="mt-8 flex max-w-md flex-col gap-3 text-left text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary" aria-hidden>
                  ✓
                </span>
                Feed, profiles, and comments — members only (free account)
              </li>
              <li className="flex gap-2">
                <span className="text-primary" aria-hidden>
                  ✓
                </span>
                Post analysis with images, follow players, join discussions
              </li>
            </ul>
            <div className="mt-8 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
              <SignUpBtn />
              <SignInBtn />
              <Link
                href="/login?redirect=%2Fblog"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Open the feed
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border shadow-2xl">
              <Image
                src={HeroImg}
                alt="Chess players collaborating over a board"
                width={640}
                height={520}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
