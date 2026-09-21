'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Phone,
  ArrowRight,
  FileText,
  LockKeyhole,
} from 'lucide-react'
import { faqData } from '@/lib/data'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [selectedCat, setSelectedCat] = useState<string>('all')
  const [search, setSearch] = useState('')

  const categories = [
    { id: 'all', label: 'Sva pitanja' },
    { id: 'Proizvodi & Kompatibilnost', label: 'Proizvodi & Kompatibilnost' },
    { id: 'Isporuka & Garancija', label: 'Isporuka & Garancija' },
    { id: 'Servis & Održavanje', label: 'Servis & Održavanje' },
  ]

  const filteredQuestions = useMemo(() => {
    return faqData.filter((item) => {
      if (selectedCat !== 'all' && item.category !== selectedCat) {
        return false
      }
      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [selectedCat, search])

  const categoryCount = (categoryId: string) =>
    categoryId === 'all'
      ? faqData.length
      : faqData.filter((item) => item.category === categoryId).length

  const resetFilters = () => {
    setSearch('')
    setSelectedCat('all')
    setOpenIndex(0)
  }

  const hasActiveFilters = selectedCat !== 'all' || Boolean(search.trim())

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <main className="faq-page">
      {/* ── Hero ── */}
      <section className="faq-hero">
        <div className="faq-hero-inner">
          <p className="eyebrow">TEHNIČKA I LOGISTIČKA PODRŠKA</p>
          <h1>
            Česta pitanja i <i>inženjerski odgovori.</i>
          </h1>
          <p className="faq-hero-sub">
            Sve što vas zanima o dimenzijama delova, materijalima, roku isporuke,
            uslovima zamene i pravilnom održavanju profesionalnih i kućnih espresso
            aparata.
          </p>

          <div className="faq-search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Pretražite bazu pitanja i odgovora (npr. dihtung, noževi, dostava)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Pretraži pitanja"
            />
            {search && (
              <button
                className="faq-search-clear"
                onClick={() => setSearch('')}
                aria-label="Obriši pretragu"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Category Filters ── */}
      <section className="faq-filter-section" aria-labelledby="faq-filter-heading">
        <div className="faq-filter-inner">
          <div className="faq-filter-heading-row">
            <div>
              <p className="eyebrow">BAZA ZNANJA</p>
              <h2 id="faq-filter-heading">Pronađite odgovor za svoj deo ili aparat.</h2>
            </div>
            <div className="faq-results-count" aria-live="polite">
              <strong>{filteredQuestions.length}</strong>
              <span>{filteredQuestions.length === 1 ? 'odgovor' : 'odgovora'}</span>
              {hasActiveFilters && (
                <button type="button" onClick={resetFilters}>Poništi filtere</button>
              )}
            </div>
          </div>
          <div className="faq-pills-row">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`catalog-pill ${selectedCat === c.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCat(c.id)
                  setOpenIndex(0)
                }}
              >
                {c.label} <small>{categoryCount(c.id)}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accordion List ── */}
      <section className="faq-accordion-section">
        <div className="faq-accordion-inner">
          {filteredQuestions.length === 0 ? (
            <div className="faq-empty">
              <p>Nema pronađenih odgovora za uneti pojam pretrage.</p>
              <button
                className="button light"
                onClick={resetFilters}
              >
                Prikaži sva pitanja
              </button>
            </div>
          ) : (
            <div className="faq-list">
              {filteredQuestions.map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div
                    key={idx}
                    className={`faq-item-card ${isOpen ? 'active' : ''}`}
                  >
                    <button
                      className="faq-question-btn"
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-icon-toggle">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-body">
                        <p>{item.a}</p>
                        {item.category && (
                          <span className="faq-cat-tag">{item.category}</span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="faq-legal-links" aria-labelledby="faq-legal-heading">
        <div>
          <p className="eyebrow">KUPOVINA I PODACI</p>
          <h2 id="faq-legal-heading">Pravne informacije na jednom mestu.</h2>
          <p>Pregledajte uslove kupovine, isporuku, reklamacije i način na koji obrađujemo podatke.</p>
        </div>
        <div className="faq-legal-cards">
          <Link href="/uslovi-kupovine"><FileText size={18} /><span><strong>Uslovi kupovine</strong><small>Isporuka, odustanak i reklamacije</small></span><ArrowRight size={15} /></Link>
          <Link href="/politika-privatnosti"><LockKeyhole size={18} /><span><strong>Politika privatnosti</strong><small>Podaci, kolačići i vaša prava</small></span><ArrowRight size={15} /></Link>
        </div>
      </section>

      {/* ── Contact notice ── */}
      <section className="faq-contact-card-section">
        <div className="faq-contact-inner">
          <div className="faq-contact-left">
            <HelpCircle size={32} color="var(--cream)" />
            <div>
              <h3>Niste pronašli odgovor na vaše pitanje?</h3>
              <p>
                Naša tehnička služba i radionica u Beogradu stoje vam na raspolaganju
                za sve konsultacije i identifikaciju delova.
              </p>
            </div>
          </div>
          <div className="faq-contact-right">
            <a href="tel:0648222651" className="button primary">
              <Phone size={14} /> 064 8222 651
            </a>
            <Link href="/kontakt" className="button light">
              Kontakt formular <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
