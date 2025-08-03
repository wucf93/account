import { useState, useRef, useEffect } from 'react'
import useOCR from '../../hooks/useOCR'
import Page from '@/components/page'
import classnames from 'classnames'
import { getShareImage } from './utils'

export default function OCRPage() {
  const { recognizeText } = useOCR()
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [ocrProgress, setOcrProgress] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getShareImage().then((blob) => {
      if (blob) {
        setImage(URL.createObjectURL(blob))
      }
    })
  }, [])

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
      setResult('') // 重置结果
    }
    reader.readAsDataURL(file)
  }

  // 触发文件选择
  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  // 处理OCR识别
  const handleOCR = async () => {
    if (!image) return

    try {
      setLoading(true)
      setOcrProgress(0)

      // 模拟进度更新
      const interval = setInterval(() => {
        setOcrProgress((prev) => {
          const newProgress = prev + 5
          if (newProgress >= 100) {
            clearInterval(interval)
            return 100
          }
          return newProgress
        })
      }, 200)

      const text = await recognizeText(image)
      setResult(text)
      clearInterval(interval)
      setOcrProgress(100)
    } catch (error) {
      console.error('OCR识别失败:', error)
      alert('识别失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  // 清除图片和结果
  const clearImage = () => {
    fileInputRef.current?.value && (fileInputRef.current.value = '')
    setImage(null)
    setResult('')
  }

  return (
    <Page
      showBack
      title="图片文字识别"
      footer={
        <div className="p-4 h-full w-full">
          <button
            type="button"
            onClick={handleOCR}
            disabled={!image || loading}
            className={classnames(
              'w-full py-3 rounded-lg font-medium transition-all duration-300 text-white',
              !image || loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-loader-2-line animate-spin" />
                <span>识别中...</span>
              </div>
            ) : result ? (
              '重新识别'
            ) : (
              '开始识别'
            )}
          </button>
        </div>
      }
    >
      {/* 图片预览区域 */}
      <div className="rounded-xl bg-white shadow-lg dark:bg-gray-900 p-5">
        <div className="relative w-full h-52 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center">
          {image ? (
            <div className="h-full flex flex-col">
              <img
                src={image}
                alt="预览图"
                className="max-h-full w-auto rounded-lg mx-auto object-contain"
              />
              <button
                onClick={clearImage}
                className="absolute top-0 right-4 w-6 h-6 text-2xl text-gray-400 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 hover:text-red-500 transition-colors"
              >
                <i className="ri-close-line" />
              </button>
            </div>
          ) : (
            <button
              onClick={triggerFileSelect}
              className="flex flex-col items-center justify-center h-full w-full p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-3">
                <i className="ri-image-add-line text-2xl text-indigo-500 dark:text-indigo-400" />
              </div>
              <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                上传图片
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                支持JPG、PNG格式
              </p>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {/* 进度条 */}
          {loading && (
            <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
              <div className="w-full max-w-md px-4">
                <div className="relative h-3 bg-black/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 transition-all duration-300"
                    style={{ width: `${ocrProgress}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white drop-shadow-sm">
                    {ocrProgress}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 识别结果区域 */}
      {result && (
        <div className="rounded-xl bg-white shadow-lg dark:bg-gray-900 p-5 mt-5">
          <div className="text-sm text-gray-500 mb-3 dark:text-gray-400">
            识别结果
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[100px] whitespace-pre-wrap">
            {result || '暂无结果'}
          </div>
        </div>
      )}
    </Page>
  )
}
