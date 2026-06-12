import { Reveal } from './Reveal'

interface SectionHeadingProps {
  chip: string
  title: string
  accent?: string // word(s) inside title to colorize
  subtitle?: string
}

export function SectionHeading({ chip, title, accent, subtitle }: SectionHeadingProps) {
  const parts = accent ? title.split(accent) : [title]
  return (
    <Reveal className="mb-12 text-center">
      <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
        {chip}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
        {accent ? (
          <>
            {parts[0]}
            <span className="text-accent text-glow">{accent}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted">{subtitle}</p>}
    </Reveal>
  )
}
