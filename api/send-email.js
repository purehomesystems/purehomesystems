import { Resend } from 'resend'

const TO_EMAIL = 'alex@getpurehomesystems.com'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/** Two-column label/value row — plain text value (auto-escaped) */
function dataRow(label, value) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:5px 20px 5px 0;width:110px;vertical-align:top;font-size:12px;color:#9a9a9a;white-space:nowrap;font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">${esc(label)}</td>
      <td style="padding:5px 0;font-size:13px;color:#1a1a1a;font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">${esc(value)}</td>
    </tr>`
}

/** Two-column label/value row — raw HTML value (caller is responsible for safety) */
function dataRowHtml(label, rawHtml) {
  if (!rawHtml) return ''
  return `
    <tr>
      <td style="padding:5px 20px 5px 0;width:110px;vertical-align:top;font-size:12px;color:#9a9a9a;white-space:nowrap;font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">${esc(label)}</td>
      <td style="padding:5px 0;font-size:13px;color:#1a1a1a;font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">${rawHtml}</td>
    </tr>`
}

/** Small all-caps section label */
function sectionHeading(text) {
  return `<p style="margin:0 0 13px;font-size:10px;font-weight:700;letter-spacing:0.11em;text-transform:uppercase;color:#b8b8b8;font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">${esc(text)}</p>`
}

/** Rounded pill badge */
function pill(text) {
  if (!text) return ''
  return `<span style="display:inline-block;padding:3px 10px;background:#ffffff;border:1px solid #dededd;border-radius:4px;font-size:11px;color:#555;margin-right:5px;margin-bottom:4px;font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">${esc(text)}</span>`
}

/** Table-based product card (flex not used — email-safe) */
function productCard(p) {
  const name     = esc(p.name || p.slug || '')
  const category = esc(p.category || '')
  const price    = p.price ? `$${Number(p.price).toLocaleString()}` : ''
  const meta     = [category, price].filter(Boolean).join(' &middot; ')

  const imgCell = p.image
    ? `<img src="${esc(p.image)}" width="60" height="60" alt="${name}"
         style="display:block;width:60px;height:60px;border-radius:8px;
                background:#f2f2f0;border:1px solid #e4e4e2;object-fit:contain;" />`
    : `<div style="width:60px;height:60px;background:#f2f2f0;border-radius:8px;border:1px solid #e4e4e2;"></div>`

  const viewLink = p.productUrl
    ? `<a href="${esc(p.productUrl)}"
          style="display:inline-block;margin-top:7px;padding:5px 12px;background:#1a1a1a;
                 color:#ffffff;border-radius:5px;font-size:11px;font-weight:600;
                 text-decoration:none;font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">
          View product &rarr;
        </a>`
    : ''

  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
           style="margin-bottom:8px;background:#f9f9f7;border:1px solid #e4e4e2;border-radius:10px;">
      <tr>
        <td width="76" style="padding:14px 0 14px 14px;vertical-align:middle;">${imgCell}</td>
        <td style="padding:14px 14px 14px 10px;vertical-align:middle;">
          <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#1a1a1a;letter-spacing:-0.2px;
                    font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">${name}</p>
          ${meta ? `<p style="margin:0;font-size:12px;color:#9a9a9a;
                               font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">${meta}</p>` : ''}
          ${viewLink}
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
    const firstName    = name.trim().split(' ')[0]
    const productCount = Array.isArray(selectedProducts) ? selectedProducts.length : 0
    const submittedDate = submittedAt
      ? new Date(submittedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
      : ''

    // ── Lead summary pills ──────────────────────────────────────────────────
    const pillsRow = [
      homeType ? pill(homeType) : '',
      interest ? pill(interest) : '',
      productCount > 0 ? pill(`${productCount} product${productCount > 1 ? 's' : ''} selected`) : '',
    ].filter(Boolean).join('')

    // ── Quick-action buttons ────────────────────────────────────────────────
    const replyBtn = `<a href="mailto:${esc(email)}?subject=Re%3A%20Your%20PureHome%20Recommendation%20Request"
      style="display:inline-block;padding:8px 18px;background:#1a1a1a;color:#ffffff;
             border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;
             font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">
      Reply to ${esc(firstName)}
    </a>`

    const callBtn = phone
      ? `&nbsp;&nbsp;<a href="tel:${esc(phone)}"
           style="display:inline-block;padding:8px 18px;background:#ffffff;color:#1a1a1a;
                  border-radius:6px;border:1px solid #d8d8d6;font-size:12px;font-weight:600;
                  text-decoration:none;font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">
           Call ${esc(phone)}
         </a>`
      : ''

    // ── Products section (conditional) ─────────────────────────────────────
    const productsSection = productCount > 0
      ? `<tr>
           <td style="padding:24px 32px 28px;border-top:1px solid #ebebea;">
             ${sectionHeading(`Selected Products (${productCount})`)}
             ${selectedProducts.map(productCard).join('')}
           </td>
         </tr>`
      : ''

    // ── Footer meta line ────────────────────────────────────────────────────
    const metaParts = [
      submittedDate ? `Submitted ${submittedDate}` : '',
      sourcePage ? esc(sourcePage) : '',
      'PureHome Systems',
      '1590 Los Padres Blvd, Santa Clara, CA 95050',
    ].filter(Boolean).join(' &nbsp;&middot;&nbsp; ')

    // ── Email HTML ──────────────────────────────────────────────────────────
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Recommendation Request</title>
</head>
<body style="margin:0;padding:0;background:#edecea;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:32px 16px 48px;">

        <table width="560" cellpadding="0" cellspacing="0" border="0"
               style="max-width:560px;width:100%;background:#ffffff;
                      border-radius:16px;overflow:hidden;border:1px solid #dddcda;">

          <!-- ━━ HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="background:#1a1a1a;padding:22px 32px 20px;">
              <p style="margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:0.13em;
                         text-transform:uppercase;color:rgba(255,255,255,0.35);
                         font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">
                PureHome Systems
              </p>
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.4px;
                         font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">
                New Recommendation Request
              </p>
            </td>
          </tr>

          <!-- ━━ LEAD SUMMARY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="background:#f7f7f5;border-bottom:1px solid #e4e4e2;padding:22px 32px 22px;">
              <p style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:0.11em;
                         text-transform:uppercase;color:#b8b8b8;
                         font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">Lead</p>
              <p style="margin:0 0 2px;font-size:22px;font-weight:700;color:#1a1a1a;letter-spacing:-0.5px;
                         font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">
                ${esc(name)}
              </p>
              <p style="margin:0 0 15px;font-size:13px;line-height:1.5;
                         font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">
                <a href="mailto:${esc(email)}" style="color:#1a1a1a;text-decoration:none;font-weight:500;">
                  ${esc(email)}</a>${phone
                    ? `&nbsp;&nbsp;<span style="color:#c8c8c8;">&middot;</span>&nbsp;&nbsp;<a href="tel:${esc(phone)}" style="color:#666;text-decoration:none;">${esc(phone)}</a>`
                    : ''}
              </p>
              ${pillsRow ? `<p style="margin:0 0 18px;line-height:2;">${pillsRow}</p>` : '<p style="margin:0 0 18px;"></p>'}
              <p style="margin:0;">${replyBtn}${callBtn}</p>
            </td>
          </tr>

          <!-- ━━ CONTACT DETAILS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="padding:26px 32px 22px;">
              ${sectionHeading('Contact Details')}
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${dataRow('Name', name)}
                ${dataRowHtml('Email',
                  `<a href="mailto:${esc(email)}" style="color:#1a1a1a;text-decoration:underline;">${esc(email)}</a>`
                )}
                ${phone
                  ? dataRowHtml('Phone',
                      `<a href="tel:${esc(phone)}" style="color:#1a1a1a;text-decoration:none;">${esc(phone)}</a>`
                    )
                  : ''}
              </table>
            </td>
          </tr>

          <!-- ━━ HOME & INTEREST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="padding:22px 32px;border-top:1px solid #ebebea;">
              ${sectionHeading('Home & Interest')}
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${dataRow('Home type', homeType)}
                ${dataRow('Interest', interest)}
                ${message ? dataRow('Message', message) : ''}
              </table>
            </td>
          </tr>

          <!-- ━━ SELECTED PRODUCTS (conditional) ━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          ${productsSection}

          <!-- ━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="background:#f7f7f5;border-top:1px solid #e4e4e2;padding:13px 32px;">
              <p style="margin:0;font-size:11px;color:#b8b8b8;line-height:1.7;
                         font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;">
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
