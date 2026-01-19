import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Award, Calendar } from "lucide-react"

export default function PlayerPage({ params }: { params: { id: string } }) {
  // Mock player data
  const player = {
    id: params.id,
    name: "Erling Haaland",
    number: 9,
    position: "Forward",
    team: "Manchester City",
    nationality: "Norway",
    age: 25,
    height: "194 cm",
    weight: "88 kg",
    preferredFoot: "Left",
    image: "/player-haaland-full.jpg",
  }

  const stats = {
    appearances: 35,
    goals: 36,
    assists: 11,
    minutesPlayed: 2987,
    yellowCards: 3,
    redCards: 0,
  }

  const careerStats = [
    { season: "2025/26", team: "Manchester City", appearances: 35, goals: 36, assists: 11 },
    { season: "2024/25", team: "Manchester City", appearances: 38, goals: 27, assists: 8 },
    { season: "2023/24", team: "Manchester City", appearances: 32, goals: 29, assists: 5 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Player Header */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative w-48 h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={player.image || "/placeholder.svg"} alt={player.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                {player.number}
              </div>
            </div>

            <div className="flex-1">
              <Badge className="mb-2">{player.position}</Badge>
              <h1 className="text-4xl font-bold mb-4">{player.name}</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm mb-6">
                <div>
                  <p className="text-muted-foreground">Team</p>
                  <p className="font-semibold">{player.team}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Nationality</p>
                  <p className="font-semibold">{player.nationality}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-semibold">{player.age} years</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Height</p>
                  <p className="font-semibold">{player.height}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Weight</p>
                  <p className="font-semibold">{player.weight}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Preferred Foot</p>
                  <p className="font-semibold">{player.preferredFoot}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Season Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <Target className="h-6 w-6 text-primary mb-3" />
            <p className="text-3xl font-bold mb-1">{stats.goals}</p>
            <p className="text-sm text-muted-foreground">Goals</p>
          </Card>

          <Card className="p-6">
            <TrendingUp className="h-6 w-6 text-primary mb-3" />
            <p className="text-3xl font-bold mb-1">{stats.assists}</p>
            <p className="text-sm text-muted-foreground">Assists</p>
          </Card>

          <Card className="p-6">
            <Award className="h-6 w-6 text-primary mb-3" />
            <p className="text-3xl font-bold mb-1">{stats.appearances}</p>
            <p className="text-sm text-muted-foreground">Appearances</p>
          </Card>

          <Card className="p-6">
            <Calendar className="h-6 w-6 text-primary mb-3" />
            <p className="text-3xl font-bold mb-1">{Math.floor(stats.minutesPlayed / 90)}</p>
            <p className="text-sm text-muted-foreground">Full Matches</p>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Season Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-muted-foreground mb-1">Appearances</p>
              <p className="text-2xl font-bold">{stats.appearances}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Goals</p>
              <p className="text-2xl font-bold text-primary">{stats.goals}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Assists</p>
              <p className="text-2xl font-bold text-primary">{stats.assists}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Minutes Played</p>
              <p className="text-2xl font-bold">{stats.minutesPlayed.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Yellow Cards</p>
              <p className="text-2xl font-bold">{stats.yellowCards}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Red Cards</p>
              <p className="text-2xl font-bold">{stats.redCards}</p>
            </div>
          </div>
        </Card>

        {/* Career History */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Career Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold">Season</th>
                  <th className="text-left py-3 px-2 font-semibold">Team</th>
                  <th className="text-center py-3 px-2 font-semibold">Apps</th>
                  <th className="text-center py-3 px-2 font-semibold">Goals</th>
                  <th className="text-center py-3 px-2 font-semibold">Assists</th>
                </tr>
              </thead>
              <tbody>
                {careerStats.map((season, index) => (
                  <tr key={index} className="border-b border-border hover:bg-accent/50">
                    <td className="py-4 px-2 font-medium">{season.season}</td>
                    <td className="py-4 px-2">{season.team}</td>
                    <td className="py-4 px-2 text-center">{season.appearances}</td>
                    <td className="py-4 px-2 text-center font-bold text-primary">{season.goals}</td>
                    <td className="py-4 px-2 text-center font-bold text-primary">{season.assists}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
