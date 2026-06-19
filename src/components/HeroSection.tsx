import { TerminalAnimation } from './TerminalAnimation'

export function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-24 pb-16 grid-bg">
      {/* Gradient blobs */}
      <div className="blob blob-pink" style={{ width: '500px', height: '500px', top: '-10%', right: '-5%' }} />
      <div className="blob blob-soft" style={{ width: '400px', height: '400px', bottom: '-5%', left: '-5%' }} />

      <div className="max-w-5xl mx-auto w-full relative">
        {/* Terminal status */}
        <div className="mb-8">
          <TerminalAnimation />
        </div>

        {/* Name */}
        <h1
          className="font-bold tracking-tight leading-none mb-5"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            letterSpacing: '-0.04em',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Ayush{' '}
          <span style={{ color: '#FF5C8A' }}>Pandey</span>
        </h1>

        {/* Titles */}
        <div className="space-y-1 mb-6">
          <p className="text-base sm:text-lg md:text-xl" style={{ color: '#A0A0A0', fontWeight: 400 }}>
            Undergraduate Researcher <span style={{ color: '#FF5C8A' }}>@</span> QM Lab, RGIPT
          </p>
          <p className="text-base sm:text-lg md:text-xl" style={{ color: '#A0A0A0', fontWeight: 400 }}>
            AI Engineer Intern <span style={{ color: '#FF5C8A' }}>@</span> DigitiTwin
          </p>
        </div>

        {/* Bio */}
        <p
          className="text-sm sm:text-base max-w-2xl leading-relaxed mb-10"
          style={{ color: '#707070', lineHeight: '1.7' }}
        >
          Building intelligent systems at the intersection of Machine Learning, Scientific Computing, Physics, and Probabilistic Computing.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <a href="/Ayush_Pandey_Resume.pdf" download className="btn btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Resume
          </a>
          <a href="https://github.com/TheOrganic-code" target="_blank" className="btn btn-outline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/ayushpandey1801/" target="_blank" className="btn btn-outline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="mailto:grunchie1801@gmail.com" className="btn btn-outline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>
        </div>
      </div>
    </section>
  )
}
