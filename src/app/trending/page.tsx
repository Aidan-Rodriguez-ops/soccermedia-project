import type React from "react"
import { Header } from "@/components/header"
import { VideoCard } from "@/components/video-card"
import { TrendingTopic } from "@/components/trending-topic"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Video, TrendingUpIcon } from "lucide-react"
import { Footer } from "@/components/footer"

// Mock video data
const featuredVideo = {
  id: "featured-1",
  title: "Haaland's Incredible Hat-Trick in 20 Minutes | Extended Highlights",
  thumbnail: "/haaland-hattrick.jpg",
  duration: "8:45",
  views: "2.4M views",
  category: "Highlights",
  uploadedAt: "1 day ago",
}

const videos = [
  {
    id: "1",
    title: "Best Goals of the Week | Matchday 35",
    thumbnail: "/goals-of-week.jpg",
    duration: "12:30",
    views: "1.2M views",
    category: "Goals",
    uploadedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Mbappé's Skillful Dribbling Masterclass",
    thumbnail: "/mbappe-skills.jpg",
    duration: "5:15",
    views: "980K views",
    category: "Skills",
    uploadedAt: "3 days ago",
  },
  {
    id: "3",
    title: "Top 10 Saves This Season",
    thumbnail: "/top-saves.jpg",
    duration: "10:20",
    views: "750K views",
    category: "Saves",
    uploadedAt: "4 days ago",
  },
  {
    id: "4",
    title: "El Clásico Full Match Highlights",
    thumbnail: "/el-clasico-highlights.jpg",
    duration: "15:45",
    views: "3.5M views",
    category: "Highlights",
    uploadedAt: "5 days ago",
  },
  {
    id: "5",
    title: "Tactical Analysis: Manchester City's Build-Up Play",
    thumbnail: "/tactical-analysis.jpg",
    duration: "18:30",
    views: "450K views",
    category: "Analysis",
    uploadedAt: "1 week ago",
  },
  {
    id: "6",
    title: "Behind the Scenes: Champions League Final Preparation",
    thumbnail: "/behind-scenes.jpg",
    duration: "20:15",
    views: "890K views",
    category: "Documentary",
    uploadedAt: "1 week ago",
  },
]

// Mock trending topics
const trendingTopics = [
  {
    id: "1",
    topic: "Haaland breaks goal record",
    description: "Erling Haaland shatters the Premier League single-season scoring record with his 36th goal",
    mentions: "127K",
    category: "Premier League",
  },
  {
    id: "2",
    topic: "Transfer: Mbappé to Madrid",
    description: "Real Madrid officially announces the signing of Kylian Mbappé on a five-year contract",
    mentions: "203K",
    category: "Transfers",
  },
  {
    id: "3",
    topic: "VAR controversy in El Clásico",
    description: "Disputed penalty decision sparks debate about VAR implementation in crucial matches",
    mentions: "95K",
    category: "La Liga",
  },
  {
    id: "4",
    topic: "Guardiola extends contract",
    description: "Pep Guardiola signs new three-year extension with Manchester City through 2029",
    mentions: "78K",
    category: "Premier League",
  },
  {
    id: "5",
    topic: "Women's World Cup 2027 venues",
    description: "FIFA announces host cities for the 2027 Women's World Cup across Brazil",
    mentions: "65K",
    category: "International",
  },
]

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Trending & Highlights</h1>
          <p className="text-muted-foreground text-lg">Watch the best moments and follow what's trending in football</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Flame className="h-8 w-8 text-destructive" />
              <span className="text-3xl font-bold">5</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Hot Topics</h3>
            <p className="text-sm text-muted-foreground">Trending stories right now</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Video className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">24</span>
            </div>
            <h3 className="font-bold text-lg mb-1">New Videos Today</h3>
            <p className="text-sm text-muted-foreground">Fresh highlights uploaded</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <TrendingUpIcon className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">12M</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Total Views</h3>
            <p className="text-sm text-muted-foreground">In the last 24 hours</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Videos */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Video */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Flame className="h-6 w-6 text-destructive" />
                Featured Video
              </h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative h-[400px]">
                  <img
                    src={featuredVideo.thumbnail || "/placeholder.svg"}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                      <Play className="h-10 w-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-background/90 text-foreground">
                    {featuredVideo.duration}
                  </Badge>
                </div>
                <div className="p-6">
                  <Badge className="mb-3">{featuredVideo.category}</Badge>
                  <h3 className="text-2xl font-bold mb-3 text-balance">{featuredVideo.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{featuredVideo.views}</span>
                    <span>{featuredVideo.uploadedAt}</span>
                  </div>
                </div>
              </Card>
            </section>

            {/* Video Grid */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Latest Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <VideoCard key={video.id} {...video} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Trending Topics */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUpIcon className="h-6 w-6 text-primary" />
                Trending Now
              </h2>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <TrendingTopic key={topic.id} {...topic} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
