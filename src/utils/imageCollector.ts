import { SiteContent } from '../types/content'

/**
 * Собирает все URL изображений из контента и статических ресурсов
 */
export const collectAllImages = (content?: SiteContent): string[] => {
  const images: Set<string> = new Set()

  // Статические изображения (всегда предзагружаем)
  const staticImages = [
    '/inTECA logo black.svg',
    '/inTECA logo white.svg',
    '/hero-section.png',
    '/case-based.jpeg',
    '/founder.jpg',
    '/about1.jpeg',
    '/about2.jpeg',
    '/founder-hero.jpeg',
    '/founder-bio.png',
    '/for uni.JPG',
    '/for corp.png',
    '/for corp2.png',
    '/for-students.png',
    '/for-students2.jpeg',
    '/cerf1.jpg',
    '/cerf2.PNG',
    '/cerf3.jpg',
    '/cerft4.jpg',
  ]

  staticImages.forEach(img => images.add(img))

  if (!content) return Array.from(images)

  // Изображения из контента
  if (content.hero?.backgroundImage) {
    images.add(content.hero.backgroundImage)
  }

  if (content.caseBasedLearning?.image) {
    images.add(content.caseBasedLearning.image)
  }

  if (content.founder?.image) {
    images.add(content.founder.image)
  }

  if (content.about?.hero?.image) {
    images.add(content.about.hero.image)
  }

  if (content.about?.afterCompleting?.image) {
    images.add(content.about.afterCompleting.image)
  }

  if (content.founderPage?.hero?.image) {
    images.add(content.founderPage.hero.image)
  }

  if (content.founderPage?.biography?.image) {
    images.add(content.founderPage.biography.image)
  }

  if (content.forStudentsPage?.hero?.image) {
    images.add(content.forStudentsPage.hero.image)
  }

  if (content.forStudentsPage?.certificates?.image) {
    images.add(content.forStudentsPage.certificates.image)
  }

  // Фильтруем пустые URL
  return Array.from(images).filter(url => url && url.trim() !== '')
}

