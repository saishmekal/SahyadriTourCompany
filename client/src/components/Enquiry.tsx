
import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, LoaderCircle, Send } from 'lucide-react'
import { apiRequest } from '../services/api'

type Package = {
  _id: string
  name: string
  slug: string
}

type PackagesResponse = {
  status: string
  results: number
  data: {
    packages: Package[]
  }
}

type EnquiryForm = {
  name: string
  phone: string
  packageSlug: string
  message: string
}

const initialForm: EnquiryForm = {
  name: '',
  phone: '',
  packageSlug: '',
  message: '',
}

export default function Enquiry() {
  const [packages, setPackages] = useState<Package[]>([])
  const [form, setForm] = useState<EnquiryForm>(initialForm)
  const [loadingPackages, setLoadingPackages] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    let ignore = false

    async function loadPackages() {
      try {
        const response = await apiRequest<PackagesResponse>('/packages')

        if (!ignore) {
          setPackages(response.data.packages)
        }
      } catch {
        if (!ignore) {
          setError('Unable to load packages. Please refresh the page.')
        }
      } finally {
        if (!ignore) {
          setLoadingPackages(false)
        }
      }
    }

    void loadPackages()

    return () => {
      ignore = true
    }
  }, [])

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
    setSuccess(false)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess(false)

    const normalizedPhone = form.phone.replace(/[\s()-]/g, '')

    if (!/^\+?[0-9]{10,15}$/.test(normalizedPhone)) {
      setError('Please enter a valid phone number.')
      return
    }

    if (!form.packageSlug) {
      setError('Please select a package.')
      return
    }

    try {
      setSubmitting(true)

      await apiRequest('/enquiries', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          phone: normalizedPhone,
        }),
      })

      setForm(initialForm)
      setSuccess(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to submit your enquiry. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="bg-[#FEFAF4] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5D7141]">
            Let's Plan Your Journey
          </p>

          <h2 className="mt-3 font-serif text-3xl font-medium text-[#2E3D24] sm:text-4xl">
            Your Next Adventure Awaits
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#66705D]">
            Tell us where you want to go. We'll help you plan an unforgettable
            experience in the beautiful landscapes of the Sahyadris.
          </p>
        </div>

        {/* Image and form */}
        <div className="grid overflow-hidden rounded-xl border border-[#D8DDC7] bg-white shadow-sm lg:grid-cols-2">
          {/* Image panel */}
          <div className="relative min-h-70 overflow-hidden sm:min-h-90 lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=85"
              alt="Beautiful mountain landscape surrounded by nature"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#1E2B1B]/85 via-[#1E2B1B]/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-7 text-white sm:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                Explore • Experience • Discover
              </p>

              <h3 className="mt-3 max-w-sm font-serif text-3xl leading-tight sm:text-4xl">
                Escape the Ordinary. Discover the Extraordinary.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
                From mountain trails to peaceful getaways, your next memorable
                journey begins here.
              </p>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="p-6 sm:p-9 lg:p-10">
            <h3 className="font-serif text-2xl font-medium text-[#2E3D24]">
              Send Us an Enquiry
            </h3>

            <p className="mt-2 text-sm text-[#66705D]">
              Fill in your details and our team will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="enquiry-name"
                  className="mb-2 block text-xs font-semibold text-[#414B3A]"
                >
                  Full Name *
                </label>

                <input
                  id="enquiry-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  minLength={2}
                  maxLength={80}
                  className="w-full rounded-md border border-[#D8DDC7] bg-[#FEFAF4] px-4 py-3 text-sm text-[#414B3A] outline-none transition focus:border-[#5D7141] focus:ring-1 focus:ring-[#5D7141]"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="mb-2 block text-xs font-semibold text-[#414B3A]"
                >
                  Phone Number *
                </label>

                <input
                  id="enquiry-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  maxLength={16}
                  className="w-full rounded-md border border-[#D8DDC7] bg-[#FEFAF4] px-4 py-3 text-sm text-[#414B3A] outline-none transition focus:border-[#5D7141] focus:ring-1 focus:ring-[#5D7141]"
                />
              </div>

              {/* Package selection */}
              <div>
                <label
                  htmlFor="enquiry-package"
                  className="mb-2 block text-xs font-semibold text-[#414B3A]"
                >
                  Select Package *
                </label>

                <select
                  id="enquiry-package"
                  name="packageSlug"
                  value={form.packageSlug}
                  onChange={handleChange}
                  required
                  disabled={loadingPackages || packages.length === 0}
                  className="w-full rounded-md border border-[#D8DDC7] bg-[#FEFAF4] px-4 py-3 text-sm text-[#414B3A] outline-none transition focus:border-[#5D7141] focus:ring-1 focus:ring-[#5D7141] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {loadingPackages
                      ? 'Loading packages...'
                      : packages.length === 0
                        ? 'No packages available'
                        : 'Choose a package'}
                  </option>

                  {packages.map((item) => (
                    <option key={item._id} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="enquiry-message"
                  className="mb-2 block text-xs font-semibold text-[#414B3A]"
                >
                  Your Message (Optional)
                </label>

                <textarea
                  id="enquiry-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel plans..."
                  rows={4}
                  maxLength={1000}
                  className="w-full resize-none rounded-md border border-[#D8DDC7] bg-[#FEFAF4] px-4 py-3 text-sm text-[#414B3A] outline-none transition focus:border-[#5D7141] focus:ring-1 focus:ring-[#5D7141]"
                />
              </div>

              {/* Error message */}
              {error && (
                <p
                  role="alert"
                  className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* Success message */}
              {success && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-md bg-[#EEF3E8] px-3 py-3 text-sm text-[#414B3A]"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <p>
                    Your enquiry has been submitted successfully! Our team
                    will contact you soon.
                  </p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting || loadingPackages || packages.length === 0}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#5D7141] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#414B3A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Enquiry
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#89917F]">
                Your information will only be used to respond to your enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}