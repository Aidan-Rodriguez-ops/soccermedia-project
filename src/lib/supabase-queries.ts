/**
 * Supabase database queries for content management
 */

import { createClient } from "./supabase"

// Types
export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image_url: string | null
  author: string
  published_at: string
  read_time: string | null
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Video {
  id: string
  title: string
  description: string | null
  thumbnail_url: string
  video_url: string | null
  duration: string
  views: number
  category: string
  uploaded_at: string
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface TrendingTopic {
  id: string
  topic: string
  description: string
  mentions: number
  category: string
  created_at: string
  updated_at: string
}

export interface ForumCategory {
  id: string
  title: string
  description: string
  slug: string
  icon: string | null
  display_order: number
  thread_count?: number
  post_count?: number
  created_at: string
  updated_at: string
}

export interface ForumThread {
  id: string
  category_id: string
  title: string
  author: string
  author_avatar: string | null
  views: number
  is_pinned: boolean
  is_hot: boolean
  reply_count?: number
  created_at: string
  updated_at: string
}

export interface ForumPost {
  id: string
  thread_id: string
  author: string
  author_avatar: string | null
  content: string
  likes: number
  dislikes: number
  created_at: string
  updated_at: string
}

// Articles
export async function getArticles(limit: number = 10): Promise<Article[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching articles:", error)
    return []
  }

  return data || []
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching featured article:", error)
    return null
  }

  return data
}

export async function getArticlesByCategory(category: string, limit: number = 10): Promise<Article[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching articles by category:", error)
    return []
  }

  return data || []
}

// Videos
export async function getVideos(limit: number = 10): Promise<Video[]> {
  const supabase = createClient()
  const { data, error} = await supabase
    .from("videos")
    .select("*")
    .order("uploaded_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching videos:", error)
    return []
  }

  return data || []
}

export async function getFeaturedVideo(): Promise<Video | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("is_featured", true)
    .order("uploaded_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching featured video:", error)
    return null
  }

  return data
}

// Trending Topics
export async function getTrendingTopics(limit: number = 10): Promise<TrendingTopic[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("trending_topics")
    .select("*")
    .order("mentions", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching trending topics:", error)
    return []
  }

  return data || []
}

// Forum Categories
export async function getForumCategories(): Promise<ForumCategory[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("forum_categories_with_counts")
    .select("*")
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching forum categories:", error)
    return []
  }

  return data || []
}

// Forum Threads
export async function getForumThreads(categoryId?: string, limit: number = 10): Promise<ForumThread[]> {
  const supabase = createClient()
  let query = supabase
    .from("forum_threads_with_replies")
    .select("*")

  if (categoryId) {
    query = query.eq("category_id", categoryId)
  }

  const { data, error } = await query
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching forum threads:", error)
    return []
  }

  return data || []
}

export async function getHotThreads(limit: number = 5): Promise<ForumThread[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("forum_threads_with_replies")
    .select("*")
    .eq("is_hot", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching hot threads:", error)
    return []
  }

  return data || []
}

// Forum Posts
export async function getForumPosts(threadId: string): Promise<ForumPost[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("forum_posts")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching forum posts:", error)
    return []
  }

  return data || []
}

export async function getThreadById(threadId: string): Promise<ForumThread | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("forum_threads_with_replies")
    .select("*")
    .eq("id", threadId)
    .single()

  if (error) {
    console.error("Error fetching thread:", error)
    return null
  }

  return data
}

// Increment views for a thread
export async function incrementThreadViews(threadId: string): Promise<void> {
  const supabase = createClient()
  await supabase.rpc("increment_thread_views", { thread_id: threadId })
}

// Increment views for a video
export async function incrementVideoViews(videoId: string): Promise<void> {
  const supabase = createClient()
  const { data: video } = await supabase
    .from("videos")
    .select("views")
    .eq("id", videoId)
    .single()

  if (video) {
    await supabase
      .from("videos")
      .update({ views: (video.views || 0) + 1 })
      .eq("id", videoId)
  }
}
