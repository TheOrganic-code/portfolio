const stats = [
  { value: '8.68', label: 'CPI / 10.0' },
  { value: 'ORNL', label: 'Neutron Beam Award' },
  { value: '2', label: 'Papers' },
  { value: '3', label: 'Research Labs' },
  { value: '10+', label: 'Technologies' },
]

export function StatsBar() {
  return (
    <div style={{
      display: 'flex', gap: 40, padding: '20px 0',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      marginBottom: 80, flexWrap: 'wrap',
    }}>
      {stats.map((s) => (
        <div key={s.label} style={{ textAlign: 'center', minWidth: 100 }}>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 600, color: '#c8d8ff',
          }}>
            {s.value}
          </div>
          <div style={{
            fontSize: 12, color: 'rgba(240,239,248,0.55)',
            textTransform: 'uppercase', letterSpacing: 1, marginTop: 4,
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
