interface PillToggleProps<T extends string> {
  options: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
  size?: 'sm' | 'md'
}

/** Sidegent-style pill mode switcher. */
export function PillToggle<T extends string>({ options, value, onChange, size = 'md' }: PillToggleProps<T>) {
  const pad = size === 'sm' ? 'px-3.5 py-1.5 text-xs' : 'px-5 py-2 text-sm'
  return (
    <div className="inline-flex flex-wrap justify-center gap-1.5 rounded-full border border-line bg-night-800/80 p-1.5">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`${pad} cursor-pointer rounded-full font-medium transition-all duration-200 ${
            value === opt.id
              ? 'bg-accent/15 text-accent shadow-[0_0_14px_rgba(45,212,191,0.25)] ring-1 ring-accent/40'
              : 'text-muted hover:text-ink'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
