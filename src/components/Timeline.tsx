import { Briefcase, GraduationCap, Award } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { GlassCard } from './ui/GlassCard'
import { SectionHeading } from './ui/SectionHeading'
import { timeline, leadership } from '../data/experience'

export function Timeline() {
  return (
    <section id="career" className="mx-auto max-w-5xl scroll-mt-28 px-4 py-20">
      <SectionHeading
        chip="Career"
        title="My professional trajectory"
        accent="trajectory"
        subtitle="From accountancy to finance to logistics to data — every step added a layer: business sense, operations, and now the data engineering to tie it all together."
      />

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-accent/60 via-line to-transparent sm:left-1/2" />

        <div className="space-y-10">
          {timeline.map((entry, i) => {
            const left = i % 2 === 0
            return (
              <Reveal key={`${entry.company}-${entry.period}`} delay={0.05}>
                <div className={`relative flex sm:items-center ${left ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  {/* node */}
                  <span className="absolute left-5 top-6 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-accent/50 bg-night text-accent shadow-[0_0_14px_rgba(45,212,191,0.35)] sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2">
                    {entry.type === 'work' ? <Briefcase size={15} /> : <GraduationCap size={15} />}
                  </span>

                  <div className={`ml-12 w-full sm:ml-0 sm:w-[calc(50%-2.5rem)] ${left ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                    <GlassCard className="p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-ink">{entry.company}</h3>
                        <span className="font-mono text-xs text-accent">{entry.period}</span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-accent/90">{entry.role}</p>
                      <p className="text-xs text-muted">{entry.location}</p>
                      <ul className="mt-4 space-y-2">
                        {entry.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {entry.tags.map((t) => (
                          <span key={t} className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent">
                            {t}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Leadership strip */}
      <Reveal className="mt-14">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {leadership.map((l) => (
            <span
              key={l.title}
              className="flex items-center gap-2 rounded-full border border-line bg-night-800 px-4 py-2 text-sm text-muted"
            >
              <Award size={14} className="text-accent" />
              {l.title}
              <span className="font-mono text-xs text-accent">{l.year}</span>
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
