import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSupabase } from "@/lib/supabase";

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
  requirements: string[];
  contactDetails: string;
  createdAt: string;
  type: string;
  posted: string;
  company: string;
  salary: string;
  location: string;
  contact: {
    phone: string;
    email: string;
  };
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'water' | 'electricity' | 'crime' | 'general';
  createdAt: string;
  icon: string;
  severity: 'high' | 'medium' | 'low';
  posted: string;
  time?: string;
  locations?: string[];
}

export interface News {
  id: string;
  title: string;
  content: string;
  image?: string;
  videoLink?: string;
  createdAt: string;
  featured?: boolean;
  category: string;
  author: string;
  date: string;
  summary: string;
}

interface AdminContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  
  // Community Updates
  updates: CommunityUpdate[];
  addUpdate: (update: Omit<CommunityUpdate, 'id' | 'createdAt'>) => Promise<void>;
  updateUpdate: (id: string, update: Partial<CommunityUpdate>) => Promise<void>;
  deleteUpdate: (id: string) => Promise<void>;
  
  // Jobs
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'createdAt'>) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  
  // Alerts
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'createdAt'>) => Promise<void>;
  updateAlert: (id: string, alert: Partial<Alert>) => Promise<void>;
  deleteAlert: (id: string) => Promise<void>;
  
  // News
  news: News[];
  addNews: (newsItem: Omit<News, 'id' | 'createdAt'>) => Promise<void>;
  updateNews: (id: string, newsItem: Partial<News>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
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

  const [updates, setUpdates] = useState<CommunityUpdate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = getSupabase();
        const [{ data: u }, { data: j }, { data: a }, { data: n }] = await Promise.all([
          supabase.from('community_updates').select('*').order('created_at', { ascending: false }),
          supabase.from('jobs').select('*').order('created_at', { ascending: false }),
          supabase.from('alerts').select('*').order('created_at', { ascending: false }),
          supabase.from('news').select('*').order('created_at', { ascending: false }),
        ]);
        setUpdates((u as any[] || []).map(mapUpdateFromDb));
        setJobs((j as any[] || []).map(mapJobFromDb));
        setAlerts((a as any[] || []).map(mapAlertFromDb));
        setNews((n as any[] || []).map(mapNewsFromDb));

        const { data: session } = await supabase.auth.getUser();
        setIsLoggedIn(!!session.user);
      } catch {
        // keep empty on failure, UI will still render
      }
    };
    load();
  }, []);

  // Auth
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return false;
      setIsLoggedIn(!!data.user);
      return !!data.user;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
    } finally {
      setIsLoggedIn(false);
    }
  };

  // Mappers between DB and UI shapes
  const mapUpdateFromDb = (row: any): CommunityUpdate => ({
    id: row.id?.toString() ?? generateId(),
    title: row.title,
    description: row.description,
    type: row.type,
    date: row.date,
    time: row.time,
    location: row.location,
    createdAt: row.created_at,
  });
  const mapJobFromDb = (row: any): Job => ({
    id: row.id?.toString() ?? generateId(),
    title: row.title,
    description: row.description,
    requirements: row.requirements ?? [],
    contactDetails: row.contact_details ?? '',
    createdAt: row.created_at,
    type: row.type,
    posted: row.posted,
    company: row.company,
    salary: row.salary,
    location: row.location,
    contact: row.contact ?? { phone: '', email: '' },
  });
  const mapAlertFromDb = (row: any): Alert => ({
    id: row.id?.toString() ?? generateId(),
    title: row.title,
    description: row.description,
    type: row.type,
    createdAt: row.created_at,
    icon: row.icon,
    severity: row.severity,
    posted: row.posted,
    time: row.time,
    locations: row.locations ?? [],
  });
  const mapNewsFromDb = (row: any): News => ({
    id: row.id?.toString() ?? generateId(),
    title: row.title,
    content: row.content,
    image: row.image,
    videoLink: row.video_link,
    createdAt: row.created_at,
    featured: row.featured,
    category: row.category,
    author: row.author,
    date: row.date,
    summary: row.summary,
  });

  // Updates CRUD
  const addUpdate = async (update: Omit<CommunityUpdate, 'id' | 'createdAt'>) => {
    const supabase = getSupabase();
    const payload = { ...update, created_at: new Date().toISOString() };
    const { data, error } = await supabase.from('community_updates').insert(payload).select().single();
    if (!error && data) setUpdates(prev => [mapUpdateFromDb(data), ...prev]);
  };
  const updateUpdate = async (id: string, updateData: Partial<CommunityUpdate>) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('community_updates').update(updateData).eq('id', id).select().single();
    if (!error && data) setUpdates(prev => prev.map(u => u.id === id ? mapUpdateFromDb(data) : u));
  };
  const deleteUpdate = async (id: string) => {
    const supabase = getSupabase();
    await supabase.from('community_updates').delete().eq('id', id);
    setUpdates(prev => prev.filter(u => u.id !== id));
  };

  // Jobs CRUD
  const addJob = async (job: Omit<Job, 'id' | 'createdAt'>) => {
    const supabase = getSupabase();
    const payload: any = { ...job, created_at: new Date().toISOString() };
    const { data, error } = await supabase.from('jobs').insert(payload).select().single();
    if (!error && data) setJobs(prev => [mapJobFromDb(data), ...prev]);
  };
  const updateJob = async (id: string, jobData: Partial<Job>) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('jobs').update(jobData).eq('id', id).select().single();
    if (!error && data) setJobs(prev => prev.map(j => j.id === id ? mapJobFromDb(data) : j));
  };
  const deleteJob = async (id: string) => {
    const supabase = getSupabase();
    await supabase.from('jobs').delete().eq('id', id);
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  // Alerts CRUD
  const addAlert = async (alert: Omit<Alert, 'id' | 'createdAt'>) => {
    const supabase = getSupabase();
    const payload = { ...alert, created_at: new Date().toISOString() };
    const { data, error } = await supabase.from('alerts').insert(payload).select().single();
    if (!error && data) setAlerts(prev => [mapAlertFromDb(data), ...prev]);
  };
  const updateAlert = async (id: string, alertData: Partial<Alert>) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('alerts').update(alertData).eq('id', id).select().single();
    if (!error && data) setAlerts(prev => prev.map(a => a.id === id ? mapAlertFromDb(data) : a));
  };
  const deleteAlert = async (id: string) => {
    const supabase = getSupabase();
    await supabase.from('alerts').delete().eq('id', id);
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  // News CRUD
  const addNews = async (newsItem: Omit<News, 'id' | 'createdAt'>) => {
    const supabase = getSupabase();
    const payload: any = { ...newsItem, created_at: new Date().toISOString() };
    const { data, error } = await supabase.from('news').insert(payload).select().single();
    if (!error && data) setNews(prev => [mapNewsFromDb(data), ...prev]);
  };
  const updateNews = async (id: string, newsData: Partial<News>) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('news').update(newsData).eq('id', id).select().single();
    if (!error && data) setNews(prev => prev.map(n => n.id === id ? mapNewsFromDb(data) : n));
  };
  const deleteNews = async (id: string) => {
    const supabase = getSupabase();
    await supabase.from('news').delete().eq('id', id);
    setNews(prev => prev.filter(n => n.id !== id));
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