import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin glowing progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent to-glow shadow-[0_0_12px_rgba(45,212,191,0.7)]"
      style={{ scaleX }}
    />
  )
}
