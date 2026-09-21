'use client'

import { Eye, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/lib/data'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
  product: Product
  showSpecs?: boolean
}

/** A consistent product entry point for the storefront and catalog. */
export function ProductCard({ product, showSpecs = false }: ProductCardProps) {
  const { addToCart, setQuickViewProduct } = useCart()

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-tag">{product.tag}</span>
        <button
          className="quick-view-btn"
          onClick={() => setQuickViewProduct(product)}
          aria-label={`Brzi pregled specifikacije: ${product.name}`}
        >
          <Eye size={14} /> Brzi pregled
        </button>
      </div>
      <div className="product-info">
        <span className="product-cat">{product.meta}</span>
        <h3>
          <Link href={`/proizvodi/${product.slug}`}>{product.name}</Link>
        </h3>
        {showSpecs && (
          <div className="product-specs-summary" aria-label="Kratka specifikacija">
            {product.dimensions !== 'N/A' && <span>{product.dimensions}</span>}
            {product.shore !== 'N/A' && <span>{product.shore}</span>}
          </div>
        )}
        <div className="product-bottom">
          <div>
            <strong>{product.price}</strong>
            {product.old && <del>{product.old}</del>}
          </div>
          <button className="add-button" aria-label={`Dodaj ${product.name} u korpu`} onClick={() => addToCart(product)}>
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}
