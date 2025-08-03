export async function getShareImage() {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('share') === 'success') {
    // 从缓存获取图片
    const cache = await caches.open('share-data')
    const response = await cache.match('shared-image')

    if (response) {
      const blob = await response.blob()
      // 清理缓存
      await cache.delete('shared-image')

      return blob
    }
  }
}
