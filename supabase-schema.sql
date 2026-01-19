-- High Press Media Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  read_time TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT,
  duration TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trending Topics Table
CREATE TABLE IF NOT EXISTS trending_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic TEXT NOT NULL,
  description TEXT NOT NULL,
  mentions INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum Categories Table
CREATE TABLE IF NOT EXISTS forum_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum Threads Table
CREATE TABLE IF NOT EXISTS forum_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  author_avatar TEXT,
  views INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_hot BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum Posts Table
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_uploaded_at ON videos(uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_featured ON videos(is_featured);
CREATE INDEX IF NOT EXISTS idx_forum_threads_category ON forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_created ON forum_threads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_thread ON forum_posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created ON forum_posts(created_at DESC);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Allow public read access" ON articles FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON videos FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON trending_topics FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON forum_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON forum_threads FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON forum_posts FOR SELECT USING (true);

-- Admin write access (authenticated users only)
-- Note: You'll need to add additional checks for admin role
CREATE POLICY "Allow authenticated insert" ON articles FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update" ON articles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON articles FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON videos FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update" ON videos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON videos FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON trending_topics FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update" ON trending_topics FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON trending_topics FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON forum_categories FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update" ON forum_categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON forum_categories FOR DELETE TO authenticated USING (true);

-- Anyone can create threads and posts (you may want to restrict this later)
CREATE POLICY "Allow anyone to create threads" ON forum_threads FOR INSERT USING (true);
CREATE POLICY "Allow authenticated update" ON forum_threads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON forum_threads FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow anyone to create posts" ON forum_posts FOR INSERT USING (true);
CREATE POLICY "Allow authenticated update" ON forum_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON forum_posts FOR DELETE TO authenticated USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trending_topics_updated_at BEFORE UPDATE ON trending_topics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_categories_updated_at BEFORE UPDATE ON forum_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_threads_updated_at BEFORE UPDATE ON forum_threads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Views for common queries
-- View to get forum categories with thread and post counts
CREATE OR REPLACE VIEW forum_categories_with_counts AS
SELECT
  c.id,
  c.title,
  c.description,
  c.slug,
  c.icon,
  c.display_order,
  COUNT(DISTINCT t.id) as thread_count,
  COUNT(DISTINCT p.id) as post_count,
  c.created_at,
  c.updated_at
FROM forum_categories c
LEFT JOIN forum_threads t ON c.id = t.category_id
LEFT JOIN forum_posts p ON t.id = p.thread_id
GROUP BY c.id;

-- View to get threads with reply count
CREATE OR REPLACE VIEW forum_threads_with_replies AS
SELECT
  t.*,
  COUNT(p.id) as reply_count
FROM forum_threads t
LEFT JOIN forum_posts p ON t.id = p.thread_id
GROUP BY t.id;
