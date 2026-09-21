'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Clock,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Eye,
  ArrowRight,
  BookOpen,
  Sparkles,
} from 'lucide-react'
import { guides, products, Product } from '@/lib/data'
import { useCart } from '@/lib/cart-context'

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [expandedGuideId, setExpandedGuideId] = useState<string>(guides[0].id)

  const { addToCart, setQuickViewProduct } = useCart()

  const filteredGuides =
    activeCategory === 'all'
      ? guides
      : guides.filter((g) => g.category.toLowerCase().includes(activeCategory.toLowerCase()))

  const toggleExpand = (id: string) => {
    setExpandedGuideId((prev) => (prev === id ? '' : id))
  }

  return (
    <main className="guides-page">
      {/* ── Hero ── */}
      <section className="guides-hero">
        <div className="guides-hero-inner">
          <p className="eyebrow">BAZA ZNANJA // SERVISNI PROTOKOLI</p>
          <h1>
            Servisni vodiči za <i>pravilnu montažu</i> i kalibraciju.
          </h1>
          <p className="guides-hero-sub">
            Inženjerska uputstva korak-po-korak iz radionice Ferro Crema. Naučite
            kako bezbedno zameniti dihtunge, poravnati noževe mlina i zaštititi
            aparat od oštećenja bez skupih servisnih zastoja.
          </p>
        </div>
      </section>

      {/* ── Filter categories ── */}
      <section className="guides-filter-section">
        <div className="guides-filter-inner">
          <div className="guides-pills">
            <button
              className={`catalog-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Svi vodiči ({guides.length})
            </button>
            <button
              className={`catalog-pill ${activeCategory === 'grupe' ? 'active' : ''}`}
              onClick={() => setActiveCategory('grupe')}
            >
              Grupe i zaptivke
            </button>
            <button
              className={`catalog-pill ${activeCategory === 'mlinovi' ? 'active' : ''}`}
              onClick={() => setActiveCategory('mlinovi')}
            >
              Mlinovi i noževi
            </button>
            <button
              className={`catalog-pill ${activeCategory === 'hidraulika' ? 'active' : ''}`}
              onClick={() => setActiveCategory('hidraulika')}
            >
              Dekalcifikacija i hidraulika
            </button>
          </div>
        </div>
      </section>

      {/* ── Guides List ── */}
      <section className="guides-list-section">
        <div className="guides-list-inner">
          {filteredGuides.map((guide) => {
            const isExpanded = expandedGuideId === guide.id
            const relatedProductList: Product[] = guide.relatedProducts
              .map((id) => products.find((p) => p.id === id))
              .filter((p): p is Product => p !== undefined)

            return (
              <article key={guide.id} className="guide-card">
                <div className="guide-card-header" onClick={() => toggleExpand(guide.id)}>
                  <div className="guide-meta-row">
                    <span className="guide-category-badge">{guide.category}</span>
                    <span className="guide-time-badge">
                      <Clock size={13} /> {guide.duration}
                    </span>
                    <span
                      className={`guide-difficulty-badge ${
                        guide.difficulty === 'Početni' ? 'diff-easy' : 'diff-medium'
                      }`}
                    >
                      Težina: {guide.difficulty}
                    </span>
                  </div>

                  <h2 className="guide-card-title">{guide.title}</h2>
                  <p className="guide-card-excerpt">{guide.excerpt}</p>

                  <div className="guide-tools-preview">
                    <Wrench size={14} color="var(--cream)" />
                    <span>Potreban alat: {guide.tools.join(' · ')}</span>
                  </div>

                  <button
                    className="guide-expand-trigger"
                    aria-label={isExpanded ? 'Sakrij korake' : 'Prikaži korake'}
                  >
                    <span>{isExpanded ? 'Zatvori korake uputstva' : 'Otvori korak-po-korak proceduru'}</span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="guide-card-body">
                    <div className="guide-steps-container">
                      <h3>Procedura rada:</h3>
                      <div className="guide-steps-timeline">
                        {guide.steps.map((st) => (
                          <div key={st.step} className="guide-step-item">
                            <div className="step-num-bubble">{st.step}</div>
                            <div className="step-content">
                              <h4>{st.title}</h4>
                              <p>{st.instruction}</p>
                              {st.tip && (
                                <div className="step-pro-tip">
                                  <Sparkles size={14} color="var(--cream)" />
                                  <span>
                                    <strong>Savet iz radionice:</strong> {st.tip}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Parts for this guide */}
                    {relatedProductList.length > 0 && (
                      <div className="guide-parts-box">
                        <h4>Preporučeni delovi i alati za ovaj zahvat:</h4>
                        <div className="guide-parts-grid">
                          {relatedProductList.map((p) => (
                            <div key={p.id} className="guide-part-item">
                              <img src={p.image} alt={p.name} />
                              <div className="guide-part-text">
                                <strong>{p.name}</strong>
                                <span>{p.price}</span>
                              </div>
                              <div className="guide-part-actions">
                                <button className="button ghost" onClick={() => setQuickViewProduct(p)} style={{ padding: '8px 10px', fontSize: '11px' }}>
                                  <Eye size={13} /> Specifikacija
                                </button>
                                <button className="button primary" onClick={() => addToCart(p)} style={{ padding: '8px 12px', fontSize: '11px' }}>
                                  Dodaj <ShoppingBag size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* ── Help / Workshop consultation ── */}
      <section className="guides-consult-section">
        <div className="guides-consult-inner">
          <div className="consult-box">
            <h3>Zapeli ste tokom samostalne montaže?</h3>
            <p>
              Pozovite našu tehničku podršku na <strong>064 8222 651</strong> svakog
              radnog dana od 07:30 do 15:30. Naši inženjeri će vas besplatno provesti
              kroz proceduru i pomoći da izbegnete oštećenje aparata.
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '18px' }}>
              <a href="tel:0648222651" className="button primary">
                Pozovite podršku: 064 8222 651
              </a>
              <Link href="/kontakt" className="button light">
                Pošaljite fotografiju kvara
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
