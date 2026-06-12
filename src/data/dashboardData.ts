// Deterministic sample data for the live demo dashboard.
// Clearly labelled demo data in the UI — not real BASF/Nestlé figures.

export const regions = ['All Regions', 'APAC', 'Europe', 'North America', 'LATAM'] as const
export const carriers = ['All Carriers', 'OceanLine', 'SwiftCargo', 'TransGlobal', 'AeroFreight', 'RailLink'] as const
export const years = ['2025', '2024'] as const

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export interface ShipmentRecord {
  month: string
  monthIndex: number
  year: string
  region: string
  carrier: string
  shipments: number
  otd: number // on-time delivery %
  otc: number // on-time collection %
  leadTime: number // days
  dataQuality: number // %
  delivered: number
  inTransit: number
  delayed: number
}

// Small deterministic PRNG so the demo numbers are stable between reloads
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const REGION_LIST = ['APAC', 'Europe', 'North America', 'LATAM']
const CARRIER_LIST = ['OceanLine', 'SwiftCargo', 'TransGlobal', 'AeroFreight', 'RailLink']

// Base characteristics so each slice feels distinct
const regionBias: Record<string, { otd: number; lead: number; volume: number }> = {
  APAC: { otd: 2, lead: -1, volume: 1.4 },
  Europe: { otd: 4, lead: -3, volume: 1.1 },
  'North America': { otd: 0, lead: 2, volume: 0.9 },
  LATAM: { otd: -4, lead: 5, volume: 0.6 },
}
const carrierBias: Record<string, { otd: number; lead: number }> = {
  OceanLine: { otd: -2, lead: 6 },
  SwiftCargo: { otd: 5, lead: -4 },
  TransGlobal: { otd: 0, lead: 0 },
  AeroFreight: { otd: 7, lead: -8 },
  RailLink: { otd: -1, lead: 2 },
}

function buildRecords(): ShipmentRecord[] {
  const rand = mulberry32(20260612)
  const records: ShipmentRecord[] = []
  for (const year of ['2024', '2025']) {
    const yearLift = year === '2025' ? 4 : 0 // story: KPIs improved year over year
    for (let m = 0; m < 12; m++) {
      const seasonal = Math.sin((m / 12) * Math.PI * 2) * 2
      for (const region of REGION_LIST) {
        for (const carrier of CARRIER_LIST) {
          const rb = regionBias[region]
          const cb = carrierBias[carrier]
          const otd = clamp(78 + yearLift + rb.otd + cb.otd + seasonal + rand() * 6 - 3, 60, 99)
          const otc = clamp(otd + 1 + rand() * 4 - 2, 60, 99)
          const leadTime = clamp(18 + rb.lead + cb.lead - yearLift * 0.4 + rand() * 4 - 2, 3, 45)
          const shipments = Math.round((140 + rand() * 80) * rb.volume)
          const delivered = Math.round(shipments * (0.72 + rand() * 0.1))
          const delayed = Math.round(shipments * (1 - otd / 100) * 0.6)
          const inTransit = Math.max(shipments - delivered - delayed, 0)
          records.push({
            month: months[m],
            monthIndex: m,
            year,
            region,
            carrier,
            shipments,
            otd: round1(otd),
            otc: round1(otc),
            leadTime: round1(leadTime),
            dataQuality: round1(clamp(88 + yearLift + rand() * 8 - 4, 70, 99.5)),
            delivered,
            inTransit,
            delayed,
          })
        }
      }
    }
  }
  return records
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}
function round1(v: number) {
  return Math.round(v * 10) / 10
}

export const shipmentRecords = buildRecords()

export const laneLeadTimes = [
  { lane: 'Port Klang → Rotterdam', days: 28 },
  { lane: 'Singapore → Los Angeles', days: 21 },
  { lane: 'Shanghai → Hamburg', days: 30 },
  { lane: 'Port Klang → Yokohama', days: 9 },
  { lane: 'Penang → Santos', days: 34 },
  { lane: 'Singapore → Dubai', days: 12 },
]
