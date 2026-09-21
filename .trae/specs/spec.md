# Ferro Crema Webshop — Kvalitet, održivost i priprema za produkciju
## Product Requirements Document

## Overview
- **Summary**: Kompletno unapređenje Ferro Crema početne stranice: responsivnost na svim ekranima, ponašanje klasičnog veb-sajta (scroll-to-top pri navigaciji), premium SEO/brending meta podaci (naslov, slogan, favicon, OpenGraph slika), optimizacija performansi i priprema za Netlify produkciju.
- **Purpose**: Transformisati postojeću Next.js 16 demo stranicu u proizvodno spreman, brz, responzivan i SEO optimalan luksuzni veb-sajt za Ferro Crema barista opremu.
- **Target Users**: Posetioci na mobilnim telefonima (do 560px), tabletima (do 1000px), laptopovima (do 1440px) i desktopima (2k+). Stranice pretraživača (Google) i deljenja na društvenim mrežama.

## Goals
- **G1**: Savršena responzivnost — svaki element korektno izgleda i funkcioniše od 320px pa naviše, bez horizontalnog skrola, preklapanja tekstova ili deformisanja layouta.
- **G2**: Klasično ponašanje veb-sajta — svaki klik na link (hash link na istoj stranici) otvara stranicu u tačno određenom tačku, bez neprirodnog SPA ponašanja; scroll se resetuje kad treba.
- **G3**: Netlify-ready — projekat može direktno da se deploy-uje na Netlify sa `@netlify/plugin-nextjs`, sa pravilnim build konfiguracijom, cache zaglavljima i environment postavkama.
- **G4**: Premium brending — potpuno novi favicon (multi-size), novi Site Title & Tagline koji odražavaju luksuzni brend, i profesionalna 1200×630 OpenGraph slika.
- **G5**: Vrhunske performanse — Lighthouse skor ≥ 90 za Performance, Accessibility, Best Practices i SEO. Minimalan JS bundle, optimizovani fonti, caching strategija, optimizovane slike.

## Non-Goals
- Ne dodaju se nove stranice/rute (ostaje single-page layout sa anchor sekcijama).
- Ne menja se postojeći vizuelni stil/brending (boje `--ink`/`--paper`/`--cream`, serif + sans kombinacija, cinematic hero) — samo se dopunjuje.
- Ne menja se dinamički sadržaj ( proizvodi, kategorije, slajdovi).
- Ne implementira se plaćanje, korpa (korišćenje stanja ostaje mock).
- Ne dodaju se nove biblioteke osim ako su neophodne za proizvodnu pripremu (nema novih UI komponenti).

## Background & Context
- Trenutno stanje: Next.js 16.3.3 + pnpm + Tailwind v4 + shadcn, jedna stranica `app/page.tsx` sa `'use client'`, dva postojeća media queryja (≤1000px, ≤560px).
- Postojeći netlify.toml ima `@netlify/plugin-nextjs` 5.15.13, ali nedostaju trailing slash, edge vs node runtime izbori, redirecti 404.
- Trenutna favicon u `public/favicon.png` je placeholder; OG slika `ferro-crema-og.png` postoji ali nije prilagođena brendingu.
- Font family `--font-plex` se koristi u globals.css ali *nikada nije definisan* — font pada nazad na Arial sans-serif, uzrokujući layout shift.
- Page koristi `<a href="#...">` anchor linkove umesto `next/link` — za single-page sa sekcijama ovo je poželjno za klasično web ponašanje ali treba podesiti scroll-padding i smooth scroll sa animacijom.
- Hero slajder, editorial, products slike koriste *remote* slike (unsplash + coresg-image-generator) sa `images.unoptimized: true` — šteti performansama; treba uključiti Image komponentu ili barem loading="lazy" za ispod-fold slike.
- `layout.tsx` ima `Metadata` API za title/description/OG ali nedostaje JSON-LD schema, twitter:card, apple-mobile-web-app, manifest.

## Functional Requirements
- **FR-1 Responzivnost**: Za svaki viewport širinu od 320, 360, 390, 414, 480, 560, 768, 820, 900, 1000, 1280, 1440, 1920 piksela: nema horizontalnog scrolla (body scrollWidth <= clientWidth), nema preklapanja tekstova preko drugih elemenata, dugmad su klikljiva (min 44×44px touch zone na mobilnim), padding/margine nisu negativni i poremeti layout.
- **FR-2 Anchor scroll-to-top/section**: Klik na link u nav (`#shop`, `#finder`, `#categories`, `#story`, `#guides`, `#sale`) i na logo (`#top`) skroluje do tačan početka odgovarajuće sekcije, uzimajući u obzir sticky header visinu (`scroll-padding-top` postojeći). Prvi klik na link kad smo već ispod tog id-a skroluje nagore ispravno.
- **FR-3 Hash route URL sinhronizacija**: Nakon klika na hash link, URL adresa u traci postane `#shop` itd. i korisnik može da deli URL — pri otvaranju deljenog linka stranica se otvara skrolovana do te sekcije, sa korektnim offset-om za sticky header.
- **FR-4 Netlify deploy-ready**: `pnpm build` uspeva bez grešaka (tipski, lint, TS greške ne blokiraju build ukoliko je to u `nextConfig.typescript.ignoreBuildErrors`), `netlify.toml` ima ispravan publish dir za Next.js adapter, headers za immutable assete, HSTS, production env promenljive.
- **FR-5 Favicon kompletan**: Postoje favicon u više veličina (16, 32, 48 px) ili generisan, apple-touch-icon 180×180, SVG ikonica. U `<head>` se generišu odgovarajući `<link rel="icon">` tagovi. Brending slika odražava: tamno zelena/smeda boja inka (`--ink: #171817`), krem/zlato akcenat (`--cream: #c5a16d`), tema precizne mašinerije za kafu — portafilter disk + inicijali FC u minimalističkom, premium stilu.
- **FR-6 Site Title & Tagline**: `<title>` u `<head>` je jedinstven i u skladu sa brendom: format glavne stranice `{brand} — {tagline}`. Tagline odražava esenciju: preciznost, premium delovi, dobro espresso. `description` u meta tagu je jedinstven, 140–160 karaktera, sa ključnim rečima (espresso delovi, barista alat, E61, Srbija). `twitter:card` summary_large_image postoji.
- **FR-7 OpenGraph slika**: Postoji `opengraph-image.(tsx|jpg|png)` u root `app/` (Next.js convention) dimenzija 1200×630, u luksuznom premium stilu: tamno zelena/smeda pozadina (ink), krem akcenat za naslov, serif (Georgia) naglašeni deo naslova, manji sans-serif tagline ispod, možda subtle kafu/portafilter ilustracija ili tekst "EST. 2018 · BEOGRAD". OG slika ima `alt.txt` i `twitter-image` kopiju.
- **FR-8 Website vs SPA ponašanje**: Nema "soft" navigacije koja zadržava scroll poziciju klika na # anchor. Svaki `hashchange` događaj ili programski poziv rezultira preciznim scrollom. Nema Next.js Link prefetcha koji izaziva "blink" ili SPA raspored.
- **FR-9 Sitemap & Robots**: Postoje `sitemap.ts` i `robots.ts` u `app/` koje omogućavaju indeksiranje.

## Non-Functional Requirements
- **NFR-1 Performanse (Lighthouse)**: Na produkcijskom buildu (startovani sa `pnpm build && pnpm start`), Lighthouse report za desktop i mobile: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.
- **NFR-2 Cumulative Layout Shift**: CLS < 0.1 na mobilnom (rezultat LCP < 2.5s). Svi imgs imaju definisane dimenzije ili aspect-ratio; `next/font` ili inline CSS varijabla fiksira font stack pre uklanjanja FOUT-a.
- **NFR-3 Bundle veličina**: First Load JS shared by all < 170 KB (Next build ispis). Page JS (page.tsx) < 100 KB.
- **NFR-4 Accessibility**: Svi interaktivni elementi imaju `aria-label` gde nema vidljiv tekst; kontrast tekst/pozadina ≥ 4.5:1 za telo teksta; heading hijerarhija (h1 samo jednom na stranici, h2 za sekcije) zadržan.
- **NFR-5 Brend konzistentnost**: Favicon, OG slika, Title, Tagline koriste istu paletu (ink/paper/cream), isti serif (Georgia) za naglašene reči, istu "premium" estetiku bez modifikovanja postojećeg UI (G2 non-goals).
- **NFR-6 Standardna deklarativna metoda**: Za favicon/OG/sitemap/robots koriste se Next.js 16 *file-conventions* (app/icon.tsx, app/opengraph-image.tsx, app/sitemap.ts, app/robots.ts) umesto metadate array u layout metadata.icons kada god moguće.
- **NFR-7 Reprodukcija i lokalna provera**: Nakon implementacije, `pnpm build && pnpm start` treba da se izvrši bez greški.

## Constraints
- **Tehnološki**: Next.js 16.3.3 App Router, pnpm 12, Tailwind v4 (`@tailwindcss/postcss`), bez promene okvira.
- **Struktura**: Jedna samo stranica `app/page.tsx` (sa `'use client'`), `app/layout.tsx`, `app/globals.css` — ne dodavati nove rute/foldere osim file-conventions za meta (icon, opengraph-image, robots, sitemap).
- **Dizajn**: Paleta ostaje: `--ink:#171817; --paper:#f5f5f0; --cream:#c5a16d; --rust:#9b5d37;`. Serifske reči (italik) ostaju Georgia. Sans-serif ostaje `--font-plex` — ali mora biti definisan, bez eksternih poziva (self-host ili fallback).
- **Netlify deployment**: Plugin `@netlify/plugin-nextjs` već instaliran (devDependencies) — ne menjati adapter, samo konfiguraciju.
- **Nema novih paketa** osim ako je strogo neophodno (default: ne dodavati ništa; koristiti postojeći `next/og` za generisanje slika).

## Dependencies
- `next@16.3.3` (ImageResponse za icon/OG)
- `react@^19`, `react-dom@^19`
- `@netlify/plugin-nextjs@5.15.13` (već u devDependencies)

## Assumptions
- A1: Korisnik zadovoljava luksuzni/brending stil "tamno zelena/smeda + krem zlato" koji odgovara postojećim `--ink/--cream` varijablama bez dodatnih ilustracija.
- A2: "Site nije SPA" znači: (a) anchor linkovi imaju prirodno ponašanje `scrollIntoView` umesto soft navigacije; (b) pri povratku na #top skroluje do samog vrha; (c) nije potrebno onemogućiti Next.js RSC navigaciju između različitih ruta (samo jedna ruta postoji).
- A3: "Site Title" = `<title>` + OpenGraph `og:title`; "Tagline" = podnaslov u title template-u, description meta, i vizuelni slog na OG slici.
- A4: Za OG sliku, dovoljno je koristiti `ImageResponse` iz `next/og` (pure JSX bez custom fontova, koristeći podrazumevani serif font + default sans od satori).
- A5: Deployment na Netlify se ne izvršava automatski; korisniku treba dostaviti upustva + konfiguraciju — netlify CLI ili Git integration, ručno.
- A6: Touch targeti ≤ 560px: svi `<button>` i `<a>` u headeru, nav, trust-strip, category, product, newsletter form, footer imaju min 44px visinu ili 44×44 touch površinu; ako postoje mali dugmići, uvećati u mobilnom breakpoint-u.

## Acceptance Criteria

### AC-1: Nema horizontalnog skrola na ni jednom standardnom viewportu
- **Type**: `rule`
- **Given**: Otvorena početna stranica u browseru
- **When**: Proveravaju se viewport širine 320, 375, 390, 414, 560, 768, 820, 1000, 1280, 1440, 1920 piksela (emulisano browserom ili JS evaluate `document.body.scrollWidth <= document.documentElement.clientWidth`)
- **Then**: Za svaku širinu `document.body.scrollWidth === document.documentElement.clientWidth` (nema overflow-x)
- **Pass Condition**: Svi viewportovi prolaze
- **Evidence**: `browser_evaluate` skript ispisuje `{width, passes: scrollWidth<=clientWidth}` za svaku tačku ili Lighthouse layout check

