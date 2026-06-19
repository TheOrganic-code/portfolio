import { motion } from 'framer-motion'
import { ContactButton } from './ContactButton'
import { FadeIn } from './FadeIn'
import { Magnet } from './Magnet'

const navLinks = ['About', 'Price', 'Projects', 'Contact']

export function HeroSection() {
  return (
    <section className="h-screen flex flex-col relative overflow-hidden" style={{ overflowX: 'clip' }}>
      {/* Navbar */}
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Hero Heading */}
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn as="p" delay={0.35} y={20} className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
          an ML researcher driven by crafting striking and impactful AI systems
        </FadeIn>
        <FadeIn as="div" delay={0.5} y={20}>
          <a href="mailto:grunchie1801@gmail.com">
            <ContactButton />
          </a>
        </FadeIn>
      </div>

      {/* Portrait - Magnet effect */}
      <FadeIn as="div" delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <Magnet padding={150} strength={3} className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Ayush Pandey portrait"
            className="w-full h-auto"
          />
        </Magnet>
      </FadeIn>
    </section>
  )
}
