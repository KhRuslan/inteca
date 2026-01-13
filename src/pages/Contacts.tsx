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

            {/* Form */}
            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-sm mb-16">
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

