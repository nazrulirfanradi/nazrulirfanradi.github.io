import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Check, ChevronRight, RotateCcw } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { PillToggle } from './ui/PillToggle'
import { Reveal } from './ui/Reveal'
import { pipelineModes, terminalCode, currentlyLearning } from '../data/pipeline'

const BEAT_MS = 1300

export function AILab() {
  const [modeId, setModeId] = useState(pipelineModes[0].id)
  const mode = pipelineModes.find((m) => m.id === modeId)!

  // Sequencer: how many output lines are currently visible
  const [lineCount, setLineCount] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px' })

  useEffect(() => {
    if (!inView) return
    if (lineCount >= mode.lines.length) return
    const t = setTimeout(() => setLineCount((c) => c + 1), lineCount === 0 ? 400 : BEAT_MS)
    return () => clearTimeout(t)
  }, [inView, lineCount, mode.lines.length])

  const switchMode = (id: string) => {
    setModeId(id)
    setLineCount(0)
  }
  const replay = () => setLineCount(0)

  const activeStage = lineCount === 0 ? -1 : mode.lines[Math.min(lineCount, mode.lines.length) - 1].stage
  const done = lineCount >= mode.lines.length

  return (
    <section id="ai-lab" ref={sectionRef} className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <SectionHeading
        chip="AI & Automation Lab"
        title={`See ${mode.headline}.`}
        accent={mode.headline}
        subtitle="The mechanics behind my work, animated beat by beat — the same flows I build with Power Automate, Airflow and AI agents."
      />

      <Reveal className="flex justify-center">
        <PillToggle
          options={pipelineModes.map((m) => ({ id: m.id, label: m.label }))}
          value={modeId}
          onChange={switchMode}
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        {/* Pipeline player */}
        <Reveal className="lg:col-span-3">
          <div className="glass flex h-full flex-col rounded-2xl p-6">
            {/* stage pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {mode.stages.map((stage, i) => (
                <div key={stage} className="flex items-center gap-1.5">
                  <span
                    className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition-all duration-500 ${
                      i === activeStage && !done
                        ? 'bg-accent text-night shadow-[0_0_18px_rgba(45,212,191,0.6)]'
                        : i <= activeStage || done
                          ? 'bg-accent/15 text-accent ring-1 ring-accent/40'
                          : 'bg-night-800 text-muted ring-1 ring-line'
                    }`}
                  >
                    {stage}
                  </span>
                  {i < mode.stages.length - 1 && (
                    <ChevronRight size={13} className={i < activeStage || done ? 'text-accent' : 'text-line'} />
                  )}
                </div>
              ))}
            </div>

            {/* terminal output */}
            <div className="mt-5 flex-1 rounded-xl border border-line bg-night p-4 font-mono text-[13px] leading-7">
              <AnimatePresence>
                {mode.lines.slice(0, lineCount).map((line, i) => (
                  <motion.p
                    key={`${modeId}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={line.accent ? 'text-accent' : 'text-muted'}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </AnimatePresence>
              {!done && (
                <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-accent/80 align-middle" />
              )}
              {done && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-green-400">
                  ── pipeline complete ✓
                </motion.p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted">
                Based on real flows I run at work — replayed with demo values.
              </p>
              <button
                onClick={replay}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-accent/40 px-4 py-1.5 text-sm font-medium text-accent transition-all hover:bg-accent/10"
              >
                <RotateCcw size={14} />
                Replay
              </button>
            </div>
          </div>
        </Reveal>

        {/* Right column: checklist + learning */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* self-ticking checklist */}
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Run Checklist</p>
              <ul className="mt-4 space-y-3">
                {mode.checklist.map((item) => {
                  const ticked = done || item.stage < activeStage || (item.stage === activeStage && done)
                  const current = item.stage === activeStage && !done
                  return (
                    <li key={`${modeId}-${item.text}`} className="flex items-center gap-3 text-sm">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
                          ticked
                            ? 'border-accent bg-accent text-night'
                            : current
                              ? 'border-accent/60 bg-accent/10'
                              : 'border-line'
                        }`}
                      >
                        {ticked && <Check size={12} strokeWidth={3} />}
                        {current && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />}
                      </span>
                      <span className={ticked ? 'text-ink' : current ? 'text-accent' : 'text-muted'}>
                        {item.text}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>

          {/* currently learning — live card */}
          <Reveal delay={0.2}>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Currently Learning</p>
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-green-400" />
                  live
                </span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {currentlyLearning.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-line bg-night-800/70 px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-ink"
                  >
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center font-mono text-[11px] text-muted">+ always one more thing</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* self-typing code editor */}
      <Reveal className="mt-6">
        <TypingTerminal />
      </Reveal>
    </section>
  )
}

/** Code editor mockup that types an Airflow DAG line by line. */
function TypingTerminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [pos, setPos] = useState({ line: 0, char: 0 })

  const totalLines = terminalCode.length
  const finished = pos.line >= totalLines

  useEffect(() => {
    if (!inView || finished) return
    const currentLine = terminalCode[pos.line].text
    const t = setTimeout(
      () => {
        if (pos.char < currentLine.length) {
          setPos({ line: pos.line, char: pos.char + 1 })
        } else {
          setPos({ line: pos.line + 1, char: 0 })
        }
      },
      currentLine.length === 0 ? 80 : 26,
    )
    return () => clearTimeout(t)
  }, [inView, pos, finished])

  return (
    <div ref={ref} className="glass overflow-hidden rounded-2xl">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-line bg-night-800/80 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-300/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-xs text-muted">shipment_quality_pipeline.py — what my automations look like</span>
      </div>
      <div className="min-h-56 bg-night/80 p-5 font-mono text-[13px] leading-7">
        {terminalCode.slice(0, finished ? totalLines : pos.line + 1).map((line, i) => {
          const isCurrent = !finished && i === pos.line
          const text = isCurrent ? line.text.slice(0, pos.char) : line.text
          return (
            <p key={i} className="flex">
              <span className="mr-4 w-5 select-none text-right text-line">{i + 1}</span>
              <span className={line.color || 'text-ink'}>
                {text}
                {isCurrent && <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-accent/80 align-middle" />}
              </span>
            </p>
          )
        })}
      </div>
    </div>
  )
}
