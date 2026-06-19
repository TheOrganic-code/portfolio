import { FadeIn } from './FadeIn'

const navLinks = ['About', 'Experience', 'Projects', 'Contact']

export function HeroSection() {
  return (
    <section className="h-screen flex flex-col relative overflow-hidden" style={{ overflowX: 'clip' }}>
      <FadeIn as="nav" delay={0} y={-20} className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
        <div />
        {navLinks.map((link) => (
          <a
            key={link}
            href={link === 'Contact' ? '#contact' : `#${link.toLowerCase()}`}
            className="hover:opacity-70 transition-opacity duration-200"
          >
            {link}
          </a>
        ))}
        <div />
      </FadeIn>

      <div className="flex-1" />

      <FadeIn
        as="div"
        delay={0.15}
        y={40}
        className="overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5"
      >
        <h1
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full"
          style={{ fontSize: 'clamp(3.5rem, 17.5vw, 17.5vw)' }}
        >
          Hi, i&apos;m Ayush
        </h1>
      </FadeIn>

      <div className="flex-1" />

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn as="p" delay={0.35} y={20} className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
          an ML researcher working at the intersection of physics and systems
        </FadeIn>
        <FadeIn as="div" delay={0.5} y={20}>
          <a href="mailto:grunchie1801@gmail.com">
            <button
              className="rounded-full text-white font-medium uppercase tracking-widest
                         px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
                         text-xs sm:text-sm md:text-base"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid white',
                outlineOffset: '-3px',
              }}
            >
              Contact Me
            </button>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
