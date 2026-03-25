import Image from "next/image";
import HeroImg from "../../../public/images/HeroImg.png";
import SignInBtn from "../buttons/signInBtn";
import SignUpBtn from "../buttons/signUpBtn";
import Logo from "../layout/Logo";

export default function HeroSection() {
    return (
        <section className="flex relative border-b border-border gap-6 m-6 p-6 min-h-[600px]" style={{ backgroundImage: `url(${HeroImg.src})`, backgroundSize: "cover", backgroundPosition: "center bottom" }}>
            <div className="flex flex-col items-center justify-start w-1/2 min-w-0">
                <Logo />
                <h1 className="h1-style text-center">
                    Connect, analyze, and master chess together
                </h1>
                <p className="p-style text-center"><b>
                    Join a thriving community of chess enthusiasts. Share your game
                    analysis, learn from others, and connect with players around the
                    world.
                    </b>
                </p>
                <div className="mt-8 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-center">
                    <SignUpBtn />
                    <SignInBtn />
                </div>
            </div>
            <div className="relative w-1/2 min-w-0 flex items-center justify-center" >
            </div>
        </section>
    );
}
