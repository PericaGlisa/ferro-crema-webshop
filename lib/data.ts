export interface Product {
  id: number
  slug: string
  name: string
  category: string
  meta: string
  price: string
  priceNum: number
  old: string
  tag: string
  image: string
  shore: string
  tempMax: string
  pressureMax: string
  compatible: string[]
  material: string
  dimensions: string
  description?: string
  stock: number
}

export interface CartItem {
  product: Product
  qty: number
}

export interface Category {
  id: string
  slug: string
  name: string
  count: string
  itemCount: number
  icon: string
  image: string
  description: string
}

export interface ServiceKit {
  id: string
  name: string
  slug: string
  subtitle: string
  price: string
  priceNum: number
  oldPrice: string
  savings: string
  tag: string
  image: string
  badge: string
  contents: string[]
  compatibility: string[]
  recommendedInterval: string
}

export interface Guide {
  id: string
  slug: string
  title: string
  category: string
  duration: string
  difficulty: 'Početni' | 'Srednji' | 'Napredni'
  excerpt: string
  image: string
  tools: string[]
  steps: {
    step: number
    title: string
    instruction: string
    tip?: string
  }[]
  relatedProducts: number[]
}

export interface FAQItem {
  q: string
  a: string
  category?: 'Proizvodi & Kompatibilnost' | 'Isporuka & Garancija' | 'Servis & Održavanje'
}

export const FREE_SHIPPING_THRESHOLD = 8000
export const STANDARD_SHIPPING_FEE = 390

export const precisionBrands = [
  'LA MARZOCCO',
  'FAEMA E61',
  'SLAYER',
  'KEES VAN DER WESTEN',
  'SYNESSO',
  'MAZZER',
  'VICTORIA ARDUINO',
  'ROCKET MILANO',
  'RANCILIO',
  'MAHLKÖNIG',
  'EUREKA',
  'COMPAK',
]

export const categories: Category[] = [
  {
    id: 'dihtunzi',
    slug: 'dihtunzi-i-o-ringovi',
    name: 'Dihtunzi & O-ringovi',
    count: '48 artikala',
    itemCount: 48,
    icon: '◉',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&q=85',
    description: 'Prehrambeni VMQ silikon otporan na 300°C i FKM/EPDM O-ringovi za nultu toleranciju curenja.',
  },
  {
    id: 'sita',
    slug: 'tus-sita-i-difuzori',
    name: 'Tuš sita & Difuzori',
    count: '31 artikl',
    itemCount: 31,
    icon: '⊙',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=85',
    description: 'IMS Nanotech integrisane foto-membrane i VST precizne korpe za uniformnu disperziju vode.',
  },
  {
    id: 'portafiltri',
    slug: 'portafiltri-i-rucke',
    name: 'Portafiltri & Ručke',
    count: '24 artikla',
    itemCount: 24,
    icon: '◌',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=700&q=85',
    description: 'Bezdani (naked) portafiltri od punog mesinga i orahovog drveta sa balansiranim težištem.',
  },
  {
    id: 'nozevi',
    slug: 'nozevi-za-mlinove',
    name: 'Noževi za mlinove',
    count: '38 artikala',
    itemCount: 38,
    icon: '◒',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=85',
    description: 'Fabrički kaljeni čelik (64 HRC) i TiN presvučeni noževi za Mazzer, Mahlkönig, Eureka i Fiorenzato.',
  },
  {
    id: 'barista',
    slug: 'barista-precizni-alat',
    name: 'Barista precizni alat',
    count: '76 artikala',
    itemCount: 76,
    icon: '◇',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&q=85',
    description: 'Kalibrisani tamperi tolerancije ±0.05 mm, WDT distribuatori sa 0.35 mm iglicama i dosing ringovi.',
  },
  {
    id: 'hemija',
    slug: 'servis-i-hemija',
    name: 'Servis & Hemija',
    count: '42 artikla',
    itemCount: 42,
    icon: '✣',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=85',
    description: 'Profesionalni dekalcifikatori, NSF sertifikovana sredstva za uklanjanje kafe-ulja i maziva za prehrambenu industriju.',
  },
]

