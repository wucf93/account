import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PWABadge from './components/pwa-badge'
import { history } from '@/lib'
import { RouterProvider } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={history} future={{ v7_startTransition: true }} />
    <PWABadge />
  </StrictMode>
)
