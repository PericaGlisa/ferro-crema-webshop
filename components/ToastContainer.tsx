'use client'

import React from 'react'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function ToastContainer() {
  const { toasts } = useCart()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {t.type === 'cart' ? (
            <ShoppingBag size={15} />
          ) : (
            <Heart size={15} />
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}
