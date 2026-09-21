'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle2,
  Package,
  Truck,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Download,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderParam = searchParams.get('narudzbina') || 'FC-2026-9812'
  const [orderData, setOrderData] = useState<any>(null)
  const { setQuickViewProduct } = useCart()

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('last_order')
      if (stored) {
        setOrderData(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  return (
    <main className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon-bubble">
          <CheckCircle2 size={54} color="var(--cream)" />
        </div>

        <p className="eyebrow">STATUS: PORUDŽBINA POTVRĐENA</p>
        <h1>Hvala vam na ukazanom poverenju!</h1>
        <p className="success-sub">
          Vaša porudžbina je uspešno zaprimljena u radionici Ferro Crema u
          Beogradu. Naši inženjeri pakuju komponente u namensku anti-šok
          ambalažu.
        </p>

        <div className="order-number-banner">
          <span>BROJ PORUDŽBINE:</span>
          <strong>{orderData?.orderNumber || orderParam}</strong>
        </div>

        <div className="order-timeline-steps">
          <div className="timeline-step completed">
            <span className="timeline-dot" />
            <div>
              <strong>Porudžbina evidentirana</strong>
              <small>Automatska potvrda poslata na email</small>
            </div>
          </div>
          <div className="timeline-step current">
            <span className="timeline-dot" />
            <div>
              <strong>Pakovanje i kontrola</strong>
              <small>Provera tolerancija u radionici</small>
            </div>
          </div>
          <div className="timeline-step">
            <span className="timeline-dot" />
            <div>
              <strong>Isporuka kurirskom službom</strong>
              <small>Očekivano uručenje: 24–48h</small>
            </div>
          </div>
        </div>

        {orderData?.items && (
          <div className="order-success-items-summary">
            <h3>Naručeni artikli:</h3>
            <div className="success-items-list">
              {orderData.items.map((it: any) => (
                <div key={it.product.id} className="success-item-row">
                  <button
                    className="success-item-quick-view"
                    onClick={() => setQuickViewProduct(it.product)}
                    aria-label={`Brzi pregled specifikacije: ${it.product.name}`}
                  >
                    <img src={it.product.image} alt={it.product.name} />
                  </button>
                  <div className="success-item-name">
                    <button
                      className="success-item-quick-view"
                      onClick={() => setQuickViewProduct(it.product)}
                    >
                      {it.product.name}
                    </button>
                    <small>Količina: {it.qty}</small>
                  </div>
                  <span className="success-item-price">
                    {(it.product.priceNum * it.qty).toLocaleString('sr-RS')} RSD
                  </span>
                </div>
              ))}
            </div>

            <div className="success-total-row">
              <span>Ukupan iznos:</span>
              <strong>{orderData.total?.toLocaleString('sr-RS')} RSD</strong>
            </div>
          </div>
        )}

        <div className="order-success-support-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Phone size={14} color="var(--cream)" />
            <strong style={{ fontSize: '12px' }}>Potrebna vam je izmena ili račun pre slanja?</strong>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--steel)', margin: 0 }}>
            Pozovite našu radionicu na <strong>064 8222 651</strong> (radnim danima
            07:30–15:30) ili pošaljite poruku na{' '}
            <a href="mailto:office@ferrocrema.com">office@ferrocrema.com</a> uz navođenje
            broja porudžbine.
          </p>
        </div>

        <div className="order-success-actions">
          <Link href="/katalog" className="button primary">
            Nastavite pregled kataloga <ArrowRight size={15} />
          </Link>
          <Link href="/" className="button light">
            Povratak na početnu stranu
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: '120px 34px', textAlign: 'center' }}>Učitavanje potvrde porudžbine...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
