import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayerCard } from "@/components/player-card"
import { Trophy, TrendingUp, Users } from "lucide-react"
import { Footer } from "@/components/footer"

export default function TeamPage({ params }: { params: { id: string } }) {
  // Mock team data
  const team = {
    id: params.id,
    name: "Manchester City",
    league: "Premier League",
    stadium: "Etihad Stadium",
    manager: "Pep Guardiola",
    founded: "1880",
    website: "mancity.com",
  }

  const stats = {
    position: 1,
    played: 38,
    wins: 28,
    draws: 7,
    losses: 3,
    goalsFor: 96,
    goalsAgainst: 34,
    points: 91,
  }

  const squad = [
    {
      id: "1",
      name: "Ederson",
      number: 31,
      position: "Goalkeeper",
      nationality: "Brazil",
      image: "/player-ederson.jpg",
    },
    {
      id: "2",
      name: "Kyle Walker",
      number: 2,
      position: "Defender",
      nationality: "England",
      image: "/player-walker.jpg",
    },
    {
      id: "3",
      name: "Rúben Dias",
      number: 3,
      position: "Defender",
      nationality: "Portugal",
      image: "/player-dias.jpg",
    },
    {
      id: "4",
      name: "John Stones",
      number: 5,
      position: "Defender",
      nationality: "England",
      image: "/player-stones.jpg",
    },
    {
      id: "5",
      name: "Kevin De Bruyne",
      number: 17,
      position: "Midfielder",
      nationality: "Belgium",
      image: "/player-debruyne.jpg",
    },
    {
      id: "6",
      name: "Rodri",
      number: 16,
      position: "Midfielder",
      nationality: "Spain",
      image: "/player-rodri.jpg",
    },
    {
      id: "7",
      name: "Phil Foden",
      number: 47,
      position: "Midfielder",
      nationality: "England",
      image: "/player-foden.jpg",
    },
    {
      id: "8",
      name: "Erling Haaland",
      number: 9,
      position: "Forward",
      nationality: "Norway",
      image: "/player-haaland.jpg",
    },
    {
      id: "9",
      name: "Jack Grealish",
      number: 10,
      position: "Forward",
      nationality: "England",
      image: "/player-grealish.jpg",
    },
  ]

  const recentMatches = [
    { opponent: "West Ham", result: "W", score: "3-1", date: "May 19" },
    { opponent: "Tottenham", result: "W", score: "2-0", date: "May 14" },
    { opponent: "Brighton", result: "D", score: "1-1", date: "May 11" },
    { opponent: "Wolves", result: "W", score: "5-1", date: "May 4" },
    { opponent: "Fulham", result: "W", score: "4-0", date: "Apr 27" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Team Header */}
        <Card className="p-8 mb-8">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-bold">{team.name.substring(0, 3).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <Badge className="mb-2">{team.league}</Badge>
              <h1 className="text-4xl font-bold mb-4">{team.name}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Stadium</p>
                  <p className="font-semibold">{team.stadium}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Manager</p>
                  <p className="font-semibold">{team.manager}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Founded</p>
                  <p className="font-semibold">{team.founded}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Website</p>
                  <p className="font-semibold text-primary">{team.website}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{stats.position}</span>
            </div>
            <h3 className="font-bold text-lg mb-1">League Position</h3>
            <p className="text-sm text-muted-foreground">
              {stats.points} points from {stats.played} matches
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{stats.goalsFor}</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Goals Scored</h3>
            <p className="text-sm text-muted-foreground">{stats.goalsAgainst} goals conceded</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{stats.wins}</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Wins This Season</h3>
            <p className="text-sm text-muted-foreground">
              {stats.draws} draws, {stats.losses} losses
            </p>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="squad" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="squad">Squad</TabsTrigger>
            <TabsTrigger value="form">Recent Form</TabsTrigger>
          </TabsList>

          <TabsContent value="squad">
            <div>
              <h2 className="text-2xl font-bold mb-6">First Team Squad</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {squad.map((player) => (
                  <PlayerCard key={player.id} {...player} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="form">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Matches</h2>
              <div className="space-y-4">
                {recentMatches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                          match.result === "W"
                            ? "bg-primary text-primary-foreground"
                            : match.result === "D"
                              ? "bg-muted text-foreground"
                              : "bg-destructive text-destructive-foreground"
                        }`}
                      >
                        {match.result}
                      </div>
                      <div>
                        <p className="font-semibold">{match.opponent}</p>
                        <p className="text-sm text-muted-foreground">{match.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{match.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
