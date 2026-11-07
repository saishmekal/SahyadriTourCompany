
import { useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'

const galleryImages = [
  {
    title: 'Mountain Escapes',
    category: 'Nature',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85',
    alt: 'Beautiful mountain landscape surrounding a peaceful lake',
    size: 'lg:row-span-2',
  },
  {
    title: 'Coastal Getaways',
    category: 'Beaches',
    image:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Beautiful ocean waves along a coastal destination',
    size: '',
  },
  {
    title: 'Heritage Journeys',
    category: 'Culture',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=85',
    alt: 'Distinctive historical architecture and cultural destination',
    size: '',
  },
  {
    title: 'Nature Trails',
    category: 'Adventure',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85',
    alt: 'Scenic natural landscape with mountains and a lake',
    size: '',
  },
  {
    title: 'Scenic Road Trips',
    category: 'Road Trips',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Dramatic mountain peaks and scenic travel landscape',
    size: '',
  },
  {
    title: 'Beautiful Destinations',
    category: 'Travel',
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',
    alt: 'Open scenic landscape under a beautiful sky',
    size: 'lg:col-span-2',
  },
  {
    title: 'Tropical Escapes',
    category: 'Island Getaways',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85',
    alt: 'Beautiful tropical beach with turquoise water and white sand',
    size: '',
  },
]

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[number] | null
  >(null)

  return (
    <section
      id="gallery"
      className="scroll-mt-20 bg-[#FEFAF4] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-360">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#71834F]">
            Moments Worth Remembering
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#2E3D24] sm:text-5xl lg:text-6xl">
            Explore Our
            <span className="block italic text-[#71834F]">
              Travel Gallery
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#66705D] sm:text-base">
            From breathtaking landscapes to beautiful destinations,
            discover the experiences and places that make every journey special.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid auto-rows-55 grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-62.5 lg:grid-cols-3 lg:auto-rows-65">
          {galleryImages.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setSelectedImage(item)}
              aria-label={`View ${item.title} image`}
              className={`group relative overflow-hidden rounded-2xl text-left ${item.size}`}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                width={1200}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-xl text-white sm:text-2xl">
                    {item.title}
                  </h3>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#2E3D24]">
                  <ArrowUpRight size={19} aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#89917D]">
          A glimpse of the journeys and experiences waiting to be explored.
        </p>
      </div>

      {/* Image lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <X size={23} />
          </button>

          <div
            className="w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.alt}
              className="max-h-[78vh] w-full rounded-xl object-contain"
            />

            <div className="mt-4 text-center">
              <h3 className="font-serif text-2xl text-white">
                {selectedImage.title}
              </h3>
              <p className="mt-1 text-sm text-white/70">
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery