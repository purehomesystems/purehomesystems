import { Resend } from 'resend'

const SITE      = 'https://purehomesystemsco.com'
const TO_EMAIL  = 'alex@getpurehomesystems.com'
const FONT      = "system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/** Two-column label / plain-text value row */
function dataRow(label, value) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:5px 20px 5px 0;width:108px;vertical-align:top;
                 font-size:12px;color:#9a9a9a;white-space:nowrap;font-family:${FONT};">${esc(label)}</td>
      <td style="padding:5px 0;font-size:13px;color:#1a1a1a;font-family:${FONT};">${esc(value)}</td>
    </tr>`
}

/** Two-column label / raw-HTML value row */
function dataRowHtml(label, rawHtml) {
  if (!rawHtml) return ''
  return `
    <tr>
      <td style="padding:5px 20px 5px 0;width:108px;vertical-align:top;
                 font-size:12px;color:#9a9a9a;white-space:nowrap;font-family:${FONT};">${esc(label)}</td>
      <td style="padding:5px 0;font-size:13px;color:#1a1a1a;font-family:${FONT};">${rawHtml}</td>
    </tr>`
}

/** All-caps section label */
function sectionHeading(text) {
  return `<p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:0.11em;
                     text-transform:uppercase;color:#b0b0b0;font-family:${FONT};">${esc(text)}</p>`
}

/** Small tinted pill badge */
function pill(text) {
  if (!text) return ''
  return `<span style="display:inline-block;padding:3px 10px;background:#ededeb;
                        border:1px solid #dddcda;border-radius:4px;font-size:11px;
                        color:#555;margin-right:5px;margin-bottom:4px;
                        font-family:${FONT};">${esc(text)}</span>`
}

/**
 * Clean product row — no nested card box, just a table row with image + details.
 * Product page URL is always built from the slug using the correct domain.
 */
