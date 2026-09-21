'use client'

import React from 'react'
import Link from 'next/link'
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function CartDrawer() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    cartCount,
    cartTotal,
    shippingRemaining,
    shippingProgress,
    shippingFee,
    finalTotal,
    updateQty,
    removeFromCart,
    setQuickViewProduct,
  } = useCart()

  if (!cartOpen) return null

  return (
    <div
      className="cart-drawer-layer"
      role="dialog"
      aria-modal="true"
      aria-label="Vaša korpa"
    >
      <button
        className="drawer-backdrop"
        onClick={() => setCartOpen(false)}
        aria-label="Zatvori korpu"
      />
      <aside className="cart-drawer">
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <ShoppingBag size={20} color="var(--cream)" />
            <h3>Vaša korpa</h3>
            <span className="cart-drawer-count">({cartCount})</span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Zatvori korpu"
            className="cart-drawer-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Free Shipping Progress ── */}
        <div className="cart-shipping-bar">
          <div className="cart-shipping-text">
            {shippingRemaining > 0 ? (
              <span>
                Dodajte još <strong>{shippingRemaining.toLocaleString('sr-RS')} RSD</strong> za{' '}
                <em style={{ fontStyle: 'normal', color: 'var(--cream)' }}>besplatnu dostavu</em>
              </span>
            ) : (
              <span style={{ color: 'var(--ink)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="var(--cream)" /> Čestitamo! Ostvarili ste besplatnu dostavu
              </span>
            )}
          </div>
          <div className="cart-progress-track">
            <div
              className="cart-progress-fill"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* ── Cart Items List ── */}
        <div className="cart-drawer-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <ShoppingBag size={42} strokeWidth={1.2} />
              </div>
              <h4>Vaša korpa je prazna</h4>
              <p>
                Pregledajte naš katalog originalnih i ojačanih delova za espresso aparate i barista alate.
              </p>
              <Link
                href="/katalog"
                className="button dark"
                onClick={() => setCartOpen(false)}
              >
                Istražite katalog delova <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product.id} className="cart-item-row">
                <button
                  className="cart-item-image cart-item-quick-view"
                  onClick={() => setQuickViewProduct(item.product)}
                  aria-label={`Brzi pregled specifikacije: ${item.product.name}`}
                >
                  <img src={item.product.image} alt={item.product.name} />
                </button>
                <div className="cart-item-details">
                  <span className="cart-item-category">{item.product.meta}</span>
                  <button
                    className="cart-item-name cart-item-quick-view"
                    onClick={() => setQuickViewProduct(item.product)}
                  >
                    {item.product.name}
                  </button>
                  <div className="cart-item-price-row">
                    <span className="cart-item-unit-price">{item.product.price}</span>
                    <div className="cart-qty-control">
                      <button
                        onClick={() => updateQty(item.product.id, -1)}
                        aria-label="Smanji količinu"
                      >
                        <Minus size={13} />
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.product.id, 1)}
                        aria-label="Povećaj količinu"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label={`Ukloni ${item.product.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ── Footer / Checkout CTA ── */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span>Međuzbir:</span>
              <strong>{cartTotal.toLocaleString('sr-RS')} RSD</strong>
            </div>
            <div className="cart-summary-line">
              <span>Dostava (Srbija):</span>
              <span>
                {shippingFee === 0 ? (
                  <strong style={{ color: 'var(--cream)' }}>BESPLATNA</strong>
                ) : (
                  `${shippingFee} RSD`
                )}
              </span>
            </div>
            <div className="cart-summary-total">
              <span>Ukupno za plaćanje:</span>
              <strong>{finalTotal.toLocaleString('sr-RS')} RSD</strong>
            </div>

            <div className="cart-drawer-actions">
              <Link
                href="/checkout"
                className="button primary full"
                onClick={() => setCartOpen(false)}
                style={{
                  background: 'var(--ink)',
                  color: '#fff',
                  justifyContent: 'center',
                  padding: '16px',
                  fontSize: '13px',
                }}
              >
                Nastavite na plaćanje <ArrowRight size={16} />
              </Link>
              <button
                className="cart-continue-link"
                onClick={() => setCartOpen(false)}
              >
                Nastavite sa kupovinom
              </button>
            </div>

            <div className="cart-trust-badges">
              <span>
                <Truck size={13} color="var(--cream)" /> 24h brza isporuka
              </span>
              <span>
                <ShieldCheck size={13} color="var(--cream)" /> 14 dana za povrat
              </span>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
