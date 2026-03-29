import HeroImg from "../../../public/images/HeroImg.png";
import SignInBtn from "../buttons/signInBtn";
import SignUpBtn from "../buttons/signUpBtn";
import Logo from "../layout/Logo";

export default function HeroSection() {
  return (
    <section className="border-b border-border bg-background">
      <div
        className="mx-auto flex min-h-[27rem] max-w-6xl flex-col justify-center gap-6 rounded-2xl px-4 py-8 sm:px-6 sm:py-10 lg:min-h-[32rem] lg:flex-row lg:items-center lg:px-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.00) 85%), url(${HeroImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div className="flex min-w-0 flex-1 flex-col items-center text-center">
          <Logo />
          <h1 className="h1-style mt-4 max-w-3xl">
            Connect, analyze, and master chess together
          </h1>
          <p className="p-style max-w-2xl">
            <b>
              Join a thriving community of chess enthusiasts. Share your game
              analysis, learn from others, and connect with players around the
              world.
            </b>
          </p>
          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <SignUpBtn />
            <SignInBtn />
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 lg:block" aria-hidden />
      </div>
    </section>
  );
}
