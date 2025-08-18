import Header from "@/components/Header";
import AlertsSection from "@/components/AlertsSection";
import Footer from "@/components/Footer";

const Alerts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-foreground mb-8">
            Community Alerts
          </h1>
        </div>
        <AlertsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Alerts;