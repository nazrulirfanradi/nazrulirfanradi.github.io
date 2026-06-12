import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Clock, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import {
  carriers,
  laneLeadTimes,
  months,
  regions,
  shipmentRecords,
  years,
} from '../data/dashboardData'

const ACCENT = '#2dd4bf'
const GLOW = '#22d3ee'
const MUTED = '#8b9cb8'
const LINE = '#1c2a47'

const tooltipStyle = {
  backgroundColor: '#0e1830',
  border: `1px solid ${LINE}`,
  borderRadius: 12,
  color: '#e6edf7',
  fontSize: 13,
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (v: string) => void
}) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-line bg-night-800 px-4 py-2 text-sm">
      <span className="font-mono text-xs uppercase tracking-wider text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer bg-night-800 font-medium text-ink outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

export function DemoDashboard() {
  const [region, setRegion] = useState<string>(regions[0])
  const [carrier, setCarrier] = useState<string>(carriers[0])
  const [year, setYear] = useState<string>(years[0])

  const filtered = useMemo(
    () =>
      shipmentRecords.filter(
        (r) =>
          r.year === year &&
          (region === 'All Regions' || r.region === region) &&
          (carrier === 'All Carriers' || r.carrier === carrier),
      ),
    [region, carrier, year],
  )

  const kpis = useMemo(() => {
    if (filtered.length === 0) return { otd: 0, otc: 0, leadTime: 0, quality: 0 }
    const avg = (fn: (r: (typeof filtered)[number]) => number) =>
      filtered.reduce((s, r) => s + fn(r), 0) / filtered.length
    return {
      otd: avg((r) => r.otd),
      otc: avg((r) => r.otc),
      leadTime: avg((r) => r.leadTime),
      quality: avg((r) => r.dataQuality),
    }
  }, [filtered])

  const monthlyTrend = useMemo(
    () =>
      months.map((month, m) => {
        const slice = filtered.filter((r) => r.monthIndex === m)
        const avg = (fn: (r: (typeof filtered)[number]) => number) =>
          slice.length ? slice.reduce((s, r) => s + fn(r), 0) / slice.length : 0
        return {
          month,
          OTD: Math.round(avg((r) => r.otd) * 10) / 10,
          OTC: Math.round(avg((r) => r.otc) * 10) / 10,
        }
      }),
    [filtered],
  )

  const byCarrier = useMemo(() => {
    const names = carriers.slice(1) as readonly string[]
    return names
      .filter((c) => carrier === 'All Carriers' || c === carrier)
      .map((name) => ({
        carrier: name,
        shipments: filtered.filter((r) => r.carrier === name).reduce((s, r) => s + r.shipments, 0),
      }))
  }, [filtered, carrier])

  const statusSplit = useMemo(() => {
    const sum = (fn: (r: (typeof filtered)[number]) => number) => filtered.reduce((s, r) => s + fn(r), 0)
    return [
      { name: 'Delivered', value: sum((r) => r.delivered), color: ACCENT },
      { name: 'In Transit', value: sum((r) => r.inTransit), color: GLOW },
      { name: 'Delayed', value: sum((r) => r.delayed), color: '#f59e0b' },
    ]
  }, [filtered])

  const kpiCards = [
    { label: 'On-Time Delivery', value: `${kpis.otd.toFixed(1)}%`, icon: <PackageCheck size={18} /> },
    { label: 'On-Time Collection', value: `${kpis.otc.toFixed(1)}%`, icon: <Truck size={18} /> },
    { label: 'Avg Lead Time', value: `${kpis.leadTime.toFixed(1)} days`, icon: <Clock size={18} /> },
    { label: 'Data Quality Score', value: `${kpis.quality.toFixed(1)}%`, icon: <ShieldCheck size={18} /> },
  ]

  return (
    <section id="dashboard" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <SectionHeading
        chip="Live Demo"
        title="Supply chain analytics, interactive"
        accent="interactive"
        subtitle="A working sample of the dashboards I build — change the filters and watch every chart respond. Demo data only."
      />

      <Reveal>
        <div className="glow-border rounded-3xl bg-night-800/60 p-5 backdrop-blur-md sm:p-7">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              <Select label="Region" value={region} options={regions} onChange={setRegion} />
              <Select label="Carrier" value={carrier} options={carriers} onChange={setCarrier} />
              <Select label="Year" value={year} options={years} onChange={setYear} />
            </div>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-amber-300">
              Demo data
            </span>
          </div>

          {/* KPI cards */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {kpiCards.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-line bg-night p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center gap-2 text-muted">
                  <span className="text-accent">{kpi.icon}</span>
                  <span className="text-xs">{kpi.label}</span>
                </div>
                <p className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="mt-6 grid gap-4 lg:grid-cols-5">
            {/* Trend */}
            <div className="rounded-2xl border border-line bg-night p-5 lg:col-span-3">
              <h4 className="mb-4 text-sm font-medium text-muted">OTD vs OTC — monthly trend ({year})</h4>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthlyTrend} margin={{ left: -18, right: 6, top: 4 }}>
                  <defs>
                    <linearGradient id="otdFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={LINE} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke={MUTED} fontSize={12} tickLine={false} />
                  <YAxis domain={[60, 100]} stroke={MUTED} fontSize={12} tickLine={false} unit="%" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                  <Area type="monotone" dataKey="OTD" stroke={ACCENT} strokeWidth={2.5} fill="url(#otdFill)" />
                  <Area type="monotone" dataKey="OTC" stroke={GLOW} strokeWidth={2} fill="transparent" strokeDasharray="6 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Status donut */}
            <div className="rounded-2xl border border-line bg-night p-5 lg:col-span-2">
              <h4 className="mb-2 text-sm font-medium text-muted">Shipment status</h4>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={statusSplit}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="58%"
                    outerRadius="82%"
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {statusSplit.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* By carrier */}
            <div className="rounded-2xl border border-line bg-night p-5 lg:col-span-2">
              <h4 className="mb-4 text-sm font-medium text-muted">Shipments by carrier</h4>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={byCarrier} margin={{ left: -10, right: 6 }}>
                  <CartesianGrid stroke={LINE} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="carrier" stroke={MUTED} fontSize={11} tickLine={false} interval={0} angle={-18} dy={8} height={44} />
                  <YAxis stroke={MUTED} fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(45,212,191,0.06)' }} />
                  <Bar dataKey="shipments" fill={ACCENT} radius={[6, 6, 0, 0]} maxBarSize={42} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Lane lead times */}
            <div className="rounded-2xl border border-line bg-night p-5 lg:col-span-3">
              <h4 className="mb-4 text-sm font-medium text-muted">Avg lead time by lane (days)</h4>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={laneLeadTimes} layout="vertical" margin={{ left: 50, right: 18 }}>
                  <CartesianGrid stroke={LINE} strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" stroke={MUTED} fontSize={12} tickLine={false} />
                  <YAxis type="category" dataKey="lane" stroke={MUTED} fontSize={11} tickLine={false} width={150} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(45,212,191,0.06)' }} />
                  <Bar dataKey="days" fill={GLOW} radius={[0, 6, 6, 0]} maxBarSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
