import { Resend } from 'resend'

const TO_EMAIL = 'alex@getpurehomesystems.com'

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function renderListItem(label, value) {
  if (!value) return ''
  return `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const {
      name = '',
      email = '',
      phone = '',
      message = '',
      homeType = '',
      interest = '',
      selectedProductSlugs = [],
      selectedProducts = [],
      sourcePage = '',
      submittedAt = '',
    } = body

    if (!name.trim() || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Name and email are required.' })
    }

    // Configure RESEND_API_KEY in Vercel project environment variables, then redeploy.
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable.')
      return res.status(500).json({ success: false, error: 'Email service is not configured.' })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const selectedProductSummary = Array.isArray(selectedProducts)
      ? selectedProducts
          .map((p) => {
            const productName = p?.name || p?.slug
            const productCategory = p?.category ? ` (${p.category})` : ''
            return productName ? `${productName}${productCategory}` : null
          })
          .filter(Boolean)
          .join(', ')
      : ''

    const slugSummary = Array.isArray(selectedProductSlugs) ? selectedProductSlugs.join(', ') : ''

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New Recommendation Request</h2>
        <p style="margin: 0 0 12px;">A new recommendation form was submitted on PureHome Systems.</p>
        <ul style="margin: 0; padding-left: 18px;">
          ${renderListItem('Name', name)}
          ${renderListItem('Email', email)}
          ${renderListItem('Phone', phone)}
          ${renderListItem('Home Type', homeType)}
          ${renderListItem('Primary Interest', interest)}
          ${renderListItem('Selected Products', selectedProductSummary)}
          ${renderListItem('Selected Product Slugs', slugSummary)}
          ${renderListItem('Message', message)}
          ${renderListItem('Submitted From', sourcePage)}
          ${renderListItem('Submitted At', submittedAt)}
        </ul>
      </div>
    `

    await resend.emails.send({
      // If your domain sender is not fully verified yet, use onboarding@resend.dev temporarily for testing.
      from: 'PureHome <noreply@purehomesystemsco.com>',
      to: [TO_EMAIL],
      replyTo: email.trim(),
      subject: 'New Recommendation Request',
      html,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Failed to send recommendation email:', error)
    return res.status(500).json({ success: false, error: 'Failed to send email.' })
  }
}
