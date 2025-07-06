declare let self: ServiceWorkerGlobalScope

// 处理分享数据
export function serveShareTarget(event: FetchEvent): void {
  const dataPromise = event.request.formData()

  console.log('进来了~')
  alert('简历饿了')

  // Redirect so the user can refresh the page without resending data.
  event.respondWith(Response.redirect('/home?share-target'))

  event.waitUntil(
    (async function () {
      const client = await self.clients.get(event.resultingClientId)
      const data = await dataPromise
      const file = data.get('file')
      client!.postMessage({ file, action: 'load-image' })
    })()
  )
}
