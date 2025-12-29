import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { contactService } from '../services/contactService'

const Contacts = () => {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const location = useLocation()

  // Плавный скролл к hero section при переходе по ссылке с якорем
  useEffect(() => {
    if (location.hash === '#hero' || location.pathname === '/contacts') {
      setTimeout(() => {
        const heroElement = document.getElementById('hero')
        if (heroElement) {
          heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [location.hash, location.pathname])

  // Локализация контента
  const getContent = () => {
    switch(language) {
      case 'ru':
        return {
          getStarted: 'Начать',
          mainTitle: 'Свяжитесь с нами. Мы здесь, чтобы помочь вам.',
          yourName: 'Ваше имя',
          emailAddress: 'Адрес электронной почты',
          phoneNumber: 'Номер телефона (необязательно)',
          message: 'Сообщение',
          buttonText: 'Оставить сообщение',
          contactInfo: 'Контактная информация',
          happyToAssist: 'Мы всегда рады помочь вам.',
          emailLabel: 'Адрес электронной почты',
          email: 'Inteca.kz@gmail.com',
          numberLabel: 'Номер',
          number: '+7 (708) 647 5295',
          successMessage: 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.',
          errorMessage: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.'
        }
      case 'kz':
        return {
          getStarted: 'Бастау',
          mainTitle: 'Бізбен байланысыңыз. Біз сізге көмектесуге дайынбыз.',
          yourName: 'Сіздің атыңыз',
          emailAddress: 'Электрондық пошта мекенжайы',
          phoneNumber: 'Телефон нөмірі (міндетті емес)',
          message: 'Хабарлама',
          buttonText: 'Хабарлама қалдыру',
          contactInfo: 'Байланыс ақпараты',
          happyToAssist: 'Біз әрдайым сізге көмектесуге қуаныштымыз.',
          emailLabel: 'Электрондық пошта мекенжайы',
          email: 'Inteca.kz@gmail.com',
          numberLabel: 'Нөмір',
          number: '+7 (708) 647 5295',
          successMessage: 'Рахмет! Сіздің хабарламаңыз жіберілді. Біз сізбен жақын арада байланысамыз.',
          errorMessage: 'Хабарламаны жіберу кезінде қате орын алды. Қайталап көріңіз.'
        }
      case 'en':
      default:
        return {
          getStarted: 'Get Started',
          mainTitle: 'Get in touch with us. We\'re here to assist you.',
          yourName: 'Your Name',
          emailAddress: 'Email Address',
          phoneNumber: 'Phone Number (optional)',
          message: 'Message',
          buttonText: 'Leave us a Message',
          contactInfo: 'Contact Info',
          happyToAssist: 'We are always happy to assist you.',
          emailLabel: 'Email Address',
          email: 'Inteca.kz@gmail.com',
          numberLabel: 'Number',
          number: '+7 (708) 647 5295',
          successMessage: 'Thank you! Your message has been sent. We will contact you soon.',
          errorMessage: 'An error occurred while sending the message. Please try again.'
        }
    }
  }

  const content = getContent()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await contactService.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message
      })

      setSubmitStatus('success')
      // Очищаем форму
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })

      // Скрываем сообщение об успехе через 5 секунд
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      // Скрываем сообщение об ошибке через 5 секунд
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Contact Section */}
      <section id="hero" className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <p className="text-sm sm:text-base text-gray-600 mb-2">{content.getStarted}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                {(() => {
                  const parts = content.mainTitle.split('. ')
                  if (parts.length >= 2) {
                    return (
                      <>
                        {parts[0]}.<br />
                        {parts.slice(1).join('. ')}
                      </>
                    )
                  }
                  return content.mainTitle
                })()}
              </h1>
            </div>

            {/* Form and Social Media */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 mb-16">
              {/* Contact Form */}
              <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name, Email, Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {content.yourName}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#DD0000] focus:outline-none text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {content.emailAddress}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#DD0000] focus:outline-none text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {content.phoneNumber}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#DD0000] focus:outline-none text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {content.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#DD0000] focus:outline-none text-gray-900 resize-none"
                      required
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                      {content.successMessage}
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                      {content.errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#DD0000] text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting 
                      ? (language === 'ru' ? 'Отправка...' : language === 'kz' ? 'Жіберілуде...' : 'Sending...')
                      : content.buttonText
                    }
                    {!isSubmitting && <span>→</span>}
                  </button>
                </form>
              </div>

              {/* Social Media Icons */}
              <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-gray-200 hover:bg-[#DD0000] transition flex items-center justify-center text-gray-700 hover:text-white"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-gray-200 hover:bg-[#DD0000] transition flex items-center justify-center text-gray-700 hover:text-white"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-gray-200 hover:bg-[#DD0000] transition flex items-center justify-center text-gray-700 hover:text-white"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-sm">
              <div className="mb-6">
                <p className="text-sm sm:text-base text-gray-600 mb-2">{content.contactInfo}</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {content.happyToAssist}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Email */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{content.emailLabel}</h3>
                  <p className="text-base text-gray-700">{content.email}</p>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{content.numberLabel}</h3>
                  <p className="text-base text-gray-700">{content.number}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contacts

