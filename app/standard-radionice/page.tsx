'use client'

import React from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Award,
  Cpu,
  Truck,
  Compass,
  Check,
  ArrowRight,
  Clock3,
} from 'lucide-react'

export default function WorkshopStandardPage() {
  return (
    <main className="standard-page">
      {/* ── Hero ── */}
      <section className="standard-hero">
        <div className="standard-hero-inner">
          <p className="eyebrow">MANIFEST KVALITETA // RADIONICA BEOGRAD</p>
          <h1>
            Ekstrakcija ne trpi <i>polovična rešenja.</i>
          </h1>
          <p className="standard-hero-sub">
            Ferro Crema je nastao iz inženjerske frustracije nekvalitetnim zamenskim
            delovima koji su izazivali curenja pod pritiskom od 9 bara i kvarili
            ukus kafe. Naš standard je jasan: nulta tolerancija odstupanja i samo
            sertifikovani materijali.
          </p>
        </div>
      </section>

      {/* ── Editorial Manifest ── */}
      <section className="standard-editorial-section">
        <div className="standard-editorial-inner">
          <div className="standard-editorial-grid">
            <div className="standard-editorial-image">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&q=85"
                alt="Radni sto radionice Ferro Crema sa preciznim delovima"
              />
              <div className="editorial-caption">
                <strong>FERRO CREMA RADIONICA</strong>
                <span>Beograd, Srbija // Mikronska inspekcija</span>
              </div>
            </div>

            <div className="standard-editorial-text">
              <p className="eyebrow">REČ IZ RADIONICE</p>
              <h2>
                Kada mašina radi na 9 bara i 93°C, <i>milimetar je večnost.</i>
              </h2>
              <p>
                „Espresso nije samo napitak — to je hidraulički proces gde i
                najmanja nesavršenost u zaptivci ili odstupanje u geometriji noža
                od 0.1 mm uništava sav trud farmera, pržioničara i bariste. Zato Ferro
                Crema ugostiteljima i serviserima u Srbiji obezbeđuje delove koji se
                montiraju u nultu toleranciju, bez improvizacija i bez nagađanja.”
              </p>
              <p>
                Svaki silikonski dihtung u našoj ponudi testiran je na radnim
                temperaturama do 300°C. Naši noževi za mlinove izrađeni su od fabrički
                kaljenog čelika tvrdoće 64 HRC, a sita poseduju foto-graviranu
                membranu koja garantuje ravnomeran vodeni stub.
              </p>

              <div className="standard-signature-block">
                <strong>Ferro Crema radionica</strong>
                <span>Precizni delovi za espresso opremu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Pillars of Precision ── */}
      <section className="standard-pillars-section">
        <div className="standard-pillars-inner">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ČETIRI STUBA NAŠEG STANDARDA</p>
              <h2>Beskompromisni inženjerski kriterijumi</h2>
            </div>
          </div>

          <div className="standard-pillars-grid">
            <div className="standard-pillar-card">
              <div className="pillar-icon">
                <Compass size={24} />
              </div>
              <span className="pillar-num">01</span>
              <h3>Tolerancija izrade ±0.05 mm</h3>
              <p>
                Dimenzije svakog ležišta, debljina silikonskih prstenova i zupci
                noževa kontrolišu se preciznim mernim instrumentima kako bi se
                obezbedilo savršeno naleganje bez zazora.
              </p>
              <ul>
                <li>
                  <Check size={13} /> Nema curenja oko glave grupe
                </li>
                <li>
                  <Check size={13} /> Portafilter se zaključava tačno pod 90°
                </li>
              </ul>
            </div>

            <div className="standard-pillar-card">
              <div className="pillar-icon">
                <Cpu size={24} />
              </div>
              <span className="pillar-num">02</span>
              <h3>Prehrambeni VMQ Silikon (300°C)</h3>
              <p>
                Za razliku od jeftine gume koja se stvrdne, puca i prenosi miris na
                kafu već posle par meseci, naš silikon ostaje elastičan godinama i
                potpuno je neutralan po aromu.
              </p>
              <ul>
                <li>
                  <Check size={13} /> FDA i NSF sertifikovan materijal
                </li>
                <li>
                  <Check size={13} /> Otporan na toplotne i hemijske šokove
                </li>
              </ul>
            </div>

            <div className="standard-pillar-card">
              <div className="pillar-icon">
                <Award size={24} />
              </div>
              <span className="pillar-num">03</span>
              <h3>Kaljeni čelik DIN 1.4112 (64 HRC)</h3>
              <p>
                Noževi za mlinove seku zrno umesto da ga drobe. Sačuvana je fabrička
                geometrija sečiva za bimodalnu raspodelu čestica i minimalno
                zagrevanje mlevene kafe.
              </p>
              <ul>
                <li>
                  <Check size={13} /> Do 800 kg mlevenja pre zamene
                </li>
                <li>
                  <Check size={13} /> Manje mikronske prašine (fines)
                </li>
              </ul>
            </div>

            <div className="standard-pillar-card">
              <div className="pillar-icon">
                <Truck size={24} />
              </div>
              <span className="pillar-num">04</span>
              <h3>Lager u Beogradu // 24h Isporuka</h3>
              <p>
                Kvar aparata u kafiću ili radionici znači izgubljen novac. Zato sve
                artikle sa sajta držimo fizički na stanju u Beogradu, spremne za
                slanje istog dana za sve porudžbine do 14h.
              </p>
              <ul>
                <li>
                  <Check size={13} /> Nema čekanja uvoza po 3 nedelje
                </li>
                <li>
                  <Check size={13} /> Besplatna isporuka preko 8.000 RSD
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats by Numbers ── */}
      <section className="standard-stats-section">
        <div className="standard-stats-inner">
          <div className="stat-box">
            <strong>2.400+</strong>
            <span>Snadbevenih kafića i radionica</span>
          </div>
          <div className="stat-box">
            <strong>12.000+</strong>
            <span>Isporučenih silikonskih dihtunga</span>
          </div>
          <div className="stat-box">
            <strong>99.4%</strong>
            <span>Zadovoljstvo kompatibilnošću dela</span>
          </div>
          <div className="stat-box">
            <strong>24h</strong>
            <span>Prosečno vreme isporuke u Srbiji</span>
          </div>
        </div>
      </section>

      {/* ── Call to action ── */}
      <section className="standard-cta-section">
        <div className="standard-cta-inner">
          <h2>Iskusite inženjersku razliku na svom aparatu.</h2>
          <p>
            Pogledajte kompletan katalog rezervnih delova ili nas kontaktirajte za
            savet oko izbora komponenti za vaš aparat.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '28px' }}>
            <Link href="/katalog" className="button primary">
              Istražite katalog delova <ArrowRight size={15} />
            </Link>
            <Link href="/kontakt" className="button light">
              Kontaktirajte nas
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
