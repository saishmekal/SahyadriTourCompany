import {
  Award,
  Map,
  IndianRupee,
  UsersRound,
} from 'lucide-react'

const benefits = [
  {
    icon: Award,
    title: 'Trusted & Experienced',
    description:
      'Years of experience in organizing hassle-free group tours.',
  },
  {
    icon: Map,
    title: 'Custom Itineraries',
    description:
      'Tailor-made packages that suit your time and budget.',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    description:
      'Best services at competitive and transparent prices.',
  },
  {
    icon: UsersRound,
    title: 'Group Friendly',
    description:
      'Perfect for family, friends, corporate outings and school trips.',
  },
]

export default function WhyTravelWithUs() {
  return (
    <section
      id="why-travel-with-us"
      aria-labelledby="why-travel-heading"
      className="bg-[#F2F4EB] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h2
            id="why-travel-heading"
            className="font-serif text-xl font-medium tracking-tight text-[#2E3D24] sm:text-2xl"
          >
            Why Travel With Us?
          </h2>

          <div className="mt-2 h-0.5 w-9 rounded-full bg-[#5D7141]" />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4 lg:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon

            return (
              <article
                key={benefit.title}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5E7D1] text-[#5D7141] sm:mb-4 sm:h-14 sm:w-14">
                  <Icon
                    size={23}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mb-1.5 text-xs font-semibold leading-snug text-[#2E3D24] sm:text-sm">
                  {benefit.title}
                </h3>

                <p className="max-w-[230px] text-[11px] leading-relaxed text-[#66705D] sm:text-xs sm:leading-5">
                  {benefit.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
