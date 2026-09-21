'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, Clock3, ShieldCheck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link href="/" className="brand" aria-label="Ferro Crema početna">
            <img
              className="footer-logo"
              src="/logo.png"
              alt="Ferro Crema"
              width={180}
              height={58}
            />
          </Link>
          <p>
            Specijalizovana distribucija preciznih rezervnih delova za
            profesionalne i kućne espresso aparate, mlinove i barista opremu.
            Direktno sa lagera u Beogradu za ugostiteljstvo i servisne radionice.
          </p>
          <div className="footer-newsletter">
            <p className="footer-newsletter-eyebrow">BILTEN IZ RADIONICE</p>
            <h5 className="footer-newsletter-title">Izveštaji sa radnog stola, jednom mesečno.</h5>
            <p className="footer-newsletter-desc">
              Bez marketing spama — samo dijagnostika kvarova, tolerancije
              materijala i uputstva za kalibraciju mlinova.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Hvala vam na prijavi! Bićete obavešteni o novim izveštajima.')
              }}
              className="footer-newsletter-form"
            >
              <input
                type="email"
                placeholder="Unesite vašu email adresu"
                required
                aria-label="Email za bilten"
                className="footer-newsletter-input"
              />
              <button type="submit" className="button dark footer-newsletter-btn">
                Prijavite se <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        <div>
          <h4>Katalog & Ponuda</h4>
          <Link href="/katalog">Svi proizvodi i delovi</Link>
          <Link href="/kategorije">Kategorije opreme</Link>
          <Link href="/servisni-setovi">Servisni setovi (ušteda)</Link>
          <Link href="/kompatibilnost">Vodič za kompatibilnost</Link>
          <Link href="/standard-radionice">Standard radionice & O nama</Link>
        </div>

        <div>
          <h4>Stručna podrška</h4>
          <Link href="/vodici">Servisni vodiči za montažu</Link>
          <Link href="/faq">Česta pitanja i odgovori (FAQ)</Link>
          <Link href="/kontakt">Kontakt i servisni upiti</Link>
          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--paper-deep)', borderRadius: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--ink)' }}>
              <ShieldCheck size={16} color="var(--cream)" /> 14 dana za povrat
            </span>
            <small style={{ color: 'var(--steel)', display: 'block', marginTop: '6px', fontSize: '10px', lineHeight: 1.4 }}>
              Ukoliko naručeni deo ne odgovara dimenzijama vašeg aparata, obezbeđujemo momentalnu zamenu.
            </small>
          </div>
        </div>

        <div id="kontakt">
          <h4>Kontakt & Radionica</h4>
          <a href="tel:0648222651" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={14} color="var(--cream)" /> 064 8222 651
          </a>
          <a href="mailto:office@ferrocrema.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={14} color="var(--cream)" /> office@ferrocrema.com
          </a>
          <a href="https://ferrocrema.com" target="_blank" rel="noreferrer">
            ferrocrema.com
          </a>
          <div style={{ marginTop: '14px', color: 'var(--steel)', fontSize: '12px', lineHeight: 1.6 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink)' }}>
              <Clock3 size={13} color="var(--cream)" /> Radno vreme:
            </span>
            Pon–Pet // 07:30 — 15:30
            <br />
            Van radnog vremena uz najavu
          </div>
          <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--steel)' }}>
            Lager i distribucija: Beograd, Srbija
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          <span>© 2026 Ferro Crema d.o.o. Beograd. Sva prava zadržana.</span>
        </div>
        <div style={{ display: 'flex', gap: '18px', fontSize: '11px', color: 'var(--steel)' }}>
          <Link href="/uslovi-kupovine">Uslovi kupovine</Link>
          <Link href="/politika-privatnosti">Politika privatnosti</Link>
              <Link href="/kontakt">Kupovina za firme</Link>
        </div>
      </div>
    </footer>
  )
}
