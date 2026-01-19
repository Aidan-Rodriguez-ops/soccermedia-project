import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface PlayerCardProps {
  id: string
  name: string
  number: number
  position: string
  nationality: string
  image: string
}

export function PlayerCard({ id, name, number, position, nationality, image }: PlayerCardProps) {
  return (
    <Link href={`/player/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover object-top" />
          <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
            {number}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {position}
            </Badge>
            <span>{nationality}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
