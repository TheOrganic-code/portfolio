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
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
        background: scrolled ? 'rgba(10,10,15,.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'none',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#f0eff8' }}>
          <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
            <rect width={28} height={28} rx={4} fill="none" />
            <polygon points="14,2 17,8 24,9 19,14 20,21 14,18 8,21 9,14 4,9 11,8" fill="#c8d8ff" />
            <circle cx={14} cy={2} r={1.2} fill="#fff" />
            <circle cx={16.9} cy={7.8} r={1} fill="#fff" />
            <circle cx={24} cy={9} r={0.7} fill="#fff" />
            <circle cx={18.9} cy={14.2} r={0.9} fill="#fff" />
            <circle cx={19.8} cy={20.5} r={0.6} fill="#fff" />
          </svg>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600, letterSpacing: '-.3px' }}>
            Grunchie Lab
          </span>
        </a>
      </div>
    </nav>
  )
}
