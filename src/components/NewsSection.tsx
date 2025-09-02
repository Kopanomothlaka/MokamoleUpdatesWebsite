import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Calendar, User, ExternalLink, Play, AlertCircle } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  featured: boolean;
  videoLink?: string;
  imageUrl?: string;
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const supabase = getSupabase();
        const { data, error: supabaseError } = await supabase
          .from('news')
          .select('*')
          .order('date', { ascending: false });

        if (supabaseError) throw supabaseError;
        setNews((data as unknown as NewsArticle[]) || []);
      } catch (err: any) {
        if (err?.message && /relation .* does not exist/i.test(err.message)) {
          setError("Table 'news' not found. Run the SQL in SUPABASE_SETUP.md to create tables.");
        } else if (err?.message && /permission denied|rls/i.test(err.message)) {
          setError("RLS is blocking reads. Add a public SELECT policy for 'news' as per SUPABASE_SETUP.md.");
        } else if (err?.message) {
          setError(err.message);
        } else {
          setError("Failed to fetch news");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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

  if (loading) return (
    <section id="news" className="py-16 bg-gradient-community">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-muted-foreground">
            <Newspaper className="w-12 h-12 mx-auto mb-4" />
            <p>Loading news...</p>
          </div>
        </div>
      </div>
    </section>
  );
  
  if (error) return (
    <section id="news" className="py-16 bg-gradient-community">
      <div className="container mx-auto px-4">
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            <h3 className="text-lg font-semibold">Error loading news</h3>
          </div>
          <p>{error}</p>
        </div>
      </div>
    </section>
  );

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
                  {featuredNews.imageUrl ? (
                    <img 
                      src={featuredNews.imageUrl} 
                      alt={featuredNews.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground text-center">
                      <Newspaper className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Featured Image</p>
                    </div>
                  )}
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
                    <a href={`/news/${featuredNews.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        Read More
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </a>
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
                {article.imageUrl ? (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground text-center">
                    <Newspaper className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Article Image</p>
                  </div>
                )}
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
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={`/news/${article.id}`}>Read Full Article</a>
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