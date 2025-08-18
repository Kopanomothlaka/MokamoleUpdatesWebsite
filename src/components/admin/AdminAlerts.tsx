import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAdmin, Alert } from '@/context/AdminContext';
import { Plus, Edit, Trash2, Droplets, Zap, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminAlerts = () => {
  const { alerts, addAlert, updateAlert, deleteAlert } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'general' as Alert['type'],
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'general',
    });
    setEditingAlert(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAlert) {
      updateAlert(editingAlert.id, formData);
      toast({
        title: "Alert Updated",
        description: "Alert has been successfully updated.",
      });
    } else {
      addAlert({
        ...formData,
        icon: 'AlertTriangle',
        severity: 'medium',
        posted: 'Just now'
      });
      toast({
        title: "Alert Added",
        description: "New alert has been posted.",
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (alert: Alert) => {
    setEditingAlert(alert);
    setFormData({
      title: alert.title,
      description: alert.description,
      type: alert.type,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteAlert(id);
    toast({
      title: "Alert Deleted",
      description: "Alert has been deleted.",
    });
  };

  const getTypeConfig = (type: Alert['type']) => {
    switch (type) {
      case 'water':
        return { color: 'bg-blue-500', icon: Droplets, label: 'Water' };
      case 'electricity':
        return { color: 'bg-yellow-500', icon: Zap, label: 'Electricity' };
      case 'crime':
        return { color: 'bg-red-500', icon: Shield, label: 'Crime Alert' };
      default:
        return { color: 'bg-gray-500', icon: AlertTriangle, label: 'General' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community Alerts</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>
                {editingAlert ? 'Edit Alert' : 'Add New Alert'}
              </DialogTitle>
              <DialogDescription>
                {editingAlert ? 'Modify the alert details.' : 'Create a new community alert.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Alert Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Alert title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Alert description"
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Alert Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as Alert['type'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="crime">Crime Alert</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAlert ? 'Update' : 'Add'} Alert
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => {
          const typeConfig = getTypeConfig(alert.type);
          const IconComponent = typeConfig.icon;
          
          return (
            <Card key={alert.id} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      {alert.title}
                      <Badge className={`${typeConfig.color} text-white`}>
                        {typeConfig.label}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{alert.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(alert)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(alert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Posted: {new Date(alert.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAlerts;