import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Rohit Patil',
    location: 'Pune',
    text: 'Had an amazing experience with Sahyadri Tour Company. Everything was perfectly arranged. Highly recommended!',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Mumbai',
    text: 'The trip was beautifully planned, the arrangements were comfortable, and the entire experience was memorable.',
  },
  {
    id: 3,
    name: 'Amit Deshmukh',
    location: 'Navi Mumbai',
    text: 'A wonderful travel experience with a friendly team and well-organized itinerary. Looking forward to travelling again!',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = testimonials[activeIndex]

  const showPrevious = () => {
    setActiveIndex((current) =>
      (current - 1 + testimonials.length) % testimonials.length,
    )
  }

  const showNext = () => {
    setActiveIndex((current) =>
      (current + 1) % testimonials.length,
    )
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-[#F2F4EB] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h2
            id="testimonials-heading"
            className="font-serif text-xl font-medium tracking-tight text-[#2E3D24] sm:text-2xl"
          >
            What Our Travelers Say
          </h2>
          <div className="mt-2 h-0.5 w-9 rounded-full bg-[#5D7141]" />
        </div>

        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-16">
          {/* Testimonial content */}
          <div className="min-w-0">
            <Quote
              size={27}
              strokeWidth={2.5}
              className="mb-3 text-[#5D7141]"
              aria-hidden="true"
            />

            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <blockquote className="max-w-xl text-sm leading-7 text-[#66705D] sm:text-base">
                    {activeTestimonial.text}
                  </blockquote>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E7D1] text-sm font-semibold text-[#5D7141]">
                      {activeTestimonial.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#2E3D24]">
                        {activeTestimonial.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#66705D]">
                        {activeTestimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel controls */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DDC7] text-[#5D7141] transition-colors hover:bg-[#E5E7D1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D7141]"
              >
                <ChevronLeft size={17} aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={activeIndex === index ? 'true' : undefined}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'w-6 bg-[#5D7141]'
                        : 'w-2 bg-[#D8DDC7] hover:bg-[#899775]'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DDC7] text-[#5D7141] transition-colors hover:bg-[#E5E7D1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D7141]"
              >
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Decorative mountain artwork */}
          <div className="relative hidden min-h-64 items-center justify-center md:flex lg:min-h-80">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
              alt="Mountain peaks beneath a starry sky"
              loading="lazy"
              className="max-h-80 w-full rounded-xl object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
