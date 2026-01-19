import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

interface TrendingTopicProps {
  id: string
  topic: string
  description: string
  mentions: string
  category: string
}

export function TrendingTopic({ id, topic, description, mentions, category }: TrendingTopicProps) {
  return (
    <Link href={`/trending/${id}`}>
      <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold truncate">{topic}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium">{mentions} mentions</span>
              <span className="text-primary">{category}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
