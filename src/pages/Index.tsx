import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import SupabaseTest from "@/components/SupabaseTest";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <SupabaseTest />
        </div>
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
