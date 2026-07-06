const experiences = [
  {
    date: '2026',
    title: 'Neutron Beam Award Recipient',
    org: 'Spallation Neutron Source (SNS), Oak Ridge National Laboratory',
    desc: 'Awarded competitive neutron beam time at the Spallation Neutron Source, Oak Ridge National Laboratory (Oak Ridge, TN, US). Proposal IPTS-36564. Conducted research using world-class neutron scattering facilities from January to June 2026.',
  },
  {
    date: '2025',
    title: 'Finalist — Union Bank Ideathon',
    org: 'Union Bank of India',
    desc: 'Recognized as a finalist in the Union Bank Ideathon for developing innovative solutions in fintech and banking technology.',
  },
  {
    date: '2025 — Present',
    title: 'Undergraduate Researcher',
    org: 'Quantum Materials Lab, RGIPT',
    desc: 'Developing accelerated muon-site detection methodology for μSR experiments under Dr. Tathamay Basu. Research evolved from computational condensed matter physics to building computational frameworks combining modern optimization, scientific computing, crystallographic symmetry, and physics-guided algorithms.',
  },
  {
    date: '2025 — Present',
    title: 'Researcher',
    org: 'Qinetic Research Lab',
    desc: 'Working on quantum computing, quantum information, Physics-Informed Neural Networks (PINNs), and computational methods for next-generation quantum technologies.',
  },
  {
    date: '2025 — Present',
    title: 'AI Engineer Intern',
    org: 'DigiTwin Technology',
    desc: 'Fine-tuning large language models, building Retrieval-Augmented Generation (RAG) systems, developing enterprise AI solutions, data engineering pipelines, and deploying production-ready AI applications.',
  },
  {
    date: '2025 — Present',
    title: 'Researcher',
    org: 'Grunchie Labs',
    desc: 'Contributing to AI-focused research projects and experimental software systems across multiple domains.',
  },
  {
    date: '2024 — 2025',
    title: 'Project Lead Developer',
    org: 'Dripfeed',
    desc: 'Led technical development efforts during the platform\'s early stages.',
  },
  {
    date: '2024',
    title: 'Participant',
    org: 'Stanford Code in Place',
    desc: 'Completed Stanford University\'s Code in Place program, strengthening software engineering and programming foundations.',
  },
  {
    date: '2024 — 2029',
    title: 'B.Tech Mathematics and Computing',
    org: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)',
    desc: 'CPI: 8.68/10.0. Relevant areas: linear algebra, differential equations, probability theory, numerical methods, computational physics, systems programming.',
  },
]

export function ExperienceSection() {
  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
      <div style={{ position: 'relative', paddingLeft: 28, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
        {experiences.map((exp) => (
          <div key={exp.title + exp.date} style={{ marginBottom: 32, position: 'relative' }}>
            <div style={{
              position: 'absolute', left: -33, top: 6, width: 10, height: 10,
              borderRadius: '50%', background: '#c8d8ff', border: '2px solid #0a0a0f',
            }} />
            <div style={{
              fontSize: 12, color: 'rgba(240,239,248,0.55)', textTransform: 'uppercase',
              letterSpacing: 1, marginBottom: 4,
            }}>
              {exp.date}
            </div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600, marginBottom: 2 }}>
              {exp.title}
            </h3>
            <div style={{ fontSize: 14, color: '#7b68ee', marginBottom: 8 }}>
              {exp.org}
            </div>
            <p style={{ fontSize: 14, color: 'rgba(240,239,248,0.55)', lineHeight: 1.7 }}>
              {exp.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
