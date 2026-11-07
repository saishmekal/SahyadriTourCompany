import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronDown,
  MessageCircle,
  CalendarCheck,
  CreditCard,
  MapPin,
  ShieldCheck,
  Headphones,
  ArrowUpRight,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const faqCategories = [
  {
    title: 'Bookings & Reservations',
    icon: CalendarCheck,
    questions: [
      {
        question: 'How can I book a tour with Sahyadri Tour Company?',
        answer:
          'You can enquire about a tour through our website enquiry form, WhatsApp, telephone or direct contact. Our team will help you explore available packages, understand the itinerary and receive a quotation. A booking is considered confirmed only after availability, applicable payment requirements and confirmation have been communicated by our team.',
      },
      {
        question: 'How will I receive my booking confirmation?',
        answer:
          'Once your booking has been reviewed and confirmed, our team will provide confirmation through WhatsApp or email. Please retain your confirmation and payment receipts for future reference.',
      },
      {
        question: 'Can I customise a tour package?',
        answer:
          'Yes. We welcome enquiries for customised travel experiences. You can share your preferred destination, travel dates, group size and requirements. Our team will review your request and provide a customised itinerary and quotation, subject to availability.',
      },
      {
        question: 'Do you organise group and private tours?',
        answer:
          'We accept enquiries for group and private travel arrangements. Availability, itinerary, pricing and arrangements depend on the selected destination and package requirements.',
      },
      {
        question: 'Do you offer international travel packages?',
        answer:
          'Our current focus is on domestic travel within India. International travel arrangements may be considered through customised enquiries and advance planning, subject to destination requirements, availability and applicable travel documentation.',
      },
    ],
  },
  {
    title: 'Payments & Pricing',
    icon: CreditCard,
    questions: [
      {
        question: 'How much advance payment is required?',
        answer:
          'The advance payment requirement may vary depending on the selected package, travel dates and supplier arrangements. The applicable amount and payment deadline will be communicated before the booking is confirmed.',
      },
      {
        question: 'When should I pay the remaining balance?',
        answer:
          'The outstanding balance must be paid before the trip departure, within the payment deadline communicated by our team during booking confirmation.',
      },
      {
        question: 'Which payment methods are accepted?',
        answer:
          'Payments may be accepted through UPI, cash and bank transfer. Card payments may also be available depending on the payment facility offered at the time of booking. Please confirm the available payment methods with our team before making a payment.',
      },
      {
        question: 'Will I receive a payment receipt?',
        answer:
          'Payment acknowledgement or receipt details will be provided through the applicable communication channel. Customers are advised to retain transaction references and payment confirmations.',
      },
      {
        question: 'Are package prices inclusive of all expenses?',
        answer:
          'Package prices cover only the services and inclusions specifically mentioned in the quotation or confirmed itinerary. Additional expenses, optional activities, personal purchases and services not listed as included may be charged separately.',
      },
    ],
  },
  {
    title: 'Packages & Travel Arrangements',
    icon: MapPin,
    questions: [
      {
        question: 'What services are included in a tour package?',
        answer:
          'Depending on the package, inclusions may cover transportation, accommodation, meals, sightseeing, entry tickets, guides or activity arrangements. Please review the specific package itinerary and inclusions before confirming your booking.',
      },
      {
        question: 'Can I request changes to the itinerary?',
        answer:
          'You may submit itinerary modification requests before departure. Changes are subject to feasibility, supplier availability, operational requirements and any applicable additional charges. Any agreed changes will be communicated by our team.',
      },
      {
        question: 'Are accommodation and meals included?',
        answer:
          'Accommodation and meals depend on the selected package. The type of accommodation, meal plan and other inclusions will be specified in the package details or booking quotation.',
      },
      {
        question: 'Do I need to arrange my own travel insurance?',
        answer:
          'Travel insurance is recommended for all travellers. Certain destinations, suppliers or activities may require specific insurance coverage. Customers should review their coverage requirements before departure.',
      },
      {
        question: 'Are children and senior citizens allowed on tours?',
        answer:
          'Eligibility may depend on the destination, itinerary, transportation and activities involved. Please inform our team about the age and specific requirements of all travellers when making an enquiry.',
      },
    ],
  },
  {
    title: 'Cancellations, Refunds & Changes',
    icon: ShieldCheck,
    questions: [
      {
        question: 'Can I cancel a confirmed booking?',
        answer:
          'Cancellation requests are accepted subject to the applicable cancellation policy, the time remaining before departure and any non-refundable supplier commitments. Please submit your request through the official communication channel used for your booking.',
      },
      {
        question: 'How are cancellation charges calculated?',
        answer:
          'Cancellation charges depend on the cancellation date relative to departure and the applicable non-refundable supplier charges. The applicable cancellation schedule and calculation method are explained in our Cancellation & Refund Policy.',
      },
      {
        question: 'How long does a refund take?',
        answer:
          'Approved refunds are generally processed within 14 business days after the refund amount has been finalised and approved. Additional time may be required where payment providers or third-party suppliers are involved. Our team will communicate any relevant delays.',
      },
      {
        question: 'Can I reschedule my trip?',
        answer:
          'Rescheduling requests should preferably be submitted at least 7 days before departure. Approval depends on availability, supplier conditions and applicable amendment charges. Changes are not guaranteed until confirmed by our team.',
      },
      {
        question: 'What happens if the company cancels a tour?',
        answer:
          'If we are unable to operate a confirmed tour, our team will communicate the available alternatives. Depending on the circumstances and applicable terms, customers may be offered an alternative departure or an appropriate refund for services that cannot be provided.',
      },
      {
        question: 'What happens if weather conditions affect my trip?',
        answer:
          'Safety remains a priority. Severe weather, natural events, government restrictions or other circumstances beyond reasonable control may require itinerary changes, delays or cancellations. Our team will communicate the available arrangements and applicable refund or rescheduling options.',
      },
    ],
  },
  {
    title: 'Travel Documents & Customer Support',
    icon: Headphones,
    questions: [
      {
        question: 'Which documents should I carry during the trip?',
        answer:
          'Travellers should carry valid government-issued identification and any additional documents required for the destination, accommodation or booked activities. Specific requirements will be communicated where applicable.',
      },
      {
        question: 'What should I do if I have a special requirement?',
        answer:
          'Please inform our team about relevant dietary preferences, accessibility requirements, medical considerations or other special arrangements when submitting your enquiry. Requests will be reviewed based on feasibility and supplier availability.',
      },
      {
        question: 'What are your customer support hours?',
        answer:
          'Our regular business assistance is available every day from 9:00 AM to 10:00 PM. Customers may submit support enquiries at any time through our available communication channels. Responses to enquiries received outside regular business hours may take additional time.',
      },
      {
        question: 'How can I contact Sahyadri Tour Company?',
        answer:
          'You can reach us through WhatsApp or telephone on +91 97690 03745 or +91 91561 43159. You can also submit an enquiry through our website.',
      },
    ],
  },
]

