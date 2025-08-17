import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CommunityUpdate {
  id: string;
  title: string;
  description: string;
  type: 'meeting' | 'gathering' | 'funeral' | 'wedding' | 'party';
  date: string;
  time: string;
  location: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  contactDetails: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'water' | 'electricity' | 'crime' | 'general';
  createdAt: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  image?: string;
  videoLink?: string;
  createdAt: string;
}

interface AdminContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  // Community Updates
  updates: CommunityUpdate[];
  addUpdate: (update: Omit<CommunityUpdate, 'id' | 'createdAt'>) => void;
  updateUpdate: (id: string, update: Partial<CommunityUpdate>) => void;
  deleteUpdate: (id: string) => void;
  
  // Jobs
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'createdAt'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  
  // Alerts
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'createdAt'>) => void;
  updateAlert: (id: string, alert: Partial<Alert>) => void;
  deleteAlert: (id: string) => void;
  
  // News
  news: News[];
  addNews: (newsItem: Omit<News, 'id' | 'createdAt'>) => void;
  updateNews: (id: string, newsItem: Partial<News>) => void;
  deleteNews: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock data
  const [updates, setUpdates] = useState<CommunityUpdate[]>([
    {
      id: '1',
      title: 'Monthly Community Meeting',
      description: 'Discussing upcoming projects and community initiatives.',
      type: 'meeting',
      date: '2024-08-25',
      time: '18:00',
      location: 'Community Hall',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Community Garden Coordinator',
      description: 'Help manage our community garden project.',
      requirements: 'Experience with gardening, leadership skills',
      contactDetails: 'garden@community.com',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Water Supply Maintenance',
      description: 'Water will be turned off from 9 AM to 3 PM for maintenance.',
      type: 'water',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [news, setNews] = useState<News[]>([
    {
      id: '1',
      title: 'New Community Center Opening',
      content: 'We are excited to announce the opening of our new community center!',
      createdAt: new Date().toISOString(),
    },
  ]);

  const login = (username: string, password: string): boolean => {
    // Mock login - in real app this would be handled by backend
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  // Community Updates CRUD
  const addUpdate = (update: Omit<CommunityUpdate, 'id' | 'createdAt'>) => {
    const newUpdate: CommunityUpdate = {
      ...update,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setUpdates(prev => [newUpdate, ...prev]);
  };

  const updateUpdate = (id: string, updateData: Partial<CommunityUpdate>) => {
    setUpdates(prev => prev.map(item => 
      item.id === id ? { ...item, ...updateData } : item
    ));
  };

  const deleteUpdate = (id: string) => {
    setUpdates(prev => prev.filter(item => item.id !== id));
  };

  // Jobs CRUD
  const addJob = (job: Omit<Job, 'id' | 'createdAt'>) => {
    const newJob: Job = {
      ...job,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (id: string, jobData: Partial<Job>) => {
    setJobs(prev => prev.map(item => 
      item.id === id ? { ...item, ...jobData } : item
    ));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(item => item.id !== id));
  };

  // Alerts CRUD
  const addAlert = (alert: Omit<Alert, 'id' | 'createdAt'>) => {
    const newAlert: Alert = {
      ...alert,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const updateAlert = (id: string, alertData: Partial<Alert>) => {
    setAlerts(prev => prev.map(item => 
      item.id === id ? { ...item, ...alertData } : item
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(item => item.id !== id));
  };

  // News CRUD
  const addNews = (newsItem: Omit<News, 'id' | 'createdAt'>) => {
    const newNews: News = {
      ...newsItem,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setNews(prev => [newNews, ...prev]);
  };

  const updateNews = (id: string, newsData: Partial<News>) => {
    setNews(prev => prev.map(item => 
      item.id === id ? { ...item, ...newsData } : item
    ));
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(item => item.id !== id));
  };

  const value: AdminContextType = {
    isLoggedIn,
    login,
    logout,
    updates,
    addUpdate,
    updateUpdate,
    deleteUpdate,
    jobs,
    addJob,
    updateJob,
    deleteJob,
    alerts,
    addAlert,
    updateAlert,
    deleteAlert,
    news,
    addNews,
    updateNews,
    deleteNews,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};