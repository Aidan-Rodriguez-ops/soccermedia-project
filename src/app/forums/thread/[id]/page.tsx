import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Flag } from "lucide-react"
import { getThreadById, getForumPosts, incrementThreadViews } from "@/lib/supabase-queries"
import { notFound } from "next/navigation"

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

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const thread = await getThreadById(params.id)
  const posts = await getForumPosts(params.id)

  if (!thread) {
    notFound()
  }

  // Increment view count
  await incrementThreadViews(params.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/forums" className="hover:text-primary">
            Forums
          </a>
          <span>/</span>
          <span>Thread</span>
        </div>

        {/* Thread Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={thread.author_avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"} />
                <AvatarFallback>{thread.author[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">{thread.author}</span>
            </div>
            <span>•</span>
            <span>{formatTimeAgo(thread.created_at)}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{thread.reply_count || 0} replies</span>
            </div>
            <span>•</span>
            <span>{thread.views} views</span>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4 mb-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={post.author_avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">{post.likes}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{post.author}</span>
                        <span className="text-sm text-muted-foreground">{formatTimeAgo(post.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-line text-foreground">{post.content}</div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No replies yet. Be the first to reply!</p>
            </div>
          )}
        </div>

        {/* Reply Box */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Reply to this thread</h3>
          <Textarea placeholder="Share your thoughts..." className="mb-4 min-h-32" />
          <div className="flex justify-end">
            <Button>Post Reply</Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
