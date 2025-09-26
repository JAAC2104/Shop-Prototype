import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes.ts'
import { AuthProvider } from './contexts/AuthContext.tsx'
import CartProvider from './contexts/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}/>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
