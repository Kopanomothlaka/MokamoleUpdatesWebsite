import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Community Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">CommunityHub</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting neighbors, sharing information, and building a stronger community together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Quick Links
            </h4>
                        <ul className="space-y-2">
              {["Updates", "Jobs", "Alerts", "News"].map((link) => ( 
                <li key={link}>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                    onClick={() => {
                      const element = document.querySelector(`#${link.toLowerCase()}`);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {link}
                  </Button>
                </li>
              ))}
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => {
                    const element = document.querySelector("#app-download");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  App Download
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => navigate("/admin/login")}
                >
                  Admin Login
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">011-234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">info@community.org</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Community Drive<br />
                  Johannesburg, 2000
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Stay connected for the latest community updates and events.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © 2024 CommunityHub. Made with <Heart className="w-3 h-3 inline text-alert" /> for our community.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" className="text-xs text-muted-foreground hover:text-primary h-auto p-0">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="text-xs text-muted-foreground hover:text-primary h-auto p-0">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;