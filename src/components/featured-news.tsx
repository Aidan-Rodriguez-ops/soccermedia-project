import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Clock } from "lucide-react"

interface FeaturedNewsProps {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  publishedAt: string
  readTime: string
}

export function FeaturedNews({
  id,
  title,
  excerpt,
  category,
  image,
  author,
  publishedAt,
  readTime,
}: FeaturedNewsProps) {
  return (
    <Link href={`/news/${id}`}>
      <div className="relative h-[500px] rounded-2xl overflow-hidden cursor-pointer group">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <Badge className="mb-4">{category}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">{title}</h2>
          <p className="text-lg text-muted-foreground mb-4 line-clamp-2 text-pretty">{excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium">{author}</span>
            <span>{publishedAt}</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
