interface Player {
  number: number
  name: string
  position: string
}

interface LineupDisplayProps {
  formation: string
  players: Player[]
  teamName: string
}

export function LineupDisplay({ formation, players, teamName }: LineupDisplayProps) {
  const positionGroups = {
    GK: players.filter((p) => p.position === "GK"),
    DEF: players.filter((p) => p.position === "DEF"),
    MID: players.filter((p) => p.position === "MID"),
    FWD: players.filter((p) => p.position === "FWD"),
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-bold text-lg">{teamName}</h3>
        <p className="text-sm text-muted-foreground">{formation}</p>
      </div>

      <div className="relative h-[500px] bg-primary/5 rounded-lg p-4 overflow-hidden">
        {/* Field lines */}
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 border-b border-primary/20" />
          <div className="h-12 border-b border-primary/20 flex items-center justify-center">
            <div className="w-24 h-12 border-2 border-primary/20 rounded-t-lg" />
          </div>
        </div>

        {/* Players by position */}
        <div className="relative h-full flex flex-col justify-between py-4">
          {/* Forwards */}
          <div className="flex justify-center gap-4">
            {positionGroups.FWD.map((player) => (
              <PlayerDot key={player.number} player={player} />
            ))}
          </div>

          {/* Midfielders */}
          <div className="flex justify-center gap-4">
            {positionGroups.MID.map((player) => (
              <PlayerDot key={player.number} player={player} />
            ))}
          </div>

          {/* Defenders */}
          <div className="flex justify-center gap-4">
            {positionGroups.DEF.map((player) => (
              <PlayerDot key={player.number} player={player} />
            ))}
          </div>

          {/* Goalkeeper */}
          <div className="flex justify-center">
            {positionGroups.GK.map((player) => (
              <PlayerDot key={player.number} player={player} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PlayerDot({ player }: { player: Player }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold border-2 border-background shadow-lg">
        {player.number}
      </div>
      <span className="text-xs font-medium text-center max-w-[60px] truncate bg-background/80 px-1 rounded">
        {player.name}
      </span>
    </div>
  )
}