export const products: Product[] = [
  {
    id: 1,
    slug: 'e61-silikonski-dihtung-8-5mm',
    name: 'E61 silikonski dihtung 8.5 mm',
    category: 'dihtunzi',
    meta: 'Prehrambeni silikon 73 Shore · E61 standard',
    price: '890 RSD',
    priceNum: 890,
    old: '',
    tag: 'NA LAGERU',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=85',
    shore: '73 Shore A',
    tempMax: '300°C',
    pressureMax: '16 bara',
    compatible: [
      'Faema E61',
      'ECM Mechanika',
      'Rocket Appartamento',
      'Bezzera BZ10',
      'Profitec Pro 500',
    ],
    material: 'Prehrambeni silikon VMQ (BPA Free)',
    dimensions: '73×57×8.5 mm',
    description: 'Vrhunski dihtung grupe od specijalnog prehrambenog VMQ silikona. Zadržava elastičnost i ne stvrdnjava se tokom dugotrajnog rada na temperaturama do 300°C. Olakšava zaključavanje portafiltera u centar bez prekomerne sile.',
    stock: 140,
  },
  {
    id: 2,
    slug: 'ims-precizno-tus-sito-200um',
    name: 'IMS precizno tuš sito 200 μm',
    category: 'sita',
    meta: 'E61 · 58 mm · integrisana foto-membrana',
    price: '2.490 RSD',
    priceNum: 2490,
    old: '2.890 RSD',
    tag: '−14%',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
    shore: 'N/A',
    tempMax: '200°C',
    pressureMax: '16 bara',
    compatible: [
      'E61 grupe (sve)',
      'La Marzocco Linea',
      'Rocket R58',
      'Lelit Bianca',
      'Quick Mill Vetrano',
    ],
    material: 'AISI 316L nerđajući čelik',
    dimensions: '58×5 mm (200 μm perforacija)',
    description: 'Tuš sito sa integrisanom membranom izrađenom foto-graviranjem. Obezbeđuje homogen raspored vode po celoj površini kafe u portafilteru i sprečava stvaranje channeling-a.',
    stock: 45,
  },
  {
    id: 3,
    slug: 'motta-europa-kalibrisani-tamper-58-5mm',
    name: 'Motta Europa kalibrisani tamper',
    category: 'barista',
    meta: '58.5 mm · brušeni nerđajući čelik AISI 304',
    price: '4.290 RSD',
    priceNum: 4290,
    old: '',
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=85',
    shore: 'N/A',
    tempMax: 'N/A',
    pressureMax: 'N/A',
    compatible: [
      'Svi 58 mm portafiltri',
      'E61 standard',
      'La Marzocco',
      'Victoria Arduino',
      'Sanremo',
    ],
    material: 'Brušeni AISI 304 nerđajući čelik',
    dimensions: 'Ø58.5 mm, visina 92 mm, masa 450g',
    description: 'Kalibrisana osnova od punog nerđajućeg čelika sa ergonomskim rukohvatom. Prečnik 58.5 mm savršeno pokriva precizne VST i IMS korpe bez ostavljanja nekompresovane kafe uz ivice.',
    stock: 28,
  },
  {
    id: 4,
    slug: 'set-nozeva-za-mazzer-super-jolly-64mm',
    name: 'Set noževa za Mazzer Super Jolly',
    category: 'nozevi',
    meta: '64 mm · originalna OEM geometrija sečenja',
    price: '8.990 RSD',
    priceNum: 8990,
    old: '',
    tag: 'OEM PRO',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=85',
    shore: 'N/A',
    tempMax: 'N/A',
    pressureMax: 'N/A',
    compatible: [
      'Mazzer Super Jolly',
      'Mazzer Major',
      'Mazzer Royal',
      'Mazzer Kony',
    ],
    material: 'Kaljeni čelik DIN 1.4112 (64 HRC)',
    dimensions: 'Ø64 mm, par (gornji + donji nož)',
    description: 'Originalni set precizno naoštrenih ravnih noževa tvrdoće 64 HRC. Obezbeđuje bimodalnu raspodelu čestica uz minimalno zagrevanje kafe tokom intenzivnih špiceva u ugostiteljstvu.',
    stock: 19,
  },
  {
    id: 5,
    slug: 'mahlkonig-ek43-originalni-set-nozeva-98mm',
    name: 'Mahlkönig EK43 OEM set noževa 98 mm',
    category: 'nozevi',
    meta: '98 mm · specijalni liveni čelik za kafu',
    price: '34.900 RSD',
    priceNum: 34900,
    old: '38.500 RSD',
    tag: 'PREMIUM',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=85',
    shore: 'N/A',
    tempMax: 'N/A',
    pressureMax: 'N/A',
    compatible: ['Mahlkönig EK43', 'Mahlkönig EK43S', 'Mahlkönig EP43'],
    material: 'Specijalni alatni čelik visoke gustine',
    dimensions: 'Ø98 mm, komplet sa fabričkim vijcima',
    description: 'Referentni noževi za Specialty kafeterije. Izuzetno ujednačena granulacija mlevenja za filter i espresso ekstrakciju visoke ekstrakcione stope (EY).',
    stock: 8,
  },
  {
    id: 6,
    slug: 'bezdani-portafilter-e61-orahovo-drvo',
    name: 'Bezdani portafilter E61 — Orahovo drvo',
    category: 'portafiltri',
    meta: 'E61 standard · brušeni hromirani mesing',
    price: '7.890 RSD',
    priceNum: 7890,
    old: '8.400 RSD',
    tag: 'BARISTA CHOICE',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=85',
    shore: 'N/A',
    tempMax: 'N/A',
    pressureMax: '16 bara',
    compatible: ['Rocket', 'ECM', 'Profitec', 'Faema', 'Sanremo', 'Lelit'],
    material: 'Hromirani mesing visoke mase + orahovo drvo',
    dimensions: 'Dužina 225 mm, masa 540 g, uho 6 mm',
    description: 'Naked portafilter koji omogućava direktan vizuelni uvid u formiranje toka espressa. Pomaže u treniranju barista i otkrivanju mikro-kanala (channeling).',
    stock: 22,
  },
  {
    id: 7,
    slug: 'la-marzocco-silikonski-dihtung-8mm',
    name: 'La Marzocco silikonski dihtung grupe 8 mm',
    category: 'dihtunzi',
    meta: 'Linea Mini / PB / Strada · prehrambeni silikon',
    price: '1.250 RSD',
    priceNum: 1250,
    old: '',
    tag: 'NA LAGERU',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=85',
    shore: '70 Shore A',
    tempMax: '300°C',
    pressureMax: '16 bara',
    compatible: ['La Marzocco Linea Mini', 'Linea PB', 'Strada', 'GS3', 'FB80'],
    material: 'Prehrambeni VMQ silikon',
    dimensions: '72×55×8 mm',
    description: 'Zaptivka za La Marzocco bajonet grupu. Znatno mekša i dugotrajnija od fabričke crne gume, ne ostavlja miris i ne lepi se za uši portafiltera.',
    stock: 60,
  },
  {
    id: 8,
    slug: 'puly-caff-plus-profesionalni-prasak-900g',
    name: 'Puly Caff Plus® prašak za grupe 900 g',
    category: 'hemija',
    meta: 'NSF sertifikovano · brzo rastvorljivo',
    price: '1.990 RSD',
    priceNum: 1990,
    old: '2.200 RSD',
    tag: 'SERVIS OBAVEZNO',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
    shore: 'N/A',
    tempMax: 'N/A',
    pressureMax: 'N/A',
    compatible: ['Sve komercijalne i kućne espresso mašine sa trokrakim ventilom'],
    material: 'Aktivna baza bez ostataka',
    dimensions: 'Pakovanje 900 g, 90 doza',
    description: 'Najpoznatije svetsko sredstvo za backflush čišćenje glava espresso aparata. Rastvara nataložena ulja kafe i sprečava gorčinu i kvarenje profila napitka.',
    stock: 95,
  },
  {
    id: 9,
    slug: 'wdt-precizni-distribuator-0-35mm',
    name: 'WDT precizni distribuator sa postoljem',
    category: 'barista',
    meta: '9 iglica 0.35 mm AISI 304 · aluminijumsko kućište',
    price: '2.950 RSD',
    priceNum: 2950,
    old: '',
    tag: 'NOVO',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=85',
    shore: 'N/A',
    tempMax: 'N/A',
    pressureMax: 'N/A',
    compatible: ['Svi tipovi korpi i mlinova'],
    material: 'Eloksirani crni aluminijum i medicinski čelik',
    dimensions: 'Visina 115 mm, iglice 0.35 mm',
    description: 'Alat za Weiss Distribution Technique (WDT). Razbija grudvice samlevene kafe u korpi pre tamponiranja, obezbeđujući savršeno ravnomernu gustinu pak-a.',
    stock: 35,
  },
  {
    id: 10,
    slug: 'godisnji-servisni-set-e61',
    name: 'Kompletni godišnji servisni set E61',
    category: 'dihtunzi',
    meta: 'Dihtung + IMS sito + O-ringovi + Puly Caff',
    price: '4.890 RSD',
    priceNum: 4890,
    old: '5.670 RSD',
    tag: 'UŠTEDA 14%',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=85',
    shore: '73 Shore A',
    tempMax: '300°C',
    pressureMax: '16 bara',
    compatible: ['Sve E61 mašine (Rocket, ECM, Bezzera, Quick Mill, Sanremo)'],
    material: 'Silikon + nerđajući čelik + NSF hemija',
    dimensions: 'Kompletan kit u zaštitnoj kutiji',
    description: 'Sve što je potrebno za kompletan preventivni servis jedne E61 grupe: 1x silikonski dihtung 8.5mm, 1x IMS foto-tuš, 1x set unutrašnjih zaptivki ventila i 1x doza sredstva za ispiranje.',
    stock: 30,
  },
  {
    id: 11,
    slug: 'merni-manometar-za-portafilter-0-16-bar',
    name: 'Merni manometar za testiranje pritiska grupe',
    category: 'barista',
    meta: '0–16 bar · glicerinsko punjenje · 3/8" navoj',
    price: '6.450 RSD',
    priceNum: 6450,
    old: '',
    tag: 'ALAT ZA SERVIS',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
    shore: 'N/A',
    tempMax: '100°C',
    pressureMax: '16 bara',
    compatible: ['Montaža na bilo koji portafilter sa standardnim navojem za izlive'],
    material: 'Kućište od nerđajućeg čelika sa glicerinskim prigušenjem',
    dimensions: 'Prečnik brojčanika 63 mm, navoj 3/8"',
    description: 'Neophodan dijagnostički instrument za proveru rada OPV ventila i pritiska pumpe u realnim uslovima otpora. Glicerinsko punjenje smiruje vibracije skazaljke.',
    stock: 14,
  },
  {
    id: 12,
    slug: 'eureka-mignon-originalni-nozevi-50mm',
    name: 'Set noževa za Eureka Mignon 50 mm',
    category: 'nozevi',
    meta: '50 mm · kaljeni alatni čelik · original Eureka',
    price: '4.850 RSD',
    priceNum: 4850,
    old: '5.200 RSD',
    tag: 'OEM ORIGINAL',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=85',
    shore: 'N/A',
    tempMax: 'N/A',
    pressureMax: 'N/A',
    compatible: ['Eureka Mignon Manuale', 'Silenzio', 'Specialita (50mm)', 'Perfetto'],
    material: 'Kaljeni čelik visoke tvrdoće',
    dimensions: 'Ø50 mm, par noževa sa originalnim šrafovima',
    description: 'Fabrički zamenski noževi za najpopularniju kućnu i prosumer seriju Eureka mlinova. Vraćaju brzinu mlevenja i punu aromu espresa bez pregrevanja praha.',
    stock: 25,
  },
]

