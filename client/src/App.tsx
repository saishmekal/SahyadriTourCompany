
function App() {
  return (
    <div className="min-h-screen bg-[#FEFAF4] text-[#66705D]">
      <header className="border-b border-[#D8DDC7] bg-[#FEFAF4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="#home"
            className="text-xl font-semibold tracking-wide text-[#2E3D24]"
          >
            SAHYADRI
            <span className="ml-2 text-sm font-normal tracking-widest text-[#5D7141]">
              TOUR COMPANY
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#home" className="hover:text-[#5D7141]">Home</a>
            <a href="#about" className="hover:text-[#5D7141]">About Us</a>
            <a href="#packages" className="hover:text-[#5D7141]">Packages</a>
            <a href="#destinations" className="hover:text-[#5D7141]">Destinations</a>
            <a href="#gallery" className="hover:text-[#5D7141]">Gallery</a>
            <a href="#contact" className="hover:text-[#5D7141]">Contact</a>
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full bg-[#4D5E2C] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2E3D24] sm:inline-flex"
          >
            Book Now
          </a>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="flex min-h-[65vh] items-center justify-center px-6 py-24 text-center"
        >
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#5D7141]">
              Discover your next journey
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#2E3D24] sm:text-6xl">
              Explore Sahyadri.
              <br />
              <span className="font-normal italic">
                Experience Serenity.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg">
              Discover beautiful destinations, thoughtfully curated journeys,
              and unforgettable experiences across India.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#packages"
                className="rounded-full bg-[#4D5E2C] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#2E3D24]"
              >
                Explore Packages
              </a>

              <a
                href="#contact"
                className="rounded-full border border-[#D8DDC7] px-7 py-3.5 text-sm font-medium text-[#2E3D24] transition hover:bg-[#F2F4EB]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#F2F4EB] px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#5D7141]">
            Travel with confidence
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#2E3D24]">
            Every journey, thoughtfully planned.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7">
            Comfortable travel, memorable experiences, and journeys designed
            around the places you want to discover.
          </p>
        </section>

        <section id="destinations" className="px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold text-[#2E3D24]">
            Explore Destinations
          </h2>
          <p className="mt-3">
            Beautiful places across India, waiting to be discovered.
          </p>
        </section>

        <section id="packages" className="bg-[#F2F4EB] px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold text-[#2E3D24]">
            Find Your Next Adventure
          </h2>
          <p className="mt-3">
            Our curated tour packages will appear here.
          </p>
        </section>

        <section id="gallery" className="px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold text-[#2E3D24]">
            Moments Worth Remembering
          </h2>
          <p className="mt-3">A glimpse of journeys and experiences.</p>
        </section>

        <section id="contact" className="bg-[#F2F4EB] px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold text-[#2E3D24]">
            Let’s Plan Your Journey
          </h2>
          <p className="mt-3">
            Get in touch with us to start planning your next trip.
          </p>
        </section>
      </main>

      <footer className="border-t border-[#D8DDC7] px-6 py-8 text-center text-sm">
        <p className="font-semibold text-[#2E3D24]">Sahyadri Tour Company</p>
        <p className="mt-2">
          Discover India. Create memories. Travel better.
        </p>
      </footer>
    </div>
  )
}

export default App
