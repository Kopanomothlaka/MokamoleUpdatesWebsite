import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const CommunityUpdates = () => {
  const { updates } = useAdmin();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "meeting":
        return "bg-primary text-primary-foreground";
      case "celebration":
        return "bg-success text-success-foreground";
      case "social":
        return "bg-warning text-warning-foreground";
      case "memorial":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section id="updates" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Community Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about upcoming meetings, celebrations, and community events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {updates.map((update) => (
            <Card 
              key={update.id} 
              className="hover:shadow-card transition-all duration-300 hover:scale-105 animate-fade-in border-l-4 border-l-primary"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(update.type)}>
                    {update.type}
                  </Badge>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {update.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {update.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(update.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{update.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{update.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityUpdates;