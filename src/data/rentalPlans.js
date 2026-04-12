// Per-product rental plan data sourced directly from cuckoorental.com product pages.
// Each entry keyed by product slug.
// selfCare / visitCare rows: { term, d0: $/mo with $0 down, d100: $/mo with $100 down }
// single (massage chairs): { term, down, monthly }

export const rentalPlans = {

  // ─── WATER PURIFIERS ────────────────────────────────────────────────────────

  'fit-water-purifier': {
    selfCare: [
      { term: '6 Year', d0: 22.99, d100: 19.99 },
      { term: '5 Year', d0: 23.99, d100: 20.99 },
      { term: '3 Year', d0: 30.99, d100: 27.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 30.99, d100: 28.99 },
      { term: '5 Year', d0: 32.99, d100: 30.99 },
      { term: '3 Year', d0: 38.99, d100: 35.99 },
    ],
  },

  'ro-under-sink-water-purifier': {
    selfCare: [
      { term: '6 Year', d0: 22.99, d100: 20.99 },
      { term: '5 Year', d0: 24.99, d100: 22.99 },
      { term: '3 Year', d0: 29.99, d100: 26.99 },
    ],
    visitCare: null,
  },

  'tn102-water-purifier': {
    selfCare: [
      { term: '6 Year', d0: 31.99, d100: 29.99 },
      { term: '5 Year', d0: 33.99, d100: 31.99 },
      { term: '3 Year', d0: 47.99, d100: 44.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 41.99, d100: 39.99 },
      { term: '5 Year', d0: 44.99, d100: 42.99 },
      { term: '3 Year', d0: 54.99, d100: 51.99 },
    ],
  },

  'ro-prime-water-purifier': {
    selfCare: null,
    visitCare: [
      { term: '6 Year', d0: 42.99, d100: 39.99 },
      { term: '5 Year', d0: 44.99, d100: 41.99 },
      { term: '3 Year', d0: 52.99, d100: 49.99 },
    ],
  },

  'smart-wheel-water-purifier': {
    selfCare: null,
    visitCare: [
      { term: '6 Year', d0: 41.99, d100: 39.99 },
      { term: '5 Year', d0: 43.99, d100: 41.99 },
      { term: '3 Year', d0: 52.99, d100: 49.99 },
    ],
  },

  'metallic-slim-water-purifier': {
    selfCare: [
      { term: '6 Year', d0: 35.99, d100: 33.99 },
      { term: '5 Year', d0: 38.99, d100: 36.99 },
      { term: '3 Year', d0: 52.99, d100: 49.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 45.99, d100: 43.99 },
      { term: '5 Year', d0: 47.99, d100: 45.99 },
      { term: '3 Year', d0: 58.99, d100: 55.99 },
    ],
  },

  'tn100-water-purifier': {
    selfCare: [
      { term: '6 Year', d0: 36.99, d100: 34.99 },
      { term: '5 Year', d0: 38.99, d100: 36.99 },
      { term: '3 Year', d0: 52.99, d100: 49.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 48.99, d100: 46.99 },
      { term: '5 Year', d0: 50.99, d100: 48.99 },
      { term: '3 Year', d0: 60.99, d100: 57.99 },
    ],
  },

  'smart-wheel-one-touch-countertop': {
    selfCare: null,
    visitCare: [
      { term: '6 Year', d0: 43.99, d100: 41.99 },
      { term: '5 Year', d0: 45.99, d100: 43.99 },
      { term: '3 Year', d0: 52.99, d100: 49.99 },
    ],
  },

  'smart-wheel-one-touch-freestanding': {
    selfCare: null,
    visitCare: [
      { term: '6 Year', d0: 44.99, d100: 41.99 },
      { term: '5 Year', d0: 48.99, d100: 45.99 },
      { term: '3 Year', d0: 54.99, d100: 51.99 },
    ],
  },

  'grande-water-purifier': {
    selfCare: null,
    visitCare: [
      { term: '6 Year', d0: 47.99, d100: 45.99 },
      { term: '5 Year', d0: 50.99, d100: 48.99 },
      { term: '3 Year', d0: 62.99, d100: 59.99 },
    ],
  },

  'steam-100-barista-water-purifier': {
    selfCare: [
      { term: '6 Year', d0: 38.99, d100: 36.99 },
      { term: '5 Year', d0: 40.99, d100: 38.99 },
      { term: '3 Year', d0: 54.99, d100: 51.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 50.99, d100: 48.99 },
      { term: '5 Year', d0: 52.99, d100: 50.99 },
      { term: '3 Year', d0: 62.99, d100: 59.99 },
    ],
  },

  'steam-100-built-in-water-purifier': {
    selfCare: [
      { term: '6 Year', d0: 39.99, d100: 37.99 },
      { term: '5 Year', d0: 41.99, d100: 39.99 },
      { term: '3 Year', d0: 56.99, d100: 53.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 51.99, d100: 49.99 },
      { term: '5 Year', d0: 53.99, d100: 51.99 },
      { term: '3 Year', d0: 64.99, d100: 61.99 },
    ],
  },

  'inspure-zero100-water-purifier': {
    selfCare: null,
    visitCare: [
      { term: '6 Year', d0: 63.99, d100: 61.99 },
      { term: '5 Year', d0: 69.99, d100: 67.99 },
      { term: '3 Year', d0: 79.99, d100: 76.99 },
    ],
  },

  'grand-slam-ice-water-purifier': {
    selfCare: null,
    visitCare: [
      { term: '6 Year', d0: 79.99, d100: 76.99 },
      { term: '5 Year', d0: 85.99, d100: 82.99 },
      { term: '3 Year', d0: 98.99, d100: 95.99 },
    ],
  },

  'ro-prime-water-purifier-freestanding': {
    selfCare: null,
    visitCare: [
      { term: '6 Year', d0: 44.99, d100: 42.99 },
      { term: '5 Year', d0: 47.99, d100: 44.99 },
      { term: '3 Year', d0: 55.99, d100: 52.99 },
    ],
  },

  // ─── AIR PURIFIERS ──────────────────────────────────────────────────────────

  'room-care-smart-air-purifier': {
    selfCare: [
      { term: '6 Year', d0: 25.99, d100: 23.99 },
      { term: '5 Year', d0: 27.99, d100: 25.99 },
      { term: '3 Year', d0: 35.99, d100: 32.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 35.99, d100: 33.99 },
      { term: '5 Year', d0: 37.99, d100: 35.99 },
      { term: '3 Year', d0: 42.99, d100: 39.99 },
    ],
  },

  'ultra-slim-wall-mounted-air-purifier': {
    selfCare: [
      { term: '6 Year', d0: 19.99, d100: 17.99 },
      { term: '5 Year', d0: 21.99, d100: 19.99 },
      { term: '3 Year', d0: 28.99, d100: 25.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 25.99, d100: 23.99 },
      { term: '5 Year', d0: 27.99, d100: 25.99 },
      { term: '3 Year', d0: 35.99, d100: 33.99 },
    ],
  },

  'tower-max-air-purifier': {
    selfCare: [
      { term: '6 Year', d0: 28.99, d100: 26.99 },
      { term: '5 Year', d0: 32.99, d100: 29.99 },
      { term: '3 Year', d0: 43.99, d100: 40.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 39.99, d100: 37.99 },
      { term: '5 Year', d0: 41.99, d100: 39.99 },
      { term: '3 Year', d0: 50.99, d100: 47.99 },
    ],
  },

  'inspure-intelligence-xl-air-purifier': {
    selfCare: [
      { term: '6 Year', d0: 33.99, d100: 31.99 },
      { term: '5 Year', d0: 38.99, d100: 36.99 },
      { term: '3 Year', d0: 49.99, d100: 46.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 43.99, d100: 41.99 },
      { term: '5 Year', d0: 46.99, d100: 44.99 },
      { term: '3 Year', d0: 57.99, d100: 54.99 },
    ],
  },

  'inspure-heritage-air-purifier': {
    selfCare: [
      { term: '6 Year', d0: 31.99, d100: 29.99 },
      { term: '5 Year', d0: 36.99, d100: 34.99 },
      { term: '3 Year', d0: 47.99, d100: 44.99 },
    ],
    visitCare: [
      { term: '6 Year', d0: 43.99, d100: 41.99 },
      { term: '5 Year', d0: 45.99, d100: 43.99 },
      { term: '3 Year', d0: 54.99, d100: 51.99 },
    ],
  },

  // ─── BIDETS ─────────────────────────────────────────────────────────────────

  'inspure-instant-heating-premium-bidet': {
    selfCare: [
      { term: '6 Year', d0: 19.99, d100: 17.99 },
      { term: '5 Year', d0: 22.99, d100: 20.99 },
      { term: '3 Year', d0: 31.99, d100: 28.99 },
    ],
    visitCare: null,
  },

  // Electric Bidet for Elongated Seats: no rental table on source page
  'electric-bidet-for-elongated-seats': null,

  // ─── BUBBLE CLEANSER ─────────────────────────────────────────────────────────

  'micro-bubble-cleanser': {
    selfCare: [
      { term: '6 Year', d0: 17.99, d100: 15.99 },
      { term: '5 Year', d0: 19.99, d100: 17.99 },
      { term: '3 Year', d0: 26.99, d100: 23.99 },
    ],
    visitCare: null,
  },

  // ─── MASSAGE CHAIRS ─────────────────────────────────────────────────────────
  // Different structure: single plan, $500 down, 5-year term only

  'renature-3d-massage-chair': {
    single: [
      { term: '5 Year', down: 500, monthly: 89 },
    ],
  },

  'renature-4d-massage-chair': {
    single: [
      { term: '5 Year', down: 500, monthly: 159 },
    ],
  },
}
