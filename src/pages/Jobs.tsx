import Header from "@/components/Header";
import JobsSection from "@/components/JobsSection";
import Footer from "@/components/Footer";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-foreground mb-8">
            Job Opportunities
          </h1>
        </div>
        <JobsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;