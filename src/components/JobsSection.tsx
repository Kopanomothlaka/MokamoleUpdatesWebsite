import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Clock, Phone, Mail } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const JobsSection = () => {
  const { jobs } = useAdmin();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-success text-success-foreground";
      case "Part-time":
        return "bg-warning text-warning-foreground";
      case "Contract":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section id="jobs" className="py-16 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Job Opportunities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find employment opportunities within our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className="hover:shadow-card transition-all duration-300 hover:scale-105 animate-fade-in bg-card"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getTypeColor(job.type)}>
                    {job.type}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.posted}
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-primary" />
                  {job.title}
                </CardTitle>
                <p className="text-muted-foreground font-medium">{job.company}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {job.description}
                </p>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-foreground mb-2">Contact Information:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-muted-foreground">{job.contact.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-muted-foreground">{job.contact.email}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-gradient-primary hover:opacity-90" size="sm">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsSection;