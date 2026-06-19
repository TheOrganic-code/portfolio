import { motion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { AnimatedText } from './AnimatedText'
import { ContactButton } from './ContactButton'

const decoImages = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: 'Moon icon',
    className: 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
    delay: 0.1, x: -80, y: 0,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: '3D object',
    className: 'w-[100px] sm:w-[140px] md:w-[180px] bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
    delay: 0.25, x: -80, y: 0,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: 'Lego icon',
    className: 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
    delay: 0.15, x: 80, y: 0,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: '3D group',
    className: 'w-[130px] sm:w-[170px] md:w-[220px] bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
    delay: 0.3, x: 80, y: 0,
  },
]

export function AboutSection() {
  return (
    <section className="min-h-screen flex items-center relative px-5 sm:px-8 md:px-10 py-20 overflow-hidden bg-[#0C0C0C]">
      {/* Decorative images */}
      {decoImages.map((img, i) => (
        <FadeIn
          key={i}
          as="div"
          delay={img.delay}
          x={img.x}
          y={img.y}
          duration={0.9}
          className={`absolute ${img.className} z-0`}
        >
          <img src={img.src} alt={img.alt} className="w-full h-auto opacity-60" />
        </FadeIn>
      ))}

      {/* Content */}
      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn as="h2" delay={0} y={40} className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </FadeIn>

        <AnimatedText
          text="I'm an undergrad researcher at RGIPT working at the intersection of condensed matter physics and ML systems — muon spin relaxation with physics-informed neural networks, LLM inference optimization, and neural frameworks in Rust. I truly enjoy building at the boundaries where physics meets code."
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' } as React.CSSProperties}
        />

        <div className="mt-16 sm:mt-20 md:mt-24">
          <a href="mailto:grunchie1801@gmail.com">
            <ContactButton />
          </a>
        </div>
      </div>
    </section>
  )
}
