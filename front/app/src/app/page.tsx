import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import BlogSection from "@/components/sections/BlogSection";
import PlatformSection from "@/components/sections/PlatformSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FormSection from "@/components/sections/FormSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC]">
      <Navbar />
      <HeroSection />
      <BlogSection />
      <PlatformSection />
      <FeaturesSection />
      <ReviewsSection />
      <FormSection/>
      <ContactSection />
    </main>
  );
}
