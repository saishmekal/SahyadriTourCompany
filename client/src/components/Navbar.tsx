import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Packages', href: '#packages' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

function MountainLogo() {
  return (
    <svg
      viewBox="0 0 110 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-[84px] shrink-0 sm:h-12 sm:w-[100px]"
      aria-hidden="true"
    >
      <path
        d="M3 43 L24 20 L31 27 L49 5 L69 28 L77 20 L107 43"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 20 L19 31 L31 27 M49 5 L43 20 L53 15 L69 28 M77 20 L72 31 L84 32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 43 H102"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity=".45"
      />
    </svg>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="relative z-50 border-b border-[#D8DDC7] bg-[#FEFAF4]">
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        {/* Brand */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2 text-[#2E3D24]"
          aria-label="Sahyadri Tour Company home"
        >
          <MountainLogo />

          <span className="flex flex-col leading-none">
            <span className="font-serif text-[25px] tracking-tight sm:text-[29px]">
              Sahyadri
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] sm:text-[10px]">
              Tour Company
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 xl:flex 2xl:gap-7"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[13px] font-medium text-[#35412B] transition-colors hover:text-[#71834F] 2xl:text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop booking button */}
        <a
          href="#contact"
          className="hidden shrink-0 items-center gap-2 rounded-xl bg-[#4D5E2C] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2E3D24] xl:inline-flex"
        >
          Book Now
          <ArrowRight size={16} aria-hidden="true" />
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D8DDC7] text-[#2E3D24] transition hover:bg-[#F2F4EB] xl:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#D8DDC7] bg-[#FEFAF4] px-5 py-4 shadow-md xl:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-[#35412B] transition-colors hover:bg-[#F2F4EB]"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#4D5E2C] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2E3D24]"
            >
              Book Now
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
