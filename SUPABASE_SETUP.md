# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be set up

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key

## 3. Set Up Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Create Database Tables

Run these SQL commands in your Supabase SQL editor:

### Community Updates Table
```sql
CREATE TABLE community_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('meeting', 'celebration', 'social', 'memorial')),
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  contact_details TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract')),
  posted TEXT NOT NULL,
  company TEXT NOT NULL,
  salary TEXT NOT NULL,
  location TEXT NOT NULL,
  contact JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Alerts Table
```sql
CREATE TABLE alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  icon TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('high', 'medium', 'low')),
  posted TEXT NOT NULL,
  time TEXT NOT NULL,
  locations TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### News Table
```sql
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  video_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. Set Up Row Level Security (RLS)

Enable RLS and create policies for each table:

### Community Updates RLS
```sql
ALTER TABLE community_updates ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON community_updates
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON community_updates
  FOR ALL USING (auth.role() = 'authenticated');
```

### Jobs RLS
```sql
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON jobs
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON jobs
  FOR ALL USING (auth.role() = 'authenticated');
```

### Alerts RLS
```sql
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON alerts
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON alerts
  FOR ALL USING (auth.role() = 'authenticated');
```

### News RLS
```sql
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON news
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON news
  FOR ALL USING (auth.role() = 'authenticated');
```

## 6. Create Admin User

1. Go to Authentication > Users in your Supabase dashboard
2. Create a new user with admin privileges
3. Use this email/password for admin login

## 7. Insert Sample Data

You can insert sample data using the SQL editor:

```sql
-- Sample Community Updates
INSERT INTO community_updates (title, description, type, date, time, location) VALUES
('Monthly Community Meeting', 'Discussing upcoming projects and community initiatives.', 'meeting', '2024-08-25', '18:00', 'Community Hall'),
('Summer Festival', 'Annual community celebration with food, music, and activities.', 'celebration', '2024-07-15', '14:00', 'Central Park');

-- Sample Jobs
INSERT INTO jobs (title, description, requirements, contact_details, type, posted, company, salary, location, contact) VALUES
('Community Garden Coordinator', 'Help manage our community garden project and coordinate volunteer activities.', ARRAY['Experience with gardening', 'Leadership skills', 'Available weekends'], 'garden@community.com', 'Part-time', '2 days ago', 'Community Garden Initiative', '$15-20/hour', 'Community Garden, Main St', '{"phone": "+1 (555) 123-4567", "email": "garden@community.com"}');

-- Sample Alerts
INSERT INTO alerts (title, description, type, icon, severity, posted, time, locations) VALUES
('Water Supply Maintenance', 'Water will be turned off from 9 AM to 3 PM for maintenance.', 'water', 'Droplets', 'high', '1 hour ago', '9 AM - 3 PM', ARRAY['Main Street', 'Oak Avenue', 'Pine Road']);

-- Sample News
INSERT INTO news (title, summary, content, category, author, date, featured) VALUES
('New Playground Equipment Installed', 'The community playground has been upgraded with new equipment for children of all ages.', 'The new playground equipment includes modern climbing structures, swings, and interactive elements that promote physical activity and social interaction among children. The installation was completed ahead of schedule and is now open for use.', 'Infrastructure', 'Community Board', '2024-06-10', true);
```

## 8. Test the Connection

1. Start your development server: `npm run dev`
2. Check the browser console for any connection errors
3. Verify that data is loading from Supabase

## 9. Real-time Features

The app is set up to use React Query for data fetching with automatic caching and invalidation. Real-time subscriptions can be added later if needed.

## Troubleshooting

- Make sure your environment variables are correctly set
- Check that all tables are created with the correct structure
- Verify RLS policies are properly configured
- Ensure your Supabase project is active and not paused 