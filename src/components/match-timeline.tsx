interface TimelineEvent {
  time: string
  type: "goal" | "yellow-card" | "red-card" | "substitution"
  team: "home" | "away"
  player: string
  description: string
}

interface MatchTimelineProps {
  events: TimelineEvent[]
}

export function MatchTimeline({ events }: MatchTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return "⚽"
      case "yellow-card":
        return "🟨"
      case "red-card":
        return "🟥"
      case "substitution":
        return "🔄"
      default:
        return "•"
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex items-center gap-2 w-16">
            <span className="text-sm font-bold text-muted-foreground">{event.time}</span>
          </div>

          <div className="flex-1 flex items-start gap-3">
            {event.team === "home" ? (
              <>
                <div className="flex-1 text-right">
                  <p className="font-semibold">{event.player}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                <div className="text-2xl">{getEventIcon(event.type)}</div>
                <div className="flex-1" />
              </>
            ) : (
              <>
                <div className="flex-1" />
                <div className="text-2xl">{getEventIcon(event.type)}</div>
                <div className="flex-1">
                  <p className="font-semibold">{event.player}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
