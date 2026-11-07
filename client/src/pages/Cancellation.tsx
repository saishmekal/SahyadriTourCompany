
import { useEffect } from 'react'
import {
  CalendarX,
  Clock,
  RefreshCw,
  Wallet,
  AlertTriangle,
  ShieldCheck,
  MessageCircle,
  FileText,
  CheckCircle2,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const cancellationSchedule = [
  {
    period: 'More than 30 days',
    deduction: '10%',
    description: 'Cancellation received more than 30 days before departure.',
  },
  {
    period: '15–30 days',
    deduction: '25%',
    description: 'Cancellation received between 15 and 30 days before departure.',
  },
  {
    period: '7–14 days',
    deduction: '50%',
    description: 'Cancellation received between 7 and 14 days before departure.',
  },
  {
    period: '3–6 days',
    deduction: '75%',
    description: 'Cancellation received between 3 and 6 days before departure.',
  },
  {
    period: '0–2 days / No-show',
    deduction: '100%',
    description: 'Cancellation within 48 hours of departure or failure to arrive.',
  },
]

const sections = [
  { id: 'overview', title: '1. Policy Overview' },
  { id: 'customer-cancellation', title: '2. Customer Cancellations' },
  { id: 'refund-schedule', title: '3. Cancellation Charges' },
  { id: 'refund-process', title: '4. Refund Processing' },
  { id: 'rescheduling', title: '5. Rescheduling and Changes' },
  { id: 'company-cancellation', title: '6. Company Cancellations' },
  { id: 'force-majeure', title: '7. Unforeseen Circumstances' },
  { id: 'no-show', title: '8. Late Arrival and No-show' },
  { id: 'third-party', title: '9. Third-Party Services' },
  { id: 'contact', title: '10. Contact and Assistance' },
]

export default function Cancellation() {
  useEffect(() => {
    document.title = 'Cancellation & Refund Policy | Sahyadri Tour Company'
  }, [])

  return (
    <div className="min-h-screen bg-[#FEFAF4] text-[#66705D]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="border-b border-[#EAE5D9] bg-[#F5F1E8]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E5E7D1] px-4 py-2 text-xs font-semibold text-[#4D5E2C]">
                <ShieldCheck size={15} />
                Clear and Transparent Policies
              </div>

              <h1 className="font-serif text-4xl font-medium tracking-tight text-[#2E3D24] sm:text-5xl lg:text-6xl">
                Cancellation & Refund Policy
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#66705D] sm:text-base">
                We understand that travel plans can change. Our
                cancellation and refund policy explains the applicable
                charges, rescheduling conditions and refund procedures
                to help you make informed decisions.
              </p>

              <p className="mt-5 text-xs text-[#858B78]">
                Effective date: To be confirmed before publication
              </p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-16">

            {/* Table of Contents */}
            <aside className="h-fit rounded-2xl border border-[#EAE5D9] bg-white/60 p-5 lg:sticky lg:top-24">
              <h2 className="mb-4 text-sm font-semibold text-[#2E3D24]">
                On This Page
              </h2>

              <nav aria-label="Cancellation policy sections">
                <ul className="space-y-3">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-xs leading-5 text-[#66705D] transition-colors hover:text-[#2E3D24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D7141]"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Policy Details */}
            <article className="max-w-4xl space-y-10">

              {/* Overview */}
              <div
                id="overview"
                className="scroll-mt-24 rounded-2xl border border-[#EAE5D9] bg-white/60 p-5 sm:p-7"
              >
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 shrink-0 text-[#5D7141]" size={21} />

                  <div>
                    <h2 className="font-serif text-xl text-[#2E3D24]">
                      1. Policy Overview
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                      This Cancellation and Refund Policy applies to
                      bookings and travel arrangements made through
                      Sahyadri Tour Company ("we", "our" or "us").
                      It explains the conditions under which customers
                      may cancel or modify confirmed bookings and
                      the refund process that follows.
                    </p>

                    <p className="mt-3 text-sm leading-7">
                      Cancellation charges depend on the number of
                      days remaining before the scheduled departure.
                      Package-specific terms or supplier conditions
                      communicated before booking may also apply.
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Cancellations */}
              <section id="customer-cancellation" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <CalendarX className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    2. Customer Cancellations
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  If you wish to cancel a confirmed booking, please
                  contact our team through WhatsApp, phone or another
                  official communication channel.
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
                  <li>
                    Cancellation requests should be submitted in
                    writing wherever possible.
                  </li>
                  <li>
                    The date on which we receive your cancellation
                    request will be used to determine the applicable
                    cancellation period.
                  </li>
                  <li>
                    Please include your booking details and registered
                    contact number to help us identify your reservation.
                  </li>
                  <li>
                    Our team will acknowledge the request and communicate
                    the applicable cancellation charges and estimated
                    refund amount.
                  </li>
                </ul>

                <p className="mt-4 text-sm leading-7">
                  A booking should be treated as cancelled only after
                  acknowledgement from Sahyadri Tour Company. Simply
                  discontinuing communication or failing to make a
                  payment does not automatically cancel an already
                  confirmed booking.
                </p>
              </section>

              {/* Cancellation Charges */}
              <section id="refund-schedule" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <Wallet className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    3. Cancellation Charges
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  The following cancellation schedule applies to
                  standard bookings, subject to any specific package
                  terms or supplier conditions communicated before
                  confirmation.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white/60">
                  <div className="grid grid-cols-[1fr_auto] gap-4 bg-[#E5E7D1] px-5 py-4">
                    <span className="text-xs font-semibold text-[#2E3D24]">
                      Time before departure
                    </span>
                    <span className="text-xs font-semibold text-[#2E3D24]">
                      Deduction
                    </span>
                  </div>

                  {cancellationSchedule.map((item, index) => (
                    <div
                      key={item.period}
                      className={`grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 ${
                        index !== cancellationSchedule.length - 1
                          ? 'border-b border-[#EAE5D9]'
                          : ''
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#2E3D24]">
                          {item.period}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#858B78]">
                          {item.description}
                        </p>
                      </div>

                      <span className="text-lg font-semibold tabular-nums text-[#4D5E2C]">
                        {item.deduction}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-[#EAE5D9] bg-[#F5F1E8] p-5">
                  <h3 className="text-sm font-semibold text-[#2E3D24]">
                    How cancellation deductions are calculated
                  </h3>

                  <p className="mt-2 text-sm leading-7">
                    The scheduled percentage is calculated against
                    the total confirmed package amount. Any separately
                    applicable, documented and non-refundable supplier
                    charges may also be considered where they were
                    disclosed or are otherwise lawfully recoverable.
                    The same cost will not be charged twice.
                  </p>

                  <p className="mt-3 text-sm leading-7">
                    The final deduction and refund calculation will
                    be communicated to the customer before the refund
                    is processed. Applicable consumer rights and
                    mandatory legal protections will prevail.
                  </p>
                </div>
              </section>

              {/* Refund Processing */}
              <section id="refund-process" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <Clock className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    4. Refund Processing
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Once a cancellation has been reviewed and the final
                  refundable amount has been confirmed, eligible refunds
                  will generally be processed within 14 business days.
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
                  <li>
                    Refunds will ordinarily be made through the original
                    payment method wherever feasible.
                  </li>
                  <li>
                    We may request payment details or transaction
                    references needed to verify and process the refund.
                  </li>
                  <li>
                    Bank, payment gateway or third-party processing
                    delays may affect the time taken for the refunded
                    amount to appear in your account.
                  </li>
                  <li>
                    If a delay occurs, we will communicate the available
                    information regarding its status.
                  </li>
                </ul>

                <p className="mt-4 text-sm leading-7">
                  The 14-business-day processing period begins after
                  the final refund amount has been reviewed and
                  confirmed, subject to applicable legal requirements.
                </p>
              </section>

              {/* Rescheduling */}
              <section id="rescheduling" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <RefreshCw className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    5. Rescheduling and Changes
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Customers who wish to change their travel date or
                  other booking details should submit a request at
                  least 7 days before the scheduled departure.
                </p>

                <p className="mt-3 text-sm leading-7">
                  Rescheduling requests are subject to availability
                  and approval by Sahyadri Tour Company and relevant
                  service providers.
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
                  <li>
                    Changes are not guaranteed and depend on hotel,
                    transport and activity availability.
                  </li>
                  <li>
                    Additional costs arising from revised dates,
                    rates or supplier charges will be communicated
                    before confirmation.
                  </li>
                  <li>
                    Any applicable non-refundable supplier charges
                    will be explained to the customer.
                  </li>
                  <li>
                    A rescheduling request may be treated as a
                    cancellation if the requested changes cannot
                    be accommodated and the customer chooses not
                    to proceed with the original booking.
                  </li>
                </ul>
              </section>

              {/* Company Cancellations */}
              <section id="company-cancellation" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <AlertTriangle className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    6. Company Cancellations
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  In certain circumstances, Sahyadri Tour Company
                  may need to cancel or modify a confirmed travel
                  arrangement due to operational issues, insufficient
                  participation where applicable, supplier unavailability
                  or other circumstances affecting the trip.
                </p>

                <p className="mt-3 text-sm leading-7">
                  Where we initiate a cancellation, we will inform
                  affected customers as early as reasonably possible
                  and explain the available alternatives.
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
                  <li>
                    An alternative date or suitable arrangement may
                    be offered, subject to customer agreement.
                  </li>
                  <li>
                    Where a refund is due, the amount attributable
                    to services not provided will be handled in
                    accordance with applicable law and the booking terms.
                  </li>
                  <li>
                    Customers will not be required to accept a
                    credit voucher instead of a refund where a
                    refund is legally due.
                  </li>
                </ul>
              </section>

              {/* Force Majeure */}
              <section id="force-majeure" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheck className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    7. Unforeseen Circumstances
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Travel arrangements may be affected by circumstances
                  beyond reasonable control, including severe weather,
                  natural disasters, government restrictions, public
                  emergencies, transport disruptions, safety concerns
                  or other force majeure events.
                </p>

                <p className="mt-3 text-sm leading-7">
                  In such situations, our priority will be the safety
                  of travellers and responsible communication. We
                  will assess available alternatives and coordinate
                  with relevant service providers wherever possible.
                </p>

                <p className="mt-3 text-sm leading-7">
                  Any additional costs, alternative arrangements
                  or refund implications will be explained to the
                  customer before proceeding wherever reasonably
                  practicable. Refunds for services not provided
                  will be assessed based on applicable law, supplier
                  recoveries and the actual services delivered.
                </p>
              </section>

              {/* No-show */}
              <section id="no-show" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <CalendarX className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    8. Late Arrival and No-show
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Customers are responsible for arriving at the
                  designated meeting point at the communicated
                  reporting time and following the agreed itinerary.
                </p>

                <p className="mt-3 text-sm leading-7">
                  Failure to arrive on time, missing a departure
                  or not participating in a confirmed trip without
                  prior communication may be treated as a no-show.
                  The standard 100% cancellation deduction may
                  apply, subject to applicable law and any
                  package-specific terms communicated before booking.
                </p>
              </section>

              {/* Third-party services */}
              <section id="third-party" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <FileText className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    9. Third-Party Services
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Certain travel arrangements may be provided by
                  independent third parties, including hotels,
                  airlines, transport operators, activity organisers
                  and other suppliers.
                </p>

                <p className="mt-3 text-sm leading-7">
                  These providers may have their own cancellation
                  and refund conditions. Where such conditions
                  apply to your booking, they will be communicated
                  before confirmation wherever reasonably possible.
                </p>

                <p className="mt-3 text-sm leading-7">
                  We will assist customers in coordinating eligible
                  cancellations and refund requests with relevant
                  suppliers. Nothing in this policy excludes
                  responsibilities that cannot lawfully be excluded.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <MessageCircle className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    10. Contact and Assistance
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  For cancellation requests, refund updates or
                  rescheduling assistance, please contact our team
                  using the details below.
                </p>

                <div className="mt-5 rounded-2xl border border-[#EAE5D9] bg-white/60 p-5 sm:p-6">
                  <h3 className="font-serif text-lg font-semibold text-[#2E3D24]">
                    Sahyadri Tour Company
                  </h3>

                  <p className="mt-3 text-sm text-[#66705D]">
                    Cancellation and booking assistance
                  </p>

                  <div className="mt-4 space-y-3">
                    <a
                      href="https://wa.me/919769003745"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[#4D5E2C] transition-colors hover:text-[#2E3D24]"
                    >
                      <MessageCircle size={17} />
                      +91 97690 03745
                    </a>

                    <a
                      href="https://wa.me/919156143159"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[#4D5E2C] transition-colors hover:text-[#2E3D24]"
                    >
                      <MessageCircle size={17} />
                      +91 91561 43159
                    </a>
                  </div>

                  <p className="mt-5 border-t border-[#EAE5D9] pt-4 text-xs leading-6 text-[#858B78]">
                    Business assistance hours: Daily, 9:00 AM to 10:00 PM IST.
                  </p>
                </div>
              </section>

              {/* Closing note */}
              <div className="border-t border-[#EAE5D9] pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 shrink-0 text-[#5D7141]" size={18} />
                  <p className="text-xs leading-6 text-[#858B78]">
                    This policy should be read together with the
                    applicable package details and Terms & Conditions.
                    It should be reviewed and finalised before
                    commercial publication. Applicable consumer
                    protection laws and mandatory legal rights
                    will prevail in case of any inconsistency.
                  </p>
                </div>
              </div>

            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}