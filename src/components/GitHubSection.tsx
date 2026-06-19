import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Repo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
}

export function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/TheOrganic-code/repos?sort=updated&per_page=8')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section className="relative z-10 px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="w-1 h-5 bg-[#8B5CF6] rounded-full" />
          <h2 className="text-sm font-medium text-[#8B5CF6] uppercase tracking-widest">Open Source</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#707070] text-base max-w-xl mb-12"
        >
          Recent repositories on{' '}
          <a href="https://github.com/TheOrganic-code" target="_blank" className="text-[#8B5CF6] hover:underline">
            github.com/TheOrganic-code
          </a>
        </motion.p>

        {loading ? (
          <div className="text-[#707070] text-sm">Loading repositories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-border rounded-xl p-4 card-hover block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  <span className="text-white text-sm font-medium truncate">{repo.name}</span>
                </div>
                <p className="text-[#707070] text-xs mb-3 line-clamp-2 min-h-[2rem]">
                  {repo.description || 'No description'}
                </p>
                <div className="flex items-center gap-4">
                  {repo.language && (
                    <span className="text-[#A0A0A0] text-xs">{repo.language}</span>
                  )}
                  <span className="text-[#707070] text-xs flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    {repo.stargazers_count}
                  </span>
                  <span className="text-[#707070] text-xs flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3h5v5M8 3H3v5M12 20v.01M12 16v.01M12 12v.01M12 8v.01"/></svg>
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
