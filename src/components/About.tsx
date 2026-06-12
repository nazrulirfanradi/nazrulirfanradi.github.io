import { Reveal } from './ui/Reveal'
import { GlassCard } from './ui/GlassCard'
import { CountUp } from './ui/CountUp'
import { SectionHeading } from './ui/SectionHeading'
import { profile } from '../data/profile'
import { Sparkles } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <SectionHeading
        chip="About Me"
        title="Supply chain by day, data & AI always"
        accent="data & AI"
      />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Narrative */}
        <Reveal className="lg:col-span-3">
          <GlassCard className="h-full p-8">
            <h3 className="font-display text-xl font-semibold text-ink">Who I am</h3>
            <p className="mt-4 leading-relaxed text-muted">{profile.summary}</p>
            <p className="mt-4 leading-relaxed text-muted">
              At BASF's Supply Chain Nerve Centre I own the data quality of the global shipment track
              & trace platform — and I keep turning that operational knowledge into data products:
              pipelines, dashboards, and automations that leadership actually relies on.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.strengths.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line bg-night-800 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-8 border-t border-line pt-6">
              <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                <Sparkles size={13} className="text-accent" /> Daily toolkit
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-display text-sm font-medium text-ink">
                {profile.techEcosystem.map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {profile.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <GlassCard className="flex h-full flex-col items-center justify-center p-6 text-center">
                <span className="font-display text-4xl font-bold text-accent text-glow">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-2 text-sm text-muted">{stat.label}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
