import { useRef, useEffect, useState } from 'react'

const unsplashImages = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80',
  'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80',
]

const row1Images = unsplashImages.slice(0, 11)
const tripledRow1 = [...row1Images, ...row1Images, ...row1Images]
const row2Images = unsplashImages.slice(11, 21)
const tripledRow2 = [...row2Images, ...row2Images, ...row2Images]

function ImageTile({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
    />
  )
}

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(200)

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const sectionTop = rect.top + scrollY
      const newOffset = (scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(newOffset)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div
        className="flex gap-3 mb-3"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {tripledRow1.map((url, i) => (
          <ImageTile key={`r1-${i}`} src={url} />
        ))}
      </div>

      <div
        className="flex gap-3"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
        }}
      >
        {tripledRow2.map((url, i) => (
          <ImageTile key={`r2-${i}`} src={url} />
        ))}
      </div>
    </section>
  )
}