export const serviceKits: ServiceKit[] = [
  {
    id: 'kit-e61-annual',
    slug: 'godisnji-servisni-set-e61',
    name: 'Godišnji servisni set E61',
    subtitle: 'Kompletna obnova grupe, zaptivki i stabilnosti pritiska',
    price: '4.890 RSD',
    priceNum: 4890,
    oldPrice: '5.670 RSD',
    savings: 'Ušteda 780 RSD',
    tag: 'PREPORUKA SERVISERA',
    badge: '100% KOMPATIBILNO',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=85',
    recommendedInterval: '12 meseci ili 4.000 ekstrakcija',
    contents: [
      '1x VMQ Silikonski dihtung 8.5 mm (termo-otporan do 300°C)',
      '1x IMS precizno foto-tuš sito 200 μm',
      '1x Set unutrašnjih teflonskih zaptivki brega ventila',
      '1x Mesingana opruga povratnog ventila',
      '1x Puly Caff prašak 100g za prvo pranje',
    ],
    compatibility: [
      'Rocket (Appartamento, Giotto, Mozzafiato, R58, Cronometro)',
      'ECM (Mechanika, Technika, Synchronika)',
      'Profitec (Pro 300, Pro 500, Pro 600, Pro 700)',
      'Bezzera (Magica, Mitica, Unica)',
      'Faema (E61 Legend, E61 Jubile)',
    ],
  },
  {
    id: 'kit-lamarzocco-pro',
    slug: 'profesionalni-set-la-marzocco',
    name: 'Preventivni set za La Marzocco',
    subtitle: 'Specijalno za Linea Mini, Micra i GS3 aparate u radu',
    price: '6.400 RSD',
    priceNum: 6400,
    oldPrice: '7.350 RSD',
    savings: 'Ušteda 950 RSD',
    tag: 'ORIGINAL STANDARDI',
    badge: 'OEM KVALITET',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=85',
    recommendedInterval: '6–9 meseci u kafeterijama / 18 meseci kod kuće',
    contents: [
      '1x La Marzocco silikonski bajonet dihtung 8 mm',
      '1x Precizno difuzorsko sito sa ravnim šrafom',
      '2x O-ring zaptivke parne cevi (otporne na paru)',
      '1x NSF sertifikovana mast za podmazivanje ventila',
    ],
    compatibility: [
      'La Marzocco Linea Mini',
      'La Marzocco Linea Micra',
      'La Marzocco GS3 (AV & MP)',
      'La Marzocco Linea Classic / PB',
      'La Marzocco Strada',
    ],
  },
  {
    id: 'kit-mazzer-refresh',
    slug: 'obnova-mlina-mazzer-64mm',
    name: 'Paket za obnovu mlina Mazzer 64 mm',
    subtitle: 'Novi noževi, opruge nosača i vijci za kalibraciju',
    price: '9.990 RSD',
    priceNum: 9990,
    oldPrice: '11.800 RSD',
    savings: 'Ušteda 1.810 RSD',
    tag: 'MAKSIMALNA PRECIZNOST',
    badge: '64 HRC ČELIK',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=85',
    recommendedInterval: '500 kg samlevene kafe',
    contents: [
      '1x Par kaljenih ravnih noževa 64 mm (tvrdoća 64 HRC)',
      '3x Originalna kalibrisana vijka od nerđajućeg čelika',
      '3x Unutrašnje opruge za stabilizaciju gornjeg nosača',
      '1x Puly Grinder kristali za pročišćavanje komore mlina',
    ],
    compatibility: [
      'Mazzer Super Jolly (Electronic & Manual)',
      'Mazzer Major',
      'Mazzer Mini E (sa 64 mm konverzijom)',
      'Astoria CMA Super Jolly',
    ],
  },
]

