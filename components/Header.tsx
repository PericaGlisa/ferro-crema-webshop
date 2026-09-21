'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Menu,
  X,
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function Header() {
  const { cartCount, setCartOpen, pushToast } = useCart()
  const [announcementOpen, setAnnouncementOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!mobileOpen) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [mobileOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchOpen(false)
      router.push(`/katalog?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleQuickChip = (term: string) => {
    setSearchQuery(term)
    setSearchOpen(false)
    router.push(`/katalog?q=${encodeURIComponent(term)}`)
  }

  return (
    <>
      {/* ── Top Announcement ── */}
      {announcementOpen && (
        <div className="announcement">
          <span>
            <Sparkles size={13} /> Besplatna isporuka za porudžbine preko 8.000 RSD
          </span>
          <span className="announcement-separator">/</span>
          <span>Isporuka za 24h za porudžbine do 14h</span>
          <span className="announcement-separator">/</span>
          <span>Direktno sa lagera u Beogradu</span>
          <button
            aria-label="Zatvori obaveštenje"
            onClick={() => setAnnouncementOpen(false)}
          >
            ×
          </button>
        </div>
      )}

      {/* ── Main Sticky Header ── */}
      <header className="header">
        <div className="header-inner">
          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Otvori meni"
          >
            <Menu size={21} />
          </button>

          <Link href="/" className="brand" aria-label="Ferro Crema početna">
            <img
              className="brand-logo"
              src="/logo.png"
              alt="Ferro Crema"
              width={160}
              height={46}
            />
          </Link>

          <nav className="nav" aria-label="Glavna navigacija">
            <Link href="/katalog">Katalog</Link>
            <Link href="/kompatibilnost">Kompatibilnost</Link>
            <Link href="/kategorije">Kategorije</Link>
            <Link href="/standard-radionice">Standard radionice</Link>
            <Link href="/vodici">Vodiči</Link>
            <Link href="/servisni-setovi" className="sale-link">
              Servisni setovi
            </Link>
          </nav>

          <div className="header-actions">
            <button
              aria-label="Pretraga delova"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </button>
            <button
              aria-label="Korisnički nalog"
              onClick={() => pushToast('Korisnički nalog će biti dostupan u B2B verziji', 'like')}
            >
              <UserRound size={18} />
            </button>
            <button
              aria-label="Sačuvani artikli"
              onClick={() => pushToast('Lista želja je ažurirana', 'like')}
            >
              <Heart size={18} />
            </button>
            <button
              className="cart-button"
              aria-label={`Korpa, ${cartCount} proizvoda`}
              onClick={() => setCartOpen(true)}
            >
              <span className="cart-icon-wrapper">
                <ShoppingBag size={18} />
                <b>{cartCount}</b>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Search Overlay ── */}
      {searchOpen && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Pretraga delova"
        >
          <div className="search-box">
            <Search size={22} />
            <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: 'flex' }}>
              <input
                autoFocus
                placeholder="Pretražite po modelu aparata, dimenziji (npr. 58.5mm), SKU ili OEM kodu..."
                aria-label="Polje za pretragu"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button
              onClick={() => setSearchOpen(false)}
              aria-label="Zatvori pretragu"
            >
              <X size={22} />
            </button>
          </div>
          <p>Najčešće pretrage u radionici:</p>
          <div className="search-chips">
            {[
              'E61 silikonski dihtung',
              'IMS Nanotech 58mm',
              'Mazzer Super Jolly noževi',
              'Motta kalibrisani tamper',
              'La Marzocco Linea',
              'Puly Caff',
            ].map((chip) => (
              <span
                key={chip}
                onClick={() => handleQuickChip(chip)}
                style={{ cursor: 'pointer' }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div
          className="mobile-menu-layer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobilna navigacija"
        >
          <button
            className="drawer-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-label="Zatvori meni"
          />
          <aside className="mobile-drawer">
            <div className="drawer-top">
              <Link href="/" onClick={() => setMobileOpen(false)} className="brand mini">
                <img
                  className="drawer-logo"
                  src="/logo.png"
                  alt="Ferro Crema"
                  width={120}
                  height={34}
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Zatvori meni"
              >
                <X size={22} />
              </button>
            </div>
            <div className="drawer-kicker">
              <span className="kicker-line" />
              <span>NAVIGACIJA</span>
            </div>
            <nav className="drawer-nav" aria-label="Mobilna navigacija">
              {[
                { name: 'Katalog delova i alata', href: '/katalog' },
                { name: 'Vodič za kompatibilnost', href: '/kompatibilnost' },
                { name: 'Kategorije opreme', href: '/kategorije' },
                { name: 'Standard radionice', href: '/standard-radionice' },
                { name: 'Servisni vodiči', href: '/vodici' },
                { name: 'Servisni setovi', href: '/servisni-setovi' },
                { name: 'Česta pitanja (FAQ)', href: '/faq' },
                { name: 'Kontakt servisera', href: '/kontakt' },
              ].map((item, i) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>
                    <small>0{i + 1}</small>
                    {item.name}
                  </span>
                  <ChevronRight size={18} />
                </Link>
              ))}
            </nav>
            <div className="drawer-cta">
              <strong>Hitna tehnička podrška</strong>
              <span>Za servisere i kafiće u Beogradu i Srbiji</span>
              <a
                href="tel:0648222651"
                className="button light"
                style={{ justifyContent: 'center' }}
              >
                Pozovite 064 8222 651
              </a>
            </div>
            <div className="drawer-footer">
              <span>Pon–Pet // 07:30 — 15:30</span>
              <span>BEOGRAD, RS</span>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
