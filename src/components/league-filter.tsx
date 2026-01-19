"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const leagues = ["All", "Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "Champions League"]

export function LeagueFilter() {
  const [selected, setSelected] = useState("All")

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {leagues.map((league) => (
        <Button
          key={league}
          variant={selected === league ? "default" : "outline"}
          size="sm"
          onClick={() => setSelected(league)}
          className="whitespace-nowrap"
        >
          {league}
        </Button>
      ))}
    </div>
  )
}
