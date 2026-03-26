import { redirect } from "next/navigation";
import HeroSection from "@/components/landingPage/HeroSection";
import { HomeExploreCards } from "@/components/landingPage/HomeExploreCards";
import { HomeWhyStickAround } from "@/components/landingPage/HomeWhyStickAround";
import { HomeHowItWorks } from "@/components/landingPage/HomeHowItWorks";
import { HomeCtaBand } from "@/components/landingPage/HomeCtaBand";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

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
