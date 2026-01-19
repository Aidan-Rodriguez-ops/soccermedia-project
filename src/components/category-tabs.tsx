"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const categories = [
  "All",
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Transfers",
  "Champions League",
  "International",
]

export function CategoryTabs() {
  const [selected, setSelected] = useState("All")

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-border">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelected(category)}
          className="whitespace-nowrap"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
