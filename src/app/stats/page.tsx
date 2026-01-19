import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Users } from "lucide-react"
import { Footer } from "@/components/footer"
import { getStandings, getTopScorers } from "@/lib/api-football"

// Premier League ID = 39, current season = 2024
const PREMIER_LEAGUE_ID = "39"
const CURRENT_SEASON = "2024"

async function getStatsData() {
  // Fetch standings and top scorers in parallel
  const [standingsData, scorersData] = await Promise.all([
    getStandings(PREMIER_LEAGUE_ID, CURRENT_SEASON),
    getTopScorers(PREMIER_LEAGUE_ID, CURRENT_SEASON),
  ])

  // Process standings
  const standings = (standingsData as any)?.[0]?.league?.standings?.[0] || []
  const leagueStandings = Array.isArray(standings)
    ? standings.slice(0, 10).map((standing: any) => ({
        rank: standing.rank,
        team: standing.team.name,
        played: standing.all.played,
        wins: standing.all.win,
        draws: standing.all.draw,
        losses: standing.all.lose,
        gd: standing.goalsDiff,
        points: standing.points,
      }))
    : []

  // Process top scorers
  const scorersArray = Array.isArray(scorersData) ? scorersData : []
  const topScorers = scorersArray.slice(0, 10).map((item: any, index: number) => ({
    rank: index + 1,
    name: item.player.name,
    team: item.statistics[0].team.name,
    goals: item.statistics[0].goals.total || 0,
    matches: item.statistics[0].games.appearences || 0,
  }))

  // Process top assisters (from scorers data)
  const topAssisters = scorersArray
    .filter((item: any) => item.statistics[0].goals.assists > 0)
    .sort((a: any, b: any) => b.statistics[0].goals.assists - a.statistics[0].goals.assists)
    .slice(0, 10)
    .map((item: any, index: number) => ({
      rank: index + 1,
      name: item.player.name,
      team: item.statistics[0].team.name,
      assists: item.statistics[0].goals.assists || 0,
      matches: item.statistics[0].games.appearences || 0,
    }))

  // Fallback data if API fails
  if (leagueStandings.length === 0) {
    return {
      leagueStandings: [
        { rank: 1, team: "Manchester City", played: 38, wins: 28, draws: 7, losses: 3, gd: 62, points: 91 },
        { rank: 2, team: "Arsenal", played: 38, wins: 27, draws: 8, losses: 3, gd: 58, points: 89 },
        { rank: 3, team: "Liverpool", played: 38, wins: 25, draws: 9, losses: 4, gd: 52, points: 84 },
      ],
      topScorers: [
        { rank: 1, name: "Erling Haaland", team: "Manchester City", goals: 36, matches: 35 },
        { rank: 2, name: "Harry Kane", team: "Bayern Munich", goals: 32, matches: 33 },
      ],
      topAssisters: [
        { rank: 1, name: "Kevin De Bruyne", team: "Manchester City", assists: 20, matches: 34 },
      ],
    }
  }

  return { leagueStandings, topScorers, topAssisters }
}

export default async function StatsPage() {
  const { leagueStandings, topScorers, topAssisters } = await getStatsData()
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Statistics & Standings</h1>
          <p className="text-muted-foreground text-lg">In-depth football statistics and league tables</p>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">91</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Top Team Points</h3>
            <p className="text-sm text-muted-foreground">Manchester City leads with 91 points</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">36</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Top Scorer Goals</h3>
            <p className="text-sm text-muted-foreground">Erling Haaland with 36 goals</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">20</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Top Assists</h3>
            <p className="text-sm text-muted-foreground">Kevin De Bruyne with 20 assists</p>
          </Card>
        </div>

        {/* Stats Tabs */}
        <Tabs defaultValue="standings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="standings">League Table</TabsTrigger>
            <TabsTrigger value="scorers">Top Scorers</TabsTrigger>
            <TabsTrigger value="assists">Top Assists</TabsTrigger>
          </TabsList>

          <TabsContent value="standings">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Premier League Standings</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-semibold text-sm">#</th>
                      <th className="text-left py-3 px-2 font-semibold text-sm">Team</th>
                      <th className="text-center py-3 px-2 font-semibold text-sm">P</th>
                      <th className="text-center py-3 px-2 font-semibold text-sm">W</th>
                      <th className="text-center py-3 px-2 font-semibold text-sm">D</th>
                      <th className="text-center py-3 px-2 font-semibold text-sm">L</th>
                      <th className="text-center py-3 px-2 font-semibold text-sm">GD</th>
                      <th className="text-center py-3 px-2 font-semibold text-sm">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leagueStandings.map((standing: any) => (
                      <tr key={standing.rank} className="border-b border-border hover:bg-accent/50 transition-colors">
                        <td className="py-4 px-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              standing.rank <= 4
                                ? "bg-primary text-primary-foreground"
                                : standing.rank === 5
                                  ? "bg-accent text-accent-foreground"
                                  : ""
                            }`}
                          >
                            {standing.rank}
                          </div>
                        </td>
                        <td className="py-4 px-2 font-semibold">{standing.team}</td>
                        <td className="py-4 px-2 text-center">{standing.played}</td>
                        <td className="py-4 px-2 text-center">{standing.wins}</td>
                        <td className="py-4 px-2 text-center">{standing.draws}</td>
                        <td className="py-4 px-2 text-center">{standing.losses}</td>
                        <td className="py-4 px-2 text-center font-semibold">
                          {standing.gd > 0 ? `+${standing.gd}` : standing.gd}
                        </td>
                        <td className="py-4 px-2 text-center font-bold">{standing.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="scorers">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Top Goal Scorers</h3>
              <div className="space-y-4">
                {topScorers.map((player: any) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {player.rank}
                      </div>
                      <div>
                        <p className="font-bold">{player.name}</p>
                        <p className="text-sm text-muted-foreground">{player.team}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{player.goals}</p>
                      <p className="text-xs text-muted-foreground">{player.matches} matches</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="assists">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Top Assist Providers</h3>
              <div className="space-y-4">
                {topAssisters.map((player: any) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {player.rank}
                      </div>
                      <div>
                        <p className="font-bold">{player.name}</p>
                        <p className="text-sm text-muted-foreground">{player.team}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{player.assists}</p>
                      <p className="text-xs text-muted-foreground">{player.matches} matches</p>
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
