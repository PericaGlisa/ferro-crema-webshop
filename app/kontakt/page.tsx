'use client'

import React, { useState } from 'react'
import {
  Phone,
  Mail,
  Clock3,
  MapPin,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building,
  Sparkles,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    type: 'servis',
    name: '',
    company: '',
    email: '',
    phone: '',
    machine: '',
    message: '',
  })

  const { pushToast } = useCart()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    pushToast('Vaš upit je uspešno poslat radionici!', 'like')
  }

  return (
    <main className="contact-page">
      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <p className="eyebrow">DIREKTNA KOMUNIKACIJA // RADIONICA BEOGRAD</p>
          <h1>
            Kontaktirajte <i>Ferro Crema</i> radionicu.
          </h1>
          <p className="contact-hero-sub">
            Bilo da vam je potrebna hitna isporuka dihtunga, provera kompatibilnosti
            noževa ili partnerska B2B veleprodaja za vaš servis ili pržionicu —
            tu smo svakog radnog dana.
          </p>
        </div>
      </section>

      {/* ── Contact Layout: Info + Form ── */}
      <section className="contact-main-section">
        <div className="contact-main-inner">
          <div className="contact-grid">
            {/* Left Info Column */}
            <div className="contact-info-col">
              <h2>Podaci o radionici i podršci</h2>
              <p>
                Ferro Crema obezbeđuje tehničku podršku i brzu distribuciju
                preciznih rezervnih delova direktno sa lagera.
              </p>

              <div className="contact-cards-stack">
                <div className="contact-info-card">
                  <div className="contact-card-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <small>Telefon tehničke podrške</small>
                    <a href="tel:0648222651" className="contact-link-val">
                      064 8222 651
                    </a>
                    <span className="contact-note">Dostupno za pozive i Viber</span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-card-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <small>Zvanični email</small>
                    <a href="mailto:office@ferrocrema.com" className="contact-link-val">
                      office@ferrocrema.com
                    </a>
                    <span className="contact-note">Odgovor u roku od 2 sata u radno vreme</span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-card-icon">
                    <Clock3 size={20} />
                  </div>
                  <div>
                    <small>Radno vreme radionice</small>
                    <strong className="contact-hours-val">
                      Pon–Pet // 07:30 — 15:30
                    </strong>
                    <span className="contact-note">
                      Van radnog vremena uz prethodnu najavu
                    </span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-card-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <small>Lager i distribucija</small>
                    <strong className="contact-hours-val">Beograd, Srbija</strong>
                    <span className="contact-note">
                      ferrocrema.com · Isporuka kurirskom službom 24h
                    </span>
                  </div>
                </div>
              </div>

              {/* Workshop Note */}
              <div className="contact-founder-box">
                <span className="founder-tag">FERRO CREMA RADIONICA</span>
                <p>
                  <strong>Tim za tehničku podršku</strong>
                  <br />
                  Specijalizovana distribucija preciznih rezervnih delova za
                  profesionalne i kućne espresso aparate, mlinove i barista opremu.
                </p>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="contact-form-col">
              {submitted ? (
                <div className="contact-success-state">
                  <div className="contact-success-icon">
                    <CheckCircle2 size={44} color="var(--cream)" />
                  </div>
                  <h3>Hvala vam! Vaš upit je uspešno evidentiran.</h3>
                  <p>
                    Naš tim će pregledati podatke o vašem aparatu i javiti vam se
                    na broj <strong>{form.phone || form.email}</strong> sa tačnim
                    informacijama o delu ili ponudom u najkraćem mogućem roku.
                  </p>
                  <button
                    className="button dark"
                    onClick={() => {
                      setSubmitted(false)
                      setForm({
                        type: 'servis',
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        machine: '',
                        message: '',
                      })
                    }}
                  >
                    Pošaljite još jednu poruku
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-card">
                  <h3>Pošaljite servisni ili B2B upit</h3>
                  <p className="contact-form-sub">
                    Popunite formular ispod i naš tim će vam pomoći oko odabira dela
                    ili veleprodajnih uslova.
                  </p>

                  <div className="contact-type-selector">
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="servis"
                        checked={form.type === 'servis'}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                      />
                      <span>Servisni upit / Deo</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="b2b"
                        checked={form.type === 'b2b'}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                      />
                      <span>Veleprodaja B2B</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="opste"
                        checked={form.type === 'opste'}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                      />
                      <span>Opšte pitanje</span>
                    </label>
                  </div>

                  <div className="contact-form-grid">
                    <div className="form-group">
                      <label htmlFor="c-name">Vaše ime i prezime *</label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        placeholder="npr. Marko Jovanović"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-company">Naziv firme / lokala (opciono)</label>
                      <input
                        id="c-company"
                        type="text"
                        placeholder="npr. Caffe Espresso Bar d.o.o."
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-email">Email adresa *</label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        placeholder="vasa@adresa.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-phone">Broj telefona *</label>
                      <input
                        id="c-phone"
                        type="tel"
                        required
                        placeholder="06X XXX XXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group full">
                      <label htmlFor="c-machine">Model aparata ili mlina</label>
                      <input
                        id="c-machine"
                        type="text"
                        placeholder="npr. Rocket Appartamento, Faema E61, Mazzer Super Jolly..."
                        value={form.machine}
                        onChange={(e) => setForm({ ...form, machine: e.target.value })}
                      />
                    </div>

                    <div className="form-group full">
                      <label htmlFor="c-message">Poruka ili opis problema sa mašinom *</label>
                      <textarea
                        id="c-message"
                        rows={4}
                        required
                        placeholder="Opišite koji deo vam je potreban, dimenzije ili problem (npr. curenje vode oko glave pri kuvanju)..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="button primary full" style={{ marginTop: '18px', justifyContent: 'center' }}>
                    Pošaljite upit radionici <Send size={15} />
                  </button>
                  <span className="contact-security-note">
                    <ShieldCheck size={13} color="var(--cream)" /> Vaši podaci su zaštićeni i koriste se isključivo za odgovor na upit.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
