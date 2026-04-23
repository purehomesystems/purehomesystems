export const SITE_NAME = 'PureHome Systems'
export const SITE_URL = 'https://www.purehomesystemsco.com'
export const DEFAULT_OG_IMAGE = '/logo.png'

export const BUSINESS = {
  name: 'PureHome Systems',
  legalName: 'PureHome Systems',
  email: 'alex@purehomesystemsco.com',
  phone: '+1-408-910-2223',
  streetAddress: '1590 Los Padres Blvd',
  city: 'Santa Clara',
  region: 'CA',
  postalCode: '95050',
  country: 'US',
  instagram: 'https://www.instagram.com/getpurehomesystems/',
}

export function toAbsoluteUrl(path = '/') {
  if (!path) return SITE_URL
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS.name,
    url: SITE_URL,
    logo: toAbsoluteUrl('/purehome-logo.png'),
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    sameAs: [BUSINESS.instagram],
  }
}

export function createLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    url: SITE_URL,
    image: toAbsoluteUrl('/purehome-logo.png'),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    areaServed: [
      'Santa Clara, CA',
      'San Jose, CA',
      'Bay Area, CA',
      'Los Angeles, CA',
      'California, US',
    ],
    sameAs: [BUSINESS.instagram],
    knowsAbout: [
      'Water purification systems',
      'Air purification systems',
      'Bidet systems',
      'Massage chair systems',
      'Home wellness systems',
      'Flexible appliance plans',
      'Installation and maintenance support',
      'CUCKOO products',
    ],
  }
}

export function createServiceSchema({
  name,
  description,
  serviceType,
  path = '/',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: SITE_URL,
    },
    areaServed: ['California, US'],
    url: toAbsoluteUrl(path),
  }
}

export function createProductSchema(product) {
  const offer = {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: String(product.price),
    availability: 'https://schema.org/InStock',
    url: toAbsoluteUrl(`/products/${product.slug}`),
  }

  if (product.comparePrice && product.comparePrice > product.price) {
    offer.priceSpecification = {
      '@type': 'UnitPriceSpecification',
      price: String(product.price),
      priceCurrency: 'USD',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitText: 'month',
      },
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description:
      product.description ||
      `${product.name} by CUCKOO through PureHome Systems with flexible plan options and professional support.`,
    image: (product.images || []).slice(0, 5),
    sku: product.variants?.[0]?.sku || product.model || undefined,
    mpn: product.model || undefined,
    brand: {
      '@type': 'Brand',
      name: 'CUCKOO',
    },
    category: product.category,
    offers: offer,
  }
}

export function createFAQSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function createBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  }
}

export function createArticleSchema({
  headline,
  description,
  path,
  publishedAt,
  updatedAt,
  author = BUSINESS.name,
  image = '/logo.png',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    mainEntityOfPage: toAbsoluteUrl(path),
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    image: [toAbsoluteUrl(image)],
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/purehome-logo.png'),
      },
    },
  }
}
