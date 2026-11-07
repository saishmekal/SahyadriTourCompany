import { MessageCircle, Mountain } from 'lucide-react'
import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
]

const destinations = [
  { label: 'Rajgad Fort', href: '/#destinations' },
  { label: 'Kalsubai Peak', href: '/#destinations' },
  { label: 'Tamhini Ghat', href: '/#destinations' },
  { label: 'Lonavala', href: '/#destinations' },
  { label: 'Mahabaleshwar', href: '/#destinations' },
]

const supportLinks = [
  { label: 'FAQs', href: '/faq' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cancellation Policy', href: '/cancellation' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#FEFAF4]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-8">

          {/* Brand */}
          <div className="col-span-2 flex flex-col items-start gap-3 md:col-span-1">
            <Link
              to="/"
              aria-label="Sahyadri Tour Company home"
              className="flex items-center gap-2"
            >
              <Mountain
                size={29}
                strokeWidth={1.4}
                className="text-[#5D7141]"
                aria-hidden="true"
              />

              <span className="font-serif text-sm font-semibold tracking-tight text-[#2E3D24]">
                sahyadritourcompany
              </span>
            </Link>

            <p className="max-w-xs text-xs leading-5 text-[#66705D]">
              Your trusted travel partner for exploring beautiful
              destinations and creating unforgettable memories.
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/919769003745"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5E7D1] text-[#5D7141] transition-colors hover:bg-[#D8DDC7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D7141]"
              >
                <MessageCircle size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-3 text-xs font-semibold text-[#2E3D24]">
              Quick Links
            </h2>

            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-[#66705D] transition-colors hover:text-[#2E3D24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D7141]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h2 className="mb-3 text-xs font-semibold text-[#2E3D24]">
              Destinations
            </h2>

            <ul className="space-y-2">
              {destinations.map((destination) => (
                <li key={destination.label}>
                  <a
                    href={destination.href}
                    className="text-xs text-[#66705D] transition-colors hover:text-[#2E3D24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D7141]"
                  >
                    {destination.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="mb-3 text-xs font-semibold text-[#2E3D24]">
              Support
            </h2>

            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-xs text-[#66705D] transition-colors hover:text-[#2E3D24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D7141]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#C8D0B5] px-4 py-3 text-center">
        <p className="text-[10px] leading-relaxed text-[#46543A] sm:text-xs">
          © {year} Sahyadri Tour Company. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}