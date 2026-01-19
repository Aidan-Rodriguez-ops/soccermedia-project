# Supabase Setup & Content Management Guide

## Step 1: Set Up Supabase Database

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Run the Database Schema**
   - Open your Supabase project dashboard
   - Go to the SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the script to create all tables, indexes, and RLS policies

3. **Update Environment Variables**
   - Open `.env.local`
   - Update:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
     ```

## Step 2: Understanding the Database Structure

### Tables Created

1. **articles** - News articles and stories
   - id, title, excerpt, content, category, image_url, author, published_at, read_time, is_featured

2. **videos** - Video content
   - id, title, description, thumbnail_url, video_url, duration, views, category, uploaded_at, is_featured

3. **trending_topics** - Trending social topics
   - id, topic, description, mentions, category

4. **forum_categories** - Forum sections
   - id, title, description, slug, icon, display_order

5. **forum_threads** - Discussion threads
   - id, category_id, title, author, author_avatar, views, is_pinned, is_hot

6. **forum_posts** - Thread replies
   - id, thread_id, author, author_avatar, content, likes, dislikes

### Security

- **Row Level Security (RLS)** is enabled on all tables
- Public read access for all content
- Authenticated users can create/update/delete content
- You may want to add additional admin-only policies later

## Step 3: Adding Sample Content

Once your database is set up, you can add sample content through the Supabase dashboard or via the admin interface (to be built).

### Sample Article Insert (via Supabase SQL Editor)

```sql
INSERT INTO articles (title, excerpt, content, category, image_url, author, read_time, is_featured)
VALUES (
  'Manchester City Wins Premier League',
  'City secures their fourth consecutive title with a dominant performance',
  'Full article content here...',
  'Premier League',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop',
  'John Doe',
  '5 min read',
  true
);
```

### Sample Video Insert

```sql
INSERT INTO videos (title, description, thumbnail_url, duration, category, is_featured)
VALUES (
  'Best Goals of the Week',
  'Watch the top 10 goals from this week''s matches',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
  '10:30',
  'Goals',
  true
);
```

### Sample Forum Category Insert

```sql
INSERT INTO forum_categories (title, description, slug, display_order)
VALUES
  ('Match Discussion', 'Discuss live and recent matches', 'match-discussion', 1),
  ('Transfer Talk', 'Latest transfer news and rumors', 'transfer-talk', 2),
  ('Tactics & Analysis', 'In-depth tactical discussions', 'tactics-analysis', 3);
```

## Step 4: Pages Updated

The following pages have been updated to use Supabase:

### ✅ Home Page (`/`)
- Now fetches top 3 articles from Supabase
- Falls back to empty state if no articles exist
- Still uses API-Football for live matches

### 🔄 To Be Updated

You'll need to update these pages similarly:

1. **News Page** (`/src/app/news/page.tsx`)
   - Replace `featuredArticle` with `await getFeaturedArticle()`
   - Replace `newsArticles` with `await getArticles(6)`

2. **Trending Page** (`/src/app/trending/page.tsx`)
   - Replace `featuredVideo` with `await getFeaturedVideo()`
   - Replace `videos` with `await getVideos(6)`
   - Replace `trendingTopics` with `await getTrendingTopics(5)`

3. **Forums Page** (`/src/app/forums/page.tsx`)
   - Replace `forumCategories` with `await getForumCategories()`
   - Replace `hotThreads` with `await getHotThreads(5)`
   - Replace `recentThreads` with `await getForumThreads()`

4. **Forum Thread Page** (`/src/app/forums/thread/[id]/page.tsx`)
   - Replace thread info with `await getThreadById(params.id)`
   - Replace posts with `await getForumPosts(params.id)`

## Step 5: Admin Content Management (Next Step)

Once the database is populated, you'll be able to:

1. Create articles through the admin dashboard
2. Upload and manage videos
3. Manage trending topics
4. Moderate forum content

The admin interface will be built in the next phase.

## Available Query Functions

All these functions are available in `/src/lib/supabase-queries.ts`:

### Articles
- `getArticles(limit)` - Get latest articles
- `getFeaturedArticle()` - Get featured article
- `getArticlesByCategory(category, limit)` - Get articles by category

### Videos
- `getVideos(limit)` - Get latest videos
- `getFeaturedVideo()` - Get featured video

### Trending
- `getTrendingTopics(limit)` - Get trending topics

### Forums
- `getForumCategories()` - Get all categories with counts
- `getForumThreads(categoryId, limit)` - Get threads
- `getHotThreads(limit)` - Get hot threads
- `getThreadById(threadId)` - Get single thread
- `getForumPosts(threadId)` - Get thread posts

## Troubleshooting

### "No data showing"
- Make sure you've run the schema SQL in Supabase
- Check that you've added sample content
- Verify environment variables are set correctly
- Check browser console for errors

### "Permission denied"
- Check RLS policies in Supabase dashboard
- Ensure public read access is enabled
- For admin features, make sure user is authenticated

### "Type errors"
- The types are defined in `/src/lib/supabase-queries.ts`
- Make sure to import the types when needed

## Next Steps

1. Run the schema in Supabase
2. Add sample content via SQL or manually in the dashboard
3. Test that content shows up on the pages
4. Build the admin content management interface
