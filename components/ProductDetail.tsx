'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { Product } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { ProductCard } from './ProductCard'

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const categoryName = product.category === 'dihtunzi' ? 'Dihtunzi & O-ringovi' : product.category === 'sita' ? 'Tuš sita & difuzori' : product.category === 'nozevi' ? 'Noževi za mlinove' : product.category === 'portafiltri' ? 'Portafiltri & ručke' : product.category === 'hemija' ? 'Servis & hemija' : 'Barista precizni alat'
  const isInStock = product.stock > 0

  return (
    <main className="product-page">
      <div className="product-breadcrumb">
        <Link href="/katalog"><ArrowLeft size={14} /> Nazad u katalog</Link>
        <span>/</span>
        <span>{categoryName}</span>
      </div>

      <section className="product-detail-hero">
        <div className="product-gallery">
          <div className="product-gallery-frame">
            <img src={product.image} alt={product.name} />
            <span className="product-detail-tag">{product.tag}</span>
          </div>
          <p>Fotografija je informativnog karaktera. Pre montaže proverite dimenzije i kompatibilnost.</p>
        </div>

        <div className="product-detail-info">
          <p className="eyebrow">{categoryName.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-meta">{product.meta}</p>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-price-row">
            <strong>{product.price}</strong>
            {product.old && <del>{product.old}</del>}
            <span>PDV je uračunat u cenu.</span>
          </div>

          <div className={`product-stock ${isInStock ? 'in-stock' : ''}`}>
            <span />
            {isInStock ? `Na lageru — ${product.stock} kom. dostupno za slanje` : 'Trenutno nije na lageru'}
          </div>

          <div className="product-buy-row">
            <div className="product-quantity" aria-label="Količina">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Smanji količinu"><Minus size={15} /></button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Povećaj količinu"><Plus size={15} /></button>
            </div>
            <button className="button primary product-add-button" disabled={!isInStock} onClick={() => addToCart(product, quantity)}>
              <ShoppingBag size={16} /> Dodajte u korpu
            </button>
          </div>

          <Link href="/kompatibilnost" className="product-compat-link">Niste sigurni da odgovara? Proverite kompatibilnost →</Link>
        </div>
      </section>

      <section className="product-specs-section" aria-labelledby="product-specs-heading">
        <div>
          <p className="eyebrow">TEHNIČKI PODACI</p>
          <h2 id="product-specs-heading">Specifikacija bez <i>nagađanja.</i></h2>
        </div>
        <dl className="product-spec-grid">
          <div><dt>Materijal</dt><dd>{product.material}</dd></div>
          <div><dt>Dimenzije</dt><dd>{product.dimensions}</dd></div>
          {product.shore !== 'N/A' && <div><dt>Tvrdoća</dt><dd>{product.shore}</dd></div>}
          {product.tempMax !== 'N/A' && <div><dt>Radna temperatura</dt><dd>Do {product.tempMax}</dd></div>}
          {product.pressureMax !== 'N/A' && <div><dt>Radni pritisak</dt><dd>Do {product.pressureMax}</dd></div>}
          <div><dt>Šifra artikla</dt><dd>FC-{String(product.id).padStart(4, '0')}</dd></div>
        </dl>
      </section>

      <section className="product-compatibility-section" aria-labelledby="product-compatibility-heading">
        <div className="product-compatibility-copy">
          <p className="eyebrow">PROVERENA KOMPATIBILNOST</p>
          <h2 id="product-compatibility-heading">Odgovara ovim modelima.</h2>
          <p>Lista je namenjena za brzu orijentaciju. Kod uređaja sa različitim godištima ili revizijama, proverite postojeći deo pre poručivanja.</p>
          <Link href="/kompatibilnost" className="text-link">Otvorite vodič kompatibilnosti</Link>
        </div>
        <ul className="product-compatible-list">
          {product.compatible.map((model) => <li key={model}><Check size={15} /> {model}</li>)}
        </ul>
      </section>

      <section className="product-assurances" aria-label="Uslovi kupovine">
        <div><Truck size={21} /><span><strong>Isporuka 24–48h</strong><small>Za artikle dostupne na lageru</small></span></div>
        <div><PackageCheck size={21} /><span><strong>Direktno sa lagera</strong><small>Stanje se vidi pre poručivanja</small></span></div>
        <div><ShieldCheck size={21} /><span><strong>14 dana za zamenu</strong><small>Uz ispunjene uslove kupovine</small></span></div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="product-related-section" aria-labelledby="related-products-heading">
          <div className="section-heading">
            <div><p className="eyebrow">DOPUNITE SERVIS</p><h2 id="related-products-heading">Povezani <i>artikli.</i></h2></div>
            <Link href="/katalog" className="text-link">Pogledajte ceo katalog</Link>
          </div>
          <div className="product-grid">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} showSpecs />)}</div>
        </section>
      )}
    </main>
  )
}
