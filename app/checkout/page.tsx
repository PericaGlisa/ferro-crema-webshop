'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ShieldCheck,
  Truck,
  Building,
  Banknote,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Tag,
  ShoppingBag,
  PackageCheck,
  Wrench,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CheckoutPage() {
  const router = useRouter()
  const {
    cartItems,
    cartTotal,
    shippingFee,
    finalTotal,
    clearCart,
    freeShippingThreshold,
    pushToast,
    setQuickViewProduct,
  } = useCart()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    pib: '',
    address: '',
    city: '',
    postalCode: '',
    note: '',
    paymentMethod: 'pouzece' as 'pouzece' | 'racun',
  })

  const [promoInput, setPromoInput] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError('')
    if (promoInput.trim().toUpperCase() === 'FERRO10') {
      setDiscountPercent(10)
      pushToast('Promo kod FERRO10 primenjen (-10%)', 'like')
    } else {
      setPromoError('Nevažeći promo kod. Probajte kod: FERRO10')
    }
  }

  const discountAmount = Math.round((cartTotal * discountPercent) / 100)
  const calculatedTotal = Math.max(0, cartTotal - discountAmount) + (cartTotal > 0 ? shippingFee : 0)

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (cartItems.length === 0) {
      alert('Vaša korpa je prazna.')
      return
    }

    setIsSubmitting(true)

    // Generate order number
    const orderNumber = `FC-2026-${Math.floor(1000 + Math.random() * 9000)}`

    // Store in sessionStorage for success page
    try {
      sessionStorage.setItem(
        'last_order',
        JSON.stringify({
          orderNumber,
          date: new Date().toLocaleDateString('sr-RS'),
          items: cartItems,
          total: calculatedTotal,
          shipping: shippingFee,
          customer: formData,
        })
      )
    } catch {
      // ignore
    }

    setTimeout(() => {
      clearCart()
      router.push(`/checkout/uspesno?narudzbina=${orderNumber}`)
    }, 600)
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page checkout-empty-wrap">
        <section className="checkout-empty-hero" aria-labelledby="empty-cart-heading">
          <div className="checkout-empty-content">
            <p className="eyebrow">KORPA / PORUDŽBINA</p>
            <div className="checkout-empty-card">
              <div className="checkout-empty-icon" aria-hidden="true">
                <ShoppingBag size={38} strokeWidth={1.35} />
              </div>
              <h1 id="empty-cart-heading">Vaša korpa je <i>prazna.</i></h1>
              <p>
                Niste dodali nijedan artikal u korpu. Pregledajte katalog rezervnih
                delova ili prvo proverite koji deo odgovara vašem aparatu.
              </p>
              <div className="checkout-empty-actions">
                <Link href="/katalog" className="button primary">
                  Istražite katalog delova <ArrowRight size={14} />
                </Link>
                <Link href="/kompatibilnost" className="button light">
                  Proverite kompatibilnost
                </Link>
              </div>
            </div>
          </div>
          <div className="checkout-empty-assurances" aria-label="Prednosti kupovine">
            <div>
              <PackageCheck size={19} />
              <span><strong>Direktno sa lagera</strong><small>Jasna dostupnost uz svaki artikal</small></span>
            </div>
            <div>
              <Truck size={19} />
              <span><strong>Isporuka za 24–48h</strong><small>Za artikle dostupne na stanju</small></span>
            </div>
            <div>
              <Wrench size={19} />
              <span><strong>Tehnička provera</strong><small>Pomoć oko izbora pravog dela</small></span>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-header-bar">
        <div className="checkout-header-inner">
          <Link href="/katalog" className="checkout-back-link">
            <ArrowLeft size={16} /> Nazad u kupovinu
          </Link>
          <div className="checkout-secure-badge">
            <Lock size={14} color="var(--cream)" />
            <span>256-bit SSL bezbedna naplata</span>
          </div>
        </div>
      </div>

      <div className="checkout-container">
        <form onSubmit={handleSubmitOrder} className="checkout-form-col">
          {/* ── Step 1: Customer Contact ── */}
          <section className="checkout-section-box">
            <div className="checkout-box-heading">
              <span className="step-bubble">1</span>
              <h3>Kontakt podaci kupca</h3>
            </div>
            <div className="checkout-inputs-grid">
              <div className="form-group">
                <label htmlFor="f-name">Ime *</label>
                <input
                  id="f-name"
                  type="text"
                  required
                  placeholder="Marko"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="l-name">Prezime *</label>
                <input
                  id="l-name"
                  type="text"
                  required
                  placeholder="Petrović"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-email">Email adresa (za potvrdu porudžbine) *</label>
                <input
                  id="c-email"
                  type="email"
                  required
                  placeholder="marko@primer.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-phone">Telefon za kurira *</label>
                <input
                  id="c-phone"
                  type="tel"
                  required
                  placeholder="064 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* ── Step 2: Shipping Address ── */}
          <section className="checkout-section-box">
            <div className="checkout-box-heading">
              <span className="step-bubble">2</span>
              <h3>Adresa za isporuku u Srbiji</h3>
            </div>
            <div className="checkout-inputs-grid">
              <div className="form-group full">
                <label htmlFor="c-address">Ulica i kućni broj / sprat / stan *</label>
                <input
                  id="c-address"
                  type="text"
                  required
                  placeholder="npr. Bulevar kralja Aleksandra 124, stan 8"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-city">Grad / Mesto *</label>
                <input
                  id="c-city"
                  type="text"
                  required
                  placeholder="Beograd"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-post">Poštanski broj *</label>
                <input
                  id="c-post"
                  type="text"
                  required
                  placeholder="11000"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                />
              </div>
              <div className="form-group full">
                <label htmlFor="c-company-name">Pravno lice (firma / lokal) — opciono za račun</label>
                <input
                  id="c-company-name"
                  type="text"
                  placeholder="Naziv pravnog lica i PIB (ukoliko kupujete preko računa firme)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="form-group full">
                <label htmlFor="c-note">Napomena za kurirsku službu (opciono)</label>
                <input
                  id="c-note"
                  type="text"
                  placeholder="npr. Zvoniti na interfon Petrović, zgrada ima rampu..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* ── Step 3: Payment Method ── */}
          <section className="checkout-section-box">
            <div className="checkout-box-heading">
              <span className="step-bubble">3</span>
              <h3>Izbor načina plaćanja</h3>
            </div>
            <div className="checkout-payment-options">
              <label
                className={`payment-radio-card ${formData.paymentMethod === 'pouzece' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="pouzece"
                  checked={formData.paymentMethod === 'pouzece'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'pouzece' })}
                />
                <div className="payment-card-body">
                  <div className="payment-title-row">
                    <Banknote size={18} color="var(--cream)" />
                    <strong>Plaćanje pouzećem (gotovinom kuriru)</strong>
                  </div>
                  <p>Plaćate gotovinom kuriru kurirske službe prilikom preuzimanja paketa na vašoj adresi.</p>
                </div>
              </label>

              <label
                className={`payment-radio-card ${formData.paymentMethod === 'racun' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="racun"
                  checked={formData.paymentMethod === 'racun'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'racun' })}
                />
                <div className="payment-card-body">
                  <div className="payment-title-row">
                    <Building size={18} color="var(--cream)" />
                    <strong>Uplata na račun firme (profaktura / nalog za prenos)</strong>
                  </div>
                  <p>Generisaćemo predračun sa podacima za uplatu. Roba se šalje odmah po evidentiranju uplate.</p>
                </div>
              </label>

            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="button primary full checkout-submit-btn"
          >
            {isSubmitting ? 'Obrada porudžbine...' : `Potvrdite porudžbinu (${calculatedTotal.toLocaleString('sr-RS')} RSD)`}{' '}
            <ArrowRight size={16} />
          </button>

          <div className="checkout-reassurance-row">
            <span>
              <Truck size={14} color="var(--cream)" /> Isporuka 24–48h na celoj teritoriji Srbije
            </span>
            <span>
              <ShieldCheck size={14} color="var(--cream)" /> 14 dana garancije na kompatibilnost
            </span>
          </div>
        </form>

        {/* ── Right Order Summary Column ── */}
        <aside className="checkout-summary-col">
          <div className="checkout-summary-card">
            <h3>Pregled porudžbine ({cartItems.length})</h3>

            <div className="checkout-items-mini-list">
              {cartItems.map((item) => (
                <div key={item.product.id} className="checkout-mini-item">
                  <button
                    className="checkout-item-quick-view"
                    onClick={() => setQuickViewProduct(item.product)}
                    aria-label={`Brzi pregled specifikacije: ${item.product.name}`}
                  >
                    <img src={item.product.image} alt={item.product.name} />
                  </button>
                  <div className="checkout-mini-info">
                    <button
                      className="checkout-item-quick-view"
                      onClick={() => setQuickViewProduct(item.product)}
                    >
                      {item.product.name}
                    </button>
                    <span>Količina: {item.qty} × {item.product.price}</span>
                  </div>
                  <span className="checkout-mini-subtotal">
                    {(item.product.priceNum * item.qty).toLocaleString('sr-RS')} RSD
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="checkout-promo-box">
              <div className="promo-input-row">
                <Tag size={15} color="var(--cream)" />
                <input
                  type="text"
                  placeholder="Unesite promo kod (npr. FERRO10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  aria-label="Promo kod"
                />
                <button type="submit" className="button dark" style={{ padding: '8px 14px', fontSize: '11px' }}>
                  Primeni
                </button>
              </div>
              {promoError && <span className="promo-error-msg">{promoError}</span>}
              {discountPercent > 0 && (
                <span className="promo-success-msg">
                  <CheckCircle2 size={13} /> Aktivan popust od {discountPercent}%
                </span>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="checkout-calc-lines">
              <div className="calc-line">
                <span>Međuzbir artikala:</span>
                <strong>{cartTotal.toLocaleString('sr-RS')} RSD</strong>
              </div>

              {discountAmount > 0 && (
                <div className="calc-line discount-line">
                  <span>Popust ({discountPercent}%):</span>
                  <strong>−{discountAmount.toLocaleString('sr-RS')} RSD</strong>
                </div>
              )}

              <div className="calc-line">
                <span>Dostava (brza pošta):</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong style={{ color: 'var(--cream)' }}>BESPLATNA</strong>
                  ) : (
                    `${shippingFee} RSD`
                  )}
                </span>
              </div>

              <div className="calc-total-line">
                <span>Ukupno za uplatu:</span>
                <strong>{calculatedTotal.toLocaleString('sr-RS')} RSD</strong>
              </div>
              <small className="calc-pdv-notice">PDV je uračunat u sve cene. Nema skrivenih troškova.</small>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
