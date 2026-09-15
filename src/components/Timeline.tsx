import { useRef, useEffect, useState } from 'react'

const timelineItems = [
  {
    date: '2026',
    title: 'Neutron Beam Award Recipient',
    org: 'Spallation Neutron Source (SNS), Oak Ridge National Laboratory',
    location: 'Oak Ridge, TN, US',
    type: 'honor',
    description: 'Awarded competitive neutron beam time at the Spallation Neutron Source, Oak Ridge National Laboratory. Proposal IPTS-36564. Conducted research using world-class neutron scattering facilities from January to June 2026.',
  },
  {
    date: '2025',
    title: 'Finalist — Union Bank Ideathon',
    org: 'Union Bank of India',
    location: 'India',
    type: 'honor',
    description: 'Recognized as a finalist in the Union Bank Ideathon for developing innovative solutions in fintech and banking technology.',
  },
  {
    date: '2025 — Present',
    title: 'Undergraduate Researcher',
    org: 'Quantum Materials Lab, RGIPT',
    location: 'Jais, Amethi, Uttar Pradesh, India',
    type: 'experience',
    description: 'Developing accelerated muon-site detection methodology for μSR experiments under Dr. Tathamay Basu. Research evolved from computational condensed matter physics to building computational frameworks combining modern optimization, scientific computing, crystallographic symmetry, and physics-guided algorithms.',
  },
  {
    date: '2025 — Present',
    title: 'Researcher',
    org: 'Qinetic Research Lab',
    location: 'Remote',
    type: 'experience',
    description: 'Working on quantum computing, quantum information, Physics-Informed Neural Networks (PINNs), and computational methods for next-generation quantum technologies.',
  },
  {
    date: '2025 — Present',
    title: 'AI Engineer Intern',
    org: 'DigiTwin Technology',
    location: 'Remote',
    type: 'experience',
    description: 'Fine-tuning large language models, building Retrieval-Augmented Generation (RAG) systems, developing enterprise AI solutions, data engineering pipelines, and deploying production-ready AI applications.',
  },
  {
    date: '2025 — Present',
    title: 'Researcher',
    org: 'Grunchie Labs',
    location: 'Remote',
    type: 'experience',
    description: 'Contributing to AI-focused research projects and experimental software systems across multiple domains.',
  },
  {
    date: '2024 — 2025',
    title: 'Project Lead Developer',
    org: 'Dripfeed',
    location: 'Remote',
    type: 'experience',
    description: 'Led technical development efforts during the platform\'s early stages.',
  },
  {
    date: '2024',
    title: 'Participant — Stanford Code in Place',
    org: 'Stanford University',
    location: 'Online',
    type: 'experience',
    description: 'Completed Stanford University\'s Code in Place program, strengthening software engineering and programming foundations.',
  },
  {
    date: '2024 — 2029',
    title: 'B.Tech Mathematics and Computing',
    org: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)',
    location: 'Jais, Amethi, Uttar Pradesh, India',
    type: 'education',
    description: 'CPI: 8.68/10.0. Relevant areas: linear algebra, differential equations, probability theory, numerical methods, computational physics, systems programming. Class of 2029.',
  },
]

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const items = containerRef.current?.querySelectorAll('[data-index]')
    items?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      id="timeline"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 120px', padding: '0 32px',
      }}
      aria-labelledby="timeline-title"
    >
      <div style={{ marginBottom: 40 }}>
        <span className="section-index">04 / 06</span>
        <h2 id="timeline-title" style={{ marginTop: 8 }}>Research Timeline</h2>
        <p style={{ marginTop: 12, color: '#9b9a94', maxWidth: 600, fontSize: 16 }}>
          Chronological record of research positions, engineering roles, honors, and education.
        </p>
      </div>

      <div style={{ position: 'relative', paddingLeft: 32 }}>
        <div style={{
          position: 'absolute', left: 15, top: 0, bottom: 0, width: 1,
          background: 'linear-gradient(180deg, transparent, rgba(78,205,196,0.3) 20%, rgba(78,205,196,0.3) 80%, transparent)',
        }} />

        {timelineItems.map((item, index) => {
          const isVisible = visibleItems.has(index)
          const dotColor = item.type === 'honor' ? '#b87333' : item.type === 'education' ? '#4ecdc4' : '#4ecdc4'
          const borderColor = item.type === 'honor' ? 'rgba(184,115,51,0.3)' : 'rgba(78,205,196,0.3)'

          return (
            <div
              key={`${item.date}-${item.title}`}
              data-index={index}
              style={{
                position: 'relative', marginBottom: 40, paddingLeft: 24,
                opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <div style={{
                position: 'absolute', left: -32, top: 6, width: 12, height: 12,
                borderRadius: '50%', background: dotColor, border: `3px solid #121212`,
                boxShadow: `0 0 0 1px ${borderColor}`,
                zIndex: 1,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                <span className="meta-label" style={{ whiteSpace: 'nowrap' }}>{item.date}</span>
                {item.type === 'honor' && (
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase',
                    letterSpacing: 1, color: '#b87333', background: 'rgba(184,115,51,0.1)',
                    border: '1px solid rgba(184,115,51,0.2)', borderRadius: 4, padding: '2px 8px',
                  }}>Honor</span>
                )}
                {item.type === 'education' && (
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase',
                    letterSpacing: 1, color: '#4ecdc4', background: 'rgba(78,205,196,0.1)',
                    border: '1px solid rgba(78,205,196,0.2)', borderRadius: 4, padding: '2px 8px',
                  }}>Education</span>
                )}
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{item.title}</h3>
              <div style={{
                fontSize: 14, color: '#4ecdc4', marginBottom: 4,
                display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
              }}>
                <span>{item.org}</span>
                <span style={{ color: '#6b6a65', fontFamily: 'var(--mono)', fontSize: 11 }}>{item.location}</span>
              </div>

              <p style={{ fontSize: 14, color: '#9b9a94', lineHeight: 1.7 }}>
                {item.description}
              </p>
            </div>
          )
        })}

        <div style={{
          position: 'absolute', left: 15, bottom: -20, width: 12, height: 12,
          borderRadius: '50%', background: '#121212', border: '1px solid rgba(155,154,148,0.2)',
        }} />
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          div[style*="paddingLeft: 32"] { padding-left: 24; }
          div[style*="left: -32"] { left: -24; }
          div[style*="left: 15"] { left: 11; }
        }
      `}</style>
    </section>
  )
}