export const guides: Guide[] = [
  {
    id: 'zamena-e61-dihtung',
    slug: 'kako-zameniti-e61-silikonski-dihtung',
    title: 'Kako pravilno zameniti dihtung na E61 grupi bez oštećenja ležišta',
    category: 'Održavanje grupe',
    duration: '15 minuta',
    difficulty: 'Početni',
    excerpt: 'Detaljan korak-po-korak vodič kako izvaditi stari stvrdnuti gumeni dihtung i postaviti elastični VMQ silikonski prsten sa konusnom stranom na gore.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=85',
    tools: [
      'Šilo za skidanje dihtunga ili kratak ravan šrafciger',
      'Čista mikrofiber krpa',
      'Mesingana četkica za grupu',
      'Malo vode ili prehrambeno mazivo',
    ],
    steps: [
      {
        step: 1,
        title: 'Isključivanje i hlađenje mašine',
        instruction: 'Isključite aparat i sačekajte da se grupa ohladi na umerenu temperaturu (oko 40°C) kako biste sprečili opekotine i olakšali skidanje.',
        tip: 'Nemojte raditi na potpuno vreloj mašini — mesing je na radnoj temperaturi previše mekan.',
      },
      {
        step: 2,
        title: 'Vađenje starog dihtunga i tuš sita',
        instruction: 'Šilom oprezno zakačite stari dihtung sa unutrašnje strane. Pritisnite prema centru i povucite na dole zajedno sa tuš sitom.',
      },
      {
        step: 3,
        title: 'Temeljno čišćenje mesinganog kanala',
        instruction: 'Mesinganom četkicom i mikrofiber krpom uklonite sve ugljenisane ostatke kafe i kamenac iz unutrašnjeg žljeba grupe.',
        tip: 'Ako ležište nije savršeno čisto, novi dihtung neće leći ravno i doći će do curenja pod 9 bara.',
      },
      {
        step: 4,
        title: 'Postavljanje novog silikonskog dihtunga',
        instruction: 'Ubacite IMS tuš sito u otvor novog silikonskog dihtunga. Okrenite stranu sa zaobljenom ivicom prema gore (ka aparatu), a ravnu sa natpisom ka portafilteru.',
      },
      {
        step: 5,
        title: 'Zaključavanje portafilterom',
        instruction: 'Ubacite prazan portafilter u grupu i lagano ga zategnite pod 90 stepeni kako bi ravnomerno pritisnuo dihtung do kraja u ležište.',
      },
    ],
    relatedProducts: [1, 2, 10],
  },
  {
    id: 'kalibracija-i-zamena-nozeva',
    slug: 'zamena-i-poravnanje-nozeva-na-espresso-mlinu',
    title: 'Zamena i poravnanje (alignment) noževa na komercijalnom mlinu',
    category: 'Mlinovi',
    duration: '35 minuta',
    difficulty: 'Srednji',
    excerpt: 'Naučite kako da uklonite stare noževe, očistite komoru sa navojem i proverite paralelnost rotirajućeg i fiksnog noža pomoću marker testa.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=85',
    tools: [
      'Pljosnati šrafciger odgovarajuće širine glave',
      'Usisivač za kafu / četkica sa tvrdim vlaknima',
      'Suvi marker (za proveru dodirnih tačaka)',
      'Aluminijumska folija (za mikro-podloške)',
    ],
    steps: [
      {
        step: 1,
        title: 'Isključenje iz struje i pražnjenje komore',
        instruction: 'Obavezno izvucite kabl mlina iz zida. Skinite rezervoar za zrno i temeljno usisajte sve preostale delove kafe.',
      },
      {
        step: 2,
        title: 'Demontaža gornjeg nosača i starih noževa',
        instruction: 'Odvijte gornji nosač noževa brojeći okrete navoja. Odvijte vijke na oba noža pazeći da ne oštetite glave šrafova.',
        tip: 'Ako su vijci zapekli, kapnite kap alkohola ili blago kucnite drškom šrafcigera po glavi vijka.',
      },
      {
        step: 3,
        title: 'Montaža novih noževa unakrsnim zatezanjem',
        instruction: 'Postavite nove noževe i pritegnite vijke unakrsno u fazama kako ne bi došlo do uvijanja noža pri stezanju.',
      },
      {
        step: 4,
        title: 'Marker test paralelnosti',
        instruction: 'Iscrtajte ivicu gornjeg noža suvim markerom, vratite nosač dok se noževi blago ne dodirnu rukom i zavrtite. Mesta gde je marker skinut pokazuju tačnost paralelnosti.',
      },
    ],
    relatedProducts: [4, 5, 12],
  },
  {
    id: 'pravilna-dekalcifikacija-bojlera',
    slug: 'protokol-za-dekalcifikaciju-i-zastitu-grejaca',
    title: 'Stručni protokol za dekalcifikaciju bojlera bez rizika od začepljenja',
    category: 'Hidraulika',
    duration: '45 minuta',
    difficulty: 'Srednji',
    excerpt: 'Zašto agresivne kiseline oštećuju mesing i kako kontrolisanim sredstvom rastvoriti kamenac sa sonde i grejača bez začepljenja gicleur dizne.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
    tools: [
      'Specijalizovano sredstvo za dekalcifikaciju na bazi limunske/sulfaminske kiseline',
      'Merna posuda i levak',
      'Posuda za prihvat prljave vode (min 3L)',
    ],
    steps: [
      {
        step: 1,
        title: 'Rastvaranje hemije u mlakoj vodi',
        instruction: 'Nikada ne sipajte koncentrovani prah direktno u rezervoar. Rastvorite preporučenu dozu u mlakoj demineralizovanoj vodi.',
      },
      {
        step: 2,
        title: 'Cirkulacija kroz izmenjivač i bojler',
        instruction: 'Provucite 300ml rastvora kroz grupu i 300ml kroz cev za vrelu vodu, zatim ugasite aparat na 20 minuta da rastvor deluje.',
      },
      {
        step: 3,
        title: 'Temeljno ispiranje čistom vodom',
        instruction: 'Napunite rezervoar čistom vodom i propustite minimum 2 puna rezervoara kroz sve izlaze dok pH vrednost vode ne bude neutralna.',
      },
    ],
    relatedProducts: [8, 10, 11],
  },
]

