import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { apiRequest } from '../services/api'
import { Link } from 'react-router-dom'

type Package = {
  _id: string
  name: string
  slug: string
  duration: string
  category: string
  image: string
  description?: string
}

type PackagesResponse = {
  status: string
  results: number
  data: {
    packages: Package[]
  }
}

export default function TopPackages() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadPackages() {
      try {
        setLoading(true)
        setError('')

        const response = await apiRequest<PackagesResponse>('/packages')

        if (!ignore) {
          setPackages(response.data.packages.slice(0, 3))
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load packages. Please try again.',
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    void loadPackages()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-5 flex items-center justify-between gap-3 sm:mb-7">
          <div>
            <h2
              id="packages-heading"
              className="font-serif text-xl font-medium tracking-tight text-[#2E3D24] sm:text-2xl"
            >
              Top Packages
            </h2>

            <div className="mt-2 h-0.5 w-9 rounded-full bg-[#5D7141]" />
          </div>

          <a
            href="#all-packages"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-[#5D7141] transition-colors hover:text-[#2E3D24] sm:text-xs"
          >
            View All Packages
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-lg border border-[#D8DDC7] bg-[#FEFAF4]"
              >
                <div className="h-48 bg-[#EAEDE3] sm:h-44 lg:h-48" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 rounded bg-[#EAEDE3]" />
                  <div className="h-3 w-1/2 rounded bg-[#EAEDE3]" />
                  <div className="h-9 rounded bg-[#EAEDE3]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-lg border border-[#D8DDC7] bg-[#FEFAF4] px-4 py-8 text-center">
            <p className="text-sm text-[#66705D]">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 text-sm font-semibold text-[#5D7141] underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && packages.length === 0 && (
          <div className="rounded-lg border border-[#D8DDC7] bg-[#FEFAF4] px-4 py-10 text-center">
            <p className="text-sm text-[#66705D]">
              No packages are available at the moment. Please check back soon.
            </p>
          </div>
        )}

        {/* Package cards */}
        {!loading && !error && packages.length > 0 && (
          <div className="relative">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {packages.map((item) => (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-lg border border-[#D8DDC7] bg-[#FEFAF4] transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Package image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={384}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-44 lg:h-48"
                    />

                    <span className="absolute left-2 top-2 rounded bg-[#5D7141] px-2 py-1 text-[10px] font-medium text-white">
                      {item.duration}
                    </span>
                  </div>

                  {/* Package details */}
                  <div className="p-3 sm:p-3.5">
                    <h3 className="text-sm font-semibold leading-snug text-[#2E3D24]">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-[#66705D]">
                      {item.category}
                    </p>

                    <Link
                      to={`/packages/${item.slug}`}
                      className="mt-3 flex min-h-9 w-full items-center justify-center rounded border border-[#C7D0B5] px-3 py-2 text-xs font-medium text-[#5D7141] transition-colors hover:border-[#5D7141] hover:bg-[#5D7141] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D7141]"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Decorative navigation controls */}
            <button
              type="button"
              aria-label="Previous packages"
              disabled
              className="absolute -left-3 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8DDC7] bg-white text-[#66705D] shadow-sm disabled:cursor-default lg:flex"
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Next packages"
              disabled
              className="absolute -right-3 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8DDC7] bg-white text-[#66705D] shadow-sm disabled:cursor-default lg:flex"
            >
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}