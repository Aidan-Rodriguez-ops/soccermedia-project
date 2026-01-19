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

export default function ForumsPage() {
  const categories = [
    {
      title: "Match Discussion",
      description: "Discuss live matches, post-match analysis, and game predictions",
      threads: 1254,
      posts: 8932,
      icon: MessageSquare,
      slug: "match-discussion",
    },
    {
      title: "Transfer Talk",
      description: "Latest transfer news, rumors, and speculation",
      threads: 892,
      posts: 5621,
      icon: Briefcase,
      slug: "transfer-talk",
    },
    {
      title: "Tactics & Analysis",
      description: "In-depth tactical discussions and statistical analysis",
      threads: 634,
      posts: 4103,
      icon: BarChart3,
      slug: "tactics-analysis",
    },
    {
      title: "Player Performance",
      description: "Discuss player form, ratings, and standout performances",
      threads: 743,
      posts: 3892,
      icon: Star,
      slug: "player-performance",
    },
    {
      title: "Fantasy Football",
      description: "Fantasy league tips, team selection, and strategy",
      threads: 521,
      posts: 2764,
      icon: Trophy,
      slug: "fantasy-football",
    },
    {
      title: "General Discussion",
      description: "Everything else football - history, culture, and more",
      threads: 1089,
      posts: 6754,
      icon: MessagesSquare,
      slug: "general",
    },
  ]

  const hotThreads = [
    {
      id: "1",
      title: "Manchester City's Tactical Evolution Under Guardiola: A Deep Dive",
      author: "TacticsGuru",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 127,
      views: 3421,
      timeAgo: "2 hours ago",
      isHot: true,
      category: "Tactics & Analysis",
    },
    {
      id: "2",
      title: "BREAKING: Real Madrid Close to Signing World-Class Striker",
      author: "TransferInsider",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 243,
      views: 8932,
      timeAgo: "4 hours ago",
      isPinned: true,
      isHot: true,
      category: "Transfer Talk",
    },
    {
      id: "3",
      title: "Who Should Be in the Team of the Season So Far?",
      author: "FootballFanatic",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 89,
      views: 2134,
      timeAgo: "6 hours ago",
      isHot: true,
      category: "Player Performance",
    },
    {
      id: "4",
      title: "El Clásico Post-Match Thread: Barcelona vs Real Madrid",
      author: "ModTeam",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 456,
      views: 12453,
      timeAgo: "1 day ago",
      isPinned: true,
      category: "Match Discussion",
    },
    {
      id: "5",
      title: "Best Budget Options for Your Fantasy Team This Week",
      author: "FantasyPro",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 67,
      views: 1892,
      timeAgo: "8 hours ago",
      category: "Fantasy Football",
    },
  ]

  const recentThreads = [
    {
      id: "6",
      title: "How Do You Think Liverpool Will Line Up Against Chelsea?",
      author: "RedDevil92",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 34,
      views: 892,
      timeAgo: "1 hour ago",
      category: "Match Discussion",
    },
    {
      id: "7",
      title: "Underrated Defensive Midfielders in Europe's Top 5 Leagues",
      author: "ScoutingReport",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 45,
      views: 1243,
      timeAgo: "3 hours ago",
      category: "Player Performance",
    },
    {
      id: "8",
      title: "PSG's Pressing Strategy: What Makes It So Effective?",
      author: "TacticalMind",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 28,
      views: 764,
      timeAgo: "5 hours ago",
      category: "Tactics & Analysis",
    },
    {
      id: "9",
      title: "Which Young Talent Will Make the Biggest Impact This Season?",
      author: "YouthScout",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 56,
      views: 1532,
      timeAgo: "7 hours ago",
      category: "General Discussion",
    },
    {
      id: "10",
      title: "Captain Choices for Gameweek 15 - Who Are You Picking?",
      author: "FPLMaster",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 72,
      views: 2103,
      timeAgo: "9 hours ago",
      category: "Fantasy Football",
    },
  ]

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
                <p className="text-2xl font-bold">5,133</p>
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
                <p className="text-2xl font-bold">32,066</p>
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
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Active Today</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Forum Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <ForumCategory key={category.slug} {...category} />
            ))}
          </div>
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
              {hotThreads.map((thread) => (
                <ForumThread key={thread.id} {...thread} />
              ))}
            </TabsContent>
            <TabsContent value="recent" className="space-y-3">
              {recentThreads.map((thread) => (
                <ForumThread key={thread.id} {...thread} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
