import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, Briefcase, AlertTriangle, Newspaper } from 'lucide-react';
import AdminUpdates from '@/components/admin/AdminUpdates';
import AdminJobs from '@/components/admin/AdminJobs';
import AdminAlerts from '@/components/admin/AdminAlerts';
import AdminNews from '@/components/admin/AdminNews';

const AdminDashboard = () => {
  const { isLoggedIn, logout, updates, jobs, alerts, news } = useAdmin();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your community content</p>
          </div>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Updates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{updates.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">News</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{news.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="updates" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="updates">Community Updates</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          
          <TabsContent value="updates">
            <AdminUpdates />
          </TabsContent>
          
          <TabsContent value="jobs">
            <AdminJobs />
          </TabsContent>
          
          <TabsContent value="alerts">
            <AdminAlerts />
          </TabsContent>
          
          <TabsContent value="news">
            <AdminNews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;