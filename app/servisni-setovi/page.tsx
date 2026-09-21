'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShoppingBag,
  Check,
  ShieldCheck,
  Clock,
  X,
  FileSearch,
  Boxes,
  Cpu,
  Tag,
} from 'lucide-react'
import { serviceKits } from '@/lib/data'
import { useCart } from '@/lib/cart-context'

type Kit = (typeof serviceKits)[0]

function KitDetailModal({ kit, onClose }: { kit: Kit; onClose: () => void }) {
  const { addToCart } = useCart()

  const handleAdd = () => {
    addToCart({
      id: 100 + kit.priceNum,
      slug: kit.slug,
      name: kit.name,
      category: 'setovi',
      meta: kit.subtitle,
      price: kit.price,
      priceNum: kit.priceNum,
      old: kit.oldPrice,
      tag: kit.tag,
      image: kit.image,
      shore: 'Kompletan kit',
      tempMax: '300°C',
      pressureMax: '16 bara',
      compatible: kit.compatibility,
      material: 'Fabrički set zaptivki i preciznih komponenti',
      dimensions: 'Kompletan kit',
      stock: 20,
    })
    onClose()
  }

  return (
    <div
      className="kit-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="kit-modal-panel">
        {/* Close */}
        <button className="kit-modal-close" onClick={onClose} aria-label="Zatvori">
          <X size={18} />
        </button>

        <div className="kit-modal-inner">
          {/* Left: Image */}
          <div className="kit-modal-media">
            <img src={kit.image} alt={kit.name} />
            <span className="kit-badge">{kit.badge}</span>
            <span className="kit-savings-chip">{kit.savings}</span>
          </div>

          {/* Right: Details */}
          <div className="kit-modal-details">
            <p className="eyebrow" style={{ marginBottom: 6 }}>{kit.tag}</p>
            <h2 className="kit-modal-title">{kit.name}</h2>
            <p className="kit-modal-subtitle">{kit.subtitle}</p>

            {/* Key facts */}
            <div className="kit-modal-facts">
              <div className="kit-modal-fact">
                <Clock size={14} />
                <div>
                  <strong>Preporučeni interval</strong>
                  <span>{kit.recommendedInterval}</span>
                </div>
              </div>
              <div className="kit-modal-fact">
                <Tag size={14} />
                <div>
                  <strong>Cena seta</strong>
                  <span>{kit.price} <del>{kit.oldPrice}</del></span>
                </div>
              </div>
            </div>

            {/* Contents */}
            <div className="kit-modal-block">
              <h4><Boxes size={13} /> Sadržaj seta</h4>
              <ul className="kit-modal-list">
                {kit.contents.map((c) => (
                  <li key={c}>
                    <Check size={13} color="var(--cream)" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compatibility */}
            <div className="kit-modal-block">
              <h4><Cpu size={13} /> Kompatibilni aparati / mlinovi</h4>
              <div className="kit-compat-pills kit-modal-pills">
                {kit.compatibility.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="kit-modal-cta">
              <div className="kit-price-box" style={{ gap: 4 }}>
                <span className="kit-price-current">{kit.price}</span>
                <del className="kit-price-old">{kit.oldPrice}</del>
                <small>Uračunat PDV · Besplatna dostava</small>
              </div>
              <button className="button primary" onClick={handleAdd}>
                Poručite set <ShoppingBag size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServiceSetsPage() {
  const { addToCart } = useCart()
  const [activeKit, setActiveKit] = useState<Kit | null>(null)

  const handleAddKitToCart = (kit: Kit) => {
    addToCart({
      id: 100 + kit.priceNum,
      slug: kit.slug,
      name: kit.name,
      category: 'setovi',
      meta: kit.subtitle,
      price: kit.price,
      priceNum: kit.priceNum,
      old: kit.oldPrice,
      tag: kit.tag,
      image: kit.image,
      shore: 'Kompletan kit',
      tempMax: '300°C',
      pressureMax: '16 bara',
      compatible: kit.compatibility,
      material: 'Fabrički set zaptivki i preciznih komponenti',
      dimensions: 'Kompletan kit',
      stock: 20,
    })
  }

  return (
    <main className="service-sets-page">
      {/* Kit detail modal */}
      {activeKit && (
        <KitDetailModal kit={activeKit} onClose={() => setActiveKit(null)} />
      )}

      {/* ── Hero ── */}
      <section className="service-sets-hero">
        <div className="service-sets-hero-inner">
          <p className="eyebrow">PREVENTIVNO ODRŽAVANJE // MAKSIMALNA UŠTEDA</p>
          <h1>
            Kompletni servisni setovi koji <i>sprečavaju skupe havarije.</i>
          </h1>
          <p className="service-sets-hero-sub">
            Fabrički usklađene komponente najčešće habanih tačaka na aparatima i
            mlinovima. Zamenite sve delove u jednom zahvatu uz uštedu do 1.810 RSD u
            odnosu na pojedinačnu kupovinu delova.
          </p>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="service-sets-props-section">
        <div className="service-sets-props-inner">
          <div className="prop-item">
            <span className="prop-num">01</span>
            <div>
              <strong>100% usklađene komponente</strong>
              <p>Nema rizika od nekompatibilnih debljina dihtunga i sita.</p>
            </div>
          </div>
          <div className="prop-item">
            <span className="prop-num">02</span>
            <div>
              <strong>Ušteda do 25% na paketu</strong>
              <p>Znatno povoljnija cena u poređenju sa pojedinačnim artiklima.</p>
            </div>
          </div>
          <div className="prop-item">
            <span className="prop-num">03</span>
            <div>
              <strong>Spremno za isporuku za 24h</strong>
              <p>Svi setovi su fabrički zapakovani i na stanju u Beogradu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kits Presentation ── */}
      <section className="service-sets-grid-section">
        <div className="service-sets-grid-inner">
          {serviceKits.map((kit) => (
            <article key={kit.id} className="service-kit-card">
              <div className="kit-card-media">
                <img src={kit.image} alt={kit.name} />
                <span className="kit-badge">{kit.badge}</span>
                <span className="kit-savings-chip">{kit.savings}</span>
              </div>

              <div className="kit-card-content">
                <div className="kit-tag-row">
                  <span className="kit-tag">{kit.tag}</span>
                  <span className="kit-interval">
                    <Clock size={13} /> {kit.recommendedInterval}
                  </span>
                </div>

                <h2 className="kit-title">{kit.name}</h2>
                <p className="kit-subtitle">{kit.subtitle}</p>

                {/* Contents breakdown */}
                <div className="kit-contents-block">
                  <h4>Sadržaj servisnog seta:</h4>
                  <ul>
                    {kit.contents.map((c) => (
                      <li key={c}>
                        <Check size={14} color="var(--cream)" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compatibility */}
                <div className="kit-compat-block">
                  <h4>Kompatibilni modeli:</h4>
                  <div className="kit-compat-pills">
                    {kit.compatibility.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="kit-pricing-row">
                  <div className="kit-price-box">
                    <span className="kit-price-current">{kit.price}</span>
                    <del className="kit-price-old">{kit.oldPrice}</del>
                    <small>Uračunat PDV · Besplatna dostava</small>
                  </div>
                  <div className="kit-cta-group">
                    <button
                      className="button outline-dark kit-spec-btn"
                      onClick={() => setActiveKit(kit)}
                      title="Brzi pregled specifikacije seta"
                    >
                      <FileSearch size={14} />
                      Brzi pregled
                    </button>
                    <button
                      className="button primary"
                      onClick={() => handleAddKitToCart(kit)}
                    >
                      Poručite set <ShoppingBag size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Why Preventative Maintenance ── */}
      <section className="service-sets-faq-band">
        <div className="service-sets-faq-inner">
          <div>
            <p className="eyebrow">EKONOMIJA ODRŽAVANJA</p>
            <h2>Zašto je preventivni servis 5× jeftiniji od popravke?</h2>
            <p>
              Stvrdnuti gumeni dihtung prisiljava osoblje da prekomerno steže ručku
              portafiltera, što u roku od par meseci deformiše mesingana ležišta
              bajoneta na samoj grupi (popravka košta preko 30.000 RSD). Redovnom
              zamenom elastičnog silikona i tuš sita eliminišete rizik od havarije.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <Link href="/vodici" className="button light">
              Pogledajte servisna uputstva
            </Link>
            <Link href="/katalog" className="button dark">
              Pretražite sve delove
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
