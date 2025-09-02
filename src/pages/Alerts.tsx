import Header from "@/components/Header";
import AlertsSection from "@/components/AlertsSection";
import Footer from "@/components/Footer";

const Alerts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <AlertsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Alerts;