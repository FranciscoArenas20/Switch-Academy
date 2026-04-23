import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import PlatformSection from "@/components/sections/PlatformSection";
import FeaturesSection from "@/components/sections/FeaturesSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC]">
      <Navbar />
      <HeroSection />
      {/* <PlatformSection />
      <FeaturesSection /> */}
    </main>
  );
}