export const faqData: FAQItem[] = [
  {
    category: 'Proizvodi & Kompatibilnost',
    q: 'Koja je razlika između silikonskog i gumenog dihtunga za E61 grupu?',
    a: 'Silikonski dihtunzi (VMQ) imaju Shore A tvrdoću 70–75 i operativnu otpornost do 300°C, dok standardni gumeni (NBR/EPDM) ubrzano gube elastičnost i pucaju već na 150°C. Silikon zadržava elastičnost 3–5× duže, ne upija masnoće kafe i ne prenosi neprijatan miris na napitak. Za profesionalnu i intenzivnu upotrebu, silikon je jedini preporučeni inženjerski izbor.',
  },
  {
    category: 'Proizvodi & Kompatibilnost',
    q: 'Koliko dugo traju kaljeni čelični noževi u poređenju sa TiN titanijumskim?',
    a: 'Standardni kaljeni čelični noževi (tvrdoće 64 HRC) za prečnik 64 mm imaju radni vek od oko 400–600 kg mlevene kafe. Noževi presvučeni titanijum-nitridom (TiN zlatan finiš) ili DLC karbonom traju i do 1.200–1.500 kg, zadržavajući fabričku oštrinu i minimalno zagrevajući zrno.',
  },
  {
    category: 'Proizvodi & Kompatibilnost',
    q: 'Kako da utvrdim da li mi treba dihtung od 8 mm ili 8.5 mm za E61 grupu?',
    a: 'Debljina od 8.5 mm je standard za većinu novijih E61 aparata (Rocket, ECM, Bezzera). Ukoliko se vaš portafilter zaključava previše udesno (preko ugla od 90 stepeni prema 5 sati), to je znak da se ležište blago pohabalo i da vam je potreban dihtung od 8.5 mm ili 9 mm sa distancerom. Ako se nov portafilter zaključava previše ulevo (oko 7 sati), odgovaraće vam 8 mm.',
  },
  {
    category: 'Isporuka & Garancija',
    q: 'Koji su uslovi za besplatnu isporuku i koliko se čeka na paket?',
    a: 'Za sve porudžbine u iznosu preko 8.000 RSD isporuka na teritoriji Srbije je potpuno BESPLATNA. Za manje iznose, fiksna cena brze pošte iznosi 390 RSD. Sve porudžbine primljene radnim danima do 14:00h šalju se istog dana sa našeg fizičkog lagera u Beogradu i stižu na vašu adresu u roku od 24–48h.',
  },
  {
    category: 'Isporuka & Garancija',
    q: 'Šta ako poručim deo koji ne odgovara mom modelu aparata?',
    a: 'Svi artikli imaju 14 dana garancije bezuslovnog povrata novca ili brze zamene. Ukoliko niste sigurni oko dimenzija, kontaktirajte našu servisnu podršku na 064 8222 651 ili pošaljite fotografiju aparata i stare komponente na office@ferrocrema.com — naš inženjerski tim će vam odmah potvrditi tačan OEM kod.',
  },
  {
    category: 'Servis & Održavanje',
    q: 'Koliko često treba raditi hemijsko čišćenje (backflush) grupe?',
    a: 'Za ugostiteljske objekte sa prometom preko 50 kafa dnevno, backflush čistom vodom i slepim sitom treba raditi na kraju svake smene, a hemijsko pranje (Puly Caff praškom) svaka 2 do 3 dana. Za kućne korisnike preporuka je hemijski backflush jednom u 2 do 3 nedelje.',
  },
]

