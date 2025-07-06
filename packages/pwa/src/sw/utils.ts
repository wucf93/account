declare let self: ServiceWorkerGlobalScope

const nextMessageResolveMap = new Map<string, (() => void)[]>()

function nextMessage(dataVal: string): Promise<void> {
  return new Promise((resolve) => {
    if (!nextMessageResolveMap.has(dataVal)) {
      nextMessageResolveMap.set(dataVal, [])
    }
    nextMessageResolveMap.get(dataVal)!.push(resolve)
  })
}

// 处理分享数据
export function serveShareTarget(event: FetchEvent): void {
  const dataPromise = event.request.formData()

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
