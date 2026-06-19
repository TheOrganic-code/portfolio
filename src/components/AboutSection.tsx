import { FadeIn } from './FadeIn'
import { AnimatedText } from './AnimatedText'

const decoImages = [
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    alt: 'Technology abstract',
    className: 'w-[120px] sm:w-[160px] md:w-[200px] top-[4%] left-[1%] sm:left-[2%] md:left-[4%] rounded-2xl opacity-40',
    delay: 0.1, x: -80, y: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
    alt: 'Data center',
    className: 'w-[100px] sm:w-[140px] md:w-[170px] bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] rounded-2xl opacity-40',
    delay: 0.25, x: -80, y: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80',
    alt: 'AI robot',
    className: 'w-[120px] sm:w-[160px] md:w-[200px] top-[4%] right-[1%] sm:right-[2%] md:right-[4%] rounded-2xl opacity-40',
    delay: 0.15, x: 80, y: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&q=80',
    alt: 'Circuit board',
    className: 'w-[130px] sm:w-[170px] md:w-[210px] bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] rounded-2xl opacity-40',
    delay: 0.3, x: 80, y: 0,
  },
]

export function AboutSection() {
  return (
    <section className="min-h-screen flex items-center relative px-5 sm:px-8 md:px-10 py-20 overflow-hidden bg-[#0C0C0C]">
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
          <img src={img.src} alt={img.alt} className="w-full h-auto" />
        </FadeIn>
      ))}

      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn as="h2" delay={0} y={40} className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </FadeIn>

        <AnimatedText
          text="I'm an undergrad researcher at RGIPT working at the intersection of condensed matter physics and ML systems. Co-author on a muon spin relaxation paper submitted to Physical Review B. First-author paper in drafting combining ML with muon SR. I build at the boundaries where physics meets code."
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' } as React.CSSProperties}
        />

        <div className="mt-16 sm:mt-20 md:mt-24">
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
        </div>
      </div>
    </section>
  )
}
