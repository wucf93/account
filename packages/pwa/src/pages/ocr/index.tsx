import { useState, useRef, useEffect, useCallback } from 'react'
import useOCR from '@/hooks/useOCR'
import Page from '@/components/page'
import {
  postTransactionFetchAi,
  postTransactionCreate,
  Transaction,
} from '@/apis'
import { getShareImage } from './utils'
import Button from '@/components/button'
import dayjs from 'dayjs'
import TransactionView from './components/transaction-view'
import { useNavigate } from 'react-router-dom'

export default function OCRPage() {
  const { recognizeText } = useOCR()
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [ocrProgress, setOcrProgress] = useState<number>(0)
  const [transaction, setTransaction] = useState<Transaction>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

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
      setTransaction(undefined) // 重置结果
    }
    reader.readAsDataURL(file)
  }

  // 触发文件选择
  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  // 处理OCR识别
  const handleOCR = useCallback(async () => {
    if (!image) return
    // 模拟进度更新
    setLoading(true)
    setOcrProgress(0)
    const interval = setInterval(() => {
      setOcrProgress((prev) => {
        const newProgress = prev + 5
        if (newProgress >= 100) return 100
        return newProgress
      })
    }, 500)

    try {
      const text = await recognizeText(image)
      const json = await (
        await postTransactionFetchAi({ body: { message: text } })
      ).data?.data
      setTransaction(json)
      setOcrProgress(100)
    } catch (error) {
      console.error('OCR识别失败:', error)
      alert('识别失败，请重试')
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }, [image])

  // 清除图片和结果
  const clearImage = () => {
    fileInputRef.current?.value && (fileInputRef.current.value = '')
    setImage(null)
    setTransaction(undefined)
  }

  const handleSave = useCallback(async () => {
    if (!transaction) return
    try {
      await postTransactionCreate({
        body: {
          amount: String(transaction.amount),
          transactionType: transaction.transactionType,
          transactionDate: dayjs
            .tz(transaction.transactionDate, 'utc')
            .format('YYYY-MM-DD'),
          description: transaction.description,
          categoryId: transaction.categoryId,
        },
      })
      alert('保存成功')
      navigate('/', { replace: true })
    } catch (error) {
      console.error('保存失败:', error)
      alert('保存失败，请重试')
    }
  }, [transaction])

  return (
    <Page
      showBack
      title="图片文字识别"
      footer={
        <div className="p-4 h-full w-full">
          {transaction ? (
            <Button
              loading={loading}
              loadingText="保存中..."
              onClick={handleSave}
            >
              保存账单
            </Button>
          ) : (
            <Button
              disabled={!image}
              onClick={handleOCR}
              loading={loading}
              loadingText="识别中..."
            >
              开始识别
            </Button>
          )}
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
                className="absolute top-0.5 right-1.5 text-2xl text-gray-400"
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
                <div className="relative h-3 bg-black/30 dark:bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 transition-all duration-300"
                    style={{
                      width: `${ocrProgress === 100 ? 99 : ocrProgress}%`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white drop-shadow-sm">
                    {ocrProgress === 100 ? 99 : ocrProgress}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 识别结果区域 */}
      {transaction && <TransactionView transaction={transaction} />}
    </Page>
  )
}
