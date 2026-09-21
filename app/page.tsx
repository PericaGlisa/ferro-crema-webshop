'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Sliders,
} from 'lucide-react'
import { products, categories, precisionBrands, Product } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'

/* ─── BRAND ARCHITECTURES ───────────────────────────────────────── */

const brandArchitectures = [
  {
    tag: 'E61 STANDARD',
    title: 'E61 Grupe & Bajoneti',
    brands: ['Rocket Milano', 'ECM', 'Faema', 'Profitec', 'Bezzera'],
    specs: '58 mm standard · 8.0 / 8.5 mm zaptivke · IMS nanotech tuševi',
    desc: 'Univerzalni standard za najpopularnije profesionalne i prosumer mašine sa termosifonskom cirkulacijom.',
    href: '/katalog?brend=E61',
    badge: '40+ modela',
  },
  {
    tag: 'LA MARZOCCO',
    title: 'Dual-Boiler Bajonet',
    brands: ['Linea Mini', 'Linea Micra', 'GS3', 'Linea Classic', 'Strada'],
    specs: 'Konusni 8 mm silikon · Anti-wear mesing · Fabrička geometrija',
    desc: 'Precizne zaptivke i ventili za komercijalne i kućne mašine sa nultom tolerancijom na pad pritiska.',
    href: '/katalog?brend=La+Marzocco',
    badge: 'Originalne mere',
  },
  {
    tag: 'PROFESIONALNI MLINOVI',
    title: 'Noževi & Doziranje',
    brands: ['Mazzer', 'Mahlkönig', 'Eureka', 'Compak'],
    specs: 'Kaljeni čelik 64 HRC · Ravni 64/83 mm · Konusni noževi',
    desc: 'Oštrice obrađene u mikronskim tolerancijama za ujednačenu granulaciju bez pregrevanja kafe.',
    href: '/katalog?kategorija=noz-za-mlin',
    badge: 'HRC 64 tvrdoća',
  },
  {
    tag: 'CRAFT & SPECIALTY',
    title: 'Custom & Flow Profiling',
    brands: ['Slayer', 'Kees van der Westen', 'Synesso', 'Victoria Arduino'],
    specs: 'Visokotemperaturni FKM/VMQ zaptivci · ±0.05 mm tolerancija',
    desc: 'Komponente za vodeće svetske mašine trećeg talasa koje rade pod dinamičkim pritiscima i profilima.',
    href: '/kompatibilnost',
    badge: 'Nulta tolerancija',
  },
]

/* ─── HERO SLIDES DATA ─────────────────────────────────────────── */

