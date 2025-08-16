import { Button } from "@/components/ui/button";
import { ArrowDown, Users, Heart } from "lucide-react";

const Hero = () => {
  const scrollToUpdates = () => {
    const element = document.querySelector("#updates");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-community py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-warning rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-success rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Main Heading */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Users className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Welcome to Our
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <Heart className="w-12 h-12 text-alert animate-pulse-glow" />
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Stay connected with your neighbors. Get the latest updates, find job opportunities, 
            receive important alerts, and read community news all in one place.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
            <div className="bg-card/70 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </div>
            <div className="bg-card/70 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <div className="text-2xl font-bold text-success">24/7</div>
              <div className="text-sm text-muted-foreground">Alert System</div>
            </div>
            <div className="bg-card/70 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <div className="text-2xl font-bold text-warning">50+</div>
              <div className="text-sm text-muted-foreground">Jobs Posted</div>
            </div>
          </div>

          {/* Call to Action */}
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-soft font-semibold px-8 py-6 rounded-full text-lg"
            onClick={scrollToUpdates}
          >
            Explore Updates
            <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;