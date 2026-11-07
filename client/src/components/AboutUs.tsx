import { Mountain, Compass, Heart } from 'lucide-react'

const highlights = [
  {
    icon: Mountain,
    title: 'Explore Nature',
    description: 'Discover the beauty of the Sahyadri mountains and their remarkable landscapes.',
  },
  {
    icon: Compass,
    title: 'Discover More',
    description: 'Experience new destinations, scenic routes and memorable journeys.',
  },
  {
    icon: Heart,
    title: 'Travel With Care',
    description: 'Enjoy thoughtful travel experiences with comfort and attention to detail.',
  },
]

function AboutUs() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-[#F5F1E8] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-360 items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80"
              alt="Beautiful mountain landscape surrounded by nature"
              loading="lazy"
              decoding="async"
              width={1200}
              height={1000}
              className="h-80 w-full object-cover sm:h-105 lg:h-125"
            />
          </div>

          <div className="absolute -bottom-5 -right-3 rounded-2xl bg-[#4D5E2C] px-6 py-5 text-white shadow-lg sm:-right-5">
            <p className="font-serif text-2xl">Sahyadri</p>
            <p className="mt-1 text-xs tracking-widest text-white">
              EXPLORE • EXPERIENCE • ENJOY
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="pt-4 lg:pt-0">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#71834F]">
            Get to Know Us
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#2E3D24] sm:text-5xl lg:text-6xl">
            Discover the
            <span className="block italic text-[#71834F]">
              Spirit of Sahyadri
            </span>
          </h2>

          <p className="mt-7 text-base leading-8 text-[#66705D]">
            Welcome to Sahyadri Tour Company, where every journey is an
            opportunity to discover the beauty of nature, explore new
            destinations and create lasting memories.
          </p>

          <p className="mt-4 text-base leading-8 text-[#66705D]">
            From scenic mountain landscapes to unforgettable travel
            experiences, we aim to make every trip meaningful, enjoyable
            and memorable.
          </p>

          {/* Highlights */}
          <div className="mt-9 space-y-6">
            {highlights.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E7EBD9] text-[#4D5E2C]">
                    <Icon size={23} aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#35412B]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#66705D]">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs