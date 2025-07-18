import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import PWABadge from './components/pwa-badge'
import { history } from '@/lib'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import GlobalLoading from './components/global-loading'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<GlobalLoading />}>
      <RouterProvider router={history} future={{ v7_startTransition: true }} />
    </Suspense>

    <PWABadge />
  </StrictMode>
)
