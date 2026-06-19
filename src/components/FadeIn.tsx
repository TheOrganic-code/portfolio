import { motion } from 'framer-motion'
import { createElement } from 'react'

interface FadeInProps {
  as?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  children: React.ReactNode
}

export function FadeIn({
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  children,
}: FadeInProps) {
  return createElement(
    motion[as as keyof typeof motion],
    {
      className,
      initial: { opacity: 0, x, y },
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport: { once: true, margin: '50px', amount: 0 },
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    children
  )
}
