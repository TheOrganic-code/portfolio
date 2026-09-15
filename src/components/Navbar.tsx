import { useState, useEffect, useCallback } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    if (window.scrollY > 40) setScrolled(true)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background .4s cubic-bezier(.22,1,.36,1), backdrop-filter .4s cubic-bezier(.22,1,.36,1), border-color .4s cubic-bezier(.22,1,.36,1)',
        borderBottom: `1px solid ${scrolled ? 'rgba(141,168,168,0.12)' : 'transparent'}`,
        background: scrolled ? 'rgba(8,11,14,.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'none',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1280, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--text-main)' }}>
          <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
            <rect x={0.5} y={0.5} width={27} height={27} rx={4} fill="none" stroke="var(--accent-cyan)" strokeWidth={1.5} />
            <path d="M14 6 L14 22 M6 14 L22 14" stroke="var(--accent-cyan)" strokeWidth={1.5} strokeLinecap="round" />
            <circle cx={14} cy={14} r={3} fill="none" stroke="var(--accent-cyan)" strokeWidth={1.5} />
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, letterSpacing: '-.3px' }}>
            Ayush Pandey
          </span>
        </a>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
          letterSpacing: 2, color: 'var(--text-muted)',
        }}>
          Research · Systems · Compute
        </span>
      </div>
    </nav>
  )
}