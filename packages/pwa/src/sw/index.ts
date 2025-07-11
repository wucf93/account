/// <reference lib="webworker" />

import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching'
import { NavigationRoute, registerRoute, Route } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

/** @type {RegExp[] | undefined} */
let allowlist
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/]

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist })
)

// 注册路由规则来处理 CDN 资源
registerRoute(
  new Route(
    ({ url }) =>
      url.origin === 'https://cdnjs.cloudflare.com' ||
      url.origin === 'https://cdn.jsdelivr.net',
    new CacheFirst({
      cacheName: 'cdn-cache',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30天
        }),
      ],
    })
  )
)

// 监听 fetch 事件
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // 拦截分享请求
  if (event.request.method === 'POST' && url.pathname === '/share-target') {
    event.respondWith(
      (async () => {
        const formData = await event.request.formData()
        const image = formData.get('image')

        // 存储分享数据
        const cache = await caches.open('share-data')
        await cache.put('shared-image', new Response(image))

        // 重定向到应用页面
        return Response.redirect('/home?share=success', 303)
      })()
    )
  }
})
