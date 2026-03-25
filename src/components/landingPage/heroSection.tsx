import Image from "next/image";
import HeroImg from "../../../public/images/HeroImgGold.png";
import SignInBtn from "../buttons/signInBtn";
import SignUpBtn from "../buttons/signUpBtn";
import Logo from "../layout/Logo";

export default function HeroSection() {
    return (
        <section className="flex relative border-b border-border bg-gradient-to-b from-primary/5 to-background gap-6 mb-6 pb-6">
            <div className="flex flex-col items-center justify-center w-1/2 min-w-0">
                <Logo />
                <h1 className="h1-style">
                    Connect, analyze, and master chess together
                </h1>
                <p className="p-style text-center"> 
                    Join a thriving community of chess enthusiasts. Share your game
                    analysis, learn from others, and connect with players around the
                    world.
                </p>
                <ul className="mt-8 flex max-w-md flex-col gap-3 text-left text-sm text-muted-foreground">
                    <li className="flex gap-2">
                        <p>✓ Feed, profiles, and comments — members only (free account)</p>
                    </li>
                    <li className="flex gap-2">
                        <p>✓ Post analysis with images, follow players, join discussions</p>
                    </li>
                </ul>
                <div className="mt-8 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-center">
                    <SignUpBtn />
                    <SignInBtn />
                </div>
            </div>
            <div className="relative w-1/2 min-w-0 flex items-center justify-center m-0 p-0 overflow-hidden" >
                <Image
                    src={HeroImg}
                    alt="Chess players collaborating over a board"
                    className="h-auto w-full object-cover m-0 p-0"
                />
            </div>
        </section>
    );
}
