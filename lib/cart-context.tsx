'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import {
  Product,
  CartItem,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from './data'

export interface Toast {
  id: number
  message: string
  type: 'cart' | 'like'
}

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  shippingRemaining: number
  shippingProgress: number
  freeShippingThreshold: number
  standardShippingFee: number
  shippingFee: number
  finalTotal: number
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  quickViewProduct: Product | null
  setQuickViewProduct: (product: Product | null) => void
  addToCart: (product: Product, qty?: number) => void
  updateQty: (productId: number, delta: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  toasts: Toast[]
  pushToast: (message: string, type?: 'cart' | 'like') => void
}

const CartContext = createContext<CartContextType | null>(null)

const CART_STORAGE_KEY = 'ferro_crema_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastIdRef = useRef(0)
  const [isHydrated, setIsHydrated] = useState(false)

  /* Hydrate from localStorage on client */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setCartItems(parsed)
        }
      }
    } catch {
      // ignore
    }
    setIsHydrated(true)
  }, [])

  /* Save to localStorage on change */
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      // ignore
    }
  }, [cartItems, isHydrated])

  /* Lock body scroll when drawer or quick-view is open */
  useEffect(() => {
    if (cartOpen || quickViewProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen, quickViewProduct])

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.product.priceNum * item.qty,
    0
  )
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal)
  const shippingProgress = Math.min(
    100,
    (cartTotal / FREE_SHIPPING_THRESHOLD) * 100
  )
  const shippingFee =
    cartTotal > 0 && cartTotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : cartTotal > 0
      ? STANDARD_SHIPPING_FEE
      : 0
  const finalTotal = cartTotal + shippingFee

  const pushToast = useCallback(
    (message: string, type: 'cart' | 'like' = 'cart') => {
      const id = ++toastIdRef.current
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3600)
    },
    []
  )

  const addToCart = useCallback(
    (product: Product, qty: number = 1) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id)
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, qty: item.qty + qty }
              : item
          )
        }
        return [...prev, { product, qty }]
      })
      setCartOpen(true)
      pushToast(`${product.name} dodat u korpu`, 'cart')
    },
    [pushToast]
  )

  const updateQty = useCallback((productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter((item) => item.qty > 0)
    )
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        shippingRemaining,
        shippingProgress,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        standardShippingFee: STANDARD_SHIPPING_FEE,
        shippingFee,
        finalTotal,
        cartOpen,
        setCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        toasts,
        pushToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
