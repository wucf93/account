declare let self: ServiceWorkerGlobalScope

// 处理分享数据
export function serveShareTarget(event: FetchEvent): void {
  event.respondWith(Response.redirect('/home?share-target'))

  event.waitUntil(
    (async function () {
      const client = await self.clients.get(event.resultingClientId)
      const file = (await event.request.formData()).get('file')
      file && client && client.postMessage({ file, action: 'load-image' })
    })()
  )
}
