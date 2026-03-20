import HeroSection from "@/components/landingPage/HeroSection";
import { Link } from "react-router";
import { Crown, Target, Users, Lightbulb } from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";

export default function Home() {
  return (
    <>
      <HeroSection />
       {/* Features Section */}
       <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12 text-foreground">Why Join ChessConnect?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Target}
              title="Analyze Games"
              description="Share your games and get feedback from the community. Learn from your mistakes and celebrate your victories."
            />
            <FeatureCard 
              icon={Users}
              title="Find Opponents"
              description="Connect with chess players of all skill levels. Follow your favorite players and build your network."
            />
            <FeatureCard 
              icon={Lightbulb}
              title="Share Insights"
              description="Discuss strategies, openings, and tactics. Learn from experienced players and contribute your knowledge."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12 text-foreground">How It Works</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="mb-2 text-foreground">Create Your Profile</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sign up and add your chess rating, favorite openings, and a bit about yourself.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="mb-2 text-foreground">Share Your Games</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Post analysis of your games, tactical puzzles, or chess insights to your feed.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="mb-2 text-foreground">Connect and Learn</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Follow other players, engage with their posts, and grow together as a community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}