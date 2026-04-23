import { writeFileSync } from 'node:fs'
import { products } from '../src/data/products.js'
import { guides } from '../src/data/guides.js'

const base = 'https://www.purehomesystemsco.com'
const today = new Date().toISOString().slice(0, 10)

const staticRoutes = [
  '/',
  '/products',
  '/rental-plans',
  '/how-it-works',
  '/about',
  '/faq',
  '/get-recommendation',
  '/installation-availability',
  '/guides',
  '/promotions',
]

const productRoutes = products.map((product) => `/products/${product.slug}`)
const guideRoutes = guides.map((guide) => `/guides/${guide.slug}`)

const allRoutes = [...staticRoutes, ...productRoutes, ...guideRoutes]

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allRoutes.map((path) => {
    const changefreq = path === '/' ? 'weekly' : path.startsWith('/guides/') ? 'monthly' : 'monthly'
    const priority = path === '/' ? '1.0' : path.startsWith('/products/') || path.startsWith('/guides/') ? '0.8' : '0.7'
    return `  <url><loc>${base}${path}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  }),
  '</urlset>',
].join('\n')

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