function productRow(p, isLast) {
  const name     = esc(p.name || p.slug || '')
  const category = esc(p.category || '')
  const price    = p.price ? `$${Number(p.price).toLocaleString()}` : ''
  const meta     = [category, price].filter(Boolean).join(' &middot; ')

  // Always use the correct domain; fall back to the slug if productUrl was wrong
  const slug     = p.slug || ''
  const linkHref = slug
    ? `${SITE}/products/${esc(slug)}`
    : (p.productUrl ? esc(p.productUrl) : '')

  const imgHtml = p.image
    ? `<img src="${esc(p.image)}" width="56" height="56" alt="${name}"
            style="display:block;width:56px;height:56px;border-radius:6px;
                   background:#f0f0ee;border:1px solid #e4e4e2;" />`
    : `<div style="width:56px;height:56px;background:#f0f0ee;
                    border-radius:6px;border:1px solid #e4e4e2;"></div>`

  const separator = isLast ? '' : 'border-bottom:1px solid #ebebea;'

  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td width="72" style="padding:14px 16px 14px 0;vertical-align:middle;${separator}">
          ${imgHtml}
        </td>
        <td style="padding:14px 0;vertical-align:middle;${separator}">
          <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#1a1a1a;
                    letter-spacing:-0.2px;font-family:${FONT};">${name}</p>
          ${meta
            ? `<p style="margin:0 0 7px;font-size:12px;color:#9a9a9a;font-family:${FONT};">${meta}</p>`
            : ''}
          ${linkHref
            ? `<a href="${linkHref}" style="font-size:11px;font-weight:600;color:#1a1a1a;
                  text-decoration:underline;font-family:${FONT};">View product &rarr;</a>`
            : ''}
        </td>
      </tr>
    </table>`
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const {
      name             = '',
      email            = '',
      phone            = '',
      message          = '',
      homeType         = '',
      interest         = '',
      selectedProducts = [],
      sourcePage       = '',
      submittedAt      = '',
    } = body

    if (!name.trim() || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Name and email are required.' })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable.')
      return res.status(500).json({ success: false, error: 'Email service is not configured.' })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // ── Derived values ──────────────────────────────────────────────────────
    const firstName     = name.trim().split(' ')[0]
    const productCount  = Array.isArray(selectedProducts) ? selectedProducts.length : 0
    const submittedDate = submittedAt
      ? new Date(submittedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
      : ''

    // ── Lead summary pills ──────────────────────────────────────────────────
    const pillsHtml = [
      homeType    ? pill(homeType)    : '',
      interest    ? pill(interest)    : '',
      productCount > 0 ? pill(`${productCount} product${productCount > 1 ? 's' : ''} selected`) : '',
    ].filter(Boolean).join('')

    // ── Quick-action buttons ────────────────────────────────────────────────
    const replyBtn = `<a href="mailto:${esc(email)}?subject=Re%3A%20Your%20PureHome%20Recommendation%20Request"
      style="display:inline-block;padding:8px 18px;background:#1a1a1a;color:#ffffff;
             border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;
             font-family:${FONT};">Reply to ${esc(firstName)}</a>`

    const callBtn = phone
      ? `&nbsp;<a href="tel:${esc(phone)}"
             style="display:inline-block;padding:8px 18px;background:#ffffff;color:#1a1a1a;
                    border-radius:6px;border:1px solid #d4d4d2;font-size:12px;font-weight:600;
                    text-decoration:none;font-family:${FONT};">Call ${esc(phone)}</a>`
      : ''

    // ── Products section (conditional) ─────────────────────────────────────
    const productsSection = productCount > 0
      ? `
        <tr>
          <td style="padding:0 36px 28px;border-top:1px solid #ebebea;">
            <div style="padding-top:24px;">
              ${sectionHeading(`Selected Products (${productCount})`)}
              ${selectedProducts.map((p, i) => productRow(p, i === selectedProducts.length - 1)).join('')}
            </div>
          </td>
        </tr>`
      : ''

    // ── Footer meta ─────────────────────────────────────────────────────────
    const metaParts = [
      submittedDate ? `Submitted ${submittedDate}` : '',
      sourcePage    ? esc(sourcePage) : '',
      'PureHome Systems · 1590 Los Padres Blvd, Santa Clara, CA 95050',
    ].filter(Boolean).join('&nbsp; &middot; &nbsp;')

    // ── Email HTML ──────────────────────────────────────────────────────────
    //
    // Layout intent: clean full-width professional email, not a floating card.
    // - No outer padding / colored body background creating a "frame"
    // - No border or border-radius on the main container
    // - 640px max-width gives more horizontal breathing room
    // - Sections separated by padding + light border-top, not nested boxes
    //
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Recommendation Request</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:0;">

        <table cellpadding="0" cellspacing="0" border="0"
               style="width:100%;max-width:640px;background:#ffffff;">

          <!-- ── HEADER ──────────────────────────────────────────────────── -->
          <tr>
            <td style="background:#1a1a1a;padding:22px 36px 20px;">
              <p style="margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:0.13em;
                         text-transform:uppercase;color:rgba(255,255,255,0.35);font-family:${FONT};">
                PureHome Systems
              </p>
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;
                         letter-spacing:-0.4px;font-family:${FONT};">
                New Recommendation Request
              </p>
            </td>
          </tr>

          <!-- ── LEAD SUMMARY ────────────────────────────────────────────── -->
          <tr>
            <td style="background:#f5f5f3;border-bottom:1px solid #e6e6e4;padding:24px 36px;">
              <p style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:0.11em;
                         text-transform:uppercase;color:#b0b0b0;font-family:${FONT};">Lead</p>
              <p style="margin:0 0 3px;font-size:22px;font-weight:700;color:#1a1a1a;
                         letter-spacing:-0.5px;font-family:${FONT};">${esc(name)}</p>
              <p style="margin:0 0 16px;font-size:13px;line-height:1.5;font-family:${FONT};">
                <a href="mailto:${esc(email)}" style="color:#1a1a1a;text-decoration:none;font-weight:500;">${esc(email)}</a>${phone
                  ? `&nbsp;&nbsp;<span style="color:#c0c0c0;">&middot;</span>&nbsp;&nbsp;<a href="tel:${esc(phone)}" style="color:#666;text-decoration:none;">${esc(phone)}</a>`
                  : ''}
              </p>
              ${pillsHtml ? `<p style="margin:0 0 18px;line-height:2.2;">${pillsHtml}</p>` : ''}
              <p style="margin:0;">${replyBtn}${callBtn}</p>
            </td>
          </tr>

          <!-- ── CONTACT DETAILS ─────────────────────────────────────────── -->
          <tr>
            <td style="padding:26px 36px 22px;">
              ${sectionHeading('Contact Details')}
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${dataRow('Name', name)}
                ${dataRowHtml('Email',
                  `<a href="mailto:${esc(email)}" style="color:#1a1a1a;text-decoration:underline;">${esc(email)}</a>`
                )}
                ${phone
                  ? dataRowHtml('Phone',
                      `<a href="tel:${esc(phone)}" style="color:#1a1a1a;text-decoration:none;">${esc(phone)}</a>`)
                  : ''}
              </table>
            </td>
          </tr>

          <!-- ── HOME & INTEREST ─────────────────────────────────────────── -->
          <tr>
            <td style="padding:22px 36px;border-top:1px solid #ebebea;">
              ${sectionHeading('Home & Interest')}
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${dataRow('Home type', homeType)}
                ${dataRow('Interest', interest)}
                ${message ? dataRow('Message', message) : ''}
              </table>
            </td>
          </tr>

          <!-- ── SELECTED PRODUCTS (conditional) ────────────────────────── -->
          ${productsSection}

          <!-- ── FOOTER ──────────────────────────────────────────────────── -->
          <tr>
            <td style="background:#f5f5f3;border-top:1px solid #e6e6e4;padding:14px 36px;">
              <p style="margin:0;font-size:11px;color:#b0b0b0;line-height:1.7;font-family:${FONT};">
                ${metaParts}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`

    await resend.emails.send({
      from: 'PureHome <noreply@purehomesystemsco.com>',
      to: [TO_EMAIL],
      replyTo: email.trim(),
      subject: `New lead: ${name}${interest ? ` — ${interest}` : ''}`,
      html,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Failed to send recommendation email:', error)
    return res.status(500).json({ success: false, error: 'Failed to send email.' })
  }
}
