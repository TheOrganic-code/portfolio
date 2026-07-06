const honors = [
  {
    label: 'Neutron Beam Award — Oak Ridge National Laboratory',
    title: 'Spallation Neutron Source (SNS) — IPTS-36564',
    desc: 'Awarded competitive neutron beam time at the Spallation Neutron Source, Oak Ridge National Laboratory (Oak Ridge, TN, US). Conducted research using world-class neutron scattering facilities at one of the most advanced neutron science centers in the world. January to June 2026.',
    border: 'rgba(123,104,238,0.3)',
    bg: 'rgba(123,104,238,0.04)',
  },
  {
    label: 'Finalist',
    title: 'Union Bank Ideathon',
    desc: 'Recognized as a finalist in the Union Bank Ideathon for developing innovative solutions in fintech and banking technology.',
    border: 'rgba(245,158,11,0.3)',
    bg: 'rgba(245,158,11,0.03)',
  },
]

export function HonorsSection() {
  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
      {honors.map((h) => (
        <div
          key={h.title}
          className="honor-card"
          style={{
            padding: 32, border: `1px solid ${h.border}`, background: h.bg,
            borderRadius: 12, marginBottom: 16, cursor: 'default',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,216,255,0.3)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = h.border
          }}
        >
          <div style={{ fontSize: 11, color: '#7b68ee', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 12 }}>
            {h.label}
          </div>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
            {h.title}
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(240,239,248,0.55)', lineHeight: 1.7, maxWidth: 700 }}>
            {h.desc}
          </p>
        </div>
      ))}
    </section>
  )
}
