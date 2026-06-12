import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading } from './ui/SectionHeading'
import { PillToggle } from './ui/PillToggle'
import { Reveal } from './ui/Reveal'
import { skillCategories } from '../data/skills'

export function Skills() {
  const [active, setActive] = useState(skillCategories[0].id)
  const category = skillCategories.find((c) => c.id === active)!

  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-28 px-4 py-20">
      <SectionHeading
        chip="Skills"
        title="The stack I work with"
        accent="stack"
        subtitle="Tools I use to move data from messy source systems to dashboards leadership trusts."
      />

      <Reveal className="flex justify-center">
        <PillToggle
          options={skillCategories.map((c) => ({ id: c.id, label: c.label }))}
          value={active}
          onChange={setActive}
        />
      </Reveal>

      <div className="mt-10 flex min-h-44 items-start justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex max-w-3xl flex-wrap justify-center gap-3"
          >
            {category.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                className="glass rounded-xl px-5 py-3 font-display text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
