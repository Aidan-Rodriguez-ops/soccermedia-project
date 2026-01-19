import type React from "react"
import { Header } from "@/components/header"
import { VideoCard } from "@/components/video-card"
import { TrendingTopic } from "@/components/trending-topic"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Video, TrendingUpIcon } from "lucide-react"
import { Footer } from "@/components/footer"
import { getFeaturedVideo, getVideos, getTrendingTopics } from "@/lib/supabase-queries"

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) return "Just now"
  if (diffHours < 24) return `${diffHours} hours ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return "1 day ago"
  return `${diffDays} days ago`
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K views`
  }
  return `${views} views`
}

function formatMentions(mentions: number): string {
  if (mentions >= 1000000) {
    return `${(mentions / 1000000).toFixed(1)}M`
  } else if (mentions >= 1000) {
    return `${(mentions / 1000).toFixed(0)}K`
  }
  return `${mentions}`
}

export default async function TrendingPage() {
  const featuredVideo = await getFeaturedVideo()
  const videos = await getVideos(6)
  const trendingTopics = await getTrendingTopics(5)
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
              <span className="text-3xl font-bold">{trendingTopics.length}</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Hot Topics</h3>
            <p className="text-sm text-muted-foreground">Trending stories right now</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Video className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{videos.length}</span>
            </div>
            <h3 className="font-bold text-lg mb-1">New Videos</h3>
            <p className="text-sm text-muted-foreground">Latest highlights uploaded</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <TrendingUpIcon className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{formatViews(videos.reduce((sum, v) => sum + v.views, 0))}</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Total Views</h3>
            <p className="text-sm text-muted-foreground">Across all videos</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Videos */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Video */}
            {featuredVideo ? (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Flame className="h-6 w-6 text-destructive" />
                  Featured Video
                </h2>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-[400px]">
                    <img
                      src={featuredVideo.thumbnail_url || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&h=900&fit=crop"}
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
                      <span>{formatViews(featuredVideo.views)}</span>
                      <span>{formatTimeAgo(featuredVideo.uploaded_at)}</span>
                    </div>
                  </div>
                </Card>
              </section>
            ) : null}

            {/* Video Grid */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Latest Highlights</h2>
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.map((video) => (
                    <VideoCard
                      key={video.id}
                      id={video.id}
                      title={video.title}
                      thumbnail={video.thumbnail_url}
                      duration={video.duration}
                      views={formatViews(video.views)}
                      category={video.category}
                      uploadedAt={formatTimeAgo(video.uploaded_at)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No videos available yet. Check back soon!</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - Trending Topics */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUpIcon className="h-6 w-6 text-primary" />
                Trending Now
              </h2>
              {trendingTopics.length > 0 ? (
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <TrendingTopic
                      key={topic.id}
                      id={topic.id}
                      topic={topic.topic}
                      description={topic.description}
                      mentions={formatMentions(topic.mentions)}
                      category={topic.category}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No trending topics yet. Check back soon!</p>
                </div>
              )}
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