function FAQ() {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#FEFAF4] text-[#66705D]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-[#F3EFE5] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-360 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#71834F]">
              We're Here to Help
            </p>

            <h1 className="font-serif text-4xl leading-tight text-[#2E3D24] sm:text-5xl lg:text-6xl">
              Frequently Asked
              <span className="block italic text-[#71834F]">
                Questions
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#66705D] sm:text-base">
              Find answers to common questions about our travel packages,
              bookings, payments and travel arrangements.
            </p>
          </div>
        </section>

        {/* FAQ content */}
        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-4xl">
            {faqCategories.map((category) => {
              const CategoryIcon = category.icon

              return (
                <div key={category.title} className="mb-12 last:mb-0">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAEDE3] text-[#536747]">
                      <CategoryIcon size={21} />
                    </div>

                    <h2 className="font-serif text-2xl text-[#2E3D24] sm:text-3xl">
                      {category.title}
                    </h2>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white">
                    {category.questions.map((item, index) => {
                      const questionId = `${category.title}-${index}`
                      const isOpen = activeQuestion === questionId

                      return (
                        <div
                          key={questionId}
                          className="border-b border-[#EAE5D9] last:border-b-0"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setActiveQuestion(isOpen ? null : questionId)
                            }
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#FAF8F2] sm:px-6"
                          >
                            <span className="text-sm font-semibold leading-6 text-[#414B3A] sm:text-base">
                              {item.question}
                            </span>

                            <ChevronDown
                              size={20}
                              className={`shrink-0 text-[#71834F] transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-5 pb-5 sm:px-6">
                              <p className="max-w-3xl text-sm leading-7 text-[#737B6B]">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Policy links */}
        <section className="bg-[#F3EFE5] px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#71834F]">
              Need More Information?
            </p>

            <h2 className="font-serif text-3xl text-[#2E3D24] sm:text-4xl">
              Explore Our Policies
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#66705D]">
              Review our policies to understand the terms, conditions,
              cancellation procedures and how we handle your information.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                ['Terms & Conditions', '/terms'],
                ['Privacy Policy', '/privacy'],
                ['Cancellation Policy', '/cancellation'],
              ].map(([label, path]) => (
                <Link
                  key={path}
                  to={path}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D8DCCF] bg-[#FEFAF4] px-5 py-3 text-sm font-semibold text-[#414B3A] transition-colors hover:bg-white"
                >
                  {label}
                  <ArrowUpRight size={15} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl rounded-3xl bg-[#414B3A] px-6 py-12 text-center sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white">
              <MessageCircle size={26} />
            </div>

            <h2 className="mt-5 font-serif text-3xl text-white sm:text-4xl">
              Still Have Questions?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80">
              Our team is happy to help you plan your next journey.
              Get in touch with us for assistance and travel enquiries.
            </p>

            <a
              href="https://wa.me/919769003745?text=Hello%2C%20I%20have%20a%20travel%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FEFAF4] px-6 py-3 text-sm font-semibold text-[#414B3A] transition-colors hover:bg-white"
            >
              Contact Us
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default FAQ