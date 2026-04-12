// FAQ content structured for the /faq page
// Topics organized by category, sourced from CUCKOO's rental model structure

export const faqCategories = [
  { id: 'rental', label: 'Rental Program' },
  { id: 'installation', label: 'Installation' },
  { id: 'service', label: 'Service & Maintenance' },
  { id: 'products', label: 'Products' },
  { id: 'orders', label: 'Orders & Returns' },
]

export const faqs = [

  // ─── RENTAL PROGRAM ───────────────────────────────────────────────────────

  {
    category: 'rental',
    q: 'How does the rental program work?',
    a: 'Instead of purchasing a product outright, you pay a monthly fee for a set term (typically 3, 5, or 6 years depending on the product). That fee covers the equipment, professional installation where applicable, and ongoing maintenance depending on the plan type you choose. CUCKOO owns the equipment during the term.',
  },
  {
    category: 'rental',
    q: 'What is the difference between Self Care and Visit Care?',
    a: 'Self Care plans deliver replacement filters to you on a set schedule. You install them yourself. Visit Care plans include technician visits to handle filter replacements and system inspections on your behalf. Visit Care is generally priced higher than Self Care for the same product.',
  },
  {
    category: 'rental',
    q: 'Do I own the equipment?',
    a: 'No. Under CUCKOO\'s rental program, the equipment belongs to CUCKOO for the duration of the term. This is what allows the monthly fee to include service and maintenance. At plan end, your options vary by product and plan.',
  },
  {
    category: 'rental',
    q: 'What happens at the end of my rental term?',
    a: 'CUCKOO will communicate your options before your term ends. Common outcomes include renewing the plan, returning the equipment, or transitioning to a different arrangement. Specifics depend on your product and plan type.',
  },
  {
    category: 'rental',
    q: 'Are there different term lengths available?',
    a: 'Yes. Common rental terms are 3, 5, and 6 years, though availability depends on the specific product and plan. Shorter terms generally carry a higher monthly cost. Not all term lengths are available for every product.',
  },
  {
    category: 'rental',
    q: 'Is a down payment required?',
    a: 'Down payment requirements vary by product and plan. Some plans require an initial payment, others do not. We clarify payment requirements when providing a recommendation for the specific product you are interested in.',
  },
  {
    category: 'rental',
    q: 'What if I move during my rental term?',
    a: 'Contact CUCKOO customer service if your address changes during your plan term. They will work with you on relocation options or service transfer. Reach CUCKOO at hq@cuckoorental.com or 888-700-0425.',
  },

  // ─── INSTALLATION ─────────────────────────────────────────────────────────

  {
    category: 'installation',
    q: 'Which products require professional installation?',
    a: 'Most water purifiers, the Micro-Bubble Cleanser, and bidets require professional installation. Certain air purifier models are self-placement and do not require a technician. Massage chairs are delivered and placed without a technical setup visit. We confirm installation requirements for each product during the recommendation process.',
  },
  {
    category: 'installation',
    q: 'Is installation included in the rental cost?',
    a: 'Professional installation is included in CUCKOO rental plans for products that require it. You do not pay separately for the initial installation visit.',
  },
  {
    category: 'installation',
    q: 'How long does installation take?',
    a: 'Most installations are completed in a single technician visit. The duration depends on the product type and your home\'s existing plumbing or setup. CUCKOO will confirm timing when scheduling.',
  },
  {
    category: 'installation',
    q: 'What does the installer do during the visit?',
    a: 'A CUCKOO-certified technician arrives, installs the system, tests it, and confirms everything is functioning before leaving. For water purifiers, this typically includes connecting the unit to your water supply and running an initial flush.',
  },

  // ─── SERVICE & MAINTENANCE ─────────────────────────────────────────────────

  {
    category: 'service',
    q: 'What maintenance is included in my plan?',
    a: 'Self Care plans include filter deliveries on a schedule. You replace them yourself. Visit Care plans include scheduled technician visits for filter replacement and system inspection. Both plan types include CUCKOO customer service support throughout the term.',
  },
  {
    category: 'service',
    q: 'How often are filters replaced?',
    a: 'Filter replacement schedules vary by product and model. CUCKOO determines the schedule based on the product\'s design and typical usage. Filters are either shipped to you (Self Care) or replaced during technician visits (Visit Care) on that schedule.',
  },
  {
    category: 'service',
    q: 'What happens if the equipment malfunctions?',
    a: 'Equipment malfunctions covered under the warranty are handled by CUCKOO. Contact CUCKOO customer service directly at hq@cuckoorental.com or 888-700-0425 to report an issue and request service.',
  },
  {
    category: 'service',
    q: 'Can I switch from Self Care to Visit Care, or vice versa?',
    a: 'Plan changes are subject to CUCKOO\'s terms. Contact CUCKOO customer service directly to ask about modifying your current plan.',
  },

  // ─── PRODUCTS ─────────────────────────────────────────────────────────────

  {
    category: 'products',
    q: 'What types of water purifiers are available?',
    a: 'CUCKOO offers countertop, freestanding, and under-sink water purifiers. Options include standard hot/cold dispensers, reverse osmosis (RO) models, nano/smart wheel configurations, steam-capable units, and an ice-generating model. There are 15 water purifier models in the current catalog.',
  },
  {
    category: 'products',
    q: 'What is the Micro-Bubble Cleanser?',
    a: 'The Micro-Bubble Cleanser (model CWS-AO201W) is a shower-integrated cleansing system. It generates microbubbles that are smaller than pore openings, allowing for deep cleansing of skin and hair without added chemicals. It installs inline with your shower.',
  },
  {
    category: 'products',
    q: 'Which bidet is right for my toilet?',
    a: 'CUCKOO offers two bidet models. The Inspure Instant Heating Premium Bidet is available in E-Type (elongated) and R-Type (round) to fit your toilet shape. The Electric Bidet for Elongated Seats is designed specifically for elongated toilets. Measure your toilet or check the seat shape before ordering.',
  },
  {
    category: 'products',
    q: 'Are all products available in all areas?',
    a: 'CUCKOO uses zipcode-based delivery and service area verification. Not all products or services are available in every location. Contact us or check directly with CUCKOO to confirm availability in your area before proceeding.',
  },

  // ─── ORDERS & RETURNS ─────────────────────────────────────────────────────

  {
    category: 'orders',
    q: 'What is the return policy?',
    a: 'CUCKOO accepts returns within 30 days of receipt for products in their original, unused condition with original packaging and proof of purchase. All returns require pre-approval from customer service. Contact CUCKOO at hq@cuckoorental.com or 888-700-0425 before returning any item. Customers are responsible for return shipping costs, and initial shipping charges are deducted from any refund.',
  },
  {
    category: 'orders',
    q: 'How long does shipping take?',
    a: 'Orders typically process within 1 to 4 business days. CUCKOO offers free shipping on orders over $99 to the contiguous US. Orders under $99 carry a shipping fee based on weight. Deliveries to Alaska, Hawaii, and Guam carry a $75 shipping charge. No weekend or holiday shipping.',
  },
  {
    category: 'orders',
    q: 'How do I contact CUCKOO Rental America?',
    a: 'You can reach CUCKOO Rental America customer service at hq@cuckoorental.com or by phone at 888-700-0425. For local support, use the store locator on cuckoorental.com to find a representative near you.',
  },
]
