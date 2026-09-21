'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, BadgePercent, Boxes, FileText, Gauge, RotateCcw, Search, ShieldCheck, SlidersHorizontal, Truck, X } from 'lucide-react'
import { products, categories } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'

function CatalogContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCat = searchParams.get('kategorija') || 'all'
  const initialBrand = searchParams.get('brend') || searchParams.get('brand') || 'all'

  const [search, setSearch] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCat)
  const [selectedBrand, setSelectedBrand] = useState(initialBrand)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured')

  useEffect(() => {
    if (initialQuery) setSearch(initialQuery)
    if (initialCat) setSelectedCategory(initialCat)
    if (initialBrand) setSelectedBrand(initialBrand)
  }, [initialQuery, initialCat, initialBrand])

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // category match
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false
        }
        // brand match
        if (selectedBrand !== 'all') {
          const brandLower = selectedBrand.toLowerCase()
          const matchesComp = p.compatible.some((c) =>
            c.toLowerCase().includes(brandLower)
          )
          const matchesName = p.name.toLowerCase().includes(brandLower)
          if (!matchesComp && !matchesName) return false
        }
        // search query
        if (search.trim()) {
          const query = search.toLowerCase().trim()
          const inName = p.name.toLowerCase().includes(query)
          const inMeta = p.meta.toLowerCase().includes(query)
          const inMat = p.material.toLowerCase().includes(query)
          const inComp = p.compatible.some((c) => c.toLowerCase().includes(query))
          if (!inName && !inMeta && !inMat && !inComp) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceNum - b.priceNum
        if (sortBy === 'price-desc') return b.priceNum - a.priceNum
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        return 0
      })
  }, [search, selectedCategory, selectedBrand, sortBy])

  const hasActiveFilters = selectedCategory !== 'all' || selectedBrand !== 'all' || Boolean(search)
  const resetFilters = () => {
    setSelectedCategory('all')
    setSelectedBrand('all')
    setSearch('')
  }

  return (
    <main className="catalog-page">
      {/* ── Header Banner ── */}
      <section className="catalog-hero">
        <div className="catalog-hero-inner">
          <p className="eyebrow">DISTRIBUCIJA // ORIGINALNI I OEM DELOVI</p>
          <h1>
            Katalog delova za <i>espresso aparate</i> i mlinove.
          </h1>
          <p className="catalog-hero-sub">
            Prehrambeni silikonski dihtunzi, fabrički kaljeni noževi, IMS foto-tuš
            sita i kalibrisani barista instrumenti. Isporuka u roku od 24h direktno sa
            lagera u Beogradu.
          </p>

          <div className="catalog-quick-stats" aria-label="Prednosti Ferro Crema kataloga">
            <div className="catalog-stat"><ShieldCheck aria-hidden="true" /><div><strong>100%</strong><span>Garantovana kompatibilnost</span></div></div>
            <div className="catalog-stat"><Truck aria-hidden="true" /><div><strong>24h</strong><span>Isporuka sa lagera</span></div></div>
            <div className="catalog-stat"><Gauge aria-hidden="true" /><div><strong>±0.05 mm</strong><span>Tolerancija kalibracije</span></div></div>
            <div className="catalog-stat"><RotateCcw aria-hidden="true" /><div><strong>14 dana</strong><span>Rok za zamenu dela</span></div></div>
          </div>
        </div>
      </section>

      {/* ── Filters & Search Toolbar ── */}
      <section className="catalog-toolbar-section" aria-labelledby="catalog-filter-heading">
        <div className="catalog-toolbar-inner">
          <div className="catalog-filter-heading-row">
            <div>
              <p className="eyebrow"><SlidersHorizontal size={12} /> PAMETNA PRETRAGA KATALOGA</p>
              <h2 id="catalog-filter-heading">Pronađite tačan deo za vašu opremu.</h2>
            </div>
            <div className="catalog-filter-status" aria-live="polite">
              <span><strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'artikal odgovara' : 'artikala odgovara'} izboru</span>
              {hasActiveFilters && (
                <button className="catalog-reset-btn" onClick={resetFilters}>
                  <X size={13} /> Poništi filtere
                </button>
              )}
            </div>
          </div>
          <div className="catalog-toolbar-top">
          <div className="catalog-search-wrap">
            <Search size={18} className="catalog-search-icon" />
            <input
              type="text"
              placeholder="Pretražite po nazivu, dimenziji (58.5 mm, 8.5 mm) ili modelu aparata..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Pretraga po katalogu"
            />
            {search && (
              <button
                className="catalog-search-clear"
                onClick={() => setSearch('')}
                aria-label="Obriši pretragu"
              >
                ×
              </button>
            )}
          </div>

          <div className="catalog-select-group" aria-label="Filteri kataloga">
            <div className="catalog-filter-box">
              <label htmlFor="brand-filter">Brend aparata / mlina:</label>
              <select
                id="brand-filter"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="all">Svi brendovi opreme</option>
                <option value="E61">E61 Standard</option>
                <option value="La Marzocco">La Marzocco</option>
                <option value="Mazzer">Mazzer</option>
                <option value="Rocket">Rocket Milano</option>
                <option value="ECM">ECM Heidelberg</option>
                <option value="Profitec">Profitec</option>
                <option value="Bezzera">Bezzera</option>
                <option value="Mahlkönig">Mahlkönig</option>
                <option value="Eureka">Eureka</option>
                <option value="Faema">Faema</option>
                <option value="Slayer">Slayer</option>
                <option value="Kees van der Westen">Kees van der Westen</option>
                <option value="Synesso">Synesso</option>
                <option value="Victoria Arduino">Victoria Arduino</option>
                <option value="Rancilio">Rancilio</option>
                <option value="Compak">Compak</option>
              </select>
            </div>

            <div className="catalog-filter-box">
              <label htmlFor="sort-by">Sortiraj po:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="featured">Preporučeno iz radionice</option>
                <option value="price-asc">Cena: rastuće</option>
                <option value="price-desc">Cena: opadajuće</option>
                <option value="name">Naziv artikla (A–Z)</option>
              </select>
            </div>
          </div>
          </div>

          <div className="catalog-category-filter">
            <span className="catalog-category-label">Kategorija dela</span>
            <div className="catalog-pills-wrap">
              <button
                className={`catalog-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Svi artikli ({products.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`catalog-pill ${selectedCategory === c.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(c.id)}
                >
                  <span className="pill-icon">{c.icon}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="catalog-grid-section">
        <div className="catalog-grid-inner">
          <div className="catalog-results-meta">
            <span>
              Prikazano <strong>{filteredProducts.length}</strong> od ukupno {products.length} artikala
            </span>
            {hasActiveFilters && (
              <button className="catalog-reset-btn" onClick={resetFilters}>
                Poništi sve filtere
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="catalog-empty">
              <p>Nema pronađenih artikala koji odgovaraju izabranim filterima.</p>
              <button
                className="button light"
                onClick={resetFilters}
              >
                Prikaži sve artikle iz kataloga
              </button>
            </div>
          ) : (
            <div className="product-grid catalog-products">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showSpecs />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── B2B Banner ── */}
      <section className="catalog-b2b-banner" aria-labelledby="b2b-heading">
        <div className="catalog-b2b-content">
          <p className="eyebrow">SERVISI & DISTRIBUTERI</p>
          <h2 id="b2b-heading">Potrebne su vam veće količine ili redovno snabdevanje?</h2>
          <p>
            Za servise espresso aparata, pržionice kafe i HoReCa lance nudimo rabatne
            skale, mogućnost naručivanja po fabričkim OEM kataloškim brojevima i odloženo
            plaćanje preko računa firme.
          </p>
        </div>
        <ul className="catalog-b2b-benefits" aria-label="B2B pogodnosti">
          <li><Boxes size={16} /><span><strong>OEM identifikacija</strong>Prema kataloškom broju</span></li>
          <li><BadgePercent size={16} /><span><strong>Rabatne skale</strong>Za redovno snabdevanje</span></li>
          <li><FileText size={16} /><span><strong>R1 račun i odloženo plaćanje</strong>Za pravna lica</span></li>
        </ul>
        <div className="catalog-b2b-actions">
          <Link href="/kontakt" className="button primary">Pošaljite B2B upit <ArrowRight size={15} /></Link>
          <a href="tel:0648222651" className="button light">Pozovite podršku</a>
        </div>
      </section>
    </main>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', padding: '100px 34px', textAlign: 'center' }}>Učitavanje kataloga...</div>}>
      <CatalogContent />
    </Suspense>
  )
}
