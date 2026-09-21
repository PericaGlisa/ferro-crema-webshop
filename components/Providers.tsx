'use client'

import React from 'react'
import { CartProvider } from '@/lib/cart-context'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { QuickViewModal } from '@/components/QuickViewModal'
import { ToastContainer } from '@/components/ToastContainer'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="site-shell">
        <Header />
        {children}
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <ToastContainer />
      </div>
    </CartProvider>
  )
}
