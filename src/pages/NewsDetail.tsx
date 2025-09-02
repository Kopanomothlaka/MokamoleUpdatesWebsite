import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSupabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Newspaper } from "lucide-react";

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

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setArticle(data as unknown as NewsArticle);
      } catch (err: any) {
        setError(err?.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
        Loading article...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-destructive">
              <Newspaper className="w-5 h-5" />
              <span className="font-semibold">Error</span>
            </div>
            <Link to="/news">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
              </Button>
            </Link>
          </div>
          <p>{error || 'Article not found'}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/news">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        {article.imageUrl && (
          <img src={article.imageUrl} alt={article.title} className="w-full max-h-[420px] object-cover" />
        )}
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">{article.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center"><User className="w-4 h-4 mr-1" />{article.author}</div>
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(article.date).toLocaleDateString()}</div>
          </div>
        </CardHeader>
        <CardContent className="prose prose-sm md:prose-base dark:prose-invert">
          <p className="text-muted-foreground mb-6">{article.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsDetail;