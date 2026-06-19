import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  return (
    <p ref={ref} className={`relative ${className}`}>
      {text.split('').map((char, i) => {
        const start = i / text.length
        const end = start + 1 / text.length
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])
        return (
          <span key={i} className="relative inline-block">
            <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
            <motion.span
              className="absolute inset-0"
              style={{ opacity }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        )
      })}
    </p>
  )
}