const heroSlides = [
  {
    id: 1,
    eyebrow: 'REZERVNI DELOVI // PRECIZNOST U SVAKOM MIKRONU',
    title: 'Sve što stoji između',
    titleItalic: 'pritiska',
    titleEnd: 'i savršene kreme.',
    text: 'Originalni i ojačani delovi za grupe, ventile i pumpe. Precizne geometrije koje eliminišu curenje, garantuju termičku stabilnost i štite vaš aparat od nepotrebnog habanja.',
    ctaPrimary: { label: 'Pronađite deo za svoj aparat', href: '/kompatibilnost' },
    ctaSecondary: { label: 'Pogledajte kompletan katalog', href: '/katalog' },
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=85',
    alt: 'Precizni delovi za espresso aparate na radnom stolu servisa',
    stamp: { label: 'EST.', year: '2018', place: 'BEOGRAD · SRBIJA' },
    note: {
      text: 'Otpornost na 300°C i konstantan pritisak',
      strong: 'termički stabilan silikon',
    },
    proof: { rating: '4.9', voters: 'ocenilo 1.200+ barista i servisera' },
  },
  {
    id: 2,
    eyebrow: 'BARISTA OPREMA // KALIBRISANI BALANS',
    title: 'Alat koji eliminiše',
    titleItalic: 'nagađanje',
    titleEnd: 'pri ekstrakciji.',
    text: 'Kalibrisani tamperi, precizna IMS sita, WDT distribuatori i bezdani portafiltri. Razvijeni za ujednačenu saturaciju pak-a i potpunu eliminaciju channeling-a.',
    ctaPrimary: { label: 'Istražite barista kolekciju', href: '/katalog' },
    ctaSecondary: { label: 'Pregled po kategorijama', href: '/kategorije' },
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1400&q=85',
    alt: 'Profesionalni barista alati na radnoj površini',
    stamp: { label: 'PRO', year: '★★★★★', place: '100% KALIBRISANO' },
    note: {
      text: 'Tolerancija izrade ±0.05 mm',
      strong: 'ravnomeran pritisak u celoj korpi',
    },
    proof: { rating: '150+', voters: 'kalibrisanih alata u ponudi' },
  },
  {
    id: 3,
    eyebrow: 'MLINOVI // MIKRONSKA DISTRIBUCIJA ČESTICA',
    title: 'Noževi koji otvaraju',
    titleItalic: 'pun potencijal',
    titleEnd: 'svakog zrna.',
    text: 'Titanijumski, DLC i kaljeni čelični noževi za Mazzer, Mahlkönig, Eureka, Fiorenzato i Compak. Geometrija naoštrena za konzistentan raspon i minimalno zagrevanje kafe.',
    ctaPrimary: { label: 'Izaberite noževe za mlin', href: '/katalog' },
    ctaSecondary: { label: 'Vodič za zamenu noževa', href: '/vodici' },
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1400&q=85',
    alt: 'Precizno brušeni noževi za mlinove za espresso',
    stamp: { label: 'OEM', year: '✓', place: 'ORIGINALNA GEOMETRIJA' },
    note: {
      text: 'Do 800 kg konzistentnog mlevenja',
      strong: '±180 μm raspon čestica',
    },
    proof: { rating: '38', voters: 'modela sa originalnim uglom sečenja' },
  },
  {
    id: 4,
    eyebrow: 'ODRŽAVANJE // DUG VEK VAŠE OPREME',
    title: 'Produžite radni vek',
    titleItalic: 'svoje investicije',
    titleEnd: 'bez zastoja.',
    text: 'Specijalizovani setovi za redovan i periodični servis: prehrambeni silikonski dihtunzi, dekalcifikatori, hemija za čišćenje ulja i merni pribor za pritisak i protok.',
    ctaPrimary: { label: 'Kompletni servisni setovi', href: '/servisni-setovi' },
    ctaSecondary: { label: 'Vodiči za održavanje', href: '/vodici' },
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1400&q=85',
    alt: 'Kompletan servisni set za održavanje espresso aparata',
    stamp: { label: '14', year: 'DANA', place: 'GARANCIJA POVRATA' },
    note: {
      text: 'Pravovremeni servis sprečava',
      strong: 'do 70% skupih kvarova',
    },
    proof: { rating: '2.400+', voters: 'zadovoljnih servisa i radionica' },
  },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [activeTab, setActiveTab] = useState('Najpopularnije')

  /* Slider controls */
  const total = heroSlides.length
  const goTo = (i: number) => setSlide((i + total) % total)
  const next = () => goTo(slide + 1)
  const prev = () => goTo(slide - 1)

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 6200)
    return () => clearInterval(t)
  }, [paused, slide])

  /* Hash anchor scroll with header offset */
  useEffect(() => {
    const scrollToHash = (hash: string) => {
      if (!hash) return
      const id = hash.replace('#', '')
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'auto' })
      }
    }

    // On initial load with a hash
    if (window.location.hash) {
      const hash = window.location.hash
      // Small delay to allow page to render before scrolling
      const timer = setTimeout(() => scrollToHash(hash), 120)
      return () => clearTimeout(timer)
    }

    // On hashchange (e.g. clicking anchor links within the page)
    const onHashChange = (e: HashChangeEvent) => {
      const hash = new URL(e.newURL).hash
      scrollToHash(hash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div>
      {/* ── Hero Slider ── */}
      <section className="hero-slider" aria-label="Glavni slajder kolekcija">
        <div className="hero-slider-track">
          {heroSlides.map((s, i) => (
            <div
              key={s.id}
              className={`hero-slide ${i === slide ? 'active' : ''}`}
              aria-hidden={i !== slide}
            >
              <div className="hero-slide-inner">
                <div className="hero-image">
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                  />
                  <div className="hero-overlay" />
                  <div className="hero-overlay-side" />
                </div>
                <div className="hero-copy">
                  <div className="hero-kicker">
                    <span className="kicker-line" />
                    <p className="eyebrow slide-eyebrow">{s.eyebrow}</p>
                  </div>
                  <h1>
                    {s.title} <i>{s.titleItalic}</i> {s.titleEnd}
                  </h1>
                  <p className="hero-text">{s.text}</p>
                  <div className="hero-actions">
                    <Link className="button primary" href={s.ctaPrimary.href}>
                      {s.ctaPrimary.label} <ArrowRight size={16} />
                    </Link>
                    <Link className="button light-ghost" href={s.ctaSecondary.href}>
                      {s.ctaSecondary.label} <ArrowDownRight size={16} />
                    </Link>
                  </div>
                  <div className="hero-proof">
                    <span className="stars">★★★★★</span>
                    <span>
                      <strong>{s.proof.rating}</strong> {s.proof.voters}
                    </span>
                  </div>
                </div>

                <div className="hero-stamp" aria-hidden="true">
                  <span>{s.stamp.label}</span>
                  <strong>{s.stamp.year}</strong>
                  <small>{s.stamp.place}</small>
                </div>

                <div className="image-note">
                  <span className="note-line" />
                  <span>
                    {s.note.text} — <strong>{s.note.strong}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="hero-slider-controls">
          <div className="hero-slider-meta">
            <span className="slide-counter">
              <strong>0{slide + 1}</strong> / 0{total}
            </span>
            <div className="progress-track" aria-hidden="true">
              <div
                key={slide}
                className={`progress-fill ${paused ? 'paused' : ''}`}
              />
            </div>
            <div className="slide-dots">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === slide ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Prikaži slajd ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="hero-slider-buttons">
            <button onClick={prev} aria-label="Prethodni slajd">
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setPaused(!paused)}
              aria-label={paused ? 'Pokreni slajder' : 'Pauziraj slajder'}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button onClick={next} aria-label="Sledeći slajd">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Marquee ticker ── */}
      <aside className="marquee" aria-hidden="true">
        <div>
          <span>PRECIZNOST DO MIKRONA ✦</span>
          <span>GARANTOVANA KOMPATIBILNOST ✦</span>
          <span>STABILNOST EKSTRAKCIJE ✦</span>
          <span>FERRO CREMA RADIONICA BEOGRAD ✦</span>
        </div>
      </aside>

      {/* ── Trust Strip ── */}
      <section className="trust-strip" aria-label="Prednosti kupovine">
        <div>
          <span className="stars" style={{ fontSize: '18px' }}>⚡</span>
          <div>
            <b>Isporuka 24–48h</b>
            <small>Fizički na lageru u Beogradu</small>
          </div>
        </div>
        <div>
          <span className="stars" style={{ fontSize: '18px' }}>✓</span>
          <div>
            <b>Garantovana kompatibilnost</b>
            <small>Fabričke dimenzije, bez nagađanja</small>
          </div>
        </div>
        <div>
          <span className="stars" style={{ fontSize: '18px' }}>⟲</span>
          <div>
            <b>14 dana za povrat</b>
            <small>Brza i jednostavna zamena dela</small>
          </div>
        </div>
        <div>
          <span className="stars" style={{ fontSize: '18px' }}>⚙</span>
          <div>
            <b>Podrška servisera</b>
            <small>Stručna pomoć pri izboru dela</small>
          </div>
        </div>
      </section>

      {/* ── Finder / Compatibility Teaser ── */}
      <section className="finder-section" id="finder">
        <div className="finder-intro">
          <p className="eyebrow">SISTEM BEZ GREŠKE</p>
          <h2>
            Izaberite pravi deo <i>iz prvog pokušaja.</i>
          </h2>
          <p>
            Pogrešan dihtung ili neadekvatan nož znače izgubljeno vreme i
            nezadovoljne goste. Naš vodič u tri koraka precizno filtrira samo one
            delove koji 100% odgovaraju dimenzijama i standardu vaše grupe.
          </p>
          <Link className="text-link" href="/kompatibilnost">
            Otvori kompletan vodič za kompatibilnost <ArrowRight size={13} />
          </Link>
        </div>
        <div className="finder-card">
          <div className="finder-head">
            <span>DIJAGNOSTIKA KOMPATIBILNOSTI</span>
            <span className="step-count">KORAK 01 / 03</span>
          </div>
          <div className="progress">
            <span style={{ width: '33%' }} />
          </div>
          <label htmlFor="finder-brand-select">
            Izaberite proizvođača vašeg aparata
          </label>
          <Link href="/kompatibilnost" className="select-field">
            <span>Rocket, ECM, La Marzocco, Faema, Mazzer...</span>
            <ChevronRight size={18} />
          </Link>
          <div className="finder-brands">
            <span>E61</span>
            <span>La Marzocco</span>
            <span>Sanremo</span>
            <span>Synesso</span>
            <span>+32 druga</span>
          </div>
          <Link className="button primary full" href="/kompatibilnost">
            Prikaži 100% kompatibilne delove <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Categories Grid ── */}
      <section className="section" id="categories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PREGLED PO KATEGORIJAMA</p>
            <h2>Sve komponente na jednom mestu</h2>
          </div>
          <Link className="text-link" href="/kategorije">
            Pregledaj sve kategorije <ArrowRight size={13} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c) => (
            <Link
              key={c.name}
              className="category-card"
              href={`/katalog?kategorija=${c.id}`}
            >
              <img src={c.image} alt={c.name} loading="lazy" />
              <div className="category-overlay" />
              <span className="category-icon">{c.icon}</span>
              <div className="category-label">
                <strong>{c.name}</strong>
                <small>{c.count}</small>
              </div>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products Section ── */}
      <section className="section products-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow">IZDVAJAMO IZ RADIONICE</p>
            <h2>Najtraženiji delovi i precizni alati</h2>
          </div>
          <Link className="text-link" href="/katalog">
            Pogledajte ceo katalog ({products.length}) <ArrowRight size={13} />
          </Link>
        </div>

        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Workshop Editorial / Story ── */}
      <section className="editorial section" id="story">
        <div className="editorial-image">
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=85"
            alt="Detalj radionice za servis espresso opreme"
            loading="lazy"
          />
          <span>RADIONICA BEOGRAD // OD 2018.</span>
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">MANIFEST KVALITETA</p>
          <h2>
            Ekstrakcija ne trpi <i>polovična rešenja.</i>
          </h2>
          <p>
            Espresso mašina radi pod konstantnim hidrauličkim pritiskom od 9 bara
            i temperaturama vode preko 93°C. Na tim parametrima, jeftina guma se
            stvrdnjava i puca, neprecizna sita stvaraju kanale (channeling), a
            potrošeni noževi seku kafu neravnomerno.
          </p>
          <p>
            U Ferro Crema radionici biramo isključivo delove izrađene po najvišim
            specifikacijama: silikone koji traju 3× duže od gume, fabrički
            kaljene noževe tvrdoće 64 HRC i alate sa tolerancijom izrade unutar ±0.05
            mm.
          </p>
          <div className="editorial-signature">
            Ferro Crema <span>— standard radionice</span>
          </div>
          <div style={{ marginTop: '24px' }}>
            <Link href="/standard-radionice" className="button primary">
              Saznajte više o standardu radionice <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hall of Precision Brands ── */}
      <section className="brands-section" id="brands" aria-label="Kompatibilni brendovi">
        <div className="brands-header">
          <div className="brands-header-copy">
            <div className="brands-kicker">
              <span className="kicker-line"></span>
              <p className="brands-eyebrow">
                STANDARD ZA SVETSKE BRENDOVE ESPRESSO OPREME
              </p>
            </div>
            <h2>
              Fabrička preciznost za vodeće
              <br />
              <i>svetske proizvođače espresso opreme.</i>
            </h2>
            <p className="brands-lead">
              U Ferro Crema radionici držimo rezervne delove i alate izrađene u nultoj
              toleranciji za najzahtevnije komercijalne i prosumer mašine. Od E61 bajoneta
              do visokotemperaturnih silikonskih zaptivki i fabrički kaljenih noževa tvrdoće 64 HRC.
            </p>
          </div>
          <div className="brands-header-actions">
            <Link href="/kompatibilnost" className="button ghost">
              <Sliders size={14} /> Vodič kompatibilnosti
            </Link>
            <Link href="/katalog" className="button primary">
              Pretraži sve delove <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Dynamic Interactive Marquee */}
        <div className="brands-marquee-wrap">
          <div className="brands-marquee-label">
            <span>BRZI PREGLED PO PROIZVOĐAČU</span>
          </div>
          <div className="brands-marquee">
            <div className="brands-track">
              {[...precisionBrands, ...precisionBrands].map((brand, i) => {
                const brandQuery =
                  brand === 'FAEMA E61'
                    ? 'Faema'
                    : brand === 'ROCKET MILANO'
                    ? 'Rocket'
                    : brand === 'LA MARZOCCO'
                    ? 'La Marzocco'
                    : brand === 'VICTORIA ARDUINO'
                    ? 'Victoria Arduino'
                    : brand === 'KEES VAN DER WESTEN'
                    ? 'Kees van der Westen'
                    : brand
                return (
                  <Link
                    key={i}
                    href={`/katalog?brend=${encodeURIComponent(brandQuery)}`}
                    className="brand-chip"
                    title={`Pogledaj delove za ${brand}`}
                  >
                    <span className="brand-chip-dot"></span>
                    <span className="brand-chip-name">{brand}</span>
                    <ArrowRight size={12} className="brand-chip-arrow" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* 4 Brand Architecture Pillars */}
        <div className="brands-architectures-grid">
          {brandArchitectures.map((arch) => (
            <div key={arch.tag} className="brand-arch-card">
              <div className="brand-arch-top">
                <span className="brand-arch-tag">{arch.tag}</span>
                <span className="brand-arch-badge">{arch.badge}</span>
              </div>
              <h3>{arch.title}</h3>
              <p className="brand-arch-desc">{arch.desc}</p>
              <div className="brand-arch-brands">
                {arch.brands.map((b) => (
                  <span key={b} className="brand-pill-mini">
                    {b}
                  </span>
                ))}
              </div>
              <div className="brand-arch-spec">
                <small>Specifikacija</small>
                <strong>{arch.specs}</strong>
              </div>
              <Link href={arch.href} className="brand-arch-link">
                Pregledaj komponente <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="brands-guarantee-bar">
          <div className="brands-guarantee-item">
            <ShieldCheck size={20} />
            <div>
              <strong>100% Garantovana kompatibilnost</strong>
              <span>Ako deo ne odgovara dimenzijama, besplatna zamena ili povrat u roku od 14 dana</span>
            </div>
          </div>
          <div className="brands-guarantee-item">
            <CheckCircle2 size={20} />
            <div>
              <strong>±0.05 mm Tolerancija izrade</strong>
              <span>Kalibrisano i testirano na grupama u beogradskoj radionici</span>
            </div>
          </div>
          <div className="brands-guarantee-item">
            <Sliders size={20} />
            <div>
              <strong>Servisna podrška</strong>
              <span>Besplatna provera debljine zaptivke i promera za vaš model</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Promo Band ── */}
      <section className="promo-band" id="sale">
        <div>
          <p className="eyebrow">KOMPLETNA REŠENJA ZA SERVIS</p>
          <h2>
            Preventivni servis koji štedi
            <br />
            <i>vreme i troškove kvara.</i>
          </h2>
          <p>
            Fabrički usklađeni kompleti najčešće habanih delova za godišnji
            servis. Zamenite sve komponente odjednom i osigurajte stabilan rad
            mašine tokom cele sezone uz uštedu do 1.810 RSD.
          </p>
          <Link className="button light" href="/servisni-setovi">
            Pogledajte servisne setove <ArrowRight size={16} />
          </Link>
        </div>
        <div className="promo-specs">
          <div>
            <b>01</b>
            <span>
              Kompletan set
              <br />
              Sve komponente u jednom
            </span>
          </div>
          <div>
            <b>02</b>
            <span>
              Nulta tolerancija
              <br />
              Ispitano na grupama
            </span>
          </div>
          <div>
            <b>03</b>
            <span>
              Podrška servisera
              <br />
              Pomoć pri ugradnji
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
