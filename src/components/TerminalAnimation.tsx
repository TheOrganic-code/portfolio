import { useState, useEffect } from 'react'

const symbols = ['◐', '◓', '◑', '◒']
const messages = [
  'Initializing',
  'Loading Models',
  'Materializing Ideas',
  'Crystallizing Research',
  'Building Systems',
  'Exploring Probabilistic Computing',
  'Ready',
]

export function TerminalAnimation() {
  const [symbolIdx, setSymbolIdx] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const symInterval = setInterval(() => {
      setSymbolIdx((prev) => (prev + 1) % symbols.length)
    }, 200)

    const msgInterval = setInterval(() => {
      setMsgIdx((prev) => {
        if (prev >= messages.length - 1) {
          setDone(true)
          return prev
        }
        return prev + 1
      })
    }, 800)

    return () => {
      clearInterval(symInterval)
      clearInterval(msgInterval)
    }
  }, [])

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1E1E1E] bg-[#131313] font-mono text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <span
        className="transition-opacity duration-150"
        style={{ color: done ? '#22C55E' : '#FF5C8A' }}
      >
        {done ? '✓' : symbols[symbolIdx]}
      </span>
      <span
        className="transition-all duration-300"
        style={{ color: done ? '#22C55E' : '#A0A0A0' }}
      >
        {done ? 'Ready' : messages[msgIdx]}
      </span>
      {!done && (
        <span className="w-[2px] h-3.5 bg-[#FF5C8A] animate-pulse ml-0.5" />
      )}
    </div>
  )
}
