import HeroSection from "@/components/HeroSection";
import KeyFeaturesSection from "@/components/KeyFeaturesSection";
import LiveDataPreviewSection from "@/components/LiveDataPreviewSection";
import VisionMissionSection from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <VisionMissionSection/>
      <KeyFeaturesSection/>
      <LiveDataPreviewSection/>
      <div className="h-screen"/>
    </div>
  );
}
