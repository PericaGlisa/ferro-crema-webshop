import { Analytics } from '@vercel/analytics/next'
import { IBM_Plex_Sans } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-plex',
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ferrocrema.com'),
  title: {
    default: 'Ferro Crema — Precizni delovi za savršen espresso',
    template: '%s | Ferro Crema — delovi za espresso aparate',
  },
  description:
    'Originalni i kompatibilni delovi za espresso aparate i mlinove. Precizne geometrije, E61 dihtunzi, barista alat, noževi za mlinove i setovi za održavanje — brza isporuka iz Srbije.',
  applicationName: 'Ferro Crema',
  generator: 'Next.js',
  keywords: [
    'espresso delovi',
    'barista alat',
    'E61 delovi',
    'delovi za espresso aparat',
    'dihtung grupe',
    'noževi za mlinove',
    'Ferro Crema',
    'tamper',
    'portafilter',
    'održavanje aparata',
  ],
  authors: [{ name: 'Ferro Crema', url: 'https://ferrocrema.com' }],
  creator: 'Ferro Crema',
  publisher: 'Ferro Crema',
  category: 'E-commerce / Coffee equipment',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://ferrocrema.com',
    siteName: 'Ferro Crema',
    locale: 'sr_RS',
    title: 'Ferro Crema — Precizni delovi za savršen espresso',
    description:
      'Originalni i kompatibilni delovi za espresso aparate i mlinove. E61 dihtunzi, tuš sita, barista alat, noževi za mlinove i setovi za održavanje — brza isporuka iz Srbije.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ferrocrema',
    creator: '@ferrocrema',
    title: 'Ferro Crema — Precizni delovi za savršen espresso',
    description:
      'Originalni i kompatibilni delovi za espresso aparate i mlinove. E61 dihtunzi, tuš sita, barista alat, noževi za mlinove i setovi za održavanje iz Beograda.',
  },
  verification: {},
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/apple-icon', sizes: '180x180' }],
    shortcut: ['/favicon.png'],
  },
  appleWebApp: {
    capable: false,
    title: 'Ferro Crema',
    statusBarStyle: 'default',
  },
}

const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Ferro Crema',
      alternateName: 'FerroCrema',
      url: 'https://ferrocrema.com',
      logo: 'https://ferrocrema.com/logo.png',
      image: 'https://ferrocrema.com/opengraph-image',
      description:
        'Precizni delovi za espresso aparate, profesionalni barista alat i noževi za mlinove. Od 2018. iz Beograda.',
      foundingDate: '2018',
      location: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Beograd',
          addressCountry: 'RS',
        },
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+381-64-8222-651',
        email: 'office@ferrocrema.com',
        contactType: 'customer service',
        availableLanguage: ['Serbian', 'English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '07:30',
          closes: '15:30',
        },
      },
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ferro Crema — Precizni delovi za savršen espresso',
      url: 'https://ferrocrema.com',
      inLanguage: 'sr-Latn-RS',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://ferrocrema.com/#shop?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
]

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f5f0',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

import { Providers } from '@/components/Providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sr-Latn" className={`${plexSans.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
