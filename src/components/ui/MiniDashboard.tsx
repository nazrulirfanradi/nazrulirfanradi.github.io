// Stylized SVG dashboard mockup — used as preview art for the marquee and
// project cards. `seed` varies the chart shapes so each preview looks unique.

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function MiniDashboard({ seed, title }: { seed: number; title: string }) {
  const rand = mulberry32(seed * 7919)
  const bars = Array.from({ length: 7 }, () => 12 + rand() * 30)
  const line = Array.from({ length: 9 }, (_, i) => ({ x: 8 + i * 16, y: 38 - (8 + rand() * 22) }))
  const linePath = line.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const areaPath = `${linePath} L${line[line.length - 1].x},40 L${line[0].x},40 Z`
  const kpis = Array.from({ length: 3 }, () => Math.round(70 + rand() * 29))
  const donut = 0.55 + rand() * 0.35

  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" role="img" aria-label={`${title} dashboard preview`}>
      {/* frame */}
      <rect width="240" height="140" rx="8" fill="#0a1224" />
      <rect x="0.5" y="0.5" width="239" height="139" rx="8" fill="none" stroke="#1c2a47" />
      {/* header */}
      <circle cx="12" cy="11" r="3" fill="#2dd4bf" opacity="0.9" />
      <text x="22" y="14.5" fontSize="8.5" fill="#e6edf7" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">
        {title}
      </text>
      <rect x="196" y="6" width="34" height="10" rx="5" fill="#0e1830" stroke="#1c2a47" strokeWidth="0.5" />
      <text x="213" y="13.5" fontSize="6" fill="#8b9cb8" textAnchor="middle" fontFamily="Inter, sans-serif">2025 ▾</text>

      {/* KPI tiles */}
      {kpis.map((v, i) => (
        <g key={i} transform={`translate(${10 + i * 58}, 24)`}>
          <rect width="52" height="26" rx="5" fill="#0e1830" stroke="#1c2a47" strokeWidth="0.5" />
          <text x="7" y="11" fontSize="5.5" fill="#8b9cb8" fontFamily="Inter, sans-serif">
            {['OTD', 'OTC', 'QUALITY'][i]}
          </text>
          <text x="7" y="21" fontSize="9" fill="#2dd4bf" fontFamily="'Space Grotesk', sans-serif" fontWeight="700">
            {v}%
          </text>
        </g>
      ))}
      {/* donut KPI */}
      <g transform="translate(190, 24)">
        <rect width="40" height="26" rx="5" fill="#0e1830" stroke="#1c2a47" strokeWidth="0.5" />
        <circle cx="20" cy="13" r="8" fill="none" stroke="#1c2a47" strokeWidth="4" />
        <circle
          cx="20" cy="13" r="8" fill="none" stroke="#2dd4bf" strokeWidth="4"
          strokeDasharray={`${donut * 50.3} 50.3`} strokeLinecap="round" transform="rotate(-90 20 13)"
        />
      </g>

      {/* area chart */}
      <g transform="translate(10, 58)">
        <rect width="140" height="72" rx="5" fill="#0e1830" stroke="#1c2a47" strokeWidth="0.5" />
        <text x="8" y="12" fontSize="6" fill="#8b9cb8" fontFamily="Inter, sans-serif">Monthly trend</text>
        <g transform="translate(0, 22) scale(0.95, 1.1)">
          <path d={areaPath} fill="rgba(45,212,191,0.12)" />
          <path d={linePath} fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" />
          {line.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="1.4" fill="#2dd4bf" />
          ))}
        </g>
      </g>

      {/* bar chart */}
      <g transform="translate(158, 58)">
        <rect width="72" height="72" rx="5" fill="#0e1830" stroke="#1c2a47" strokeWidth="0.5" />
        <text x="8" y="12" fontSize="6" fill="#8b9cb8" fontFamily="Inter, sans-serif">By carrier</text>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={9 + i * 9}
            y={64 - h}
            width="6"
            height={h}
            rx="1.5"
            fill={i === 2 ? '#22d3ee' : '#14b8a6'}
            opacity={0.55 + (i % 3) * 0.15}
          />
        ))}
      </g>
    </svg>
  )
}
