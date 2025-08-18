import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Megaphone, Briefcase, AlertTriangle, Newspaper, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "News", href: "/", icon: Newspaper },
    { name: "Updates", href: "/updates", icon: Megaphone },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  ];

  const handleNavigation = (href: string) => {
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
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Link to="/admin/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2 ml-2">
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            </Link>
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
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center justify-start space-x-3 w-full px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;