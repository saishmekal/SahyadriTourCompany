import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[470px] overflow-hidden bg-[#E9E7D9] sm:min-h-[520px] lg:min-h-[540px]"
    >
      {/* Scenic Sahyadri landscape */}
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
        alt="Mountain ranges surrounded by clouds and greenery"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Soft overlay for readable text */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#FEFAF4]/95 via-[#FEFAF4]/75 to-[#FEFAF4]/10" />

      <div className="mx-auto flex min-h-[470px] max-w-[1440px] items-center px-6 py-16 sm:min-h-[520px] sm:px-10 lg:min-h-[540px] lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#5D7141] sm:text-sm">
            Curated journeys · Meaningful experiences
          </p>

          <h1 className="font-serif text-4xl leading-[1.12] tracking-tight text-[#2E3D24] sm:text-5xl lg:text-6xl">
            Explore Sahyadri.
            <br />
            <span className="font-normal">
              Experience Serenity.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-[#4F5848] sm:text-base sm:leading-7">
            Curated journeys across the majestic Sahyadri ranges.
            Travel safe, comfortable and memorable with us.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#packages"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#4D5E2C] px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2E3D24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5D7141]"
            >
              Explore Packages
            </a>

            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#5D7141] bg-[#FEFAF4]/75 px-5 py-3 text-sm font-medium text-[#2E3D24] transition-colors duration-200 hover:bg-[#E5E7D1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5D7141]"
            >
              Contact Us
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
