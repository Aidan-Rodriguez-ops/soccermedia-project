import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  // Mock article data - in production this would fetch based on params.id
  const article = {
    title: "Manchester City Clinches Historic Fourth Consecutive Premier League Title",
    excerpt: "Pep Guardiola's side makes history with unprecedented achievement",
    category: "Premier League",
    image: "/manchester-city-celebration.jpg",
    author: "James Richardson",
    publishedAt: "May 19, 2026",
    readTime: "5 min read",
    content: `
      <p>Manchester City has achieved what many thought impossible, securing their fourth consecutive Premier League title in a dramatic final day of the season. Pep Guardiola's side cemented their place in English football history with a commanding 3-1 victory over West Ham United at the Etihad Stadium.</p>

      <p>The title race went down to the wire, with Arsenal pushing City until the very last match. However, City's experience and squad depth proved decisive in the crucial final weeks of the season. Erling Haaland's brace, combined with a stunning strike from Phil Foden, sealed the championship in front of a jubilant home crowd.</p>

      <h2>A Season of Dominance</h2>

      <p>City's campaign was marked by their characteristic possession-based football and clinical finishing. They accumulated 91 points, finishing just two points ahead of Arsenal, who had led the table for significant periods during the season.</p>

      <p>Key moments included their 4-1 demolition of Arsenal at the Etihad in February, a result that proved pivotal in swinging momentum back in City's favor. The team's ability to win crucial matches under pressure showcased the mentality that Guardiola has instilled in his squad.</p>

      <h2>Historic Achievement</h2>

      <p>This unprecedented fourth consecutive title breaks the previous record of three straight championships, a feat achieved by both Manchester United (1999-2001, 2007-2009) and City themselves were part of (2017-2019). The achievement places this City team among the greatest in Premier League history.</p>

      <p>Guardiola, speaking after the match, praised his players' resilience: "To win four in a row is something extraordinary. The players have shown incredible mentality and quality throughout the season. This group is special."</p>

      <h2>Key Contributors</h2>

      <p>Erling Haaland finished as the league's top scorer for the second consecutive season with 36 goals, while Kevin De Bruyne's 20 assists highlighted his continued importance to the team. The defensive partnership of Ruben Dias and Nathan Aké provided the solid foundation upon which City built their success.</p>

      <p>As City celebrates this historic achievement, attention will already be turning to whether they can make it an unprecedented five in a row next season. If this team has proven anything, it's that they should never be underestimated.</p>
    `,
  }

  // Related articles
  const relatedArticles = [
    {
      id: "2",
      title: "Arsenal's Title Challenge: What Went Wrong in the Final Stretch",
      category: "Premier League",
      image: "/arsenal-analysis.jpg",
    },
    {
      id: "3",
      title: "Guardiola's Legacy: Transforming English Football",
      category: "Tactics",
      image: "/guardiola-tactics.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <article>
          <Badge className="mb-4">{article.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{article.title}</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty">{article.excerpt}</p>

          {/* Meta Info */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <span className="font-bold text-lg">{article.author.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold">{article.author}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{article.publishedAt}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
            <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none mb-12 [&_p]:text-foreground [&_p]:leading-relaxed [&_p]:mb-6 [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Related Articles */}
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <Link key={related.id} href={`/news/${related.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-48">
                    <img
                      src={related.image || "/placeholder.svg"}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3">{related.category}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-balance">{related.title}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
