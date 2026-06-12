import type { HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
}

export function GlassCard({ glow = false, className = '', children, ...rest }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_8px_40px_rgba(45,212,191,0.12)] ${
        glow ? 'glow-border' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
