import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ForumCategory } from "@/components/forum-category"
import { ForumThread } from "@/components/forum-thread"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  TrendingUp,
  Clock,
  MessageSquare,
  Briefcase,
  BarChart3,
  Star,
  Trophy,
  MessagesSquare,
} from "lucide-react"
import { getForumCategories, getForumThreads, getHotThreads } from "@/lib/supabase-queries"

const iconMap: Record<string, any> = {
  MessageSquare,
  Briefcase,
  BarChart3,
  Star,
  Trophy,
  MessagesSquare,
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) return "Just now"
  if (diffHours < 24) return `${diffHours} hours ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return "1 day ago"
  if (diffDays < 7) return `${diffDays} days ago`
  const diffWeeks = Math.floor(diffDays / 7)
  if (diffWeeks === 1) return "1 week ago"
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`
  return `${Math.floor(diffWeeks / 4)} months ago`
}

export default async function ForumsPage() {
  const categories = await getForumCategories()
  const hotThreads = await getHotThreads(5)
  const recentThreads = await getForumThreads(undefined, 10)

  // Calculate totals from categories
  const totalThreads = categories.reduce((sum, cat) => sum + (cat.thread_count || 0), 0)
  const totalPosts = categories.reduce((sum, cat) => sum + (cat.post_count || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Community Forums</h1>
            <p className="text-muted-foreground">Join the discussion with fellow football fans around the world</p>
          </div>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            New Thread
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search discussions..." className="pl-10" />
        </div>

        {/* Forum Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalThreads.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Threads</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPosts.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Posts</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{hotThreads.length}</p>
                <p className="text-sm text-muted-foreground">Hot Threads</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Forum Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <ForumCategory
                  key={category.slug}
                  title={category.title}
                  description={category.description}
                  threads={category.thread_count || 0}
                  posts={category.post_count || 0}
                  icon={iconMap[category.icon || 'MessageSquare'] || MessageSquare}
                  slug={category.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No forum categories yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Recent Discussions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Discussions</h2>
          <Tabs defaultValue="hot" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="hot">
                <TrendingUp className="h-4 w-4 mr-2" />
                Hot
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </TabsTrigger>
            </TabsList>
            <TabsContent value="hot" className="space-y-3">
              {hotThreads.length > 0 ? (
                hotThreads.map((thread) => (
                  <ForumThread
                    key={thread.id}
                    id={thread.id}
                    title={thread.title}
                    author={thread.author}
                    authorAvatar={thread.author_avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"}
                    replies={thread.reply_count || 0}
                    views={thread.views}
                    timeAgo={formatTimeAgo(thread.created_at)}
                    isPinned={thread.is_pinned}
                    isHot={thread.is_hot}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hot threads yet. Be the first to start a discussion!</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="recent" className="space-y-3">
              {recentThreads.length > 0 ? (
                recentThreads.map((thread) => (
                  <ForumThread
                    key={thread.id}
                    id={thread.id}
                    title={thread.title}
                    author={thread.author}
                    authorAvatar={thread.author_avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"}
                    replies={thread.reply_count || 0}
                    views={thread.views}
                    timeAgo={formatTimeAgo(thread.created_at)}
                    isPinned={thread.is_pinned}
                    isHot={thread.is_hot}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No threads yet. Be the first to start a discussion!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
