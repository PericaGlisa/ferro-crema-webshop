'use client'

import React from 'react'
import {
  X,
  Shield,
  ThermometerSun,
  Gauge,
  Ruler,
  Check,
  ShoppingBag,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart()

  if (!quickViewProduct) return null

  return (
    <div
      className="qv-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalji: ${quickViewProduct.name}`}
    >
      <button
        className="drawer-backdrop"
        onClick={() => setQuickViewProduct(null)}
        aria-label="Zatvori pregled"
      />
      <div className="qv-modal">
        <button
          className="qv-close"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Zatvori"
        >
          <X size={22} />
        </button>
        <div className="qv-body">
          <div className="qv-image-col">
            <img src={quickViewProduct.image} alt={quickViewProduct.name} />
            <span className="product-tag">{quickViewProduct.tag}</span>
          </div>
          <div className="qv-info-col">
            <p className="eyebrow">TEHNIČKI SPECIFIKACIONI LIST</p>
            <h2>{quickViewProduct.name}</h2>
            <p className="qv-meta">{quickViewProduct.meta}</p>

            {quickViewProduct.description && (
              <p style={{ color: 'var(--steel)', fontSize: '13px', lineHeight: 1.6, margin: '14px 0 20px' }}>
                {quickViewProduct.description}
              </p>
            )}

            <div className="qv-specs-grid">
              {quickViewProduct.shore !== 'N/A' && (
                <div className="qv-spec">
                  <Shield size={16} />
                  <div>
                    <small>Tvrdoća</small>
                    <strong>{quickViewProduct.shore}</strong>
                  </div>
                </div>
              )}
              {quickViewProduct.tempMax !== 'N/A' && (
                <div className="qv-spec">
                  <ThermometerSun size={16} />
                  <div>
                    <small>Max temperatura</small>
                    <strong>{quickViewProduct.tempMax}</strong>
                  </div>
                </div>
              )}
              {quickViewProduct.pressureMax !== 'N/A' && (
                <div className="qv-spec">
                  <Gauge size={16} />
                  <div>
                    <small>Max pritisak</small>
                    <strong>{quickViewProduct.pressureMax}</strong>
                  </div>
                </div>
              )}
              <div className="qv-spec">
                <Ruler size={16} />
                <div>
                  <small>Dimenzije</small>
                  <strong>{quickViewProduct.dimensions}</strong>
                </div>
              </div>
            </div>

            <div className="qv-detail" style={{ marginTop: '16px' }}>
              <strong>Materijal izrade</strong>
              <p>{quickViewProduct.material}</p>
            </div>

            <div className="qv-detail">
              <strong>100% kompatibilno sa aparatima</strong>
              <div className="qv-compat-list">
                {quickViewProduct.compatible.map((c) => (
                  <span key={c}>
                    <Check size={12} /> {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="qv-price-row">
              <div>
                <span className="qv-price">{quickViewProduct.price}</span>
                {quickViewProduct.old && <del>{quickViewProduct.old}</del>}
                <small>PDV uračunat · Dostupno na lageru u Beogradu</small>
              </div>
              <button
                className="button primary"
                onClick={() => {
                  addToCart(quickViewProduct)
                  setQuickViewProduct(null)
                }}
              >
                Dodaj u korpu <ShoppingBag size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
