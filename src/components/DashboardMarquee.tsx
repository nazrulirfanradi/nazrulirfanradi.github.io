import { MiniDashboard } from './ui/MiniDashboard'

const previews = [
  { seed: 1, title: 'Global Lead Time Calculator' },
  { seed: 2, title: 'VISTA Data Quality' },
  { seed: 3, title: '3PL Registration Tracker' },
  { seed: 4, title: 'Fleet Safety Inspection' },
  { seed: 5, title: 'Nike Sales Analytics' },
  { seed: 6, title: 'LEGO Set Economics' },
]

/** Infinite auto-scrolling carousel of dashboard previews; pauses on hover. */
export function DashboardMarquee() {
  return (
    <section className="relative -mt-6 overflow-hidden pb-20" aria-label="Dashboard previews">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night to-transparent" />

      <div className="group flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
        {[...previews, ...previews].map((p, i) => (
          <div
            key={i}
            className="glow-border h-44 w-72 shrink-0 overflow-hidden rounded-xl bg-night-800 transition-transform duration-300 hover:scale-[1.04] sm:h-52 sm:w-86"
          >
            <MiniDashboard seed={p.seed} title={p.title} />
          </div>
        ))}
      </div>
      <p className="mt-5 text-center font-mono text-xs uppercase tracking-[0.25em] text-muted">
        Dashboards I've shipped — stylized previews
      </p>
    </section>
  )
}
