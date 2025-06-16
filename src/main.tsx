import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PWABadge from "./components/pwa-badge"
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <PWABadge />
  </StrictMode>,
)
