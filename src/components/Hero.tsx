import { motion } from 'framer-motion'
import { ArrowDown, Mail, BarChart3, Database, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'
import { profile } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'
import { ParticleBackground } from './ui/ParticleBackground'

export function Hero() {
  const { text: typed, index } = useTypewriter(profile.roles)
  // "an" before vowel-starting roles (Aspiring..., AI...), "a" otherwise
  const article = /^[aeiou]/i.test(profile.roles[index]) ? 'an' : 'a'

  return (
    <section id="top" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-10">
      <ParticleBackground />
      {/* radial glow behind headline */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-night-800/80 px-4 py-1.5 text-sm text-muted"
        >
          <MapPin size={13} className="text-accent" />
          {profile.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          Hello, my name is <span className="text-accent text-glow">{profile.name}</span>!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 font-display text-2xl font-medium text-ink sm:text-3xl lg:text-4xl"
        >
          I am {article}{' '}
          <span className="text-accent">
            {typed}
            <span className="ml-0.5 inline-block w-[3px] animate-blink bg-accent" style={{ height: '1em', verticalAlign: '-0.12em' }} />
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg"
        >
          {profile.tagline} Power BI · SQL · Python · Azure · Databricks — built inside real supply chains at{' '}
          <span className="text-ink">BASF</span> and <span className="text-ink">Nestlé</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-night transition-all hover:bg-glow hover:shadow-[0_0_28px_rgba(45,212,191,0.5)]"
          >
            <BarChart3 size={18} />
            View My Work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 font-semibold text-accent transition-all hover:bg-accent/10"
          >
            <Mail size={18} />
            Let's Talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-9 flex items-center justify-center gap-3"
        >
          {[
            { icon: <LinkedinIcon size={18} />, url: profile.socials.linkedin, label: 'LinkedIn' },
            { icon: <GithubIcon size={18} />, url: profile.socials.github, label: 'GitHub' },
            { icon: <Database size={18} />, url: profile.socials.kaggle, label: 'Kaggle' },
            { icon: <BarChart3 size={18} />, url: profile.socials.maven, label: 'Maven Analytics' },
            { icon: <Mail size={18} />, url: `mailto:${profile.email}`, label: 'Email' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  )
}
