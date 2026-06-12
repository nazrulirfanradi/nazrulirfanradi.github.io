import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LinkedinIcon } from './ui/BrandIcons'
import { profile } from '../data/profile'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai-lab', label: 'AI Lab' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      let current = ''
      for (const link of navLinks) {
        const el = document.getElementById(link.id)
        if (el && el.getBoundingClientRect().top <= 140) current = link.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pl-3 pr-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
        {/* Identity */}
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-bold text-accent ring-1 ring-accent/40">
            {profile.initials}
          </span>
          <span className="hidden flex-col leading-tight min-[420px]:flex">
            <span className="font-display text-sm font-semibold text-ink">{profile.name}</span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-green-400" />
              Supply Chain × Data × AI
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === link.id ? 'bg-accent/10 text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-accent/10 hover:text-accent sm:flex"
          >
            <LinkedinIcon size={17} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-night transition-all hover:bg-glow hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] sm:flex"
          >
            Let's Talk
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass mx-auto mt-2 max-w-5xl rounded-3xl p-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-sm ${
                    active === link.id ? 'bg-accent/10 text-accent' : 'text-muted'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="mt-1 block rounded-xl bg-accent px-4 py-2.5 text-center text-sm font-semibold text-night"
              >
                Let's Talk
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
