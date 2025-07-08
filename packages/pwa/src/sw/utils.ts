// 处理分享数据
export function serveShareTarget(event: FetchEvent): void {
  const url = new URL(event.request.url)

  // 拦截分享请求
  if (event.request.method === 'POST' && url.pathname === '/share-target') {
    event.respondWith(
      (async () => {
        const formData = await event.request.formData()
        const image = formData.get('file')

        // 存储分享数据
        const cache = await caches.open('share-data')
        await cache.put('shared-image', new Response(image))

        // 重定向到应用页面
        return Response.redirect('/home?share=success', 303)
      })()
    )
  }
}
