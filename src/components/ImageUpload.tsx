import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

interface ImageUploadProps {
  currentImage: string
  onImageChange: (url: string) => void
  label?: string
}

const ImageUpload = ({ currentImage, onImageChange, label = "Изображение" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Проверка размера (макс 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимум 5MB')
      return
    }

    // Проверка типа
    if (!file.type.startsWith('image/')) {
      alert('Разрешены только изображения')
      return
    }

    if (!isSupabaseConfigured) {
      alert('Supabase не настроен. Используйте прямой URL изображения.')
      return
    }

    try {
      setUploading(true)
      setUploadProgress(0)

      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase!.storage
        .from('inteca-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Получаем публичный URL
      const { data: { publicUrl } } = supabase!.storage
        .from('inteca-images')
        .getPublicUrl(filePath)

      setUploadProgress(100)
      onImageChange(publicUrl)
      alert('Изображение загружено!')
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(`Ошибка загрузки: ${error.message}`)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div>
      <label className="block font-semibold mb-2">{label}</label>
      
      {/* Текущее изображение */}
      {currentImage && (
        <div className="mb-4">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full max-w-sm h-48 object-cover rounded border"
          />
        </div>
      )}

      {/* URL поле */}
      <div className="mb-3">
        <input
          type="text"
          value={currentImage}
          onChange={(e) => onImageChange(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="/image.jpg или https://..."
        />
      </div>

      {/* Загрузка файла */}
      {isSupabaseConfigured && (
        <div>
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200 transition">
            <span>📁</span>
            <span>Загрузить файл</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
          {uploading && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#DD0000] h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">Загрузка... {uploadProgress}%</p>
            </div>
          )}
        </div>
      )}

      {!isSupabaseConfigured && (
        <p className="text-sm text-gray-500 mt-2">
          💡 Настройте Supabase Storage для загрузки файлов
        </p>
      )}
    </div>
  )
}

export default ImageUpload

