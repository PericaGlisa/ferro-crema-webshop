import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Cookie, LockKeyhole, ShieldCheck, UserRoundCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politika privatnosti',
  description: 'Politika privatnosti i obrada podataka o ličnosti na sajtu Ferro Crema.',
}

const sections = [
  {
    title: '1. Ko obrađuje podatke',
    body: 'Rukovalac podacima je Ferro Crema d.o.o., Beograd. Za pitanja o privatnosti možete pisati na office@ferrocrema.com. Pre objave trgovac treba da dopuni puno sedište, matični broj i PIB u ovoj politici i u footeru sajta.',
  },
  {
    title: '2. Koje podatke obrađujemo',
    body: 'Pri poručivanju unosite ime i prezime, email, telefon, adresu za isporuku, mesto, poštanski broj i opciono podatke firme ili napomenu za kurira. U korpi čuvamo samo izabrane artikle i količine. Sajt ne prikuplja podatke platnih kartica u ovoj verziji.',
  },
  {
    title: '3. Svrha i osnov obrade',
    body: 'Podaci iz porudžbine koriste se da se obradi zahtev kupca, organizuje isporuka, odgovori na upit i ispune zakonske obaveze. Email za bilten koristi se samo ako korisnik ga dobrovoljno unese i potvrdi prijavu; trenutno se obrazac ne šalje na udaljeni servis.',
  },
  {
    title: '4. Čuvanje i deljenje podataka',
    body: 'Korpa se čuva lokalno u pregledaču. Poslednji prikaz porudžbine čuva se samo u sessionStorage-u tog pregledača kako bi se prikazala stranica potvrde. Ako se uvede stvarna obrada porudžbina, podaci se mogu dostaviti kurirskoj službi, knjigovodstvenom partneru ili pružaocu plaćanja samo kada je to potrebno za izvršenje porudžbine ili zakonsku obavezu.',
  },
  {
    title: '5. Kolačići i analitika',
    body: 'Sajt koristi lokalno skladište pregledača za korpu. Analitika se u produkciji može učitavati preko Vercel Analytics-a. Pre uvođenja drugih kolačića, oglašavanja ili analitičkih platformi koje nisu neophodne za rad sajta, treba prikazati odgovarajući mehanizam izbora korisnika.',
  },
  {
    title: '6. Vaša prava',
    body: 'Možete zatražiti pristup, ispravku, brisanje, ograničenje obrade, prigovor ili prenosivost podataka kada su uslovi za to ispunjeni. Zahtev pošaljite na office@ferrocrema.com. Takođe možete podneti pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti.',
  },
  {
    title: '7. Bezbednost i izmene',
    body: 'Primenujemo razumne organizacione i tehničke mere zaštite, ali nijedan prenos podataka preko interneta nije apsolutno bezbedan. Ova politika može biti izmenjena kada se promene funkcije sajta ili propisi; datum na vrhu stranice označava poslednju verziju.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <section className="legal-hero">
        <div className="legal-container">
          <p className="eyebrow"><LockKeyhole size={13} /> ZAŠTITA PODATAKA O LIČNOSTI</p>
          <h1>Politika <i>privatnosti.</i></h1>
          <p>Objašnjenje koje podatke sajt koristi, zbog čega i kako možete ostvariti svoja prava.</p>
          <span className="legal-updated">Poslednje ažuriranje: 21. septembar 2026.</span>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="legal-container legal-layout">
          <aside className="legal-summary" aria-label="Sažetak privatnosti">
            <div><UserRoundCheck size={18} /><span><strong>Minimalni podaci</strong>Samo za porudžbinu i podršku</span></div>
            <div><Cookie size={18} /><span><strong>Lokalna korpa</strong>Čuva se u pregledaču</span></div>
            <div><ShieldCheck size={18} /><span><strong>Vaša prava</strong>Pristup, ispravka i brisanje</span></div>
          </aside>
          <div className="legal-article">
            {sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
            <div className="legal-actions"><a className="button dark" href="mailto:office@ferrocrema.com">Pošaljite zahtev za podatke <ArrowRight size={15} /></a><Link className="button light" href="/uslovi-kupovine">Uslovi kupovine</Link></div>
          </div>
        </div>
      </section>
    </main>
  )
}
