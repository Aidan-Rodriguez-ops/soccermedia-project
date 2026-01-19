interface StatBarProps {
  label: string
  homeValue: number
  awayValue: number
  homeTeam: string
  awayTeam: string
}

export function StatBar({ label, homeValue, awayValue, homeTeam, awayTeam }: StatBarProps) {
  const total = homeValue + awayValue
  const homePercentage = total > 0 ? (homeValue / total) * 100 : 50
  const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">{homeValue}</span>
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-semibold">{awayValue}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-muted">
        <div
          className="bg-primary transition-all"
          style={{ width: `${homePercentage}%` }}
          title={`${homeTeam}: ${homeValue}`}
        />
        <div
          className="bg-destructive transition-all"
          style={{ width: `${awayPercentage}%` }}
          title={`${awayTeam}: ${awayValue}`}
        />
      </div>
    </div>
  )
}
