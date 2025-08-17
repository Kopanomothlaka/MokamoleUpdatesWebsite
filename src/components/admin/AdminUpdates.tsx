import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAdmin, CommunityUpdate } from '@/context/AdminContext';
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminUpdates = () => {
  const { updates, addUpdate, updateUpdate, deleteUpdate } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<CommunityUpdate | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'meeting' as CommunityUpdate['type'],
    date: '',
    time: '',
    location: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'meeting',
      date: '',
      time: '',
      location: '',
    });
    setEditingUpdate(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUpdate) {
      updateUpdate(editingUpdate.id, formData);
      toast({
        title: "Update Modified",
        description: "Community update has been successfully modified.",
      });
    } else {
      addUpdate(formData);
      toast({
        title: "Update Added",
        description: "New community update has been added.",
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (update: CommunityUpdate) => {
    setEditingUpdate(update);
    setFormData({
      title: update.title,
      description: update.description,
      type: update.type,
      date: update.date,
      time: update.time,
      location: update.location,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteUpdate(id);
    toast({
      title: "Update Deleted",
      description: "Community update has been deleted.",
    });
  };

  const getTypeColor = (type: CommunityUpdate['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'gathering': return 'bg-green-500';
      case 'funeral': return 'bg-gray-500';
      case 'wedding': return 'bg-pink-500';
      case 'party': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community Updates</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Update
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>
                {editingUpdate ? 'Edit Update' : 'Add New Update'}
              </DialogTitle>
              <DialogDescription>
                {editingUpdate ? 'Modify the community update details.' : 'Create a new community update.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Update title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Update description"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as CommunityUpdate['type'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="gathering">Gathering</SelectItem>
                    <SelectItem value="funeral">Funeral</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="party">Party</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Event location"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingUpdate ? 'Update' : 'Add'} Update
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {updates.map((update) => (
          <Card key={update.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2">
                    {update.title}
                    <Badge className={`${getTypeColor(update.type)} text-white`}>
                      {update.type}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{update.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(update)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(update.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {update.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {update.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {update.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUpdates;