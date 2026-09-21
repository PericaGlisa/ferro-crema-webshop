# Ferro Crema Webshop — Implementation Plan

## Task 1: Definisati --font-plex CSS promenljivu i optimizovati font stack
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - U `app/globals.css` u `:root` bloku dodati vrednost za `--font-plex`, koristeći sigurnu fallback seriju (nema eksternih poziva prema Google Fonts u koriscenjem system-ui prebacivanje). Opcije: ili next/font import u layout.tsx sa IBM Plex Sans 300,400,500,600 ili fallback: --font-plex:'IBM Plex Sans', system-ui, -apple-system, Segoe UI, sans-serif. Cilj: eliminisati undefined --font-plex čini da Arial ne bude odmah (FOUT smanjiti) CLS jer je stack definisan).
  - Održati postojeću liniju: `font-family:var(--font-plex),Arial,sans-serif;` (u globals.css.
  - Ako se koristi next/font: u layout.tsx importovati IBM Plex Sans sa display=swap i dodeliti `--font-plex` CSS varijablu kroz className na body.
- **Acceptance Criteria Addressed**: AC-14 (NFR-2, NFR-11)
- **Test Requirements**:
  - `rule` TR-1.1: U učitanom `window.getComputedStyle(document.body).fontFamily` sadrži `--font-plex` definisan (ne pada direktno Arial). Next dev tools Styles -> :root --font-plex ima vrednost.
  - `rule` TR-1.2: Grep u `app/globals.css` za `--font-plex:` uključuje match barem 3 fallback fontova.
- **Notes**: next/font/google za IBM Plex Sans isključuje spoljašnje pozive Google hostovane Next tokom builda; preferiraj taj pristup, bez trudeo pristup radi performansi.

## Task 2: Globalna responzivna revizija i popravke za sve vrste ekrana
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Dodati prelomne tačke na 360px, 480px i možda 1440px ako je potrebno.
  - Popraviti preklapanja:
    - `<560px`: dodati 320px, 360px (iPhone SE) uređaj koji su najmanji.
    - Hero slider h1 → već koristi clamp, ali Hero actions → u 320px → da li tekst prelazi? Proveriti.
    - Nav drawer u 320px dužina linka "Pronađi deo za svoj aparat" → prelamanje?
    - Promo band h2 font.
    - Product name: title 320px.
    - Footer 4-col → 320px footer-main grid.
  - Touch zone minimum 44x44: U mobitelj na ≤560px dodati veći padding za .button, .header-actions button (već 4px padding → inline svg 18px.
  - Proveriti svi elementi nema overflow-x: dodati u site-shell dodatne horizontal overflow hidden već postoji, proveriti za inner elementi koji mogu da prouzrokuju overflow zaustavljanje.
  - Trust-strip, quote-band, newsletter, footer, hero actions, product bottom svaka dimenzija.
  - CLS: svaki image (već ima aspect-ratio u CSS kod product-image (1:1), hero image 16:9.
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-12 (A6)
- **Test Requirements**:
  - `rule` TR-2.1: Na širinama 320, 360, 390, 414, 560, 768, 820, 1000, 1280, 1440, 1920 → `document.body.scrollWidth === document.documentElement.clientWidth` (bez horizontal overflow.
  - `rubric` TR-2.2: Responzivan layout estetska ispravnost; skala 1-5,>=4; 1=preklapanja; 3=većina radi par; 5=savršeno.
  - `rule` TR-2.3: Svi <button> i <a> u header i footer ≤560px imaju computed min-height/min-width ili offsetHeight* ≥44.

## Task 3: Ponašanje anchor linkova — scroll to sekcija sa header offset i hash URL sinhronizacija
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None (zavisno, može paralelno sa T2)
- **Description**:
  - Postojeći anchor `<a href="#shop"> → native ponašanje sa smooth scroll u CSS-u: `html { scroll-behavior:smooth; scroll-padding-top: 92px; }` postoji. Popraviti po breakpoint-ima:
    - ≤1000px -> header inner height je 75px → scroll-padding-top mora biti 75px (postoji u media).
    - ≤560px → 68px (postoji).
  - Rešiti učitavanje deljenog linka: `/#finder → Next.js -> window.location.hash postoji → browser scrolla ali mora offset.
    - Dodati client-side efekat: nakon load + hash postoji, pozvati scrollIntoView za target element uz scrollIntoView block:"start" behavior:"auto".
    - window.addEventListener("hashchange",...) za linkove.
  - Na klik na <a href="#top"> → skroluje do Y=0.
  - Sve radi u app/page.tsx client-side useEffect kod.
- **Acceptance Criteria Addressed**: AC-3, AC-4, FR-2/FR-3/FR-8
- **Test Requirements**:
  - `rule` TR-3.1: Klik na #shop link → section#shop.getBoundingClientRect().top ≤ header.offsetHeight+4.
  - `rule` TR-3.2: Otvoriti direktno /#finder → nakon učitavanja (wait 1.5s → window.scrollY >0 i section#finder top ≤ header height+8.
  - `rule` TR-3.3: Klik na #top logo → window.scrollY === 0 nakon scroll završi.
- **Notes**: Ne menjati sve `<a>` u `next/link`. Želimo website ne SPA.

## Task 4: Novi Site Title & Tagline (SEO metadata + JSON-LD
- **Status**: `pending
- **Priority**:high
- **Depends On**: None
- **Description**:
  - U `app/layout.tsx` metadata objekt:
    - Title default novi: Početna title → "Ferro Crema — Precizni delovi za savršen espresso"
    - Title template: `%s | Ferro Crema` → bolje (ostaje kao novi: "%s | Ferro Crema — precizni delovi za espresso". Ili default novi, precizniji.
    - Description novi ~150 karaktera: "Originalni i kompatibilni delovi za espresso aparate i mlinove. Precizne geometrije, barista alat, noževi za mlinove i setovi za održavanje — brza isporuka iz Srbije."
    - og:title, og:description opis; twitter summary_large_image; manifest ikonica; twitter:creator site;
    - Apple meta apple-mobile-web-app-title "Ferro Crema"
    - generator ostaje Next.js
    - apple-mobile-web-app-capable? Nije SPA Nije bitno.
    - Dodati JSON-LD: Organization shemu u <head> kroz metadata jsonld array ako može ili Script metadata in layout.tsx.
  - Metadata.api metadata openGraph images: Prebaciti da next file convention opengraph-image.tsx umesto ručnog OG u layoutu.
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `rule` TR-4.1: document.title počinje sa Ferro Crema + tagline. Dužina ≤ 60 znakova.
  - `rule` TR-4.2: meta[name=description] content → between 120-170 characters srpski jezik.
  - `rule` TR-4.3: meta[property=og:title] ≈ document.title.
  - `rule` TR-4.4: meta[name=twitter:card] content == "summary_large_image".

## Task 5: Novi premium favicon — app/icon.tsx + apple-icon (file convention)
- **Status**:pending
- **Priority**: high
- **Depends On**: None (paralelno sa T4)
- **Description**:
  - Napraviti `app/icon.tsx` koristeći `ImageResponse` iz `next/og`. Generišemo 32x32px (default sledeću minimalistički:
    - Krug tamno ink (#171817) pozadina; cream (#c5a16d) FC monogram u centar → or portafilter geometrijski circle sa linije → napraviti sa dve vertikalne linije.
    - Ili jednostavniji: krug matrica "FC" u serif stilu, cream color, ili 28px serif FC u SVG.
    - Export contentType="image/png", size={width:32,height:32}.
  - `app/apple-icon.tsx` size: 180x180 → sličan dizajn; minimalno širiti
  - Ukloniti duplicirane favicon.png reference u public (ostaviti ih; ali next koristi app convention automatski inject <link> u layout. metadata:  metadata.icons ukljuciju app/icon.tsx ne treba ukljucuju; next će <link> tagove za icon.
- **Acceptance Criteria Addressed**: AC-6, AC-8
- **Test Requirements**:
  - `rule` TR-5.1: app/icon.tsx; app/apple-icon.tsx postoje.
  - `rule` TR-5.2: link[rel=icon] u zaglavlju postoji (Next ga generiše).
  - `rubric` TR-5.3: Brend konzistentnost 1-5 ≥4.

## Task 6: OpenGraph 1200×630 premium slika + twitter-image
- **Status**:pending
- **Priority**: high
- **Depends On**: T4 (zajedničke dimenzije, ali ne; može bez T4 može paralelno)
- **Description**:
  - Napravi `app/opengraph-image.tsx` → 1200×630px ImageResponse.
  - Dizajn:
    - pozadina #171817 (ink).
    - left veći deo: naslov "Ferro Crema" serif bold + "za savršen espresso u --cream) sans manji tagline ispod: "PRECIZNI DELOVI. BARISTA ALAT. OD 2018. BEOGRAD."
    - dekorativni border na vrhu + linija cream color + dekoracija u stilu Hero kicker-line.
  - Eksport alt: "Ferro Crema — precizni delovi za savršen espresso"
  - twitter-image: kopiraj dizajn oga 1200x630.
- **Acceptance Criteria Addressed**: AC-7, AC-8
- **Test Requirements**:
  - `rule` TR-6.1: app/opengraph-image.tsx + app/twitter-image.tsx postoje, imena; export size width=1200 height=630.
  - `rule` TR-6.2: og:image meta width=1200 height=630 u <head>; og:image:alt postoji.
  - `rubric` TR-6.3: Estetska kvaliteta skala 1-5 ≥4.

## Task 7: Sitemap & Robots file konvencija
- **Status**:pending
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - `app/sitemap.ts`: default export funkcija vraća niz sa URL-jem http://ferrocrema.rs sa datum last modifikacije.
  - `app/robots.ts`: vraća User-Agent, Allow, Sitemap link ka /sitemap.xml.
- **Acceptance Criteria Addressed**: AC-15
- **Test Requirements**:
  - `rule` TR-7.1: /sitemap.xml → 200 status, urlset sadrži <loc>...</loc>
  - `rule` TR-7.2: /robots.txt → status 200

## Task 8: Performanse — lazy loading slika, touch targets, aspect ratios i headeri za caching
- **Status**:pending
- **Priority**: high
- **Depends On**: T2 (aspect ratio već done in CSS; ovo je dopuna
- **Description**:
  - Sve ispod-fold sectione section editorial image editorial image; product image; category image → dodati loading="lazy" decoding="async" u svaki <img> osim hero slider iznad fold.
  - category-card images postoje aspect-ratio CSS.
  - Header actions buttons u ≤560px uvećati padding touch površine.
  - Scrollbar width heights fixed CSS za site-shell min-width 320 body postoji.
  - newsletter input,select-field → min heights 44px ≤560px.
  - Desavanja next config: powerByHeader false, compress true postoji.
  - Dodavanje Content-Security-Policy-Report-Only ne mora — već postoje headeri.
  - Performanse Lighthouse 90+ four categories -> First Load JS <170KB; page script.
- **Acceptance Criteria Addressed**: AC-11, AC-13, NFR-1/NFR-2/NFR-3
- **Test Requirements**:
  - `rule` TR-8.1: U product/category/editorial img sadrži loading="lazy" bar 3 lazy loadovana.
  - `rubric` TR-8.2: First Load JS ≤170 KB; page ≤100KB → ako build output.
  - `rule` TR-8.3: Newsletter input + button height ≥ 44px.

## Task 9: Netlify.toml konfiguracija dotjeršavati
- **Status**:pending
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - Proveriti postojeći netlify.toml:
    - Build command pnpm build ✔;
    - NODE_VERSION 22 ✔.
    - Plugin @netlify/plugin-nextjs ✔.
    - Cache headers _next immutable ✔;dodati immutability za /og-image i apple icon next file convention images su pod /icon etc. next generiše? Dodaj [[headers]] za /opengraph-image, /twitter-image isto.
    - Dodati [[redirects]] 404 → / (optional: single-page → pitate? Ali website nije SPA → 404.html (ne redirect).
    - Ensure functions node_bundler esbuild.
    - Dodaj [build] environment PNPM_FLAGS=? PNPM je package manager.
    - NEXT_PUBLIC_SITE_URL nije neophodno.
    - Dodaj [images: NEXT_PREW = 1 za sve kontekstove production deploy → postoje NEXT_TELEMETRY_DISABLED ✔.
  - Dodati [[headers]] za /icon* immutable caching 1 godina.
  - Postoji trailingSlash next config optional (netlify neće, ali nije neophodno.
- **Acceptance Criteria Addressed**: AC-9
- **Test Requirements**:
  - `rule` TR-9.1: netlify.toml ima [[plugins]] package @netlify/plugin-nextjs ✔; build command ✔; HSTS ✔; immutable headers _next ✔ NODE_VERSION 22 ✔.
  - `rule` TR-9.2: Postoje _next static immut + favicon OG image header.

## Task 10: Build verifikacija — pnpm build prolazi + start server
- **Status**:pending
- **Priority**: high
- **Depends On**: Svi prethodni 1-9
- **Description**:
  - Pokrenuti pnpm build, proveriti izlaz, greške.
  - Ako build prođe → pnpm start i manualni smoke test.
  - Verifikacija HEAD meta/favikon/OG endpointa.
  - Sitemap robots + robots.txt rade.
- **Acceptance Criteria Addressed**: AC-10
- **Test Requirements**:
  - `rule` TR-10.1: pnpm build exit code 0; .next build-manifest postoji.
  - `rule` TR-10.2: Sitemap, robots, /icon radi url-ovi status 200.
- **Notes**: Ako ne prođe → prelazimo u Review fazu.
