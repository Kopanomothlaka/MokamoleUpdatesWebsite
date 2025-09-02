import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default News;