### AC-2: Sav tekst se uklapa bez preklapanja i overflowa
- **Type**: `rubric`
- **Dimension**: Estetska i funkcionalna ispravnost teksta na malim ekranima
- **Scale**: 1–5
- **Anchors**: 1 = Preklapanja tekstova, dugmad se preklapaju, footer stack ne radi, trust-strip kolone se presečaju; 3 = Značajni delovi rade ali neke naslove prosto "ce" ili overflow na hrpskim rečima (sa slovož; 5 = Svi naslovi, dugmad, product info, footer, nav drawer, trust strip, newsletter forma su savršeno uloženi, sačuvan je line-height, nema reči koje se prelamaju na "čudnim" mestima, padding je konzistentan.
- **Pass Threshold**: ≥ 4
- **Evidence**: Screenshots na 320px, 375px, 560px, 820px, 1280px + ručna inspekcija DOM-a za `overflow:hidden/auto` na containerima.

### AC-3: Linkovi skroluju tačno do vrha sekcija uz offset za sticky header
- **Type**: `rule`
- **Given**: Korisnik je na vrhu stranice
- **When**: Klikne na link u glavnoj navigaciji (npr. "Prodavnica" → #shop)
- **Then**: Stranica scrolluje tako da je `<section id="shop">` tačno odmah ispod sticky header-a (bez preklapanja naslova sekcije sa headerom)
- **Pass Condition**: Nakon klika, `getBoundingClientRect().top` sekcije je ≤ header visina + 4px (uz obzir na `scroll-padding-top`).
- **Evidence**: `browser_evaluate` nakon klika: `const s=document.querySelector('#shop'); const t=document.querySelector('.header'); const rect=s.getBoundingClientRect(); rect.top <= t.offsetHeight + 4`

### AC-4: Hash u URL-u radi sa deljenim linkovima
- **Type**: `rule`
- **Given**: Otvaramo direktno `http://localhost:3000/#finder`
- **When**: Stranica se učita
- **Then**: Automatski je skrolovano do `#finder` sekcije, ispod sticky headera (bez da se naslov "Pronađite deo bez dileme." sakrije ispod zaglavlja)
- **Pass Condition**: Nakon load, `window.scrollY` > 0 i `section#finder.getBoundingClientRect().top <= header.offsetHeight + 8` (sa tolerance za scroll-padding)
- **Evidence**: `browser_evaluate` nakon `browser_navigate('#finder')` + `browser_wait_for(1.5s)`

### AC-5: Site Title i Tagline — SEO ispravan
- **Type**: `rule`
- **Given**: Učitan `<head>` početne stranice
- **When**: Čitamo `document.title`, `meta[name=description]`, `meta[property=og:title]`, `meta[property=og:description]`, `meta[name=twitter:card]`
- **Then**: 
  1. `document.title` počinje sa imenom brenda "Ferro Crema" i ima tagline npr. "Precizni delovi za savršen espresso | Ferro Crema" (ili obrnuto, sve dok je format u `metadata.title.template`)
  2. `description` je dužine 120–170 karaktera, srpski jezik, sadrži ključne reči "espresso delovi", "barista alat", "kompatibilnost" ili slično
  3. `og:title` ≈ title, `og:description` ≈ meta description
  4. `twitter:card === 'summary_large_image'`
- **Pass Condition**: Sva 4 poduslova su zadovoljena
- **Evidence**: `browser_evaluate` + parsiranje `<head>` meta tagova

### AC-6: Favicon — pravilan brending i file-convention
- **Type**: `rule`
- **Given**: Next.js build ili dev server
- **When**: Proveravamo `<link rel="icon">` u `<head>` i postojeće fajlove u app/ folderu
- **Then**: Postoji `app/icon.tsx` ili `app/icon.png` (Next.js file-convention), ili generisan multi-size `<link>`. Ikonica odražava brending: tamno ink pozadina, cream FC monogram ili portafilter geometrija. Apple-touch-icon prisutan.
- **Pass Condition**: Makar jedan `<link rel="icon">` postoji u `<head>`; `app/` sadrži icon i apple-icon artefakte (kod ili slika)
- **Evidence**: `Glob('app/icon*')`, `Glob('app/apple*')`; `browser_evaluate` za `document.querySelector('link[rel~=icon]') !== null`

### AC-7: OpenGraph Image — 1200×630, pravilan stil, metadata prikaz
- **Type**: `rule`
- **Given**: `app/opengraph-image.tsx` (ili png) postoji
- **When**: Učitamo `og:image` iz meta tagova i proveravamo dimenzije + alt
- **Then**: 
  1. `meta[property=og:image:width]` content == "1200" (ili je ruta `/opengraph-image` koju Next generiše sa `size={1200,630}` exportom)
  2. `meta[property=og:image:height]` content == "630"
  3. Postoji `og:image:alt` opis (npr. "Ferro Crema — precizni delovi za savršen espresso")
  4. Postoji `twitter-image` ekvivalent (file-convention `app/twitter-image.tsx`)
- **Pass Condition**: Sva 4 tačke
- **Evidence**: `browser_evaluate` og meta; `Read(app/opengraph-image.tsx)` export `size={width:1200,height:630}`

### AC-8: Estetska kvaliteta favicona i OG slike
- **Type**: `rubric`
- **Dimension**: Brend konzistentnost i estetika
- **Scale**: 1–5
- **Anchors**: 1 = Isključivo placeholder geometrija, ne seća se na kafe/barista temu, žute boje; 3 = Standardan plavi kvadrat sa slovom FC — funkcionalno ali bez "premium" osećaja; 5 = Upečatljiv, minimalistički FC monogram ili krug sa portafilter geometrijom, ink/cream paleta, OG slika ima serif/sans slogan kombinaciju kao hero naslov (podseća na isti dizajn jezik).
- **Pass Threshold**: ≥ 4
- **Evidence**: Screenshots favicona u tabu; full render OG slike.

### AC-9: Netlify build konfiguracija validna
- **Type**: `rule`
- **Given**: `netlify.toml` u root
- **When**: Proveravamo da li ima: build komandu, publish directory ili Netlify Nextjs plugin, HSTS, immutable caching za _next/static
- **Then**:
  1. `build.command = "pnpm build"` (ili npm/pnpm — postojeća)
  2. Uključuje `@netlify/plugin-nextjs` u `[[plugins]]`
  3. Ima `[[headers]]` za `/_next/static/*` sa `Cache-Control: public,max-age=31536000,immutable`
  4. HSTS header na `/*`
  5. `NODE_VERSION = 22` u `[build.environment]`
  6. Production env `NEXT_TELEMETRY_DISABLED=1`
  7. `NEXT_PUBLIC_SITE_URL` ili hint za base URL nije neophodan ali `trailingSlash` u next config ako postoji
- **Pass Condition**: Tačke 1–6 zadovoljene (ne tražimo 7)
- **Evidence**: `Read(netlify.toml)` ručna provera.

### AC-10: Build prolazi bez fatalnih grešaka
- **Type**: `rule`
- **Given**: Clean workspace
- **When**: Pokrenemo `pnpm build`
- **Then**: Komanda završava sa exit code 0, generiše `.next/` folder. Ispisuje route/page sizes.
- **Pass Condition**: Exit code 0, `.next/build-manifest.json` postoji posle.
- **Evidence**: RunCommand output + Glob za `.next/build-manifest.json`

### AC-11: Performansni Lighthouse minimumi
- **Type**: `rule`
- **Given**: Pokrenut produkcijski server (`pnpm build && pnpm start` na portu)
- **When**: Pokrenuti Lighthouse mobile preset za stranicu
- **Then**: Svi 4 kategorija: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
- **Pass Condition**: Sva 4 ≥ 90
- **Evidence**: Console/skript rezultati ili browser devtools. Ako Lighthouse CLI nije dostupan, minimum: `next build` First Load JS < 170 KB, images loading="lazy" za ispod-fold, `width/height` ili aspect ratio definisani.

### AC-12: Accessibility — kontrast, aria, hijerarhija
- **Type**: `rubric`
- **Dimension**: a11y pravilnost
- **Scale**: 1–5
- **Anchors**: 1 = Dugmad bez aria-label, naslovi bez redosleda, kontrast teksta trust strip/quote band nije dovoljan; 3 = Osnovne funkcije rade ali neki mali tekst na cream/svetloj pozadini pada ispod 4.5:1; 5 = Sve CTA imaju vidljivi focus state (postojeći `:focus-visible { outline: 2px solid var(--cream) }` primenljiv na svim linkovima/dugmadima), heading hijerarhija 1→2→3, kontrast ≥ 4.5:1 za sve paragrafe/info tekst, footer mali tekst kontrast ≥ 4.5:1.
- **Pass Threshold**: ≥ 4
- **Evidence**: browser_evaluate za ukupan broj `<h1>` === 1; `<h2>` >= 6; kontrast proveri za couple elemente ili axe-core ako nije dostupan ručni pregled.

### AC-13: Performance optimizacije — slike i lazy load
- **Type**: `rule`
- **Given**: page.tsx renderovan
- **When**: Tražimo sve `<img>` tagove ispod prvog foldera (hero slider izuzetak)
- **Then**: Product image, category image, editorial image imaju `loading="lazy"` i/ili `decoding="async"`. Hero slider slike mogu ostati bez lazy (above fold).
- **Pass Condition**: Makar editorial/category/product `<img>` imaju `loading=lazy`. (Sličice moraju imati ili aspect ratio u CSS ili width/height atribute)
- **Evidence**: Grep za `loading="lazy"` u product/category/editorial img tagovima.

### AC-14: Font optimizacija — definisan --font-plex ili strategija zaštite od FOUT
- **Type**: `rule`
- **Given**: globals.css ili layout.tsx
- **When**: Tražimo definiciju `--font-plex` CSS varijable ili next/font import u layout.tsx
- **Then**: Ili (a) u `globals.css` postoji `--font-plex:'IBM Plex Sans',...` + fallback stack *sa display=swap* ili (b) u `layout.tsx` koristi se `next/font/google` za IBM Plex Sans sa CSS varijablom `--font-plex`. Ili (c) jednostavnije: definisati fallback seriju direktno u `--font-plex` koja ne zahteva eksterni zahtev.
- **Pass Condition**: `--font-plex` je definisan i `font-family: var(--font-plex),Arial,sans-serif;` ne pada odmah u Arial (ukoliko nije prepoznao font — fallback reda je ispravan).
- **Evidence**: Grep za `--font-plex` u globals + layout.

### AC-15: Sitemap + Robots fajlovi
- **Type**: `rule`
- **Given**: Next dev server
- **When**: Posetimo `/sitemap.xml` i `/robots.txt`
- **Then**: Oba statusa 200. Sitemap sadrži URL početne stranice. Robots.txt sadrži `User-agent: *`, `Allow: /`, `Sitemap: /sitemap.xml`.
- **Pass Condition**: Oba endpointa rade.
- **Evidence**: `fetch('/sitemap.xml')` status 200 + contains urlset; `fetch('/robots.txt')` status 200.

## Open Questions
- [Q1] Da li treba dodati i manifest.webmanifest za PWA (web-app capable)? — Pretpostavka: NE, ostaje non-goal (samo website, ne aplikacija). Ne radimo.
- [Q2] Next.js Image komponenta za sve <img>? — Default images.unoptimized: true u next config. Ili promeniti na `remotePatterns` + omogućiti? — Odlučujemo u fazi implementacije: minimalni pristup: ostaviti `<img>` ali dodati `loading="lazy"` + aspect-ratio u CSS za manji CLS (lakše, bez sharp-a, radi na Netlify isto). 
- [Q3] Da li OG slika treba da bude dinamički generisana uz next/og (ViewTransitions-like) ili statički PNG? — Koristimo `ImageResponse` file convention radi optimalnosti i činjenice da već postoji u Next 16.
