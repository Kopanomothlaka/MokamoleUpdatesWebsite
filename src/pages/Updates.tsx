import Header from "@/components/Header";
import CommunityUpdates from "@/components/CommunityUpdates";
import Footer from "@/components/Footer";

const Updates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <CommunityUpdates />
      </main>
      <Footer />
    </div>
  );
};

export default Updates;