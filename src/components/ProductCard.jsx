import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'

const categoryLabels = {
  water: 'Water Purifier',
  air: 'Air Purifier',
  bidet: 'Bidet',
  massage: 'Massage Chair',
}

export default function ProductCard({ product }) {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price
  const savings = hasDiscount ? product.comparePrice - product.price : 0

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group card flex flex-col gap-0 overflow-hidden p-0 hover:border-charcoal/20"
    >
      {/* Image */}
      <div className="relative aspect-square bg-white overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-background">
            <span className="text-charcoal-muted text-xs">No image</span>
          </div>
        )}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-charcoal text-white text-xs font-medium px-2 py-1 rounded-full">
            Save {formatPrice(savings)}
          </div>
        )}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-accent-blue text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {product.badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-5 border-t border-border">
        <div>
          <p className="section-label mb-1">{categoryLabels[product.category] || product.category}</p>
          <h3 className="text-sm font-semibold text-charcoal leading-snug line-clamp-2">
            {product.name}
          </h3>
          {product.model && (
            <p className="text-xs text-charcoal-muted mt-0.5">{product.model}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-charcoal">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-xs text-charcoal-muted line-through">{formatPrice(product.comparePrice)}</span>
            )}
          </div>
          <span className="text-xs text-charcoal-muted group-hover:text-charcoal transition-colors flex items-center gap-1">
            Learn more
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
