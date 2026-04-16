import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defaultContent } from '../types/content'

const fromMock = vi.fn()
const selectMock = vi.fn()
const eqMock = vi.fn()
const singleMock = vi.fn()
const upsertMock = vi.fn()

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: fromMock,
  },
  isSupabaseConfigured: true,
}))

describe('contentService', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      configurable: true,
      writable: true,
    })

    singleMock.mockResolvedValue({
      data: { data: defaultContent },
      error: null,
    })

    eqMock.mockReturnValue({
      single: singleMock,
    })

    selectMock.mockReturnValue({
      eq: eqMock,
    })

    upsertMock.mockResolvedValue({
      error: null,
    })

    fromMock.mockImplementation(() => ({
      select: selectMock,
      upsert: upsertMock,
    }))
  })

  it('updates site content by unique key conflict', async () => {
    const { contentService } = await import('./contentService')

    await contentService.updateContent(
      {
        hero: {
          ...defaultContent.hero,
          title: 'Updated title',
        },
      },
      'ru'
    )

    expect(upsertMock).toHaveBeenCalledWith(
      {
        key: 'site_content_ru',
        data: {
          ...defaultContent,
          hero: {
            ...defaultContent.hero,
            title: 'Updated title',
          },
        },
      },
      {
        onConflict: 'key',
      }
    )
  })

  it('resets site content by unique key conflict', async () => {
    const { contentService } = await import('./contentService')

    await contentService.resetContent('en')

    expect(upsertMock).toHaveBeenCalledWith(
      {
        key: 'site_content_en',
        data: defaultContent,
      },
      {
        onConflict: 'key',
      }
    )
  })
})
