import HeroSection from "./components/HeroSection";
import QuickDemo from "./components/QuickDemo";
import PipelineSection from "./components/PipelineSection";
import { FeaturesGrid, SDKCarousel, BenchmarksSection, CTASection } from "./components/HomeSections";
import UseCasesPreview from "./components/UseCasesPreview";
import CommunitySection from "./components/CommunitySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickDemo />
      <PipelineSection />
      <FeaturesGrid />
      <BenchmarksSection />
      <SDKCarousel />
      <UseCasesPreview />
      <CommunitySection />
      <CTASection />
    </>
  );
}
