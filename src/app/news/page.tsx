import { Header } from "@/components/header"
import { FeaturedNews } from "@/components/featured-news"
import { NewsCard } from "@/components/news-card"
import { CategoryTabs } from "@/components/category-tabs"
import { Footer } from "@/components/footer"

// Mock news data
const featuredArticle = {
  id: "featured-1",
  title: "Manchester City Clinches Historic Fourth Consecutive Premier League Title",
  excerpt:
    "Pep Guardiola's side makes history with unprecedented achievement, cementing their place as one of the greatest teams in English football history.",
  category: "Premier League",
  image: "/manchester-city-celebration.jpg",
  author: "James Richardson",
  publishedAt: "2 hours ago",
  readTime: "5 min read",
}

const newsArticles = [
  {
    id: "1",
    title: "Kylian Mbappé's First Season at Real Madrid: A Tactical Analysis",
    excerpt:
      "Breaking down how the French superstar has adapted to life in La Liga and transformed Carlo Ancelotti's attacking setup.",
    category: "La Liga",
    image: "/mbappe-real-madrid.jpg",
    author: "Maria Santos",
    publishedAt: "3 hours ago",
    readTime: "7 min read",
  },
  {
    id: "2",
    title: "Inter Milan's Defensive Masterclass: Serie A's Best Backline",
    excerpt:
      "How Simone Inzaghi has built the most formidable defense in Italian football with tactical discipline and smart recruitment.",
    category: "Serie A",
    image: "/inter-milan-defense.jpg",
    author: "Alessandro Rossi",
    publishedAt: "5 hours ago",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "Summer Transfer Window: Top 10 Deals That Could Happen",
    excerpt:
      "From potential blockbuster moves to surprise transfers, we analyze the biggest transfer rumors heating up across Europe.",
    category: "Transfers",
    image: "/transfer-window.jpg",
    author: "Sarah Mitchell",
    publishedAt: "8 hours ago",
    readTime: "8 min read",
  },
  {
    id: "4",
    title: "Bayern Munich's Youth Revolution Under Vincent Kompany",
    excerpt:
      "The Belgian manager is reshaping Bayern's philosophy by promoting young talent and implementing an aggressive pressing system.",
    category: "Bundesliga",
    image: "/bayern-munich-youth.jpg",
    author: "Hans Mueller",
    publishedAt: "12 hours ago",
    readTime: "6 min read",
  },
  {
    id: "5",
    title: "Champions League Quarter-Finals: Dark Horse Teams to Watch",
    excerpt:
      "These underdog clubs have what it takes to upset the favorites and make a deep run in Europe's most prestigious competition.",
    category: "Champions League",
    image: "/champions-league-underdogs.jpg",
    author: "David Torres",
    publishedAt: "1 day ago",
    readTime: "5 min read",
  },
  {
    id: "6",
    title: "Women's Football Growth: Record Attendance Numbers Worldwide",
    excerpt:
      "The women's game continues its remarkable expansion with sold-out stadiums and increased media coverage breaking new ground.",
    category: "International",
    image: "/womens-football-growth.jpg",
    author: "Emma Thompson",
    publishedAt: "1 day ago",
    readTime: "7 min read",
  },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Latest Football News</h1>
          <p className="text-muted-foreground text-lg">Stay updated with breaking stories and in-depth analysis</p>
        </div>

        {/* Featured Article */}
        <section className="mb-12">
          <FeaturedNews {...featuredArticle} />
        </section>

        {/* Category Tabs */}
        <section className="mb-8">
          <CategoryTabs />
        </section>

        {/* News Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 rounded-lg border border-border hover:bg-accent transition-colors font-medium">
            Load More Articles
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
