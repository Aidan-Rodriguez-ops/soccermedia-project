import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface LiveMatchCardProps {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  status: "live" | "finished" | "upcoming"
  time: string
  league: string
  homeLogo?: string
  awayLogo?: string
}

export function LiveMatchCard({
  id,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  time,
  league,
}: LiveMatchCardProps) {
  return (
    <Link href={`/match/${id}`}>
      <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium">{league}</span>
          {status === "live" ? (
            <Badge variant="destructive" className="animate-pulse">
              LIVE
            </Badge>
          ) : status === "finished" ? (
            <span className="text-xs text-muted-foreground">FT</span>
          ) : (
            <span className="text-xs text-muted-foreground">{time}</span>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-bold">{homeTeam.substring(0, 3).toUpperCase()}</span>
              </div>
              <span className="font-semibold">{homeTeam}</span>
            </div>
            <span className="text-2xl font-bold">{homeScore}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-bold">{awayTeam.substring(0, 3).toUpperCase()}</span>
              </div>
              <span className="font-semibold">{awayTeam}</span>
            </div>
            <span className="text-2xl font-bold">{awayScore}</span>
          </div>
        </div>

        {status === "live" && <div className="mt-3 text-xs text-muted-foreground">{time}</div>}
      </Card>
    </Link>
  )
}
