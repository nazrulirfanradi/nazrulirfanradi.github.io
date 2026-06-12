import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { PillToggle } from './ui/PillToggle'
import { Reveal } from './ui/Reveal'
import { MiniDashboard } from './ui/MiniDashboard'
import { projects, projectCategories, type ProjectCategory } from '../data/projects'
import { profile } from '../data/profile'

type Filter = ProjectCategory | 'all'

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = projects.filter((p) => filter === 'all' || p.category === filter)

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <SectionHeading
        chip="Case Studies"
        title="Projects with real impact"
        accent="real impact"
        subtitle="Dashboards, pipelines and automations delivered inside BASF and Nestlé — plus my public portfolio work."
      />

      <Reveal className="flex justify-center">
        <PillToggle<Filter>
          options={projectCategories.map((c) => ({ id: c.id as Filter, label: c.label }))}
          value={filter}
          onChange={setFilter}
        />
      </Reveal>

      <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.article
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="glass group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_8px_40px_rgba(45,212,191,0.12)]"
            >
              {/* preview */}
              <div className="relative h-40 overflow-hidden border-b border-line bg-night-800">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.05]">
                  <MiniDashboard seed={project.previewSeed} title={project.title} />
                </div>
                <span className="absolute left-3 top-3 rounded-full border border-accent/30 bg-night/85 px-3 py-1 font-mono text-[11px] text-accent">
                  {project.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
                  <span className="shrink-0 font-mono text-xs text-muted">{project.org}</span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.description}</p>

                <ul className="mt-4 space-y-1.5">
                  {project.metrics.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-xs text-accent/90">
                      <TrendingUp size={12} className="shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-full bg-night-800 px-2.5 py-1 font-mono text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>

                {project.links.length > 0 && (
                  <div className="mt-auto flex gap-4 pt-5">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-glow"
                      >
                        {link.label}
                        <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-12 text-center">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-night transition-all hover:bg-glow hover:shadow-[0_0_24px_rgba(45,212,191,0.5)]"
        >
          Browse All Projects
          <ArrowUpRight size={17} />
        </a>
      </Reveal>
    </section>
  )
}
