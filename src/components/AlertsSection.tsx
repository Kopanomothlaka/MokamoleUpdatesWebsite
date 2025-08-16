import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Droplets, Zap, Shield, Clock, MapPin } from "lucide-react";

const AlertsSection = () => {
  const alerts = [
    {
      id: 1,
      type: "Water",
      title: "Water Supply Maintenance",
      description: "Scheduled water maintenance will cause temporary supply interruption. Water trucks will be stationed at marked locations.",
      severity: "medium",
      locations: ["Corner of Main & Oak Street", "Community Center", "Park Entrance"],
      time: "Tomorrow 09:00 - 15:00",
      icon: Droplets,
      posted: "2 hours ago"
    },
    {
      id: 2,
      type: "Electricity",
      title: "Planned Power Outage",
      description: "Load shedding scheduled for maintenance of electrical infrastructure in Sectors A and B.",
      severity: "high",
      locations: ["Sector A", "Sector B", "Industrial Area"],
      time: "Tonight 22:00 - 06:00",
      icon: Zap,
      posted: "4 hours ago"
    },
    {
      id: 3,
      type: "Security",
      title: "Increased Security Patrols",
      description: "Enhanced security measures in effect following recent incidents. Please report any suspicious activities immediately.",
      severity: "high",
      locations: ["All residential areas", "Walking paths", "Parking areas"],
      time: "Effective immediately",
      icon: Shield,
      posted: "1 day ago"
    },
    {
      id: 4,
      type: "Water",
      title: "New Water Collection Points",
      description: "Additional water collection points have been established to improve access during maintenance periods.",
      severity: "low",
      locations: ["Sports Complex", "Shopping Center", "School Grounds"],
      time: "Permanent installation",
      icon: Droplets,
      posted: "3 days ago"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-alert text-alert-foreground animate-pulse-glow";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-l-alert shadow-alert";
      case "medium":
        return "border-l-warning";
      case "low":
        return "border-l-success";
      default:
        return "border-l-secondary";
    }
  };

  return (
    <section id="alerts" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-alert mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Community Alerts
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about important community notices and emergency updates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {alerts.map((alert) => {
            const IconComponent = alert.icon;
            return (
              <Card 
                key={alert.id} 
                className={`hover:shadow-card transition-all duration-300 hover:scale-105 animate-fade-in border-l-4 ${getSeverityBorder(alert.severity)}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.type}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {alert.posted}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                    <IconComponent className="w-5 h-5 mr-2 text-primary" />
                    {alert.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center text-sm font-medium text-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      Timeline: {alert.time}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-start text-sm font-medium text-foreground">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Affected Areas:</span>
                      </div>
                      <ul className="ml-6 space-y-1">
                        {alert.locations.map((location, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {location}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto bg-alert/10 border-alert">
            <CardContent className="pt-6">
              <AlertTriangle className="w-8 h-8 text-alert mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Emergency Contact</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For urgent community issues or emergencies
              </p>
              <p className="text-lg font-bold text-alert">071-234-5678</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AlertsSection;