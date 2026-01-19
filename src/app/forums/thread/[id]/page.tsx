import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Flag } from "lucide-react"

export default function ThreadPage() {
  const thread = {
    title: "Manchester City's Tactical Evolution Under Guardiola: A Deep Dive",
    author: "TacticsGuru",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    timeAgo: "2 hours ago",
    category: "Tactics & Analysis",
    views: 3421,
    replies: 127,
  }

  const posts = [
    {
      id: "1",
      author: "TacticsGuru",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "2 hours ago",
      content:
        "Let's discuss how Manchester City's tactical approach has evolved over the years under Pep Guardiola. From the inverted fullbacks to the false 9 system, City has consistently adapted and innovated.\n\nKey points I want to explore:\n1. The role of inverted fullbacks (Walker, Cancelo, now Stones)\n2. Midfield rotation and positioning\n3. Pressing triggers and defensive transitions\n4. Adaptation in big European matches\n\nWhat are your thoughts on how City's tactics have changed?",
      likes: 45,
      dislikes: 2,
    },
    {
      id: "2",
      author: "FootballNerd",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "1 hour ago",
      content:
        "Great thread! I think the most fascinating aspect is how Guardiola has adapted the fullback role. Using Stones as an inverted fullback was genius - it allowed City to dominate possession in midfield while maintaining defensive stability. The numerical superiority in the middle of the pitch has been crucial to their success.",
      likes: 28,
      dislikes: 1,
    },
    {
      id: "3",
      author: "PepDisciple",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "45 minutes ago",
      content:
        "Don't forget about the evolution of Haaland's integration into the system. Many thought a traditional striker wouldn't work in Pep's system, but they've adapted brilliantly. The team now has more direct threat while maintaining their possession dominance.",
      likes: 34,
      dislikes: 0,
    },
    {
      id: "4",
      author: "TacticalAnalyst",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "30 minutes ago",
      content:
        "What strikes me most is their pressing system. The coordinated pressing triggers and how quickly they transition from attack to counter-press is exceptional. When they lose the ball, within 5 seconds you see 4-5 players immediately pressing to win it back. This prevents counter-attacks and allows them to maintain territorial dominance.",
      likes: 41,
      dislikes: 3,
    },
  ]

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
          <Badge variant="secondary">{thread.category}</Badge>
        </div>

        {/* Thread Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={thread.authorAvatar || "/placeholder.svg"} />
                <AvatarFallback>{thread.author[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">{thread.author}</span>
            </div>
            <span>•</span>
            <span>{thread.timeAgo}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{thread.replies} replies</span>
            </div>
            <span>•</span>
            <span>{thread.views} views</span>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4 mb-8">
          {posts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
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
                      <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
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
          ))}
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
