import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Megaphone, Briefcase, AlertTriangle, Newspaper } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Updates", href: "#updates", icon: Megaphone },
    { name: "Jobs", href: "#jobs", icon: Briefcase },
    { name: "Alerts", href: "#alerts", icon: AlertTriangle },
    { name: "News", href: "#news", icon: Newspaper },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CommunityHub</h1>
              <p className="text-sm text-muted-foreground">Staying Connected</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-accent"
                onClick={() => scrollToSection(item.href)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="flex items-center justify-start space-x-3 w-full hover:bg-accent"
                  onClick={() => scrollToSection(item.href)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;