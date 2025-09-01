import HeroSection from "@/components/HeroSection";
import KeyFeaturesSection from "@/components/KeyFeaturesSection";
import VisionMissionSection from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <VisionMissionSection/>
      <KeyFeaturesSection/>
      <div className="h-screen"/>
    </div>
  );
}
