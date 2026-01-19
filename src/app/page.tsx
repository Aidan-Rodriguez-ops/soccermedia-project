import { Header } from "@/components/header"
import { LeagueFilter } from "@/components/league-filter"
import { LiveMatchCard } from "@/components/live-match-card"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Newspaper, Video } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { getLiveMatches, getFixturesByDate } from "@/lib/api-football"
import type { Match } from "@/types/football"

// Helper function to convert API match to LiveMatchCard props
function convertMatchToCardProps(match: Match) {
  const status = match.fixture.status.short
  let matchStatus: "live" | "finished" | "upcoming"
  let time: string

  if (status === "1H" || status === "2H" || status === "HT") {
    matchStatus = "live"
    time = match.fixture.status.elapsed ? `${match.fixture.status.elapsed}'` : "LIVE"
  } else if (status === "FT" || status === "AET" || status === "PEN") {
    matchStatus = "finished"
    time = "FT"
  } else {
    matchStatus = "upcoming"
    // Format time from timestamp
    const date = new Date(match.fixture.date)
    time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  return {
    id: match.fixture.id.toString(),
    homeTeam: match.teams.home.name,
    awayTeam: match.teams.away.name,
    homeScore: match.goals.home ?? 0,
    awayScore: match.goals.away ?? 0,
    status: matchStatus,
    time,
    league: match.league.name,
  }
}

async function getMatches() {
  // Try to get live matches first
  const liveMatches = await getLiveMatches()

  if (liveMatches && Array.isArray(liveMatches) && liveMatches.length > 0) {
    return liveMatches.slice(0, 4).map(convertMatchToCardProps)
  }

  // If no live matches, get today's fixtures
  const today = new Date().toISOString().split("T")[0]
  const todayFixtures = await getFixturesByDate(today)

  if (todayFixtures && Array.isArray(todayFixtures) && todayFixtures.length > 0) {
    return todayFixtures.slice(0, 4).map(convertMatchToCardProps)
  }

  // Fallback to mock data if API fails or no matches
  return [
    {
      id: "1",
      homeTeam: "Manchester United",
      awayTeam: "Liverpool",
      homeScore: 2,
      awayScore: 1,
      status: "live" as const,
      time: "67'",
      league: "Premier League",
    },
    {
      id: "2",
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      homeScore: 1,
      awayScore: 1,
      status: "live" as const,
      time: "82'",
      league: "La Liga",
    },
  ]
}

// Mock trending stories
const trendingStories = [
  {
    id: "1",
    title: "Haaland Breaks Goal Scoring Record",
    category: "Premier League",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    title: "Transfer Window: Top Deals",
    category: "Transfers",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Champions League Draw Results",
    category: "Champions League",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop",
  },
]

export default async function Home() {
  const matches = await getMatches()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
            <img
              src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&h=900&fit=crop"
              alt="Hero"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-background/90 to-transparent">
              <Badge className="w-fit mb-4">Featured Match</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">El Clásico: The Battle Continues</h1>
              <p className="text-lg text-muted-foreground mb-4 text-pretty">
                {"Barcelona and Real Madrid face off in the most anticipated match of the season"}
              </p>
              <Link href="/match/2">
                <button className="w-fit bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  View Match Details
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Live Matches Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Live & Upcoming Matches</h2>
            <Link href="/matches" className="text-primary hover:underline text-sm font-medium">
              View All
            </Link>
          </div>

          <div className="mb-6">
            <LeagueFilter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((match) => (
              <LiveMatchCard key={match.id} {...match} />
            ))}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/news">
              <Card className="p-6 h-full hover:bg-accent/50 transition-colors cursor-pointer">
                <Newspaper className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Latest News</h3>
                <p className="text-sm text-muted-foreground">
                  Stay updated with breaking football news from around the world
                </p>
              </Card>
            </Link>

            <Link href="/stats">
              <Card className="p-6 h-full hover:bg-accent/50 transition-colors cursor-pointer">
                <TrendingUp className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Stats & Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Deep dive into match statistics and player performance data
                </p>
              </Card>
            </Link>

            <Link href="/trending">
              <Card className="p-6 h-full hover:bg-accent/50 transition-colors cursor-pointer">
                <Video className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Video Highlights</h3>
                <p className="text-sm text-muted-foreground">
                  Watch the best goals, saves, and moments from recent matches
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {/* Trending Stories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Trending Stories</h2>
            <Link href="/trending" className="text-primary hover:underline text-sm font-medium">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingStories.map((story) => (
              <Link key={story.id} href={`/story/${story.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative h-48">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3">{story.category}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-balance">{story.title}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
