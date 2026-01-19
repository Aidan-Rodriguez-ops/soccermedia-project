import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatBar } from "@/components/stat-bar"
import { MatchTimeline } from "@/components/match-timeline"
import { LineupDisplay } from "@/components/lineup-display"
import { Footer } from "@/components/footer"

export default function MatchPage({ params }: { params: { id: string } }) {
  // Mock match data
  const match = {
    id: params.id,
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
    league: "La Liga",
    stadium: "Camp Nou",
    date: "January 15, 2026",
    time: "20:00",
    attendance: "98,354",
    referee: "Antonio Mateu Lahoz",
  }

  const stats = {
    possession: { home: 58, away: 42 },
    shots: { home: 18, away: 12 },
    shotsOnTarget: { home: 8, away: 5 },
    corners: { home: 7, away: 4 },
    fouls: { home: 11, away: 14 },
    yellowCards: { home: 2, away: 3 },
    redCards: { home: 0, away: 0 },
    offsides: { home: 3, away: 2 },
    passes: { home: 612, away: 441 },
    passAccuracy: { home: 89, away: 84 },
  }

  const timeline = [
    {
      time: "12'",
      type: "goal" as const,
      team: "home" as const,
      player: "Pedri",
      description: "Assisted by Gavi",
    },
    {
      time: "28'",
      type: "yellow-card" as const,
      team: "away" as const,
      player: "Tchouaméni",
      description: "Foul on Lewandowski",
    },
    {
      time: "45'",
      type: "goal" as const,
      team: "home" as const,
      player: "Lewandowski",
      description: "Header from corner",
    },
    {
      time: "62'",
      type: "substitution" as const,
      team: "away" as const,
      player: "Rodrygo → Brahim Díaz",
      description: "Tactical change",
    },
    {
      time: "73'",
      type: "goal" as const,
      team: "away" as const,
      player: "Vinícius Jr",
      description: "Solo effort",
    },
    {
      time: "85'",
      type: "yellow-card" as const,
      team: "home" as const,
      player: "Koundé",
      description: "Time wasting",
    },
  ]

  const homeLineup = [
    { number: 1, name: "Ter Stegen", position: "GK" },
    { number: 2, name: "Koundé", position: "DEF" },
    { number: 3, name: "Araujo", position: "DEF" },
    { number: 4, name: "Christensen", position: "DEF" },
    { number: 18, name: "Alba", position: "DEF" },
    { number: 5, name: "Busquets", position: "MID" },
    { number: 8, name: "Pedri", position: "MID" },
    { number: 6, name: "Gavi", position: "MID" },
    { number: 11, name: "Raphinha", position: "FWD" },
    { number: 9, name: "Lewandowski", position: "FWD" },
    { number: 7, name: "Dembélé", position: "FWD" },
  ]

  const awayLineup = [
    { number: 1, name: "Courtois", position: "GK" },
    { number: 2, name: "Carvajal", position: "DEF" },
    { number: 3, name: "Militão", position: "DEF" },
    { number: 4, name: "Alaba", position: "DEF" },
    { number: 23, name: "Mendy", position: "DEF" },
    { number: 8, name: "Kroos", position: "MID" },
    { number: 10, name: "Modrić", position: "MID" },
    { number: 12, name: "Camavinga", position: "MID" },
    { number: 15, name: "Valverde", position: "MID" },
    { number: 9, name: "Benzema", position: "FWD" },
    { number: 20, name: "Vinícius Jr", position: "FWD" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Match Header */}
        <Card className="p-6 mb-8">
          <div className="text-center mb-6">
            <Badge className="mb-2">{match.league}</Badge>
            <p className="text-sm text-muted-foreground">
              {match.stadium} • {match.date} • {match.time}
            </p>
          </div>

          <div className="grid grid-cols-3 items-center gap-8 mb-6">
            {/* Home Team */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold">{match.homeTeam.substring(0, 3).toUpperCase()}</span>
              </div>
              <h2 className="text-2xl font-bold">{match.homeTeam}</h2>
            </div>

            {/* Score */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-6xl font-bold">{match.homeScore}</span>
                <span className="text-4xl text-muted-foreground">-</span>
                <span className="text-6xl font-bold">{match.awayScore}</span>
              </div>
              <Badge variant="outline">Full Time</Badge>
            </div>

            {/* Away Team */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold">{match.awayTeam.substring(0, 3).toUpperCase()}</span>
              </div>
              <h2 className="text-2xl font-bold">{match.awayTeam}</h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground border-t border-border pt-4">
            <div>
              <span className="font-medium">Referee:</span> {match.referee}
            </div>
            <div>
              <span className="font-medium">Attendance:</span> {match.attendance}
            </div>
          </div>
        </Card>

        {/* Match Details Tabs */}
        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="lineups">Lineups</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Match Statistics</h3>
              <div className="space-y-6">
                <StatBar
                  label="Possession"
                  homeValue={stats.possession.home}
                  awayValue={stats.possession.away}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                />
                <StatBar
                  label="Shots"
                  homeValue={stats.shots.home}
                  awayValue={stats.shots.away}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                />
                <StatBar
                  label="Shots on Target"
                  homeValue={stats.shotsOnTarget.home}
                  awayValue={stats.shotsOnTarget.away}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                />
                <StatBar
                  label="Corners"
                  homeValue={stats.corners.home}
                  awayValue={stats.corners.away}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                />
                <StatBar
                  label="Fouls"
                  homeValue={stats.fouls.home}
                  awayValue={stats.fouls.away}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                />
                <StatBar
                  label="Yellow Cards"
                  homeValue={stats.yellowCards.home}
                  awayValue={stats.yellowCards.away}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                />
                <StatBar
                  label="Passes"
                  homeValue={stats.passes.home}
                  awayValue={stats.passes.away}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                />
                <StatBar
                  label="Pass Accuracy %"
                  homeValue={stats.passAccuracy.home}
                  awayValue={stats.passAccuracy.away}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Match Timeline</h3>
              <MatchTimeline events={timeline} />
            </Card>
          </TabsContent>

          <TabsContent value="lineups">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <LineupDisplay formation="4-3-3" players={homeLineup} teamName={match.homeTeam} />
              </Card>
              <Card className="p-6">
                <LineupDisplay formation="4-4-2" players={awayLineup} teamName={match.awayTeam} />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
