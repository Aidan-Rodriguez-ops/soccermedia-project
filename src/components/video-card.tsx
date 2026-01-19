import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Eye } from "lucide-react"
import Link from "next/link"

interface VideoCardProps {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  category: string
  uploadedAt: string
}

export function VideoCard({ id, title, thumbnail, duration, views, category, uploadedAt }: VideoCardProps) {
  return (
    <Link href={`/video/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative h-48">
          <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
          <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">{duration}</Badge>
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2 line-clamp-2 text-balance">{title}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{views}</span>
            </div>
            <span>{uploadedAt}</span>
          </div>
          <Badge variant="outline" className="mt-2 text-xs">
            {category}
          </Badge>
        </div>
      </Card>
    </Link>
  )
}
