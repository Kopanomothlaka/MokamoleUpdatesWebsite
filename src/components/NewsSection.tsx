import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Calendar, User, ExternalLink, Play } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const NewsSection = () => {
  const { news } = useAdmin();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Infrastructure":
        return "bg-primary text-primary-foreground";
      case "Events":
        return "bg-warning text-warning-foreground";
      case "Environment":
        return "bg-success text-success-foreground";
      case "Sports":
        return "bg-alert text-alert-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const featuredNews = news.find(item => item.featured);
  const regularNews = news.filter(item => !item.featured);

  return (
    <section id="news" className="py-16 bg-gradient-community">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Community News
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest happenings in our community
          </p>
        </div>

        {/* Featured News */}
        {featuredNews && (
          <div className="mb-12">
            <Card className="hover:shadow-card transition-all duration-300 animate-fade-in border-l-4 border-l-primary overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto bg-muted flex items-center justify-center">
                  <div className="text-muted-foreground text-center">
                    <Newspaper className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Featured Image</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(featuredNews.category)}>
                      {featuredNews.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {featuredNews.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {featuredNews.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredNews.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredNews.date).toLocaleDateString()}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map((article) => (
            <Card 
              key={article.id} 
              className="hover:shadow-card transition-all duration-300 hover:scale-105 animate-fade-in overflow-hidden"
            >
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <Newspaper className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Article Image</p>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  {article.videoLink && (
                    <Button variant="ghost" size="sm" className="p-1">
                      <Play className="w-4 h-4 text-primary" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Read Full Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;