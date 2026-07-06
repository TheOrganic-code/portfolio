import { useState, useEffect } from 'react'

interface Repo {
  name: string; description: string | null; html_url: string
  language: string | null; stargazers_count: number; forks_count: number
}

export function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/TheOrganic-code/repos?sort=updated&per_page=8')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRepos(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
      <p style={{ fontSize: 14, color: 'rgba(240,239,248,0.55)', marginBottom: 24 }}>
        Recent repositories on{' '}
        <a href="https://github.com/TheOrganic-code" target="_blank" rel="noopener" style={{ color: '#c8d8ff', textDecoration: 'none' }}>
          github.com/TheOrganic-code
        </a>
      </p>

      {loading ? (
        <div style={{ fontSize: 14, color: 'rgba(240,239,248,0.55)' }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener"
              style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: 20, textDecoration: 'none', display: 'block',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,216,255,0.3)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="rgba(240,239,248,0.55)" strokeWidth={1.5}>
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span style={{ color: '#f0eff8', fontSize: 14, fontWeight: 500 }}>
                  {repo.name}
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(240,239,248,0.55)', marginBottom: 8, minHeight: '1.2em' }}>
                {repo.description || ''}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {repo.language && (
                  <span style={{ fontSize: 11, color: 'rgba(240,239,248,0.55)', fontFamily: 'monospace' }}>
                    {repo.language}
                  </span>
                )}
                <span style={{ fontSize: 11, color: 'rgba(240,239,248,0.55)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {repo.stargazers_count}
                </span>
                <span style={{ fontSize: 11, color: 'rgba(240,239,248,0.55)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M16 3h5v5M8 3H3v5M12 20v.01M12 16v.01M12 12v.01M12 8v.01" />
                  </svg>
                  {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
