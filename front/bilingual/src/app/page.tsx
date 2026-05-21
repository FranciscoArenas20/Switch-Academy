import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import PlatformSection from "@/components/sections/PlatformSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ContactSection from "@/components/sections/ContactSection";
import FormSection from "@/components/sections/FormSection";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC]">
      <Navbar />
      <HeroSection />
      <PlatformSection />
      <FeaturesSection />
      <FormSection/>
      <ContactSection />
    </main>
  );
}
