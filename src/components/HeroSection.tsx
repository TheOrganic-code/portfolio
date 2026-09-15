import { useEffect, useRef } from 'react'
import { PhysicsAscii } from './PhysicsAscii'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.section-reveal')
    elements?.forEach((el, i) => {
      el.classList.add('section-reveal')
      el.style.transitionDelay = `${i * 100}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="opening"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto',
        padding: '140px 32px 100px', minHeight: '100vh',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60,
        alignItems: 'center',
      }}
      aria-labelledby="hero-title"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div className="section-reveal" style={{ transitionDelay: '0ms' }}>
          <span className="eyebrow">AYUSH PANDEY / MATHEMATICS + COMPUTING</span>
        </div>
        <div className="section-reveal" style={{ transitionDelay: '100ms' }}>
          <h1 id="hero-title" style={{ fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 1.02, marginBottom: 8 }}>
            From mathematical idea to working system.
          </h1>
        </div>
        <div className="section-reveal" style={{ transitionDelay: '200ms' }}>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-soft)', lineHeight: 1.7, maxWidth: 540 }}>
            I study physical and computational systems, then build the machinery underneath them.
            Scientific ML, μSR spectroscopy, quantum computing, probabilistic computing,
            Rust systems programming, LLM optimization, and GPU inference infrastructure.
          </p>
        </div>
        <div className="section-reveal" style={{ transitionDelay: '300ms', display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
          <button className="btn-primary" onClick={() => document.getElementById('atlas')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore the Work
          </button>
          <a href="#timeline" className="btn-secondary">
            Read the Résumé
          </a>
        </div>
        <div className="section-reveal" style={{ transitionDelay: '400ms', marginTop: 8 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
            letterSpacing: 2, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 10
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 12px var(--accent-cyan)' }} />
            RESEARCH · SYSTEMS · COMPUTE
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 580, aspectRatio: '1' }}>
          <PhysicsAscii reducedMotion={false} />
        </div>
        <div className="section-reveal" style={{
          position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
          transitionDelay: '500ms', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
        }}>
          <span>01 / 06</span>
          <svg width={20} height={32} viewBox="0 0 20 32" fill="none" style={{ animation: 'scrollDown 2s ease-in-out infinite' }}>
            <path d="M10 2 L10 28" stroke="var(--text-muted)" strokeWidth={1.5} strokeLinecap="round" />
            <circle cx={10} cy={28} r={3} stroke="var(--text-muted)" strokeWidth={1.5} fill="none" />
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
        @media (prefers-reduced-motion: reduce) {
          .scroll-cue { animation: none; opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}