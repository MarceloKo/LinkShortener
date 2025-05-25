import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routers/index.tsx'
import './main.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  </StrictMode>,
)