export const machineCompatibilityDatabase = [
  {
    brand: 'Rocket Milano',
    models: ['Appartamento', 'Giotto Cronometro', 'Mozzafiato', 'R58 Dual Boiler', 'Porta Via'],
    groupType: 'E61 Standard (58 mm)',
    parts: [1, 2, 3, 6, 10, 11],
  },
  {
    brand: 'ECM Heidelberg',
    models: ['Mechanika V Slim', 'Technika V Profi', 'Synchronika Dual Boiler', 'Puristika', 'Classika'],
    groupType: 'E61 Standard (58 mm)',
    parts: [1, 2, 3, 6, 10, 11],
  },
  {
    brand: 'La Marzocco',
    models: ['Linea Mini', 'Linea Micra', 'GS3 AV/MP', 'Linea Classic', 'Strada EP/MP'],
    groupType: 'La Marzocco Bajonet (58 mm)',
    parts: [3, 7, 8, 9],
  },
  {
    brand: 'Mazzer',
    models: ['Super Jolly', 'Major', 'Mini Electronic', 'Kony', 'Robur S'],
    groupType: 'Mlinovi sa ravnim i konusnim noževima',
    parts: [4, 8],
  },
  {
    brand: 'Profitec',
    models: ['Pro 300', 'Pro 500 PID', 'Pro 600', 'Pro 700 Dual Boiler', 'Drive'],
    groupType: 'E61 Standard (58 mm)',
    parts: [1, 2, 3, 6, 10, 11],
  },
  {
    brand: 'Bezzera',
    models: ['BZ10', 'Magica', 'Mitica', 'Matrix', 'Duo MN'],
    groupType: 'E61 Standard & BZ Grupa (58 mm)',
    parts: [1, 2, 3, 6, 10],
  },
  {
    brand: 'Eureka',
    models: ['Mignon Manuale', 'Mignon Silenzio', 'Mignon Specialita', 'Atom 65', 'Helios 80'],
    groupType: 'Mlinovi sa ravnim noževima',
    parts: [12, 8],
  },
  {
    brand: 'Faema',
    models: ['E61 Legend', 'E61 Jubile', 'President GTI', 'Teorema', 'Enova'],
    groupType: 'E61 Original (58 mm)',
    parts: [1, 2, 3, 6, 10, 11],
  },
]
