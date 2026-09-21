import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, PackageCheck, RotateCcw, ShieldCheck, Truck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Uslovi kupovine',
  description: 'Uslovi kupovine, isporuke, odustanka od ugovora i reklamacija za Ferro Crema.',
}

const sections = [
  {
    title: '1. Predmet uslova i naručivanje',
    body: 'Ovi uslovi uređuju kupovinu proizvoda ponuđenih na sajtu Ferro Crema. Pre slanja porudžbine kupac proverava naziv, kompatibilnost, cenu i količinu artikala. Prikaz porudžbine na sajtu je zahtev za kupovinu; potvrda dostupnosti i konačni dogovor o isporuci obavljaju se kroz komunikaciju sa kupcem.',
  },
  {
    title: '2. Cene i dostupnost',
    body: 'Cene su iskazane u dinarima sa uključenim PDV-om, kada je PDV primenljiv. Dostupnost se prikazuje informativno i može se promeniti pre potvrde porudžbine. Ako artikal ili cena nisu dostupni pod prikazanim uslovima, Ferro Crema kontaktira kupca pre isporuke.',
  },
  {
    title: '3. Isporuka',
    body: 'Isporuka se organizuje na adresu koju kupac unese pri poručivanju. Trošak dostave, rok i ograničenja isporuke prikazuju se u korpi i pri poručivanju. Rok od 24 časa predstavlja cilj za artikle na lageru i porudžbine potvrđene radnim danom do navedenog preseka; ne predstavlja bezuslovnu garanciju kada dostavu obavlja kurirska služba.',
  },
  {
    title: '4. Plaćanje',
    body: 'Dostupne opcije plaćanja prikazuju se tokom poručivanja. Plaćanje pouzećem i uplata po predračunu mogu biti dostupni u zavisnosti od porudžbine. Dok se ne poveže sertifikovani platni prolaz, sajt ne prikuplja niti obrađuje podatke platnih kartica, a opcija kartice ne sme se koristiti za stvarno plaćanje.',
  },
  {
    title: '5. Odustanak od ugovora na daljinu',
    body: 'Potrošač ima pravo da odustane od ugovora zaključenog na daljinu u roku od 14 dana od prijema robe, u skladu sa Zakonom o zaštiti potrošača. Zahtev se šalje na office@ferrocrema.com uz broj porudžbine i kontakt podatke. Robu je potrebno vratiti kompletnu, neoštećenu i, kada je moguće, u originalnoj ambalaži. Pravo na odustanak i izuzeci primenjuju se u skladu sa zakonom.',
  },
  {
    title: '6. Reklamacije i saobraznost',
    body: 'Za reklamaciju kupac može da pošalje opis problema, broj porudžbine i fotografije na office@ferrocrema.com ili da pozove 064 8222 651. Reklamacija se rešava prema važećim propisima o zaštiti potrošača. Pre montaže rezervnog dela preporučujemo proveru kompatibilnosti, jer pogrešna ugradnja može oštetiti opremu.',
  },
  {
    title: '7. Kontakt i izmena uslova',
    body: 'Za pitanja o porudžbini i ovim uslovima obratite se na office@ferrocrema.com ili 064 8222 651, radnim danima od 07:30 do 15:30. Uslovi se mogu izmeniti; verzija objavljena na sajtu primenjuje se od dana objave.',
  },
]

export default function PurchaseTermsPage() {
  return (
    <main className="legal-page">
      <section className="legal-hero">
        <div className="legal-container">
          <p className="eyebrow"><FileText size={13} /> INFORMACIJE ZA KUPCE</p>
          <h1>Uslovi <i>kupovine.</i></h1>
          <p>Jasna pravila za poručivanje, isporuku, plaćanje, odustanak i reklamacije.</p>
          <span className="legal-updated">Poslednje ažuriranje: 21. septembar 2026.</span>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="legal-container legal-layout">
          <aside className="legal-summary" aria-label="Sažetak uslova">
            <div><Truck size={18} /><span><strong>Isporuka</strong>Prikazana pri poručivanju</span></div>
            <div><RotateCcw size={18} /><span><strong>Odustanak</strong>14 dana za ugovor na daljinu</span></div>
            <div><PackageCheck size={18} /><span><strong>Reklamacije</strong>Podrška pre i posle kupovine</span></div>
          </aside>
          <div className="legal-article">
            <div className="legal-notice"><ShieldCheck size={18} /><p>Za potpunu pravnu identifikaciju pre objave dopunite poslovno ime, sedište, matični broj i PIB trgovca u kontakt podacima sajta.</p></div>
            {sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
            <div className="legal-actions"><Link className="button dark" href="/kontakt">Kontaktirajte podršku <ArrowRight size={15} /></Link><Link className="button light" href="/politika-privatnosti">Politika privatnosti</Link></div>
          </div>
        </div>
      </section>
    </main>
  )
}
