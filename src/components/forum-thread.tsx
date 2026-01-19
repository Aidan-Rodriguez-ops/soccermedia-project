import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, TrendingUp, Pin } from "lucide-react"
import Link from "next/link"

interface ForumThreadProps {
  id: string
  title: string
  author: string
  authorAvatar?: string
  replies: number
  views: number
  timeAgo: string
  isPinned?: boolean
  isHot?: boolean
  category: string
}

export function ForumThread({
  id,
  title,
  author,
  authorAvatar,
  replies,
  views,
  timeAgo,
  isPinned,
  isHot,
  category,
}: ForumThreadProps) {
  return (
    <Link href={`/forums/thread/${id}`}>
      <Card className="p-4 hover:border-primary transition-colors cursor-pointer">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={authorAvatar || "/placeholder.svg"} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-1">
              {isPinned && <Pin className="h-4 w-4 text-primary shrink-0 mt-0.5" />}
              {isHot && <TrendingUp className="h-4 w-4 text-destructive shrink-0 mt-0.5" />}
              <h3 className="font-semibold text-base leading-snug">{title}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span className="font-medium">{author}</span>
              <span>•</span>
              <span>{timeAgo}</span>
              <span>•</span>
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{replies} replies</span>
              </div>
              <div>
                <span>{views} views</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
