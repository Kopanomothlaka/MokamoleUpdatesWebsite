import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CommunityUpdates from "@/components/CommunityUpdates";
import JobsSection from "@/components/JobsSection";
import AlertsSection from "@/components/AlertsSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CommunityUpdates />
        <JobsSection />
        <AlertsSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
