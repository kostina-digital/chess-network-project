import HeroImg from "../../../public/images/HeroImg.png";
import SignInBtn from "../buttons/signInBtn";
import SignUpBtn from "../buttons/signUpBtn";
import Logo from "../layout/Logo";

export default function HeroSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="lg:hidden">
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HeroImg.src}
              alt=""
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>
          <div className="mt-5 flex flex-col items-center text-center">
            <Logo />
            <h1 className="h1-style mt-3 max-w-3xl">
              Connect, analyze, and master chess together
            </h1>
            <p className="p-style max-w-2xl">
              <b>
                Join a thriving community of chess enthusiasts. Share your game
                analysis, learn from others, and connect with players around the
                world.
              </b>
            </p>
            <div className="mt-5 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <SignUpBtn />
              <SignInBtn />
            </div>
          </div>
        </div>

        <div
          className="hidden min-h-[32rem] rounded-2xl lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-6"
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
      </div>
    </section>
  );
}
