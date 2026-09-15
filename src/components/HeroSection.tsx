import { useEffect, useRef } from 'react'
import { HeroSignal } from './AsciiScenes'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const pm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pm) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.section-reveal')
    elements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto',
        padding: '140px 32px 100px', minHeight: '100vh',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60,
        alignItems: 'center',
      }}
      aria-labelledby="hero-title"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="section-reveal" style={{ transitionDelay: '0ms' }}>
          <span className="eyebrow">AYUSH PANDEY / RESEARCH + SYSTEMS</span>
        </div>
        <div className="section-reveal" style={{ transitionDelay: '100ms' }}>
          <h1 id="hero-title" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1.05, marginBottom: 8 }}>
            Research-grade systems, built from first principles.
          </h1>
        </div>
        <div className="section-reveal" style={{ transitionDelay: '200ms' }}>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#9b9a94', lineHeight: 1.7, maxWidth: 520 }}>
            Undergraduate researcher and AI engineer working across scientific machine learning, computational condensed matter, quantum information, and high-performance ML systems.
          </p>
        </div>
        <div className="section-reveal" style={{ transitionDelay: '300ms', display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
          <button className="btn-primary" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore the Work
          </button>
          <a href="https://github.com/TheOrganic-code" target="_blank" rel="noopener" className="btn-secondary">
            Open GitHub
          </a>
        </div>
        <div className="section-reveal" style={{ transitionDelay: '400ms', marginTop: 16 }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase',
            letterSpacing: 1.5, color: '#6b6a65', display: 'inline-flex', alignItems: 'center', gap: 8
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ecdc4', boxShadow: '0 0 12px #4ecdc4' }} />
            Open to research collaborations & systems engineering roles
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 520, aspectRatio: '1' }}>
          <div style={{
            position: 'absolute', inset: -20, zIndex: -1,
            background: 'radial-gradient(ellipse at center, rgba(78,205,196,0.06) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', inset: -10, zIndex: -1,
            border: '1px solid rgba(78,205,196,0.1)', borderRadius: '50%',
          }} />
          <HeroSignal width={64} height={26} speed={1} />
        </div>
        <div className="section-reveal" style={{
          position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
          transitionDelay: '500ms', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          fontFamily: 'var(--mono)', fontSize: 10, color: '#6b6a65',
        }}>
          <span>01 / 06</span>
          <svg width={20} height={32} viewBox="0 0 20 32" fill="none" style={{ animation: 'scrollDown 2s ease-in-out infinite' }}>
            <path d="M10 2 L10 28" stroke="#9b9a94" strokeWidth={1.5} strokeLinecap="round" />
            <circle cx={10} cy={28} r={3} stroke="#9b9a94" strokeWidth={1.5} fill="none" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(8px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.6; }
        }
        @media (max-width: 900px) {
          section { grid-template-columns: 1fr; gap: 40; padding-top: 120px; }
          .scroll-cue { display: none; }
        }
      `}</style>
    </section>
  )
}