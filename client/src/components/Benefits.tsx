import {
  ShieldCheck,
  Armchair,
  Camera,
  Headset,
} from 'lucide-react'

const benefits = [
  {
    title: 'Safe & Secure',
    description: 'Your safety is our top priority.',
    Icon: ShieldCheck,
  },
  {
    title: 'Comfortable Travel',
    description: 'Well-maintained buses for a comfortable ride.',
    Icon: Armchair,
  },
  {
    title: 'Memorable Experiences',
    description: 'Handpicked destinations and curated itineraries.',
    Icon: Camera,
  },
  {
    title: '24/7 Support',
    description: 'We are here to assist you anytime.',
    Icon: Headset,
  },
]

function Benefits() {
  return (
    <section
      aria-label="Why travel with Sahyadri Tour Company"
      className="relative z-10 mx-auto -mt-8 w-[calc(100%-2rem)] max-w-[1360px] sm:-mt-10 sm:w-[calc(100%-4rem)] lg:-mt-12"
    >
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#E8E5DB] bg-[#FEFAF4]/95 shadow-[0_8px_30px_rgba(46,61,36,0.07)] backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ title, description, Icon }, index) => (
          <article
            key={title}
            className={`relative flex items-center gap-4 px-5 py-5 sm:px-6 sm:py-6 lg:gap-3 lg:px-5 ${
              index > 0
                ? 'border-t border-[#E8E5DB] sm:border-t-0 lg:border-l'
                : ''
            } ${
              index === 1 ? 'sm:border-l sm:border-[#E8E5DB]' : ''
            } ${
              index === 3 ? 'sm:border-l sm:border-[#E8E5DB]' : ''
            }`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5E7D1] text-[#4D5E2C] sm:h-12 sm:w-12">
              <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold leading-5 text-[#2E3D24]">
                {title}
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#66705D]">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Benefits
