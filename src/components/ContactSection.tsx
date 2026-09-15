import { useRef, useEffect, useState } from 'react'

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setPulse(true)
        }
      },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!pulse) return
    const interval = setInterval(() => setPulse(p => !p), 2000)
    return () => clearInterval(interval)
  }, [pulse])

  const links = [
    { label: 'GitHub', href: 'https://github.com/TheOrganic-code', icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    )},
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayushpandey1801/', icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )},
    { label: 'HuggingFace', href: 'https://huggingface.co/TheOrganic-code', icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx={12} cy={12} r={10} />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )},
    { label: 'ORCID', href: 'https://orcid.org/0009-0003-9128-8045', icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-5.5-6.5h1.5v-3h-1.5v3zm0-4.5h1.5V6.5h-1.5v1.5z"/>
      </svg>
    )},
    { label: 'Email', href: 'mailto:25mc3016@rgipt.ac.in', icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )},
  ]

  return (
    <section
      ref={containerRef}
      id="contact"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '100px 32px 80px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-labelledby="contact-title"
    >
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
        <h2 id="contact-title" style={{ fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.15, marginBottom: 16 }}>
          Interested in research, systems, or difficult technical problems?
        </h2>
        <p style={{ fontSize: 16, color: '#9b9a94', lineHeight: 1.7 }}>
          I\'m always open to discussing research collaborations, systems engineering challenges, or opportunities at the intersection of scientific computing and AI.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 60 }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto') ? undefined : 'noopener'}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 24px', border: '1px solid rgba(155,154,148,0.2)',
              borderRadius: 8, color: '#f2eee7', fontSize: 13, fontWeight: 500,
              fontFamily: 'var(--sans)', textDecoration: 'none',
              background: 'rgba(22,22,22,0.6)', backdropFilter: 'blur(10px)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#4ecdc4'
              e.currentTarget.style.background = 'rgba(78,205,196,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(155,154,148,0.2)'
              e.currentTarget.style.background = 'rgba(22,22,22,0.6)'
            }}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>

      <div style={{
        borderTop: '1px solid rgba(155,154,148,0.15)', paddingTop: 40,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600, color: '#f2eee7',
          }}>
            Ayush Pandey
          </span>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: '#4ecdc4',
            boxShadow: pulse ? '0 0 12px #4ecdc4, 0 0 24px #4ecdc4' : '0 0 8px #4ecdc4',
            transition: 'box-shadow 0.5s ease',
            animation: pulse ? 'pulse 2s ease-in-out infinite' : 'none',
          }} />
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase',
            letterSpacing: 1.5, color: '#6b6a65',
          }}>
            Jais, Amethi, Uttar Pradesh, India
          </span>
        </div>

        <p style={{ fontSize: 12, color: '#6b6a65', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Ayush Pandey · Built with React, TypeScript, and first principles
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 8px #4ecdc4; }
          50% { box-shadow: 0 0 20px #4ecdc4, 0 0 40px rgba(78,205,196,0.4); }
        }
      `}</style>
    </section>
  )
}