import { useEffect, useState } from 'react'

/**
 * Cycles through `words`, typing then deleting each one.
 * Returns the currently visible slice of text and the index of the current word.
 */
export function useTypewriter(
  words: string[],
  { typeMs = 70, deleteMs = 35, holdMs = 1800 }: { typeMs?: number; deleteMs?: number; holdMs?: number } = {},
) {
  const [wordIndex, setWordIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    let delay = deleting ? deleteMs : typeMs
    if (!deleting && length === word.length) delay = holdMs

    const timer = setTimeout(() => {
      if (!deleting) {
        if (length === word.length) {
          setDeleting(true)
        } else {
          setLength(length + 1)
        }
      } else {
        if (length === 0) {
          setDeleting(false)
          setWordIndex((wordIndex + 1) % words.length)
        } else {
          setLength(length - 1)
        }
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [words, wordIndex, length, deleting, typeMs, deleteMs, holdMs])

  return { text: words[wordIndex].slice(0, length), index: wordIndex }
}
