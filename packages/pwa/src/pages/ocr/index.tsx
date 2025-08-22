import { useState, useRef, useEffect, useCallback } from 'react'
import Page from '@/components/page'
import {
  postTransactionFetchAi,
  postTransactionCreate,
  TransactionAi,
} from '@/apis'
import { getShareImage } from './utils'
import Button from '@/components/button'
import dayjs from 'dayjs'
import TransactionView from './components/transaction-view'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './components/image-uploader'

export default function OCRPage() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [transaction, setTransaction] = useState<TransactionAi>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getShareImage().then((blob) => {
      if (blob) {
        const reader = new FileReader()
        reader.onload = (event) => {
          // event.target.result 就是 base64 格式的图片数据
          setImage(event.target?.result as string)
        }
        // 读取 blob 并转换为 base64
        reader.readAsDataURL(blob)
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

    fileInputRef.current?.value && (fileInputRef.current.value = '')
  }

  const handleOCR = useCallback(async () => {
    if (!image) return
    // 模拟进度更新
    setLoading(true)

    try {
      const json = await (
        await postTransactionFetchAi({ body: { image } })
      ).data
      if (json?.data) {
        setTransaction({ ...json.data })
      }
    } catch (error) {
      console.error('OCR识别失败:', error)
      alert('识别失败，请重试')
    } finally {
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
  }, [transaction, navigate])

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
      {/* 模块标题和说明 - 扫描成功后隐藏 */}
      {!transaction && (
        <div className="mb-8 mt-10 text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            账单识别
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            上传账单图片，系统将自动识别交易信息，支持各类收据、发票和银行对账单
          </p>
        </div>
      )}

      {/* 图片预览区域 */}
      <ImageUploader
        image={image}
        loading={loading}
        onImageUpload={handleImageUpload}
        onClearImage={clearImage}
        transaction={transaction}
      />

      {/* 识别结果区域 */}
      {transaction && <TransactionView transaction={transaction} />}
    </Page>
  )
}
