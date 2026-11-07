
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { apiRequest } from '../services/api'

type ItineraryItem = {
  day?: number
  title?: string
  description?: string
}

type Package = {
  _id: string
  name: string
  slug: string
  duration: string
  category: string
  image: string
  description: string
  itinerary?: (string | ItineraryItem)[]
  inclusions?: string[]
  exclusions?: string[]
}

type PackageResponse = {
  status: string
  data: {
    package: Package
  }
}

export default function PackageDetails() {
  const { slug } = useParams<{ slug: string }>()

  const [packageData, setPackageData] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch package details
  useEffect(() => {
    let ignore = false

    async function loadPackage() {
      try {
        setLoading(true)
        setError('')

        const response = await apiRequest<PackageResponse>(
          `/packages/${slug}`,
        )

        if (!ignore) {
          setPackageData(response.data.package)
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load package details.',
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    if (slug) {
      void loadPackage()
    }

    return () => {
      ignore = true
    }
  }, [slug])

  // Dynamic SEO metadata
  useEffect(() => {
    if (!packageData) return

    const previousTitle = document.title

    const description =
      packageData.description ||
      `Explore ${packageData.name} with Sahyadri Tour Company. Discover your next adventure in the Sahyadris.`

    document.title = `${packageData.name} | Sahyadri Tour Company`

    function updateMetaTag(
      selector: string,
      attribute: string,
      value: string,
    ) {
      let tag = document.querySelector<HTMLMetaElement>(selector)

      if (!tag) {
        tag = document.createElement('meta')
        document.head.appendChild(tag)
      }

      tag.setAttribute(attribute, value)
    }

    updateMetaTag(
      'meta[name="description"]',
      'content',
      description,
    )

    updateMetaTag(
      'meta[property="og:title"]',
      'content',
      `${packageData.name} | Sahyadri Tour Company`,
    )

    updateMetaTag(
      'meta[property="og:description"]',
      'content',
      description,
    )

    updateMetaTag(
      'meta[property="og:image"]',
      'content',
      packageData.image,
    )

    updateMetaTag(
      'meta[property="og:type"]',
      'content',
      'website',
    )

    return () => {
      document.title = previousTitle
    }
  }, [packageData])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FEFAF4]">
        <p className="animate-pulse text-sm text-[#66705D]">
          Loading package details...
        </p>
      </div>
    )
  }

  if (error || !packageData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FEFAF4] px-5 text-center">
        <h1 className="font-serif text-2xl text-[#2E3D24]">
          Package not found
        </h1>

        <p className="mt-3 text-sm text-[#66705D]">
          {error || 'This package may no longer be available.'}
        </p>

        <Link
          to="/"
          className="mt-6 rounded bg-[#5D7141] px-5 py-3 text-sm text-white"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FEFAF4] text-[#66705D]">
      <header className="border-b border-[#D8DDC7] bg-white px-5 py-4">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#5D7141] hover:text-[#2E3D24]"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="overflow-hidden rounded-xl border border-[#D8DDC7] bg-white">
          <div className="relative">
            <img
              src={packageData.image}
              alt={packageData.name}
              className="h-64 w-full object-cover sm:h-96"
            />

            <span className="absolute bottom-4 left-4 rounded bg-[#5D7141] px-3 py-2 text-xs font-medium text-white">
              {packageData.duration}
            </span>
          </div>

          <div className="p-5 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-widest text-[#5D7141]">
              {packageData.category}
            </p>

            <h1 className="mt-3 font-serif text-3xl font-medium text-[#2E3D24] sm:text-4xl">
              {packageData.name}
            </h1>

            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#66705D]">
              {packageData.description}
            </p>

            {/* Itinerary */}
            {packageData.itinerary &&
              packageData.itinerary.length > 0 && (
                <section className="mt-10">
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    Trip Itinerary
                  </h2>

                  <div className="mt-5 space-y-4">
                    {packageData.itinerary.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-[#D8DDC7] bg-[#FEFAF4] p-4"
                      >
                        {typeof item === 'string' ? (
                          <p className="text-sm leading-6">{item}</p>
                        ) : (
                          <>
                            <h3 className="font-semibold text-[#2E3D24]">
                              {item.day ? `Day ${item.day}: ` : ''}
                              {item.title || `Day ${index + 1}`}
                            </h3>

                            {item.description && (
                              <p className="mt-2 text-sm leading-6">
                                {item.description}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Inclusions and exclusions */}
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {packageData.inclusions &&
                packageData.inclusions.length > 0 && (
                  <section>
                    <h2 className="font-serif text-xl text-[#2E3D24]">
                      What's Included
                    </h2>

                    <ul className="mt-4 space-y-3">
                      {packageData.inclusions.map((item, index) => (
                        <li key={index} className="text-sm">
                          <span className="mr-2 text-[#5D7141]">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

              {packageData.exclusions &&
                packageData.exclusions.length > 0 && (
                  <section>
                    <h2 className="font-serif text-xl text-[#2E3D24]">
                      What's Not Included
                    </h2>

                    <ul className="mt-4 space-y-3">
                      {packageData.exclusions.map((item, index) => (
                        <li key={index} className="text-sm">
                          <span className="mr-2 text-[#66705D]">–</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
            </div>

            {/* WhatsApp Enquiry */}
            <div className="mt-10 rounded-lg bg-[#FEFAF4] p-5 sm:p-6">
              <h2 className="font-serif text-xl text-[#2E3D24]">
                Interested in this adventure?
              </h2>

              <p className="mt-2 text-sm">
                Get in touch with us to enquire about this package.
              </p>

              <a
                href={`https://wa.me/919769003745?text=${encodeURIComponent(
                  `Hello Sahyadri Tour Company! I'm interested in your ${packageData.name} package (${packageData.duration}). Please share more details about availability and booking.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded bg-[#5D7141] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#414B3A]"
              >
                Enquire Now on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}