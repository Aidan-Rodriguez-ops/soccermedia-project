import { Card } from "@/components/ui/card"
import Link from "next/link"

interface TeamCardProps {
  id: string
  name: string
  league: string
  logo: string
  stats: {
    played: number
    wins: number
    draws: number
    losses: number
  }
}

export function TeamCard({ id, name, league, logo, stats }: TeamCardProps) {
  return (
    <Link href={`/team/${id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xl font-bold">{name.substring(0, 3).toUpperCase()}</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{league}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{stats.played}</p>
            <p className="text-xs text-muted-foreground">Played</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{stats.wins}</p>
            <p className="text-xs text-muted-foreground">Wins</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.draws}</p>
            <p className="text-xs text-muted-foreground">Draws</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-destructive">{stats.losses}</p>
            <p className="text-xs text-muted-foreground">Losses</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
