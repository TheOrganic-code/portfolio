import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
    <section className="relative z-10 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="section-label mb-3">
          <div className="line" />
          <span>Open Source</span>
        </div>
        <p className="text-sm mb-10" style={{ color: '#707070' }}>
          Recent repositories on{' '}
          <a href="https://github.com/TheOrganic-code" target="_blank" className="underline-anim" style={{ color: '#FF5C8A' }}>github.com/TheOrganic-code</a>
        </p>

        {loading ? (
          <div className="text-sm" style={{ color: '#707070' }}>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.html_url} target="_blank"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="card p-4 block"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  <span className="text-white text-sm font-medium truncate">{repo.name}</span>
                </div>
                <p className="text-xs mb-2.5 min-h-[1.2rem]" style={{ color: '#707070' }}>{repo.description || ''}</p>
                <div className="flex items-center gap-3">
                  {repo.language && <span className="text-xs font-mono" style={{ color: '#A0A0A0' }}>{repo.language}</span>}
                  <span className="text-xs flex items-center gap-1" style={{ color: '#707070' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    {repo.stargazers_count}
                  </span>
                  <span className="text-xs flex items-center gap-1" style={{ color: '#707070' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3h5v5M8 3H3v5M12 20v.01M12 16v.01M12 12v.01M12 8v.01"/></svg>
                    {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
