import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Clock } from "lucide-react"

interface NewsCardProps {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  publishedAt: string
  readTime: string
}

export function NewsCard({ id, title, excerpt, category, image, author, publishedAt, readTime }: NewsCardProps) {
  return (
    <Link href={`/news/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative h-56">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <Badge className="absolute top-4 left-4">{category}</Badge>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl mb-2 line-clamp-2 text-balance">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 text-pretty">{excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">{author}</span>
            <div className="flex items-center gap-3">
              <span>{publishedAt}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
