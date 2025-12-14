import { useState, useEffect } from 'react'
import { useContent, useUpdateContent, useResetContent } from '../hooks/useContentQuery'
import { useBlogPosts, useCreatePost, useUpdatePost, useDeletePost } from '../hooks/useBlogQuery'
import { useContactSubmissions, useUpdateSubmissionStatus, useDeleteSubmission } from '../hooks/useContactSubmissions'
import { defaultContent } from '../types/content'
import ImageUpload from '../components/ImageUpload'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

type Language = 'ru' | 'en' | 'kz'

const Admin = () => {
  const [adminLanguage, setAdminLanguage] = useState<Language>('ru')
  const { data: content = defaultContent } = useContent(adminLanguage)
  const updateContentMutation = useUpdateContent(adminLanguage)
  const resetContentMutation = useResetContent(adminLanguage)
  const { data: posts = [] } = useBlogPosts(adminLanguage)
  const createPostMutation = useCreatePost(adminLanguage)
  const updatePostMutation = useUpdatePost(adminLanguage)
  const deletePostMutation = useDeletePost(adminLanguage)
  const { data: submissions = [] } = useContactSubmissions()
  const [activeSection, setActiveSection] = useState('hero')
  const [activePage, setActivePage] = useState('home')
  const [expandedPages, setExpandedPages] = useState<string[]>(['home'])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string>('')

  // Проверка сессии при загрузке
  useEffect(() => {
    const checkSession = async () => {
      if (!isSupabaseConfigured) {
        setIsLoading(false)
        setError('Supabase не настроен. Проверьте переменные окружения.')
        return
      }

      try {
        const { data: { session } } = await supabase!.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error('Ошибка проверки сессии:', err)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    // Слушаем изменения аутентификации
    const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const togglePage = (pageId: string) => {
    setExpandedPages(prev => 
      prev.includes(pageId) 
        ? prev.filter(id => id !== pageId)
        : [...prev, pageId]
    )
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isSupabaseConfigured) {
      setError('Supabase не настроен. Проверьте переменные окружения.')
      return
    }

    if (!email || !password) {
      setError('Введите email и пароль')
      return
    }

    try {
      const { data, error: authError } = await supabase!.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message || 'Неверный email или пароль')
        return
      }

      if (data.user) {
        setUser(data.user)
        setIsAuthenticated(true)
        setEmail('')
        setPassword('')
      }
    } catch (err) {
      console.error('Ошибка входа:', err)
      setError('Произошла ошибка при входе')
    }
  }

  const handleLogout = async () => {
    if (!isSupabaseConfigured) return

    try {
      await supabase!.auth.signOut()
      setUser(null)
      setIsAuthenticated(false)
    } catch (err) {
      console.error('Ошибка выхода:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inteca-red mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6">Админ-панель INTECA</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-inteca-red"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-inteca-red"
                required
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-inteca-red text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  const languageNames = {
    ru: 'Русский',
    en: 'English',
    kz: 'Қазақша'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Админ-панель INTECA</h1>
            <div className="flex gap-4 items-center">
              {/* Переключатель языка для админки */}
              <div className="flex items-center gap-2 border-r pr-4">
                <span className="text-sm text-gray-600">Язык контента:</span>
                <select
                  value={adminLanguage}
                  onChange={(e) => setAdminLanguage(e.target.value as Language)}
                  className="px-3 py-2 border rounded bg-white hover:border-inteca-red transition"
                >
                  <option value="ru">🇷🇺 Русский</option>
                  <option value="en">🇬🇧 English</option>
                  <option value="kz">🇰🇿 Қазақша</option>
                </select>
              </div>
              
              {user && (
                <span className="text-sm text-gray-600 border-r pr-4">
                  {user.email}
                </span>
              )}
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                На сайт
              </button>
              <button
                onClick={async () => {
                  if (confirm(`Сбросить все изменения для языка "${languageNames[adminLanguage]}"?`)) {
                    try {
                      await resetContentMutation.mutateAsync()
                      alert('Контент сброшен')
                    } catch (error) {
                      alert('Ошибка при сбросе')
                    }
                  }
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                disabled={resetContentMutation.isPending}
              >
                {resetContentMutation.isPending ? 'Сброс...' : 'Сбросить'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Выйти
              </button>
            </div>
          </div>
          
          {/* Подсказка о выбранном языке */}
          <div className="mt-2 text-sm text-gray-600">
            Редактируете контент для: <span className="font-semibold text-inteca-red">{languageNames[adminLanguage]}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white p-4 rounded-lg shadow-md h-fit">
            <h2 className="font-bold mb-4 text-lg">Страницы сайта</h2>
            <nav className="space-y-1">
              {/* Главная страница */}
              <div>
                <button
                  onClick={() => togglePage('home')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded font-semibold bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2">
                    <span>🏠</span>
                    <span>Главная страница</span>
                  </span>
                  <span className="text-gray-500">
                    {expandedPages.includes('home') ? '▼' : '▶'}
                  </span>
                </button>
                
                {expandedPages.includes('home') && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {[
                      { id: 'hero', name: 'Hero Section', icon: '🎯' },
                      { id: 'benefits', name: 'Program Benefits', icon: '✨' },
                      { id: 'who', name: 'Who Program For', icon: '👥' },
                      { id: 'case', name: 'Case-Based Learning', icon: '📚' },
                      { id: 'key', name: 'Key Benefits', icon: '🎨' },
                      { id: 'founder', name: 'Founder', icon: '👤' },
                      { id: 'cta', name: 'CTA Banner', icon: '📢' },
                    ].map(section => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id)
                          setActivePage('home')
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition flex items-center gap-2 ${
                          activeSection === section.id && activePage === 'home'
                            ? 'bg-inteca-red text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{section.icon}</span>
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* About страница */}
              <div>
                <button
                  onClick={() => togglePage('about')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded font-semibold bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2">
                    <span>ℹ️</span>
                    <span>О программе</span>
                  </span>
                  <span className="text-gray-500">
                    {expandedPages.includes('about') ? '▼' : '▶'}
                  </span>
                </button>
                
                {expandedPages.includes('about') && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {[
                      { id: 'about-hero', name: 'Hero', icon: '🎯' },
                      { id: 'about-challenges', name: 'Management Challenges', icon: '💼' },
                      { id: 'about-formats', name: 'Flexible Formats', icon: '📋' },
                      { id: 'about-completing', name: 'After Completing', icon: '🎓' },
                      { id: 'about-competencies', name: 'Core Competencies', icon: '⭐' },
                    ].map(section => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id)
                          setActivePage('about')
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition flex items-center gap-2 ${
                          activeSection === section.id && activePage === 'about'
                            ? 'bg-inteca-red text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{section.icon}</span>
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Founder страница */}
              <div>
                <button
                  onClick={() => togglePage('founder')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded font-semibold bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2">
                    <span>👤</span>
                    <span>Основатель</span>
                  </span>
                  <span className="text-gray-500">
                    {expandedPages.includes('founder') ? '▼' : '▶'}
                  </span>
                </button>
                
                {expandedPages.includes('founder') && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {[
                      { id: 'founder-hero', name: 'Hero', icon: '🎯' },
                      { id: 'founder-practitioner', name: 'Practitioner Section', icon: '📚' },
                      { id: 'founder-cards', name: 'Cards', icon: '🃏' },
                      { id: 'founder-biography', name: 'Biography', icon: '📖' },
                    ].map(section => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id)
                          setActivePage('founder')
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition flex items-center gap-2 ${
                          activeSection === section.id && activePage === 'founder'
                            ? 'bg-inteca-red text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{section.icon}</span>
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Methodology & Cases страница */}
              <div>
                <button
                  onClick={() => togglePage('methodology')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded font-semibold bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2">
                    <span>📊</span>
                    <span>Methodology & Cases</span>
                  </span>
                  <span className="text-gray-500">
                    {expandedPages.includes('methodology') ? '▼' : '▶'}
                  </span>
                </button>
                
                {expandedPages.includes('methodology') && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {[
                      { id: 'methodology-hero', name: 'Hero', icon: '🎯' },
                      { id: 'methodology-benefits', name: 'Benefits', icon: '✨' },
                      { id: 'methodology-cases', name: 'Cases', icon: '📚' },
                    ].map(section => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id)
                          setActivePage('methodology')
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition flex items-center gap-2 ${
                          activeSection === section.id && activePage === 'methodology'
                            ? 'bg-inteca-red text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{section.icon}</span>
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* For Universities страница */}
              <div>
                <button
                  onClick={() => togglePage('forUniversities')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded font-semibold bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2">
                    <span>🏛️</span>
                    <span>For Universities</span>
                  </span>
                  <span className="text-gray-500">
                    {expandedPages.includes('forUniversities') ? '▼' : '▶'}
                  </span>
                </button>
                
                {expandedPages.includes('forUniversities') && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {[
                      { id: 'for-universities-hero', name: 'Hero', icon: '🎯' },
                      { id: 'for-universities-benefits', name: 'Benefits', icon: '✨' },
                      { id: 'for-universities-formats', name: 'Integration Formats', icon: '📋' },
                      { id: 'for-universities-process', name: 'Process Steps', icon: '⚙️' },
                      { id: 'for-universities-cta', name: 'CTA', icon: '📢' },
                    ].map(section => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id)
                          setActivePage('forUniversities')
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition flex items-center gap-2 ${
                          activeSection === section.id && activePage === 'forUniversities'
                            ? 'bg-inteca-red text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{section.icon}</span>
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* For Corporate Clients страница */}
              <div>
                <button
                  onClick={() => togglePage('forCorporateClients')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded font-semibold bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2">
                    <span>🏢</span>
                    <span>For Corporate Clients</span>
                  </span>
                  <span className="text-gray-500">
                    {expandedPages.includes('forCorporateClients') ? '▼' : '▶'}
                  </span>
                </button>
                
                {expandedPages.includes('forCorporateClients') && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {[
                      { id: 'for-corporate-hero', name: 'Hero', icon: '🎯' },
                      { id: 'for-corporate-why', name: 'Why Case Method', icon: '💡' },
                      { id: 'for-corporate-formats', name: 'Training Formats', icon: '📋' },
                      { id: 'for-corporate-samples', name: 'Sample Cases', icon: '📚' },
                      { id: 'for-corporate-results', name: 'Business Results', icon: '📊' },
                      { id: 'for-corporate-cta', name: 'CTA', icon: '📢' },
                    ].map(section => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id)
                          setActivePage('forCorporateClients')
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition flex items-center gap-2 ${
                          activeSection === section.id && activePage === 'forCorporateClients'
                            ? 'bg-inteca-red text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{section.icon}</span>
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Блог */}
              <div>
                <button
                  onClick={() => {
                    setActiveSection('blog')
                    setActivePage('blog')
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded font-semibold transition ${
                    activePage === 'blog'
                      ? 'bg-inteca-red text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>📝</span>
                    <span>Блог</span>
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activePage === 'blog' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {posts.length}
                  </span>
                </button>
              </div>

              {/* Заявки */}
              <div>
                <button
                  onClick={() => {
                    setActiveSection('submissions')
                    setActivePage('submissions')
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded font-semibold transition ${
                    activePage === 'submissions'
                      ? 'bg-inteca-red text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>📬</span>
                    <span>Заявки</span>
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activePage === 'submissions' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {submissions.length}
                  </span>
                </button>
              </div>

              {/* Placeholder для будущих страниц */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <button
                  disabled
                  className="w-full px-4 py-3 rounded font-semibold bg-gray-100 text-gray-400 cursor-not-allowed text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span>➕</span>
                    <span>Добавить страницу</span>
                  </span>
                </button>
                <p className="text-xs text-gray-500 mt-2 px-2">
                  Здесь будут дополнительные страницы
                </p>
              </div>
            </nav>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
            {activeSection === 'hero' && (
              <HeroEditor content={content} updateContent={updateContentMutation} />
            )}
            {activeSection === 'benefits' && (
              <BenefitsEditor content={content} updateContent={updateContentMutation} />
            )}
            {activeSection === 'who' && (
              <WhoEditor content={content} updateContent={updateContentMutation} />
            )}
            {activeSection === 'case' && (
              <CaseEditor content={content} updateContent={updateContentMutation} />
            )}
            {activeSection === 'key' && (
              <KeyEditor content={content} updateContent={updateContentMutation} />
            )}
            {activeSection === 'founder' && (
              <FounderEditor content={content} updateContent={updateContentMutation} />
            )}
            {activeSection === 'cta' && (
              <CTAEditor content={content} updateContent={updateContentMutation} />
            )}
            {activeSection === 'about-hero' && content.about && (
              <div>
                <h2 className="text-xl font-bold mb-4">About Hero Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок</label>
                    <input
                      type="text"
                      value={content.about.hero.title}
                      onChange={(e) => updateContentMutation.mutate({ 
                        about: { ...content.about, hero: { ...content.about.hero, title: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Описание</label>
                    <textarea
                      value={content.about.hero.description}
                      onChange={(e) => updateContentMutation.mutate({ 
                        about: { ...content.about, hero: { ...content.about.hero, description: e.target.value } } 
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Формула (через →)</label>
                    <input
                      type="text"
                      value={content.about.hero.formula}
                      onChange={(e) => updateContentMutation.mutate({ 
                        about: { ...content.about, hero: { ...content.about.hero, formula: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    ⚠️ Заголовки секций ("О программе", "The program covers...") переводятся автоматически на стороне сайта
                  </p>
                </div>
              </div>
            )}
            {activeSection === 'about-challenges' && content.about && (
              <div>
                <h2 className="text-xl font-bold mb-4">Management Challenges</h2>
                <p className="text-sm text-gray-600 mb-4">Редактирование челленджей</p>
                {content.about.managementChallenges.map((challenge, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <div className="mb-2">
                      <label className="block mb-1 font-semibold text-sm">Заголовок</label>
                      <input
                        type="text"
                        value={challenge.title}
                        onChange={(e) => {
                          const updated = [...content.about!.managementChallenges]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ about: { ...content.about, managementChallenges: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-sm">Описание</label>
                      <input
                        type="text"
                        value={challenge.description}
                        onChange={(e) => {
                          const updated = [...content.about!.managementChallenges]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ about: { ...content.about, managementChallenges: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'about-formats' && content.about && (
              <div>
                <h2 className="text-xl font-bold mb-4">Flexible Formats</h2>
                <p className="text-sm text-gray-600 mb-4">Форматы обучения (всего: {content.about.flexibleFormats.length})</p>
                <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded mb-4">
                  ℹ️ Редактирование форматов требует сложной структуры данных. Используйте SQL миграцию для изменения.
                </div>
              </div>
            )}
            {activeSection === 'about-completing' && content.about && (
              <div>
                <h2 className="text-xl font-bold mb-4">After Completing</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок</label>
                    <input
                      type="text"
                      value={content.about.afterCompleting.title}
                      onChange={(e) => updateContentMutation.mutate({ 
                        about: { ...content.about, afterCompleting: { ...content.about.afterCompleting, title: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Описание</label>
                    <textarea
                      value={content.about.afterCompleting.description}
                      onChange={(e) => updateContentMutation.mutate({ 
                        about: { ...content.about, afterCompleting: { ...content.about.afterCompleting, description: e.target.value } } 
                      })}
                      rows={5}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Текст кнопки</label>
                    <input
                      type="text"
                      value={content.about.afterCompleting.buttonText}
                      onChange={(e) => updateContentMutation.mutate({ 
                        about: { ...content.about, afterCompleting: { ...content.about.afterCompleting, buttonText: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'about-competencies' && content.about && (
              <div>
                <h2 className="text-xl font-bold mb-4">Core Competencies</h2>
                <p className="text-sm text-gray-600 mb-4">Ключевые компетенции (всего: {content.about.coreCompetencies.length})</p>
                {content.about.coreCompetencies.map((comp, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <div>
                        <label className="block mb-1 font-semibold text-sm">Категория</label>
                        <input
                          type="text"
                          value={comp.category}
                          onChange={(e) => {
                            const updated = [...content.about!.coreCompetencies]
                            updated[index] = { ...updated[index], category: e.target.value }
                            updateContentMutation.mutate({ about: { ...content.about, coreCompetencies: updated } })
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-sm">Главный заголовок</label>
                        <input
                          type="text"
                          value={comp.mainTitle}
                          onChange={(e) => {
                            const updated = [...content.about!.coreCompetencies]
                            updated[index] = { ...updated[index], mainTitle: e.target.value }
                            updateContentMutation.mutate({ about: { ...content.about, coreCompetencies: updated } })
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className="block mb-1 font-semibold text-sm">Подзаголовок</label>
                      <input
                        type="text"
                        value={comp.subtitle}
                        onChange={(e) => {
                          const updated = [...content.about!.coreCompetencies]
                          updated[index] = { ...updated[index], subtitle: e.target.value }
                          updateContentMutation.mutate({ about: { ...content.about, coreCompetencies: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block mb-1 font-semibold text-sm">Описание</label>
                      <textarea
                        value={comp.description}
                        onChange={(e) => {
                          const updated = [...content.about!.coreCompetencies]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ about: { ...content.about, coreCompetencies: updated } })
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-sm">Текст ссылки</label>
                      <input
                        type="text"
                        value={comp.linkText}
                        onChange={(e) => {
                          const updated = [...content.about!.coreCompetencies]
                          updated[index] = { ...updated[index], linkText: e.target.value }
                          updateContentMutation.mutate({ about: { ...content.about, coreCompetencies: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'founder-hero' && content.founderPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Founder Hero Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок</label>
                    <input
                      type="text"
                      value={content.founderPage.hero.title}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, hero: { ...content.founderPage.hero, title: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Описание</label>
                    <textarea
                      value={content.founderPage.hero.description}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, hero: { ...content.founderPage.hero, description: e.target.value } } 
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Дополнительное описание</label>
                    <textarea
                      value={content.founderPage.hero.secondaryDescription}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, hero: { ...content.founderPage.hero, secondaryDescription: e.target.value } } 
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Key Facts (по одному на строку)</label>
                    {content.founderPage.hero.keyFacts.map((fact, index) => (
                      <input
                        key={index}
                        type="text"
                        value={fact}
                        onChange={(e) => {
                          const updated = [...content.founderPage!.hero.keyFacts]
                          updated[index] = e.target.value
                          updateContentMutation.mutate({ 
                            founderPage: { ...content.founderPage, hero: { ...content.founderPage.hero, keyFacts: updated } } 
                          })
                        }}
                        className="w-full px-4 py-2 border rounded mb-2"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'founder-practitioner' && content.founderPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Practitioner Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок (строка 1)</label>
                    <input
                      type="text"
                      value={content.founderPage.practitionerTitle}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, practitionerTitle: e.target.value } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Подзаголовок (строка 2)</label>
                    <input
                      type="text"
                      value={content.founderPage.practitionerSubtitle}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, practitionerSubtitle: e.target.value } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Описание (черный блок)</label>
                    <textarea
                      value={content.founderPage.practitionerDescription}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, practitionerDescription: e.target.value } 
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'founder-cards' && content.founderPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Founder Cards</h2>
                <p className="text-sm text-gray-600 mb-4">Карточки с достижениями (всего: {content.founderPage.cards.length})</p>
                {content.founderPage.cards.map((card, index) => (
                  <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                    <div className="mb-2">
                      <label className="block mb-1 font-semibold text-sm">Заголовок</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const updated = [...content.founderPage!.cards]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ founderPage: { ...content.founderPage, cards: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block mb-1 font-semibold text-sm">Описание</label>
                      <textarea
                        value={card.description}
                        onChange={(e) => {
                          const updated = [...content.founderPage!.cards]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ founderPage: { ...content.founderPage, cards: updated } })
                        }}
                        rows={4}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-sm">Текст ссылки</label>
                      <input
                        type="text"
                        value={card.linkText}
                        onChange={(e) => {
                          const updated = [...content.founderPage!.cards]
                          updated[index] = { ...updated[index], linkText: e.target.value }
                          updateContentMutation.mutate({ founderPage: { ...content.founderPage, cards: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'founder-biography' && content.founderPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Biography Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок</label>
                    <input
                      type="text"
                      value={content.founderPage.biography.title}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, biography: { ...content.founderPage.biography, title: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Параграф 1</label>
                    <textarea
                      value={content.founderPage.biography.paragraph1}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, biography: { ...content.founderPage.biography, paragraph1: e.target.value } } 
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Параграф 2</label>
                    <textarea
                      value={content.founderPage.biography.paragraph2}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, biography: { ...content.founderPage.biography, paragraph2: e.target.value } } 
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Текст в черном блоке снизу</label>
                    <textarea
                      value={content.founderPage.biography.bottomText}
                      onChange={(e) => updateContentMutation.mutate({ 
                        founderPage: { ...content.founderPage, biography: { ...content.founderPage.biography, bottomText: e.target.value } } 
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'methodology-hero' && content.methodologyPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Methodology Hero Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок</label>
                    <textarea
                      value={content.methodologyPage.hero.title}
                      onChange={(e) => updateContentMutation.mutate({ 
                        methodologyPage: { ...content.methodologyPage, hero: { ...content.methodologyPage.hero, title: e.target.value } } 
                      })}
                      rows={2}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Описание</label>
                    <textarea
                      value={content.methodologyPage.hero.description}
                      onChange={(e) => updateContentMutation.mutate({ 
                        methodologyPage: { ...content.methodologyPage, hero: { ...content.methodologyPage.hero, description: e.target.value } } 
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Текст кнопки</label>
                    <input
                      type="text"
                      value={content.methodologyPage.hero.buttonText}
                      onChange={(e) => updateContentMutation.mutate({ 
                        methodologyPage: { ...content.methodologyPage, hero: { ...content.methodologyPage.hero, buttonText: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'methodology-benefits' && content.methodologyPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Methodology Benefits</h2>
                <p className="text-sm text-gray-600 mb-4">Преимущества методологии (всего: {content.methodologyPage.benefits.length})</p>
                {content.methodologyPage.benefits.map((benefit, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <div className="mb-2">
                      <label className="block mb-1 font-semibold text-sm">Заголовок</label>
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) => {
                          const updated = [...content.methodologyPage!.benefits]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ methodologyPage: { ...content.methodologyPage, benefits: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-sm">Описание</label>
                      <textarea
                        value={benefit.description}
                        onChange={(e) => {
                          const updated = [...content.methodologyPage!.benefits]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ methodologyPage: { ...content.methodologyPage, benefits: updated } })
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'methodology-cases' && content.methodologyPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Methodology Cases</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Заголовок секции</label>
                  <input
                    type="text"
                    value={content.methodologyPage.casesTitle}
                    onChange={(e) => updateContentMutation.mutate({ 
                      methodologyPage: { ...content.methodologyPage, casesTitle: e.target.value } 
                    })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">Кейсы (всего: {content.methodologyPage.cases.length})</p>
                {content.methodologyPage.cases.map((caseItem, index) => (
                  <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Заголовок</label>
                      <input
                        type="text"
                        value={caseItem.title}
                        onChange={(e) => {
                          const updated = [...content.methodologyPage!.cases]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ methodologyPage: { ...content.methodologyPage, cases: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Описание (краткое, для карточки)</label>
                      <textarea
                        value={caseItem.description}
                        onChange={(e) => {
                          const updated = [...content.methodologyPage!.cases]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ methodologyPage: { ...content.methodologyPage, cases: updated } })
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Детальное описание (для модального окна)</label>
                      <textarea
                        value={caseItem.detailedDescription || ''}
                        onChange={(e) => {
                          const updated = [...content.methodologyPage!.cases]
                          updated[index] = { ...updated[index], detailedDescription: e.target.value }
                          updateContentMutation.mutate({ methodologyPage: { ...content.methodologyPage, cases: updated } })
                        }}
                        rows={5}
                        className="w-full px-3 py-2 border rounded text-sm"
                        placeholder="Подробное описание, которое отображается в модальном окне"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Key Facts (каждый факт с новой строки)</label>
                      <textarea
                        value={caseItem.keyFacts?.join('\n') || ''}
                        onChange={(e) => {
                          const updated = [...content.methodologyPage!.cases]
                          const keyFacts = e.target.value.split('\n').filter(line => line.trim() !== '')
                          updated[index] = { ...updated[index], keyFacts }
                          updateContentMutation.mutate({ methodologyPage: { ...content.methodologyPage, cases: updated } })
                        }}
                        rows={4}
                        className="w-full px-3 py-2 border rounded text-sm"
                        placeholder="Каждый факт с новой строки"
                      />
                      <p className="text-xs text-gray-500 mt-1">Текущее количество фактов: {caseItem.keyFacts?.length || 0}</p>
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Call to Action (текст внизу модального окна)</label>
                      <textarea
                        value={caseItem.callToAction || ''}
                        onChange={(e) => {
                          const updated = [...content.methodologyPage!.cases]
                          updated[index] = { ...updated[index], callToAction: e.target.value }
                          updateContentMutation.mutate({ methodologyPage: { ...content.methodologyPage, cases: updated } })
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border rounded text-sm"
                        placeholder="Призыв к действию в нижней части модального окна"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-sm">Текст ссылки (кнопка "More Info")</label>
                      <input
                        type="text"
                        value={caseItem.linkText}
                        onChange={(e) => {
                          const updated = [...content.methodologyPage!.cases]
                          updated[index] = { ...updated[index], linkText: e.target.value }
                          updateContentMutation.mutate({ methodologyPage: { ...content.methodologyPage, cases: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'for-universities-hero' && content.forUniversitiesPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">For Universities Hero Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок</label>
                    <input
                      type="text"
                      value={content.forUniversitiesPage.hero.title}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forUniversitiesPage: { ...content.forUniversitiesPage, hero: { ...content.forUniversitiesPage.hero, title: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Описание</label>
                    <textarea
                      value={content.forUniversitiesPage.hero.description}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forUniversitiesPage: { ...content.forUniversitiesPage, hero: { ...content.forUniversitiesPage.hero, description: e.target.value } } 
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'for-universities-benefits' && content.forUniversitiesPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Benefits Section</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Заголовок секции</label>
                  <input
                    type="text"
                    value={content.forUniversitiesPage.benefitsTitle}
                    onChange={(e) => updateContentMutation.mutate({ 
                      forUniversitiesPage: { ...content.forUniversitiesPage, benefitsTitle: e.target.value } 
                    })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">Benefits (всего: {content.forUniversitiesPage.benefits.length})</p>
                {content.forUniversitiesPage.benefits.map((benefit, index) => (
                  <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Заголовок</label>
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) => {
                          const updated = [...content.forUniversitiesPage!.benefits]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, benefits: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Описание</label>
                      <textarea
                        value={benefit.description}
                        onChange={(e) => {
                          const updated = [...content.forUniversitiesPage!.benefits]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, benefits: updated } })
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Список (каждый пункт с новой строки, опционально)</label>
                      <textarea
                        value={benefit.list?.join('\n') || ''}
                        onChange={(e) => {
                          const updated = [...content.forUniversitiesPage!.benefits]
                          const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                          updated[index] = { ...updated[index], list: list.length > 0 ? list : undefined }
                          updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, benefits: updated } })
                        }}
                        rows={4}
                        className="w-full px-3 py-2 border rounded text-sm"
                        placeholder="Каждый пункт с новой строки (оставьте пустым, если список не нужен)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'for-universities-formats' && content.forUniversitiesPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Integration Formats</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Заголовок секции</label>
                  <input
                    type="text"
                    value={content.forUniversitiesPage.integrationFormatsTitle}
                    onChange={(e) => updateContentMutation.mutate({ 
                      forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormatsTitle: e.target.value } 
                    })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">Форматы (всего: {content.forUniversitiesPage.integrationFormats.length})</p>
                {content.forUniversitiesPage.integrationFormats.map((format, index) => (
                  <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Название формата</label>
                      <input
                        type="text"
                        value={format.title}
                        onChange={(e) => {
                          const updated = [...content.forUniversitiesPage!.integrationFormats]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Best for (заголовок)</label>
                      <input
                        type="text"
                        value={format.bestFor}
                        onChange={(e) => {
                          const updated = [...content.forUniversitiesPage!.integrationFormats]
                          updated[index] = { ...updated[index], bestFor: e.target.value }
                          updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Best for (текст)</label>
                      <input
                        type="text"
                        value={format.bestForText}
                        onChange={(e) => {
                          const updated = [...content.forUniversitiesPage!.integrationFormats]
                          updated[index] = { ...updated[index], bestForText: e.target.value }
                          updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Описание</label>
                      <textarea
                        value={format.description}
                        onChange={(e) => {
                          const updated = [...content.forUniversitiesPage!.integrationFormats]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    {/* Дополнительные поля для разных форматов */}
                    {format.howUsed && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">How Used (заголовок)</label>
                        <input
                          type="text"
                          value={format.howUsed.header}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            updated[index] = { ...updated[index], howUsed: { ...format.howUsed!, header: e.target.value } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                        <label className="block mb-1 font-semibold text-sm mt-2">How Used (список)</label>
                        <textarea
                          value={format.howUsed.list.join('\n')}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                            updated[index] = { ...updated[index], howUsed: { ...format.howUsed!, list } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          rows={4}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                    {format.whatWeManage && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">What We Manage (заголовок)</label>
                        <input
                          type="text"
                          value={format.whatWeManage.header}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            updated[index] = { ...updated[index], whatWeManage: { ...format.whatWeManage!, header: e.target.value } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                        <label className="block mb-1 font-semibold text-sm mt-2">What We Manage (список)</label>
                        <textarea
                          value={format.whatWeManage.list.join('\n')}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                            updated[index] = { ...updated[index], whatWeManage: { ...format.whatWeManage!, list } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          rows={4}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                    {format.themes && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">Themes (заголовок)</label>
                        <input
                          type="text"
                          value={format.themes.header}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            updated[index] = { ...updated[index], themes: { ...format.themes!, header: e.target.value } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                        <label className="block mb-1 font-semibold text-sm mt-2">Themes (список)</label>
                        <textarea
                          value={format.themes.list.join('\n')}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                            updated[index] = { ...updated[index], themes: { ...format.themes!, list } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          rows={4}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                    {format.idealUses && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">Ideal Uses (заголовок)</label>
                        <input
                          type="text"
                          value={format.idealUses.header}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            updated[index] = { ...updated[index], idealUses: { ...format.idealUses!, header: e.target.value } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                        <label className="block mb-1 font-semibold text-sm mt-2">Ideal Uses (список)</label>
                        <textarea
                          value={format.idealUses.list.join('\n')}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                            updated[index] = { ...updated[index], idealUses: { ...format.idealUses!, list } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          rows={4}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                    {format.integration && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">Integration (заголовок)</label>
                        <input
                          type="text"
                          value={format.integration.header}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            updated[index] = { ...updated[index], integration: { ...format.integration!, header: e.target.value } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                        <label className="block mb-1 font-semibold text-sm mt-2">Integration (список)</label>
                        <textarea
                          value={format.integration.list.join('\n')}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                            updated[index] = { ...updated[index], integration: { ...format.integration!, list } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          rows={4}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                    {format.includes && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">Includes (заголовок)</label>
                        <input
                          type="text"
                          value={format.includes.header}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            updated[index] = { ...updated[index], includes: { ...format.includes!, header: e.target.value } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                        <label className="block mb-1 font-semibold text-sm mt-2">Includes (список)</label>
                        <textarea
                          value={format.includes.list.join('\n')}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                            updated[index] = { ...updated[index], includes: { ...format.includes!, list } }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          rows={4}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                    {format.note && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">Примечание</label>
                        <textarea
                          value={format.note}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.integrationFormats]
                            updated[index] = { ...updated[index], note: e.target.value }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, integrationFormats: updated } })
                          }}
                          rows={2}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'for-universities-process' && content.forUniversitiesPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Process Steps</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Заголовок секции</label>
                  <input
                    type="text"
                    value={content.forUniversitiesPage.processTitle}
                    onChange={(e) => updateContentMutation.mutate({ 
                      forUniversitiesPage: { ...content.forUniversitiesPage, processTitle: e.target.value } 
                    })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">Шаги процесса (всего: {content.forUniversitiesPage.processSteps.length})</p>
                {content.forUniversitiesPage.processSteps.map((step, index) => (
                  <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Название шага</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const updated = [...content.forUniversitiesPage!.processSteps]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, processSteps: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    {step.header && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">Заголовок</label>
                        <input
                          type="text"
                          value={step.header}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.processSteps]
                            updated[index] = { ...updated[index], header: e.target.value }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, processSteps: updated } })
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                    {step.description && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">Описание</label>
                        <textarea
                          value={step.description}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.processSteps]
                            updated[index] = { ...updated[index], description: e.target.value }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, processSteps: updated } })
                          }}
                          rows={3}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                    {step.list && (
                      <div className="mb-3">
                        <label className="block mb-1 font-semibold text-sm">Список (каждый пункт с новой строки)</label>
                        <textarea
                          value={step.list.join('\n')}
                          onChange={(e) => {
                            const updated = [...content.forUniversitiesPage!.processSteps]
                            const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                            updated[index] = { ...updated[index], list: list.length > 0 ? list : undefined }
                            updateContentMutation.mutate({ forUniversitiesPage: { ...content.forUniversitiesPage, processSteps: updated } })
                          }}
                          rows={4}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'for-universities-cta' && content.forUniversitiesPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">CTA Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок</label>
                    <textarea
                      value={content.forUniversitiesPage.cta.title}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forUniversitiesPage: { ...content.forUniversitiesPage, cta: { ...content.forUniversitiesPage.cta, title: e.target.value } } 
                      })}
                      rows={2}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Подзаголовок</label>
                    <textarea
                      value={content.forUniversitiesPage.cta.subtitle}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forUniversitiesPage: { ...content.forUniversitiesPage, cta: { ...content.forUniversitiesPage.cta, subtitle: e.target.value } } 
                      })}
                      rows={2}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Текст кнопки</label>
                    <input
                      type="text"
                      value={content.forUniversitiesPage.cta.buttonText}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forUniversitiesPage: { ...content.forUniversitiesPage, cta: { ...content.forUniversitiesPage.cta, buttonText: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'for-corporate-hero' && content.forCorporateClientsPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">For Corporate Clients Hero Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок</label>
                    <input
                      type="text"
                      value={content.forCorporateClientsPage.hero.title}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forCorporateClientsPage: { ...content.forCorporateClientsPage, hero: { ...content.forCorporateClientsPage.hero, title: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Подзаголовок</label>
                    <input
                      type="text"
                      value={content.forCorporateClientsPage.hero.subtitle}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forCorporateClientsPage: { ...content.forCorporateClientsPage, hero: { ...content.forCorporateClientsPage.hero, subtitle: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Описание</label>
                    <textarea
                      value={content.forCorporateClientsPage.hero.description}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forCorporateClientsPage: { ...content.forCorporateClientsPage, hero: { ...content.forCorporateClientsPage.hero, description: e.target.value } } 
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'for-corporate-why' && content.forCorporateClientsPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Why the Case Method Works</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Заголовок</label>
                    <input
                      type="text"
                      value={content.forCorporateClientsPage.whyCaseMethodWorks.title}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forCorporateClientsPage: { ...content.forCorporateClientsPage, whyCaseMethodWorks: { ...content.forCorporateClientsPage.whyCaseMethodWorks, title: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Описание</label>
                    <textarea
                      value={content.forCorporateClientsPage.whyCaseMethodWorks.description}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forCorporateClientsPage: { ...content.forCorporateClientsPage, whyCaseMethodWorks: { ...content.forCorporateClientsPage.whyCaseMethodWorks, description: e.target.value } } 
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Список (каждый пункт с новой строки)</label>
                    <textarea
                      value={content.forCorporateClientsPage.whyCaseMethodWorks.list.join('\n')}
                      onChange={(e) => {
                        const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                        updateContentMutation.mutate({ 
                          forCorporateClientsPage: { ...content.forCorporateClientsPage, whyCaseMethodWorks: { ...content.forCorporateClientsPage.whyCaseMethodWorks, list } } 
                        })
                      }}
                      rows={6}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Заключение</label>
                    <textarea
                      value={content.forCorporateClientsPage.whyCaseMethodWorks.conclusion}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forCorporateClientsPage: { ...content.forCorporateClientsPage, whyCaseMethodWorks: { ...content.forCorporateClientsPage.whyCaseMethodWorks, conclusion: e.target.value } } 
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'for-corporate-formats' && content.forCorporateClientsPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Training Formats</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Заголовок секции</label>
                  <input
                    type="text"
                    value={content.forCorporateClientsPage.trainingFormatsTitle}
                    onChange={(e) => updateContentMutation.mutate({ 
                      forCorporateClientsPage: { ...content.forCorporateClientsPage, trainingFormatsTitle: e.target.value } 
                    })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">Форматы (всего: {content.forCorporateClientsPage.trainingFormats.length})</p>
                {content.forCorporateClientsPage.trainingFormats.map((format, index) => (
                  <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Название формата</label>
                      <input
                        type="text"
                        value={format.title}
                        onChange={(e) => {
                          const updated = [...content.forCorporateClientsPage!.trainingFormats]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, trainingFormats: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Описание</label>
                      <textarea
                        value={format.description}
                        onChange={(e) => {
                          const updated = [...content.forCorporateClientsPage!.trainingFormats]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, trainingFormats: updated } })
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Ideal for (опционально)</label>
                      <input
                        type="text"
                        value={format.idealFor || ''}
                        onChange={(e) => {
                          const updated = [...content.forCorporateClientsPage!.trainingFormats]
                          updated[index] = { ...updated[index], idealFor: e.target.value || undefined }
                          updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, trainingFormats: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Список (каждый пункт с новой строки, опционально)</label>
                      <textarea
                        value={format.list?.join('\n') || ''}
                        onChange={(e) => {
                          const updated = [...content.forCorporateClientsPage!.trainingFormats]
                          const list = e.target.value.split('\n').filter(line => line.trim() !== '')
                          updated[index] = { ...updated[index], list: list.length > 0 ? list : undefined }
                          updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, trainingFormats: updated } })
                        }}
                        rows={4}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'for-corporate-samples' && content.forCorporateClientsPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Sample Case Examples</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Заголовок секции</label>
                  <input
                    type="text"
                    value={content.forCorporateClientsPage.sampleCasesTitle}
                    onChange={(e) => updateContentMutation.mutate({ 
                      forCorporateClientsPage: { ...content.forCorporateClientsPage, sampleCasesTitle: e.target.value } 
                    })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">Примеры кейсов (всего: {content.forCorporateClientsPage.sampleCases.length})</p>
                {content.forCorporateClientsPage.sampleCases.map((example, index) => (
                  <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Заголовок</label>
                      <input
                        type="text"
                        value={example.title}
                        onChange={(e) => {
                          const updated = [...content.forCorporateClientsPage!.sampleCases]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, sampleCases: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Описание</label>
                      <textarea
                        value={example.description}
                        onChange={(e) => {
                          const updated = [...content.forCorporateClientsPage!.sampleCases]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, sampleCases: updated } })
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'for-corporate-results' && content.forCorporateClientsPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Business Results</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Заголовок секции</label>
                  <input
                    type="text"
                    value={content.forCorporateClientsPage.businessResultsTitle}
                    onChange={(e) => updateContentMutation.mutate({ 
                      forCorporateClientsPage: { ...content.forCorporateClientsPage, businessResultsTitle: e.target.value } 
                    })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">Результаты (всего: {content.forCorporateClientsPage.businessResults.length})</p>
                {content.forCorporateClientsPage.businessResults.map((result, index) => (
                  <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Заголовок</label>
                      <input
                        type="text"
                        value={result.title}
                        onChange={(e) => {
                          const updated = [...content.forCorporateClientsPage!.businessResults]
                          updated[index] = { ...updated[index], title: e.target.value }
                          updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, businessResults: updated } })
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Описание</label>
                      <textarea
                        value={result.description}
                        onChange={(e) => {
                          const updated = [...content.forCorporateClientsPage!.businessResults]
                          updated[index] = { ...updated[index], description: e.target.value }
                          updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, businessResults: updated } })
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold text-sm">Метрики (всего: {result.metrics.length})</label>
                      {result.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="mb-3 p-3 border rounded bg-white">
                          <div className="mb-2">
                            <label className="block mb-1 text-xs font-semibold">Значение</label>
                            <input
                              type="text"
                              value={metric.value}
                              onChange={(e) => {
                                const updated = [...content.forCorporateClientsPage!.businessResults]
                                const metrics = [...updated[index].metrics]
                                metrics[metricIndex] = { ...metrics[metricIndex], value: e.target.value }
                                updated[index] = { ...updated[index], metrics }
                                updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, businessResults: updated } })
                              }}
                              className="w-full px-2 py-1 border rounded text-xs"
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block mb-1 text-xs font-semibold">Метка</label>
                            <input
                              type="text"
                              value={metric.label}
                              onChange={(e) => {
                                const updated = [...content.forCorporateClientsPage!.businessResults]
                                const metrics = [...updated[index].metrics]
                                metrics[metricIndex] = { ...metrics[metricIndex], label: e.target.value }
                                updated[index] = { ...updated[index], metrics }
                                updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, businessResults: updated } })
                              }}
                              className="w-full px-2 py-1 border rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="block mb-1 text-xs font-semibold">Подпись (опционально)</label>
                            <input
                              type="text"
                              value={metric.sub || ''}
                              onChange={(e) => {
                                const updated = [...content.forCorporateClientsPage!.businessResults]
                                const metrics = [...updated[index].metrics]
                                metrics[metricIndex] = { ...metrics[metricIndex], sub: e.target.value || undefined }
                                updated[index] = { ...updated[index], metrics }
                                updateContentMutation.mutate({ forCorporateClientsPage: { ...content.forCorporateClientsPage, businessResults: updated } })
                              }}
                              className="w-full px-2 py-1 border rounded text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'for-corporate-cta' && content.forCorporateClientsPage && (
              <div>
                <h2 className="text-xl font-bold mb-4">CTA Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Текст кнопки</label>
                    <input
                      type="text"
                      value={content.forCorporateClientsPage.cta.buttonText}
                      onChange={(e) => updateContentMutation.mutate({ 
                        forCorporateClientsPage: { ...content.forCorporateClientsPage, cta: { ...content.forCorporateClientsPage.cta, buttonText: e.target.value } } 
                      })}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'blog' && (
              <BlogEditor 
                posts={posts} 
                createPost={createPostMutation} 
                updatePost={updatePostMutation} 
                deletePost={deletePostMutation} 
              />
            )}
            {activeSection === 'submissions' && (
              <SubmissionsEditor />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Blog Editor
const BlogEditor = ({ posts, createPost, updatePost, deletePost }: any) => {
  const [editingPost, setEditingPost] = useState<any>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Oleg Tsoy',
    date: new Date().toISOString().split('T')[0],
    tags: '',
    image: '',
    featured: false
  })

  const handleCreate = () => {
    setIsCreating(true)
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'Oleg Tsoy',
      date: new Date().toISOString().split('T')[0],
      tags: '',
      image: '',
      featured: false
    })
  }

  const handleEdit = (post: any) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      tags: post.tags.join(', '),
      image: post.image,
      featured: post.featured
    })
  }

  const handleSave = async () => {
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    try {
      if (editingPost) {
        await updatePost.mutateAsync({ id: editingPost.id, post: postData })
        alert('Пост обновлен!')
      } else {
        await createPost.mutateAsync(postData)
        alert('Пост создан!')
      }

      setEditingPost(null)
      setIsCreating(false)
    } catch (error) {
      alert('Ошибка при сохранении поста')
    }
  }

  const handleCancel = () => {
    setEditingPost(null)
    setIsCreating(false)
  }

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Удалить пост "${title}"?`)) {
      try {
        await deletePost.mutateAsync(id)
        alert('Пост удален!')
      } catch (error) {
        alert('Ошибка при удалении поста')
      }
    }
  }

  if (isCreating || editingPost) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {editingPost ? 'Редактировать пост' : 'Создать пост'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              placeholder="Заголовок поста"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Краткое описание</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border rounded h-20"
              placeholder="Краткое описание для превью"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Контент (HTML)</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border rounded h-64 font-mono text-sm"
              placeholder="<h2>Заголовок</h2><p>Текст...</p>"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Автор</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Дата</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2">Теги (через запятую)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              placeholder="education, business, strategy"
            />
          </div>
          <ImageUpload
            currentImage={formData.image}
            onImageChange={(url) => setFormData({ ...formData, image: url })}
            label="Обложка поста"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="font-semibold">Избранный пост</label>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-inteca-red text-white rounded hover:bg-red-700"
              disabled={createPost.isPending || updatePost.isPending}
            >
              {createPost.isPending || updatePost.isPending ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление блогом</h2>
        <button
          onClick={handleCreate}
          className="px-6 py-2 bg-inteca-red text-white rounded hover:bg-red-700"
        >
          Создать пост
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p>Пока нет постов. Создайте первый!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post: any) => (
            <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                    {post.featured && (
                      <span className="px-2 py-1 bg-[#DD0000] text-white text-xs rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                    <span>•</span>
                    <div className="flex gap-2">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="text-[#DD0000]">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Hero Editor
const HeroEditor = ({ content, updateContent }: any) => {
  const [hero, setHero] = useState(content.hero)

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync({ hero })
      alert('Сохранено!')
    } catch (error) {
      alert('Ошибка при сохранении')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Заголовок</label>
          <input
            type="text"
            value={hero.title}
            onChange={(e) => setHero({ ...hero, title: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Описание</label>
          <textarea
            value={hero.description}
            onChange={(e) => setHero({ ...hero, description: e.target.value })}
            className="w-full px-4 py-2 border rounded h-24"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Текст кнопки</label>
          <input
            type="text"
            value={hero.buttonText}
            onChange={(e) => setHero({ ...hero, buttonText: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <ImageUpload
          currentImage={hero.backgroundImage}
          onImageChange={(url) => setHero({ ...hero, backgroundImage: url })}
          label="Фоновое изображение"
        />
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-inteca-red text-white rounded hover:bg-red-700"
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}

// Benefits Editor
const BenefitsEditor = ({ content, updateContent }: any) => {
  const [benefits, setBenefits] = useState(content.programBenefits)

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync({ programBenefits: benefits })
      alert('Сохранено!')
    } catch (error) {
      alert('Ошибка при сохранении')
    }
  }

  const updateBenefit = (index: number, field: string, value: string) => {
    const newBenefits = [...benefits]
    newBenefits[index] = { ...newBenefits[index], [field]: value }
    setBenefits(newBenefits)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Program Benefits</h2>
      <div className="space-y-6">
        {benefits.map((benefit: any, index: number) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="font-bold mb-3">Карточка {index + 1}</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Заголовок"
                value={benefit.title}
                onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                placeholder="Описание"
                value={benefit.description}
                onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                className="w-full px-4 py-2 border rounded h-20"
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-inteca-red text-white rounded hover:bg-red-700"
        >
          Сохранить все
        </button>
      </div>
    </div>
  )
}

// Who Editor
const WhoEditor = ({ content, updateContent }: any) => {
  const [cards, setCards] = useState(content.whoProgramFor)

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync({ whoProgramFor: cards })
      alert('Сохранено!')
    } catch (error) {
      alert('Ошибка при сохранении')
    }
  }

  const updateCard = (index: number, field: string, value: string) => {
    const newCards = [...cards]
    newCards[index] = { ...newCards[index], [field]: value }
    setCards(newCards)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Who the Program Is For</h2>
      <div className="space-y-6">
        {cards.map((card: any, index: number) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="font-bold mb-3">Карточка {index + 1}</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Иконка (эмодзи)"
                value={card.icon}
                onChange={(e) => updateCard(index, 'icon', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Заголовок"
                value={card.title}
                onChange={(e) => updateCard(index, 'title', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                placeholder="Описание"
                value={card.description}
                onChange={(e) => updateCard(index, 'description', e.target.value)}
                className="w-full px-4 py-2 border rounded h-20"
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-inteca-red text-white rounded hover:bg-red-700"
        >
          Сохранить все
        </button>
      </div>
    </div>
  )
}

// Case Editor
const CaseEditor = ({ content, updateContent }: any) => {
  const [caseContent, setCaseContent] = useState(content.caseBasedLearning)

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync({ caseBasedLearning: caseContent })
      alert('Сохранено!')
    } catch (error) {
      alert('Ошибка при сохранении')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Case-Based Learning</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Заголовок</label>
          <input
            type="text"
            value={caseContent.title}
            onChange={(e) => setCaseContent({ ...caseContent, title: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Описание</label>
          <textarea
            value={caseContent.description}
            onChange={(e) => setCaseContent({ ...caseContent, description: e.target.value })}
            className="w-full px-4 py-2 border rounded h-24"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Ссылка 1</label>
          <input
            type="text"
            value={caseContent.link1Text}
            onChange={(e) => setCaseContent({ ...caseContent, link1Text: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Ссылка 2</label>
          <input
            type="text"
            value={caseContent.link2Text}
            onChange={(e) => setCaseContent({ ...caseContent, link2Text: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <ImageUpload
          currentImage={caseContent.image}
          onImageChange={(url) => setCaseContent({ ...caseContent, image: url })}
          label="Изображение секции"
        />
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-inteca-red text-white rounded hover:bg-red-700"
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}

// Key Editor
const KeyEditor = ({ content, updateContent }: any) => {
  const [benefits, setBenefits] = useState(content.keyBenefits)

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync({ keyBenefits: benefits })
      alert('Сохранено!')
    } catch (error) {
      alert('Ошибка при сохранении')
    }
  }

  const updateBenefit = (index: number, field: string, value: any) => {
    const newBenefits = [...benefits]
    newBenefits[index] = { ...newBenefits[index], [field]: value }
    setBenefits(newBenefits)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
      <div className="space-y-6">
        {benefits.map((benefit: any, index: number) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="font-bold mb-3">Преимущество {index + 1}</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Название"
                value={benefit.label}
                onChange={(e) => updateBenefit(index, 'label', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Процент"
                value={benefit.percentage}
                onChange={(e) => updateBenefit(index, 'percentage', parseInt(e.target.value))}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Цвет (hex)"
                value={benefit.color}
                onChange={(e) => updateBenefit(index, 'color', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-inteca-red text-white rounded hover:bg-red-700"
        >
          Сохранить все
        </button>
      </div>
    </div>
  )
}

// Founder Editor
const FounderEditor = ({ content, updateContent }: any) => {
  const [founder, setFounder] = useState(content.founder)

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync({ founder })
      alert('Сохранено!')
    } catch (error) {
      alert('Ошибка при сохранении')
    }
  }

  const updateKeyFact = (index: number, value: string) => {
    const newKeyFacts = [...founder.keyFacts]
    newKeyFacts[index] = value
    setFounder({ ...founder, keyFacts: newKeyFacts })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Founder Section</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Заголовок</label>
          <input
            type="text"
            value={founder.title}
            onChange={(e) => setFounder({ ...founder, title: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Описание</label>
          <textarea
            value={founder.description}
            onChange={(e) => setFounder({ ...founder, description: e.target.value })}
            className="w-full px-4 py-2 border rounded h-24"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Key Facts</label>
          {founder.keyFacts.map((fact: string, index: number) => (
            <input
              key={index}
              type="text"
              value={fact}
              onChange={(e) => updateKeyFact(index, e.target.value)}
              className="w-full px-4 py-2 border rounded mb-2"
            />
          ))}
        </div>
        <div>
          <label className="block font-semibold mb-2">Текст ссылки</label>
          <input
            type="text"
            value={founder.linkText}
            onChange={(e) => setFounder({ ...founder, linkText: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <ImageUpload
          currentImage={founder.image}
          onImageChange={(url) => setFounder({ ...founder, image: url })}
          label="Фотография основателя"
        />
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-inteca-red text-white rounded hover:bg-red-700"
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}

// CTA Editor
const CTAEditor = ({ content, updateContent }: any) => {
  const [cta, setCta] = useState(content.cta)

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync({ cta })
      alert('Сохранено!')
    } catch (error) {
      alert('Ошибка при сохранении')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">CTA Banner</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Заголовок</label>
          <textarea
            value={cta.title}
            onChange={(e) => setCta({ ...cta, title: e.target.value })}
            className="w-full px-4 py-2 border rounded h-24"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Текст кнопки</label>
          <input
            type="text"
            value={cta.buttonText}
            onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-inteca-red text-white rounded hover:bg-red-700"
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}

// Submissions Editor
const SubmissionsEditor = () => {
  const { data: submissions = [], isLoading } = useContactSubmissions()
  const updateStatusMutation = useUpdateSubmissionStatus()
  const deleteMutation = useDeleteSubmission()

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'read': return 'bg-yellow-100 text-yellow-800'
      case 'replied': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'new': return 'Новая'
      case 'read': return 'Прочитана'
      case 'replied': return 'Отвечена'
      case 'archived': return 'Архив'
      default: return status
    }
  }

  const handleStatusChange = async (id: string, newStatus: 'new' | 'read' | 'replied' | 'archived') => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus })
    } catch (error) {
      alert('Ошибка при обновлении статуса')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Удалить заявку от "${name}"?`)) {
      try {
        await deleteMutation.mutateAsync(id)
        alert('Заявка удалена')
      } catch (error) {
        alert('Ошибка при удалении заявки')
      }
    }
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Заявки с сайта</h2>
        <p className="text-gray-600">Загрузка...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Заявки с сайта</h2>
        <span className="text-sm text-gray-600">
          Всего: {submissions.length}
        </span>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p>Пока нет заявок</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission: any) => (
            <div key={submission.id} className="border rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{submission.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(submission.status)}`}>
                      {getStatusLabel(submission.status)}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Email:</strong> {submission.email}</p>
                    {submission.phone && <p><strong>Телефон:</strong> {submission.phone}</p>}
                    <p><strong>Дата:</strong> {new Date(submission.created_at).toLocaleString('ru-RU')}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={submission.status}
                    onChange={(e) => handleStatusChange(submission.id, e.target.value as any)}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    <option value="new">Новая</option>
                    <option value="read">Прочитана</option>
                    <option value="replied">Отвечена</option>
                    <option value="archived">Архив</option>
                  </select>
                  <button
                    onClick={() => handleDelete(submission.id, submission.name)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Сообщение:</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{submission.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin

