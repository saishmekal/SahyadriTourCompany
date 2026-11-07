import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { apiRequest } from '../services/api'

type Destination = {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  location: string
}

type DestinationsResponse = {
  status: string
  results: number
  data: {
    destinations: Destination[]
  }
}

function Destinations() {
  const trackRef = useRef<HTMLDivElement>(null)

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch published destinations from the backend.
  useEffect(() => {
    let ignore = false

    async function loadDestinations() {
      try {
        setLoading(true)
        setError('')

        const response = await apiRequest<DestinationsResponse>(
          '/destinations',
        )

        if (!ignore) {
          setDestinations(response.data.destinations)
          setActiveIndex(0)
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load destinations.',
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    void loadDestinations()

    return () => {
      ignore = true
    }
  }, [])

  // Scroll to a particular destination.
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

  // Move the carousel forward or backward.
  const moveCarousel = (direction: -1 | 1) => {
    const nextIndex = Math.max(
      0,
      Math.min(destinations.length - 1, activeIndex + direction),
    )

    scrollToDestination(nextIndex)
  }

  // Update active pagination indicator while scrolling.
  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return

    const cards = Array.from(
      track.children,
    ) as HTMLElement[]

    let closestIndex = 0
    let smallestDistance = Infinity

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.offsetLeft - track.offsetLeft - track.scrollLeft,
      )

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
      <div className="mx-auto max-w-340">

        {/* Section heading and arrows */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#899775]">
              Discover Maharashtra
            </p>

            <h2 className="font-serif text-3xl text-[#2E3D24] sm:text-4xl">
              Popular Destinations
            </h2>

            <div className="mt-3 h-0.5 w-10 bg-[#5D7141]" />
          </div>

          {destinations.length > 1 && (
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
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div
            className="flex gap-4 overflow-hidden"
            aria-label="Loading destinations"
          >
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-[85%] shrink-0 overflow-hidden rounded-xl border border-[#E8E8E0] bg-[#FEFAF4] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
              >
                <div className="h-52 animate-pulse bg-[#E9EDE4] lg:h-44" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#E9EDE4]" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-[#E9EDE4]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
          >
            <p className="text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 text-sm font-semibold text-[#536449] underline"
            >
              Reload page
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && destinations.length === 0 && (
          <div className="rounded-xl border border-[#E8E8E0] bg-[#FEFAF4] px-6 py-12 text-center">
            <MapPin
              size={30}
              className="mx-auto mb-3 text-[#899775]"
            />

            <h3 className="font-serif text-xl text-[#2E3D24]">
              No destinations available
            </h3>

            <p className="mt-2 text-sm text-[#66705D]">
              We're preparing some beautiful destinations for you.
              Please check back soon.
            </p>
          </div>
        )}

        {/* Destination Cards */}
        {!loading && !error && destinations.length > 0 && (
          <>
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
            >
              {destinations.map((destination, index) => (
                <motion.article
                  key={destination._id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.35,
                    delay: (index % 4) * 0.05,
                  }}
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
                        alt={destination.name}
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={416}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

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

            {/* Pagination Indicators */}
            {destinations.length > 1 && (
              <div
                className="mt-6 flex items-center justify-center gap-2"
                aria-label="Choose a destination"
              >
                {destinations.map((destination, index) => (
                  <button
                    key={destination._id}
                    type="button"
                    onClick={() => scrollToDestination(index)}
                    aria-label={`Go to ${destination.name}`}
                    aria-current={
                      activeIndex === index ? 'true' : undefined
                    }
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'w-7 bg-[#5D7141]'
                        : 'w-2 bg-[#D8DDC7] hover:bg-[#899775]'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Destinations