import { useCallback } from 'react'
import { Toast } from 'antd-mobile'
import useOCR from './useOCR'
import { aiControllerGenTransaction } from '@/apis'

export default function useImageTool() {
  const { recognizeText } = useOCR()

  const genText = useCallback(async (message: string) => {
    const toast = Toast.show({
      content: (
        <div className="text-center mt-4 w-40">ai 解析中，请稍后...</div>
      ),
      icon: 'loading',
      duration: 0,
    })
    const res = await aiControllerGenTransaction({ body: { message } })
    toast.close()
    if (res.data?.success) {
      console.log(res.data.data)
    } else {
      Toast.show(res.data?.message || '解析失败')
    }
  }, [])

  const imageScan = useCallback(
    async (image: File) => {
      const toast = Toast.show({
        content: (
          <div className="text-center mt-4 w-40">
            图片识别中，可能需要等待一段时间
          </div>
        ),
        icon: 'loading',
        duration: 0,
      })
      const message = await recognizeText(image)
      toast.close()
      console.log(message)
      if (message) {
        await genText(message)
      } else {
        Toast.show('图片失败失败，请稍后重试或手动填写')
      }
    },
    [recognizeText]
  )

  return {
    imageScan,
  }
}
