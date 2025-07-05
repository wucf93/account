import { useRegisterSW } from 'virtual:pwa-register/react'
import { Dialog } from 'antd-mobile'

function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration
) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200) await r.update()
  }, period)
}

export default function PWABadge() {
  const period = 0

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r)
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r)
        })
      }
    },
  })

  function close() {
    setNeedRefresh(false)
  }

  return (
    <Dialog
      title="新内容可用"
      content="发现新内容，是否刷新？"
      visible={needRefresh}
      actions={[
        {
          key: 'refresh',
          text: '刷新',
          onClick: () => updateServiceWorker(true),
        },
        {
          key: 'close',
          text: '关闭',
          onClick: () => close(),
          className: 'text-gray-500',
        },
      ]}
    />
  )
}
