import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/FooterSection";
import Navbar from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import KeyFeaturesSection from "@/components/KeyFeaturesSection";
import LiveDataPreviewSection from "@/components/LiveDataPreviewSection";
import RoadmapSection from "@/components/RoadmapSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import VisionMissionSection from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <VisionMissionSection/>
      <KeyFeaturesSection/>
      <LiveDataPreviewSection/>
      <TokenomicsSection/>
      <RoadmapSection/>
      <CommunitySection/>
      <Footer/>
    </div>
  );
}
