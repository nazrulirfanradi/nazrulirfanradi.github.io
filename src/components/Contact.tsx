import { BarChart3, Database, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'
import { Reveal } from './ui/Reveal'
import { profile } from '../data/profile'

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 px-4 pb-10 pt-20">
      <Reveal className="mx-auto max-w-4xl">
        <div className="glow-border relative overflow-hidden rounded-3xl bg-night-800/70 p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[90px]" />
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 text-sm text-green-300">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green-400" />
            {profile.status}
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold sm:text-5xl">
            Let's build something <span className="text-accent text-glow">with data</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Whether it's a dashboard that needs to exist, a pipeline that needs to flow, or an idea about
            data & AI in supply chains — my inbox is open.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-night transition-all hover:bg-glow hover:shadow-[0_0_28px_rgba(45,212,191,0.5)]"
            >
              <Mail size={18} />
              {profile.email}
            </a>
            <span className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} className="text-accent" />
              {profile.location}
            </span>
          </div>
        </div>
      </Reveal>

      {/* Footer */}
      <footer className="mx-auto mt-14 max-w-5xl border-t border-line pt-8 pb-6">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 font-display text-xs font-bold text-accent ring-1 ring-accent/40">
              {profile.initials}
            </span>
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} {profile.name}. Built with React, data & too much coffee.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { icon: <LinkedinIcon size={16} />, url: profile.socials.linkedin, label: 'LinkedIn' },
              { icon: <GithubIcon size={16} />, url: profile.socials.github, label: 'GitHub' },
              { icon: <Database size={16} />, url: profile.socials.kaggle, label: 'Kaggle' },
              { icon: <BarChart3 size={16} />, url: profile.socials.maven, label: 'Maven Analytics' },
              { icon: <Mail size={16} />, url: `mailto:${profile.email}`, label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent/50 hover:text-accent"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  )
}
