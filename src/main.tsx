import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routers/index.tsx'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
