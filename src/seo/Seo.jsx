import { useEffect } from 'react'
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  createLocalBusinessSchema,
  createOrganizationSchema,
  toAbsoluteUrl,
} from './site'

function upsertMeta({ attr, key, value }) {
  if (!key || value == null) return
  const selector = `meta[${attr}="${key}"]`
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

function upsertLink({ rel, href }) {
  if (!rel || !href) return
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function removeManagedSchemas() {
  document.head.querySelectorAll('script[data-seo-schema="true"]').forEach((node) => node.remove())
}

export default function Seo({
  title,
  description,
  path = '/',
  canonical,
  keywords,
  type = 'website',
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  image = DEFAULT_OG_IMAGE,
  schema = [],
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    const canonicalUrl = canonical || toAbsoluteUrl(path)
    const imageUrl = toAbsoluteUrl(image)

    document.title = fullTitle

    upsertMeta({ attr: 'name', key: 'description', value: description })
    upsertMeta({ attr: 'name', key: 'robots', value: robots })
    upsertMeta({ attr: 'name', key: 'keywords', value: keywords })

    upsertMeta({ attr: 'property', key: 'og:title', value: fullTitle })
    upsertMeta({ attr: 'property', key: 'og:description', value: description })
    upsertMeta({ attr: 'property', key: 'og:type', value: type })
    upsertMeta({ attr: 'property', key: 'og:url', value: canonicalUrl })
    upsertMeta({ attr: 'property', key: 'og:image', value: imageUrl })
    upsertMeta({ attr: 'property', key: 'og:site_name', value: SITE_NAME })

    upsertMeta({ attr: 'name', key: 'twitter:card', value: 'summary_large_image' })
    upsertMeta({ attr: 'name', key: 'twitter:title', value: fullTitle })
    upsertMeta({ attr: 'name', key: 'twitter:description', value: description })
    upsertMeta({ attr: 'name', key: 'twitter:image', value: imageUrl })

    upsertLink({ rel: 'canonical', href: canonicalUrl })

    removeManagedSchemas()
    const schemaItems = [createOrganizationSchema(), createLocalBusinessSchema(), ...schema]

    schemaItems.forEach((item) => {
      if (!item) return
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-schema', 'true')
      script.text = JSON.stringify(item)
      document.head.appendChild(script)
    })

    return () => {
      removeManagedSchemas()
    }
  }, [canonical, description, image, keywords, path, robots, schema, title, type])

  return null
}
