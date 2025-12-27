import { useParams, Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useBlogPost, useBlogPosts } from '../hooks/useBlogQuery'
import { useLanguage } from '../contexts/LanguageContext'

const BlogPost = () => {
  const { id } = useParams<{ id: string }>()
  const { language } = useLanguage()
  const { data: post, isLoading } = useBlogPost(id!)
  const { data: allPosts = [] } = useBlogPosts(language)

  // Похожие статьи (по тегам)
  const relatedPosts = post 
    ? allPosts
        .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
        .slice(0, 3)
    : []

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#DD0000]"></div>
            <p className="mt-4 text-gray-600">Загрузка статьи...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
            <Link to="/blog" className="text-[#DD0000] hover:underline">
              Вернуться к блогу
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Image */}
      <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] bg-gray-900">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">{post.title}</h1>
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-white text-sm sm:text-base lg:text-lg">
                <span>{post.author}</span>
                <span>•</span>
                <span className="text-xs sm:text-sm lg:text-base">{new Date(post.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Post Content */}
            <div
              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#DD0000] prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:border-l-[#DD0000]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Divider */}
            <hr className="my-8 sm:my-12 border-t-2 border-[#DD0000]" />

            {/* Back to Blog */}
            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm sm:text-base text-[#DD0000] font-semibold hover:underline"
              >
                <span>←</span>
                Вернуться к блогу
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Похожие статьи</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#DD0000] transition line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default BlogPost





