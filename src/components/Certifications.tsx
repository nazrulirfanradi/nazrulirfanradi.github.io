import { ArrowUpRight, Award, BadgeCheck } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { GlassCard } from './ui/GlassCard'
import { certifications, awards, type Certification } from '../data/certifications'

/** Tiny vendor mark; the Microsoft four-square is drawn, others get a monogram. */
function VendorLogo({ vendor }: { vendor: Certification['vendor'] }) {
  if (vendor === 'microsoft') {
    return (
      <svg viewBox="0 0 21 21" className="h-7 w-7" aria-label="Microsoft">
        <rect x="0" y="0" width="10" height="10" fill="#f25022" />
        <rect x="11" y="0" width="10" height="10" fill="#7fba00" />
        <rect x="0" y="11" width="10" height="10" fill="#00a4ef" />
        <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
      </svg>
    )
  }
  const styles: Record<string, { label: string; cls: string }> = {
    google: { label: 'G', cls: 'bg-[#4285f4]/15 text-[#8ab4f8] ring-[#4285f4]/40' },
    python: { label: 'Py', cls: 'bg-[#ffd343]/10 text-[#ffd343] ring-[#ffd343]/40' },
    apu: { label: 'APU', cls: 'bg-accent/10 text-accent ring-accent/40' },
  }
  const s = styles[vendor]
  return (
    <span className={`flex h-7 w-7 items-center justify-center rounded-lg font-display text-[10px] font-bold ring-1 ${s.cls}`}>
      {s.label}
    </span>
  )
}

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <SectionHeading
        chip="Credentials"
        title="Licenses, certifications & awards"
        accent="certifications"
        subtitle="Professional accreditations demonstrating verified expertise — and the recognition that followed."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Certifications panel */}
        <Reveal className="lg:col-span-3">
          <GlassCard className="h-full p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
                <BadgeCheck size={20} />
              </span>
              <h3 className="font-display text-xl font-semibold">Licenses & Certifications</h3>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div
                  key={`${cert.name}-${cert.year}`}
                  className="rounded-2xl border border-line bg-night-800/70 p-5 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-start gap-3">
                    <VendorLogo vendor={cert.vendor} />
                    <div>
                      <p className="text-sm font-semibold leading-snug text-ink">{cert.name}</p>
                      <p className="mt-1 text-xs text-muted">
                        {cert.issuer} · {cert.code} · {cert.year}
                      </p>
                    </div>
                  </div>
                  <a
                    href={cert.credentialUrl}
                    target={cert.credentialUrl.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                      cert.credentialUrl === '#'
                        ? 'cursor-default border border-line text-muted'
                        : 'border border-accent/40 text-accent hover:bg-accent/10'
                    }`}
                  >
                    Show Credentials
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        {/* Awards panel */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <GlassCard className="h-full p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/30">
                <Award size={20} />
              </span>
              <h3 className="font-display text-xl font-semibold">Awards & Recognition</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {awards.map((award) => (
                <li
                  key={`${award.title}-${award.year}`}
                  className="rounded-2xl border border-line bg-night-800/70 p-4 transition-colors hover:border-amber-400/40"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-ink">{award.title}</p>
                    <span className="shrink-0 font-mono text-xs text-amber-300">{award.year}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    <span className="text-accent">{award.org}</span> — {award.description}
                  </p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
