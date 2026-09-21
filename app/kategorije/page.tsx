'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Camera, CheckCircle2, CircleHelp, Phone, SearchCheck, Wrench } from 'lucide-react'
import { categories } from '@/lib/data'

export default function CategoriesPage() {
  const categoryDetails = [
    {
      id: 'dihtunzi',
      items: [
        'E61 silikonski dihtunzi 8.0 mm, 8.5 mm, 9.0 mm',
        'La Marzocco bajonet zaptivke',
        'Setovi O-ringova za parne i vodovodne ventile',
        'Teflonske zaptivke za grejače i prirubnice',
      ],
    },
    {
      id: 'sita',
      items: [
        'IMS Nanotech tuš sita sa foto-membranom',
        'VST precizne korpe (15g, 18g, 20g, 22g)',
        'Mesingani i čelični difuzori vode',
        'Puk ekrani (Puck screens) 58.5 mm',
      ],
    },
    {
      id: 'portafiltri',
      items: [
        'Bezdani (naked) portafiltri E61',
        'La Marzocco originalne ručke sa dvostrukim izlivom',
        'Rukohvati od oraha, masline i abonosa',
        'Opruge i sigurnosni osigurači korpi',
      ],
    },
    {
      id: 'nozevi',
      items: [
        'Mazzer Super Jolly (64 mm) i Major (83 mm)',
        'Mahlkönig EK43 (98 mm) ravni noževi',
        'Eureka Mignon (50 mm i 55 mm) noževi',
        'Titanijumski TiN i DLC dijamantski noževi',
      ],
    },
    {
      id: 'barista',
      items: [
        'Motta i kalibrisani tamperi sa oprugom',
        'WDT distribuatori sa 0.35 mm iglicama',
        'Levci za doziranje bez rasipanja',
        'Manometri za merenje statičkog i dinamičkog pritiska',
      ],
    },
    {
      id: 'hemija',
      items: [
        'Puly Caff prašak i tablete za backflush',
        'Profesionalni tečni dekalcifikatori za bojlere',
        'Puly Milk sredstvo za čišćenje cevi za paru',
        'Prehrambena silikonska mast NSF H1 za ventile',
      ],
    },
  ]

  return (
    <main className="categories-page">
      {/* ── Hero ── */}
      <section className="categories-hero">
        <div className="categories-hero-inner">
          <p className="eyebrow">STRUKTURA PONUDE // ARHITEKTURA DELOVA</p>
          <h1>
            Kategorije <i>rezervnih delova</i> i opreme.
          </h1>
          <p className="categories-hero-sub">
            Sve komponente su razvrstane prema svojoj mehaničkoj funkciji u aparatima
            i mlinovima. Od silikonskih zaptivki do mikronski kalibrisanih noževa —
            svaki artikal je ispitan i spreman za brzu isporuku.
          </p>
        </div>
      </section>

      {/* ── Categories Showcase Grid ── */}
      <section className="categories-showcase-section">
        <div className="categories-showcase-inner">
          <div className="categories-cards-grid">
            {categories.map((cat) => {
              const details = categoryDetails.find((d) => d.id === cat.id)
              return (
                <div key={cat.id} className="category-feature-card">
                  <div className="cat-card-media">
                    <img src={cat.image} alt={cat.name} />
                    <div className="cat-card-overlay" />
                    <span className="cat-card-badge">{cat.count}</span>
                  </div>
                  <div className="cat-card-content">
                    <div className="cat-card-title-row">
                      <span className="cat-card-icon">{cat.icon}</span>
                      <h3>{cat.name}</h3>
                    </div>
                    <p className="cat-card-desc">{cat.description}</p>

                    {details && (
                      <ul className="cat-card-items-list">
                        {details.items.map((sub) => (
                          <li key={sub}>
                            <CheckCircle2 size={13} color="var(--cream)" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`/katalog?kategorija=${cat.id}`}
                      className="button primary full"
                      style={{ justifyContent: 'center', marginTop: 'auto' }}
                    >
                      Pogledajte proizvode <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Help / Search CTA ── */}
      <section className="categories-cta-band" aria-labelledby="category-help-heading">
        <div className="categories-cta-inner">
          <div className="categories-cta-copy">
            <p className="eyebrow"><CircleHelp size={13} /> POTREBAN VAM JE SAVET?</p>
            <h2 id="category-help-heading">Niste sigurni u koju kategoriju spada vaš kvar?</h2>
            <p>
              Pozovite naš tim ili pošaljite fotografiju kvara. Naši stručnjaci će
              vam preporučiti tačan set delova pre nego što poručite.
            </p>
            <ol className="categories-help-steps">
              <li><span>01</span><div><strong>Identifikujte aparat</strong><small>Brend, model i približna godina proizvodnje.</small></div></li>
              <li><span>02</span><div><strong>Fotografišite deo ili kvar</strong><small>Pošaljite širu sliku i detalj dimenzije kada je moguće.</small></div></li>
              <li><span>03</span><div><strong>Dobijte potvrdu kompatibilnosti</strong><small>Preporučićemo tačan deo pre poručivanja.</small></div></li>
            </ol>
          </div>
          <aside className="categories-help-card" aria-label="Tehnička podrška">
            <span className="categories-help-card-label">TEHNIČKA PODRŠKA IZ RADIONICE</span>
            <div className="categories-help-phone">
              <Phone size={20} />
              <div><small>Pozovite radnim danima, 07:30–15:30</small><a href="tel:0648222651">064 8222 651</a></div>
            </div>
            <div className="categories-help-note"><Camera size={16} /><span>Pošaljite fotografiju kroz kontakt formu — odgovor dobijate tokom radnog dana.</span></div>
            <div className="categories-help-actions">
              <Link href="/kompatibilnost" className="button light"><SearchCheck size={15} /> Proverite po aparatu</Link>
              <Link href="/kontakt" className="button primary"><Wrench size={15} /> Kontaktirajte radionicu <ArrowRight size={14} /></Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
