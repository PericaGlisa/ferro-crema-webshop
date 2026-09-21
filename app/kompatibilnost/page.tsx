'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  Wrench,
  Search,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Sliders,
} from 'lucide-react'
import {
  machineCompatibilityDatabase,
  products,
  Product,
} from '@/lib/data'
import { useCart } from '@/lib/cart-context'

export default function CompatibilityPage() {
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0)
  const [selectedModel, setSelectedModel] = useState<string>(
    machineCompatibilityDatabase[0].models[0]
  )
  const [searchModel, setSearchModel] = useState('')

  const { addToCart, setQuickViewProduct } = useCart()

  const activeBrandData = machineCompatibilityDatabase[selectedBrandIndex]

  const matchedParts: Product[] = activeBrandData.parts
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)

  const handleBrandChange = (index: number) => {
    setSelectedBrandIndex(index)
    setSelectedModel(machineCompatibilityDatabase[index].models[0])
  }

  return (
    <main className="compat-page">
      {/* ── Hero ── */}
      <section className="compat-hero">
        <div className="compat-hero-inner">
          <p className="eyebrow">DIJAGNOSTIKA // NULTA TOLERANCIJA ODSTUPANJA</p>
          <h1>
            Vodič za <i>100% fabričku kompatibilnost</i> vašeg aparata.
          </h1>
          <p className="compat-hero-sub">
            Izbegnite pogrešne dimenzije dihtunga, nepravilan ugao zaključavanja
            portafiltera ili pregrevanje noževa mlina. Izaberite brend i model —
            prikazujemo samo delove koji se montiraju u nultu toleranciju.
          </p>
        </div>
      </section>

      {/* ── Interactive Machine Finder ── */}
      <section className="compat-tool-section">
        <div className="compat-tool-inner">
          <div className="compat-tool-grid">
            {/* Left selector panel */}
            <div className="compat-selector-card">
              <div className="compat-step-badge">
                <span>KORAK 01</span>
                <strong>Izaberite proizvođača opreme</strong>
              </div>

              <div className="compat-brands-list">
                {machineCompatibilityDatabase.map((item, idx) => (
                  <button
                    key={item.brand}
                    className={`compat-brand-btn ${idx === selectedBrandIndex ? 'active' : ''}`}
                    onClick={() => handleBrandChange(idx)}
                  >
                    <span>{item.brand}</span>
                    <small>{item.models.length} modela</small>
                  </button>
                ))}
              </div>

              <div className="compat-step-badge" style={{ marginTop: '28px' }}>
                <span>KORAK 02</span>
                <strong>Izaberite tačan model mašine</strong>
              </div>

              <div className="compat-models-list">
                {activeBrandData.models.map((model) => (
                  <button
                    key={model}
                    className={`compat-model-btn ${selectedModel === model ? 'active' : ''}`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <CheckCircle2 size={16} />
                    <span>{model}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right diagnostic report & matched parts */}
            <div className="compat-report-card">
              <div className="compat-report-header">
                <div className="compat-badge-pill">
                  <ShieldCheck size={16} color="var(--cream)" />
                  <span>POTVRĐENA KOMPATIBILNOST</span>
                </div>
                <h2>
                  {activeBrandData.brand} — {selectedModel}
                </h2>
                <p className="compat-group-tag">
                  Standard grupe / glave: <strong>{activeBrandData.groupType}</strong>
                </p>
              </div>

              <div className="compat-specs-box">
                <div className="compat-spec-item">
                  <small>Preporučena debljina dihtunga</small>
                  <strong>8.5 mm (VMQ Silikon)</strong>
                </div>
                <div className="compat-spec-item">
                  <small>Prečnik precizne korpe / sita</small>
                  <strong>58.5 mm / 58 mm</strong>
                </div>
                <div className="compat-spec-item">
                  <small>Ugao zaključavanja u radu</small>
                  <strong>90° (tačno 6 sati)</strong>
                </div>
                <div className="compat-spec-item">
                  <small>Preporučeni radni pritisak</small>
                  <strong>9.0 bara na paku</strong>
                </div>
              </div>

              <div className="compat-parts-list-title">
                <h3>Fabrički usklađeni delovi na lageru ({matchedParts.length})</h3>
                <span>Spremni za isporuku u roku od 24h</span>
              </div>

              <div className="compat-matched-parts-grid">
                {matchedParts.map((part) => (
                  <div key={part.id} className="compat-part-row">
                    <img src={part.image} alt={part.name} />
                    <div className="compat-part-info">
                      <span className="compat-part-cat">{part.meta}</span>
                      <h4>{part.name}</h4>
                      <span className="compat-part-dim">Dimenzije: {part.dimensions}</span>
                    </div>
                    <div className="compat-part-action">
                      <strong>{part.price}</strong>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="button ghost"
                          onClick={() => setQuickViewProduct(part)}
                          style={{ padding: '8px 12px', fontSize: '11px' }}
                        >
                          Specifikacija
                        </button>
                        <button
                          className="button primary"
                          onClick={() => addToCart(part)}
                          style={{ padding: '8px 14px', fontSize: '11px' }}
                        >
                          Dodaj <ShoppingBag size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Expert Advice Notice ── */}
      <section className="compat-help-banner">
        <div className="compat-help-inner">
          <div className="compat-help-icon">
            <HelpCircle size={32} />
          </div>
          <div>
            <h3>Ne možete da pronađete vaš model na listi?</h3>
            <p>
              U bazi imamo specifikacije za preko 350 komercijalnih i kućnih
              aparata (Sanremo, Slayer, Synesso, Dalla Corte, Rancilio, Nuova Simonelli,
              Victoria Arduino...). Pošaljite fotografiju grupe ili nazovite našu
              radionicu.
            </p>
          </div>
          <div className="compat-help-actions">
            <Link href="/kontakt" className="button dark">
              Pošaljite upit sa fotografijom
            </Link>
            <a href="tel:0648222651" className="button light">
              064 8222 651
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
