import Header from "@/components/Header";
import JobsSection from "@/components/JobsSection";
import Footer from "@/components/Footer";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <JobsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;