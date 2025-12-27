import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useBlogPosts } from '../hooks/useBlogQuery'
import { useLanguage } from '../contexts/LanguageContext'

const Blog = () => {
  const { language } = useLanguage()
  const { data: posts = [], isLoading } = useBlogPosts(language)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('')

  // Локализация текстов
  const getTexts = () => {
    switch(language) {
      case 'ru':
        return {
          title: 'Блог и аналитика',
          subtitle: 'Изучайте наши последние статьи об обучении на основе кейсов, стратегическом мышлении и бизнес-образовании',
          loading: 'Загрузка статей...',
          searchPlaceholder: 'Поиск по статьям...',
          allTags: 'Все',
          featured: 'Избранное',
          featuredBadge: 'Избранное',
          allPosts: 'Все статьи',
          readMore: 'Читать далее',
          noResults: 'Статьи не найдены',
          noResultsText: 'Попробуйте изменить критерии поиска или выбрать другой тег'
        }
      case 'kz':
        return {
          title: 'Блог және талдау',
          subtitle: 'Кейс негізіндегі оқыту, стратегиялық ойлау және бизнес білімі туралы соңғы мақалаларымызды зерттеңіз',
          loading: 'Мақалалар жүктелуде...',
          searchPlaceholder: 'Мақалаларды іздеу...',
          allTags: 'Барлығы',
          featured: 'Таңдаулы',
          featuredBadge: 'Таңдаулы',
          allPosts: 'Барлық мақалалар',
          readMore: 'Толығырақ оқу',
          noResults: 'Мақалалар табылмады',
          noResultsText: 'Іздеу критерийлерін өзгертіп көріңіз немесе басқа тегті таңдаңыз'
        }
      case 'en':
      default:
        return {
          title: 'Blog & Insights',
          subtitle: 'Explore our latest articles on case-based learning, strategic thinking, and business education',
          loading: 'Loading articles...',
          searchPlaceholder: 'Search articles...',
          allTags: 'All',
          featured: 'Featured Posts',
          featuredBadge: 'Featured',
          allPosts: 'All Posts',
          readMore: 'Read More',
          noResults: 'No articles found',
          noResultsText: 'Try changing your search criteria or select a different tag'
        }
    }
  }

  const texts = getTexts()

  // Получаем все уникальные теги
  const allTags = useMemo(() => 
    Array.from(new Set(posts.flatMap(post => post.tags))),
    [posts]
  )

  // Фильтруем посты
  const filteredPosts = useMemo(() => posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  }), [posts, searchQuery, selectedTag])

  const featuredPosts = useMemo(() => 
    filteredPosts.filter(post => post.featured),
    [filteredPosts]
  )
  const regularPosts = useMemo(() => 
    filteredPosts.filter(post => !post.featured),
    [filteredPosts]
  )

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {texts.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700">
              {texts.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#DD0000]"></div>
              <p className="mt-4 text-gray-600">{texts.loading}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      {!isLoading && (
        <section className="py-4 sm:py-6 lg:py-8 bg-white border-b">
          <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
              {/* Search */}
              <div className="w-full md:w-80 lg:w-96">
                <input
                  type="text"
                  placeholder={texts.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DD0000]"
                />
              </div>

              {/* Tags Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                    !selectedTag
                      ? 'bg-[#DD0000] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {texts.allTags}
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                      selectedTag === tag
                        ? 'bg-[#DD0000] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        </section>
      )}

      {/* Featured Posts */}
      {!isLoading && featuredPosts.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{texts.featured}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {featuredPosts.map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition">
                      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#DD0000] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {texts.featuredBadge}
                        </div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#DD0000] transition line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {!isLoading && (
        <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {regularPosts.length === 0 && featuredPosts.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <p className="text-lg sm:text-xl text-gray-500">{texts.noResults}</p>
                <p className="text-sm sm:text-base text-gray-400 mt-2">{texts.noResultsText}</p>
              </div>
            ) : (
              <>
                {regularPosts.length > 0 && (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{texts.allPosts}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {regularPosts.map(post => (
                        <Link
                          key={post.id}
                          to={`/blog/${post.id}`}
                          className="group"
                        >
                          <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
                            <div className="relative h-40 sm:h-48 overflow-hidden">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              />
                            </div>
                            <div className="p-4 sm:p-6">
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                                <span className="truncate">{post.author}</span>
                                <span>•</span>
                                <span className="text-xs">{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                              </div>
                              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#DD0000] transition line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{post.excerpt}</p>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {post.tags.slice(0, 2).map(tag => (
                                  <span
                                    key={tag}
                                    className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm truncate"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default Blog





