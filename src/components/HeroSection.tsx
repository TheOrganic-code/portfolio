import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const pm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pm) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
      tl.fromTo('.hero-name', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0 }, 0)
      tl.fromTo('.hero-role', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
      tl.fromTo('.hero-edu', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
      tl.fromTo('.hero-location', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65 }, 0.25)
      tl.fromTo('.hero-bio', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75 }, 0.35)
      tl.fromTo('.hero-links', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65 }, 0.45)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto',
        padding: '100px 32px 80px', display: 'flex', gap: 60, alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      <div style={{
        flexShrink: 0, width: 180, height: 180, borderRadius: '50%',
        background: 'none', border: 'none', overflow: 'visible',
      }}>
        <img
          src="https://avatars.githubusercontent.com/u/214618867?v=4"
          alt="Ayush Pandey"
          style={{
            width: 180, height: 180, borderRadius: '50%', objectFit: 'cover',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 40px rgba(200,216,255,0.1)',
          }}
        />
      </div>

      <div style={{ flex: 1, paddingTop: 8 }}>
        <div className="hero-role" style={{
          fontSize: 13, textTransform: 'uppercase', letterSpacing: 2,
          color: '#7b68ee', marginBottom: 8, fontWeight: 500,
        }}>
          Co-Founder & Research Lead
        </div>
        <h1 className="hero-name" style={{
          fontFamily: 'var(--serif)', fontSize: 56, fontWeight: 500,
          lineHeight: 1.1, letterSpacing: '-.8px', marginBottom: 12,
        }}>
          Ayush Pandey
        </h1>
        <div className="hero-edu" style={{ fontSize: 15, color: 'rgba(240,239,248,0.55)', marginBottom: 6 }}>
          <strong style={{ color: '#f0eff8', fontWeight: 500 }}>B.Tech Mathematics and Computing</strong> &middot; Rajiv Gandhi Institute of Petroleum Technology (RGIPT)
        </div>
        <div className="hero-location" style={{ fontSize: 14, color: 'rgba(240,239,248,0.55)', marginBottom: 20 }}>
          Jais, Amethi, Uttar Pradesh, India &middot; Class of 2029
        </div>
        <p className="hero-bio" style={{
          fontSize: 15, color: 'rgba(240,239,248,0.55)', lineHeight: 1.8,
          maxWidth: 620, marginBottom: 24,
        }}>
          Undergraduate researcher and AI engineer working across scientific machine learning, condensed matter physics, quantum information, large language models, systems programming, and high-performance computing. Driven by first-principles thinking — develops research-grade software from scratch rather than relying on existing abstractions. Reads research papers, derives algorithms, and implements methods independently.
        </p>
        <div className="hero-links" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { href: 'https://github.com/TheOrganic-code', label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/ayushpandey1801/', label: 'LinkedIn' },
            { href: 'https://orcid.org/0009-0003-9128-8045', label: 'ORCID' },
            { href: 'https://huggingface.co/TheOrganic-code', label: 'HuggingFace' },
            { href: 'https://discord.com/users/viperkun', label: 'Discord: viperkun' },
            { href: 'mailto:25mc3016@rgipt.ac.in', label: '25mc3016@rgipt.ac.in' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener'}
              style={{
                fontSize: 13, color: '#c8d8ff', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px',
                borderRadius: 6,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
