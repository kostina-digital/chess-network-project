import Image from "next/image";
import HeroImg from "../../../public/images/HeroImg.jpeg";
import SignInBtn from "../buttons/signInBtn";
import SignUpBtn from "../buttons/signUpBtn";

export default function HeroSection() {
    return (
        <div className="flexitems-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="h1-style">Connect, Analyze, and Master Chess Together</h1>
                <h3>Join a thriving community of chess enthusiasts. Share your game analysis, learn from others, and connect with players around the world.</h3>
                <div className="flex items-center justify-center gap-6">
                    <SignInBtn />
                    <SignUpBtn />
                </div>
            </div>
            <Image src={HeroImg.src} alt="Hero Section" width={1000} height={1000} className="rounded-lg" />
        </div >
    );
}