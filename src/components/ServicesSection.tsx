import { FadeIn } from './FadeIn'

const services = [
  {
    num: '01',
    name: 'ML Research',
    desc: 'Muon spin relaxation analysis using physics-informed neural networks and deep learning for crystal structure characterization and material property prediction.',
  },
  {
    num: '02',
    name: 'LLM Systems',
    desc: 'Fine-tuning large language models on domain-specific datasets, building RAG pipelines for enterprise knowledge retrieval, and optimizing inference with vLLM and quantization.',
  },
  {
    num: '03',
    name: 'Scientific Computing',
    desc: 'High-performance numerical computing with Python, PyTorch, NumPy, and SciPy for physical dataset analysis, optimization, and computational modeling.',
  },
  {
    num: '04',
    name: 'Rust Engineering',
    desc: 'Building neural network frameworks from scratch in Rust — memory-safe, zero-cost abstractions, automatic differentiation, and high-performance tensor operations.',
  },
  {
    num: '05',
    name: 'AI Infrastructure',
    desc: 'Optimizing ML inference pipelines with KV caching, FlashAttention, speculative decoding, GPTQ, AWQ, and BitsAndBytes for production-ready low-bit deployment.',
  },
]

export function ServicesSection() {
  return (
    <section
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((svc, i) => (
          <FadeIn
            key={svc.num}
            as="div"
            delay={i * 0.1}
            className="flex gap-6 sm:gap-10 items-start py-8 sm:py-10 md:py-12"
            style={{ borderBottom: i < services.length - 1 ? '1px solid rgba(12,12,12,0.15)' : undefined }}
          >
            {/* Number */}
            <span
              className="text-[#0C0C0C] font-black flex-shrink-0 leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {svc.num}
            </span>
            {/* Content */}
            <div className="pt-2 sm:pt-3 md:pt-4">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {svc.name}
              </h3>
              <p
                className="font-light leading-relaxed max-w-2xl opacity-60 text-[#0C0C0C]"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {svc.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
