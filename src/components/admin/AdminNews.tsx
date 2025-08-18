import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdmin, News } from '@/context/AdminContext';
import { Plus, Edit, Trash2, Image, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminNews = () => {
  const { news, addNews, updateNews, deleteNews } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    videoLink: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      image: '',
      videoLink: '',
    });
    setEditingNews(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newsData = {
      ...formData,
      image: formData.image || undefined,
      videoLink: formData.videoLink || undefined,
      category: 'General',
      author: 'Admin',
      date: 'Today',
      summary: formData.content.substring(0, 100) + '...'
    };
    
    if (editingNews) {
      updateNews(editingNews.id, newsData);
      toast({
        title: "News Updated",
        description: "News article has been successfully updated.",
      });
    } else {
      addNews(newsData);
      toast({
        title: "News Added",
        description: "New news article has been published.",
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      image: newsItem.image || '',
      videoLink: newsItem.videoLink || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteNews(id);
    toast({
      title: "News Deleted",
      description: "News article has been deleted.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community News</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? 'Edit News' : 'Add New News'}
              </DialogTitle>
              <DialogDescription>
                {editingNews ? 'Modify the news article details.' : 'Create a new news article.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">News Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="News title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="News content"
                  rows={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoLink">Video Link (optional)</Label>
                <Input
                  id="videoLink"
                  value={formData.videoLink}
                  onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingNews ? 'Update' : 'Add'} News
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {news.map((newsItem) => (
          <Card key={newsItem.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{newsItem.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {new Date(newsItem.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(newsItem)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(newsItem.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{newsItem.content}</p>
              
              {newsItem.image && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Image className="h-4 w-4" />
                  <span>Image attached</span>
                </div>
              )}
              
              {newsItem.videoLink && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Video className="h-4 w-4" />
                  <span>Video link attached</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminNews;