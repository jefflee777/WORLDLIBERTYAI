import CommunitySection from "@/components/CommunitySection";
import HeroSection from "@/components/HeroSection";
import KeyFeaturesSection from "@/components/KeyFeaturesSection";
import LiveDataPreviewSection from "@/components/LiveDataPreviewSection";
import RoadmapSection from "@/components/RoadmapSection";
import VisionMissionSection from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <VisionMissionSection/>
      <KeyFeaturesSection/>
      <LiveDataPreviewSection/>
      {/* here token section added */}
      <RoadmapSection/>
      <CommunitySection/>
      <div className="h-screen"/>
    </div>
  );
}
