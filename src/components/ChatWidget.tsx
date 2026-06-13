import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { chatbotConfig } from '../data/chatbot'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text: string) => {
    const question = text.trim()
    if (!question || loading) return
    setInput('')

    const history = messages // prior turns for context
    setMessages((m) => [...m, { role: 'user', content: question }])
    setLoading(true)

    // Backend not wired up yet → friendly placeholder, no broken UI.
    if (!chatbotConfig.workerUrl) {
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content:
              "I'm almost ready! Nazrul just needs to connect my backend. In the meantime, reach him at nazrulirfanradi@gmail.com.",
          },
        ])
        setLoading(false)
      }, 500)
      return
    }

    try {
      const res = await fetch(chatbotConfig.workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history }),
      })
      const data = await res.json()
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: data.reply || data.error || 'Something went wrong. Please try again.' },
      ])
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'I could not reach the server. Please try again in a moment.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating launcher bubble */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat — ask about Nazrul'}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-night shadow-[0_8px_30px_rgba(45,212,191,0.45)] transition-colors hover:bg-glow"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="glass fixed bottom-24 right-5 z-[70] flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-night-800/80 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/40">
                <Bot size={18} />
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-semibold text-ink">Ask about Nazrul</p>
                <p className="flex items-center gap-1 text-[11px] text-muted">
                  <Sparkles size={10} className="text-accent" /> AI · answers only about Nazrul
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {/* Greeting */}
              <Bubble role="assistant">{chatbotConfig.greeting}</Bubble>

              {/* Starter chips (only before the first user message) */}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {chatbotConfig.starters.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-left text-xs text-accent transition-colors hover:bg-accent/15"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <Bubble key={i} role={m.role}>
                  {m.content}
                </Bubble>
              ))}

              {loading && (
                <Bubble role="assistant">
                  <span className="inline-flex gap-1">
                    <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
                  </span>
                </Bubble>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-line bg-night-800/80 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, chatbotConfig.maxInputChars))}
                placeholder="Ask about Nazrul…"
                className="flex-1 rounded-full border border-line bg-night px-4 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-night transition-all hover:bg-glow disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-accent text-night'
            : 'rounded-bl-sm border border-line bg-night-800 text-ink'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-muted"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ repeat: Infinity, duration: 1, delay }}
    />
  )
}
