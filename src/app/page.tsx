import HeroSection from "@/components/landingPage/HeroSection";
import { HomeExploreCards } from "@/components/landingPage/HomeExploreCards";
import { HomeWhyStickAround } from "@/components/landingPage/HomeWhyStickAround";
import { HomeHowItWorks } from "@/components/landingPage/HomeHowItWorks";
import { HomeCtaBand } from "@/components/landingPage/HomeCtaBand";

export default function Home() {
  return (
    <>
      <HeroSection />

      <HomeExploreCards />

      <HomeWhyStickAround />

      <HomeHowItWorks />

      <HomeCtaBand />
    </>
  );
}
