import { useEffect } from 'react'
import { useImageTool } from '@/hooks'

export const useShareImage = (onSaveHander: () => void) => {
  const { imageScan } = useImageTool()

  useEffect(() => {
    const fetchSharedImage = async () => {
      try {
        // 检查是否从分享打开
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('share') === 'success') {
          // 从缓存获取图片
          const cache = await caches.open('share-data')
          const response = await cache.match('shared-image')

          if (!response) {
            throw new Error('未找到分享内容')
          }

          // 创建对象URL
          const blob = await response.blob()

          imageScan(blob, onSaveHander)

          // 清理缓存
          await cache.delete('shared-image')
        }
      } catch (err: any) {
        console.error('获取分享失败:', err)
      }
    }

    fetchSharedImage()
  }, [imageScan, onSaveHander])
}
