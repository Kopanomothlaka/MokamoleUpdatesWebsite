import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdmin, Job } from '@/context/AdminContext';
import { Plus, Edit, Trash2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminJobs = () => {
  const { jobs, addJob, updateJob, deleteJob } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    contactDetails: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requirements: '',
      contactDetails: '',
    });
    setEditingJob(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingJob) {
      updateJob(editingJob.id, formData);
      toast({
        title: "Job Updated",
        description: "Job posting has been successfully updated.",
      });
    } else {
      addJob(formData);
      toast({
        title: "Job Added",
        description: "New job posting has been added.",
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      contactDetails: job.contactDetails,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteJob(id);
    toast({
      title: "Job Deleted",
      description: "Job posting has been deleted.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Postings</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>
                {editingJob ? 'Edit Job' : 'Add New Job'}
              </DialogTitle>
              <DialogDescription>
                {editingJob ? 'Modify the job posting details.' : 'Create a new job posting.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Job title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Job description"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Job requirements"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactDetails">Contact Details</Label>
                <Input
                  id="contactDetails"
                  value={formData.contactDetails}
                  onChange={(e) => setFormData({ ...formData, contactDetails: e.target.value })}
                  placeholder="Email or phone number"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingJob ? 'Update' : 'Add'} Job
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="mt-2">{job.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(job)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(job.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <p className="text-sm text-muted-foreground">{job.requirements}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Contact:</span>
                <span>{job.contactDetails}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminJobs;