declare let self: ServiceWorkerGlobalScope

// 处理分享数据
export function serveShareTarget(event: FetchEvent): void {
  const dataPromise = event.request.formData()

  event.respondWith(Response.redirect('/home?share-target'))

  event.waitUntil(
    (async function () {
      const client = await self.clients.get(event.resultingClientId)
      const data = await dataPromise
      const file = data.get('file')
      file && client && client.postMessage({ file, action: 'load-image' })
    })()
  )
}
