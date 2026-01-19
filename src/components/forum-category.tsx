import { Card } from "@/components/ui/card"
import { MessageSquare, Users, type LucideIcon } from "lucide-react"
import Link from "next/link"

interface ForumCategoryProps {
  title: string
  description: string
  threads: number
  posts: number
  icon: LucideIcon
  slug: string
}

export function ForumCategory({ title, description, threads, posts, icon: Icon, slug }: ForumCategoryProps) {
  return (
    <Link href={`/forums/${slug}`}>
      <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{threads.toLocaleString()} threads</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{posts.toLocaleString()} posts</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
