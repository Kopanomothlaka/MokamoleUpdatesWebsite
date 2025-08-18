import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Community News
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news and announcements from our community
            </p>
          </div>
        </div>
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default News;