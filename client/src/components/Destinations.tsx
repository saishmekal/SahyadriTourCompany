
import { useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const destinations = [
  {
    name: 'Rajgad Fort',
    location: 'Pune, Maharashtra',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    alt: 'Mountain ranges surrounded by clouds',
  },
  {
    name: 'Kalsubai Peak',
    location: 'Ahmednagar, Maharashtra',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
    alt: 'Natural landscape with green hills',
  },
  {
    name: 'Torana Fort',
    location: 'Pune, Maharashtra',
    image:
      'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=800&q=80',
    alt: 'Rocky mountain landscape',
  },
  {
    name: 'Tamhini Ghat',
    location: 'Pune, Maharashtra',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    alt: 'Lush green forest',
  },
  {
    name: 'Mahabaleshwar',
    location: 'Satara, Maharashtra',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    alt: 'Peaceful mountain lake surrounded by hills',
  },
  {
    name: 'Matheran',
    location: 'Raigad, Maharashtra',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    alt: 'Scenic natural landscape',
  },
  {
    name: 'Manali',
    location: 'Himachal Pradesh',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    alt: 'Mountain peaks under a starry sky',
  },
  {
    name: 'Munnar',
    location: 'Kerala',
    image:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    alt: 'Green mountain scenery',
  },
]

function Destinations() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToDestination = (index: number) => {
    const track = trackRef.current
    const card = track?.children[index] as HTMLElement | undefined

    if (!track || !card) return

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: 'smooth',
    })

    setActiveIndex(index)
  }

  const moveCarousel = (direction: -1 | 1) => {
    const nextIndex = Math.max(
      0,
      Math.min(destinations.length - 1, activeIndex + direction),
    )

    scrollToDestination(nextIndex)
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return

    const cards = Array.from(track.children) as HTMLElement[]

    let closestIndex = 0
    let smallestDistance = Infinity

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - track.scrollLeft)

      if (distance < smallestDistance) {
        smallestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  return (
    <section
      id="destinations"
      className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Section heading and arrows */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#899775]">
              Discover Maharashtra
            </p>

            <h2 className="font-serif text-3xl text-[#2E3D24] sm:text-4xl">
              Popular Destinations
            </h2>

            <div className="mt-3 h-[2px] w-10 bg-[#5D7141]" />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              disabled={activeIndex === 0}
              aria-label="Previous destination"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DDC7] text-[#2E3D24] transition hover:bg-[#F2F4EB] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={() => moveCarousel(1)}
              disabled={activeIndex === destinations.length - 1}
              aria-label="Next destination"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DDC7] text-[#2E3D24] transition hover:bg-[#F2F4EB] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        {/* Scrollable destination cards */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
              className="group w-[85%] shrink-0 snap-start overflow-hidden rounded-xl border border-[#E8E8E0] bg-[#FEFAF4] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
            >
              <a
                href="#packages"
                className="block"
                aria-label={`Explore tours to ${destination.name}`}
              >
                <div className="relative h-52 overflow-hidden lg:h-44">
                  <img
                    src={destination.image}
                    alt={destination.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute bottom-4 left-4 font-serif text-xl text-white">
                    {destination.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-3.5">
                  <MapPin
                    size={14}
                    className="shrink-0 text-[#5D7141]"
                    aria-hidden="true"
                  />

                  <span className="truncate text-xs text-[#66705D]">
                    {destination.location}
                  </span>

                  <ArrowRight
                    size={15}
                    className="ml-auto shrink-0 text-[#5D7141] transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* Pagination indicators */}
        <div
          className="mt-6 flex items-center justify-center gap-2"
          aria-label="Choose a destination"
        >
          {destinations.map((destination, index) => (
            <button
              key={destination.name}
              type="button"
              onClick={() => scrollToDestination(index)}
              aria-label={`Go to ${destination.name}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-7 bg-[#5D7141]'
                  : 'w-2 bg-[#D8DDC7] hover:bg-[#899775]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Destinations
