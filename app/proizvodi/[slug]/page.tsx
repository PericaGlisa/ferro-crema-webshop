import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/ProductDetail'
import { products } from '@/lib/data'

type ProductPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  if (!product) return { title: 'Artikal nije pronađen' }
  return {
    title: `${product.name} | Ferro Crema`,
    description: product.description,
    openGraph: { images: [{ url: product.image, alt: product.name }] },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()

  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}
