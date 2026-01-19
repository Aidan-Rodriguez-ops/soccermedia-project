import { Header } from "@/components/header"
import { FeaturedNews } from "@/components/featured-news"
import { NewsCard } from "@/components/news-card"
import { CategoryTabs } from "@/components/category-tabs"
import { Footer } from "@/components/footer"
import { getFeaturedArticle, getArticles } from "@/lib/supabase-queries"

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) return "Just now"
  if (diffHours < 24) return `${diffHours} hours ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return "1 day ago"
  return `${diffDays} days ago`
}

export default async function NewsPage() {
  const featuredArticle = await getFeaturedArticle()
  const newsArticles = await getArticles(6)

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
        {featuredArticle ? (
          <section className="mb-12">
            <FeaturedNews
              id={featuredArticle.id}
              title={featuredArticle.title}
              excerpt={featuredArticle.excerpt}
              category={featuredArticle.category}
              image={featuredArticle.image_url || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&h=900&fit=crop"}
              author={featuredArticle.author}
              publishedAt={formatTimeAgo(featuredArticle.published_at)}
              readTime={featuredArticle.read_time || "5 min read"}
            />
          </section>
        ) : null}

        {/* Category Tabs */}
        <section className="mb-8">
          <CategoryTabs />
        </section>

        {/* News Grid */}
        <section>
          {newsArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  image={article.image_url || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop"}
                  author={article.author}
                  publishedAt={formatTimeAgo(article.published_at)}
                  readTime={article.read_time || "5 min read"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles available yet. Check back soon!</p>
            </div>
          )}
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
