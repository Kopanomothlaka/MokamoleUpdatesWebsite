import Header from "@/components/Header";
import CommunityUpdates from "@/components/CommunityUpdates";
import Footer from "@/components/Footer";

const Updates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-foreground mb-8">
            Community Updates
          </h1>
        </div>
        <CommunityUpdates />
      </main>
      <Footer />
    </div>
  );
};

export default Updates;