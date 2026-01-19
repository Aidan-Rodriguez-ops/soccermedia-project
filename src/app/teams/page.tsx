import { Header } from "@/components/header"
import { TeamCard } from "@/components/team-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"

const premierLeagueTeams = [
  {
    id: "man-city",
    name: "Manchester City",
    league: "Premier League",
    logo: "/man-city-logo.png",
    stats: { played: 38, wins: 28, draws: 7, losses: 3 },
  },
  {
    id: "arsenal",
    name: "Arsenal",
    league: "Premier League",
    logo: "/arsenal-logo.png",
    stats: { played: 38, wins: 27, draws: 8, losses: 3 },
  },
  {
    id: "liverpool",
    name: "Liverpool",
    league: "Premier League",
    logo: "/liverpool-logo.png",
    stats: { played: 38, wins: 25, draws: 9, losses: 4 },
  },
  {
    id: "man-utd",
    name: "Manchester United",
    league: "Premier League",
    logo: "/man-utd-logo.png",
    stats: { played: 38, wins: 22, draws: 8, losses: 8 },
  },
]

const laLigaTeams = [
  {
    id: "real-madrid",
    name: "Real Madrid",
    league: "La Liga",
    logo: "/real-madrid-logo.png",
    stats: { played: 38, wins: 29, draws: 6, losses: 3 },
  },
  {
    id: "barcelona",
    name: "Barcelona",
    league: "La Liga",
    logo: "/barcelona-logo.png",
    stats: { played: 38, wins: 27, draws: 7, losses: 4 },
  },
  {
    id: "atletico",
    name: "Atlético Madrid",
    league: "La Liga",
    logo: "/atletico-logo.png",
    stats: { played: 38, wins: 24, draws: 9, losses: 5 },
  },
  {
    id: "sevilla",
    name: "Sevilla",
    league: "La Liga",
    logo: "/sevilla-logo.png",
    stats: { played: 38, wins: 20, draws: 10, losses: 8 },
  },
]

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Teams</h1>
          <p className="text-muted-foreground text-lg">Explore team profiles, squads, and statistics</p>
        </div>

        <Tabs defaultValue="premier-league" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="premier-league">Premier League</TabsTrigger>
            <TabsTrigger value="la-liga">La Liga</TabsTrigger>
          </TabsList>

          <TabsContent value="premier-league">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premierLeagueTeams.map((team) => (
                <TeamCard key={team.id} {...team} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="la-liga">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {laLigaTeams.map((team) => (
                <TeamCard key={team.id} {...team} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
