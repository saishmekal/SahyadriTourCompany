
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  FileText,
  CalendarCheck,
  ShieldCheck,
  Scale,
} from 'lucide-react'

const sections = [
  {
    title: '1. Introduction and Acceptance of Terms',
    content: [
      'These Terms and Conditions govern the use of the Sahyadri Tour Company website, travel enquiries, package bookings and travel-related services arranged by the company.',
      'By accessing our website, submitting an enquiry or proceeding with a booking, you acknowledge that you have read and understood these Terms and Conditions.',
      'These terms should be read together with the applicable package itinerary, quotation, booking confirmation, Privacy Policy and Cancellation & Refund Policy.',
    ],
  },
  {
    title: '2. Company Services and Scope',
    content: [
      'Sahyadri Tour Company provides travel planning, tour package coordination and related travel arrangements, primarily for domestic destinations within India.',
      'International travel arrangements may be considered through customised enquiries and advance planning, subject to destination requirements, availability and applicable regulations.',
      'Services may include transportation, accommodation, meals, sightseeing, guided activities and other arrangements, depending on the package selected.',
      'The precise services included in each booking shall be those expressly described in the relevant package details, quotation or confirmed itinerary.',
    ],
  },
  {
    title: '3. Enquiries and Booking Confirmation',
    content: [
      'Customers may submit travel enquiries through the website, WhatsApp, telephone or other communication channels made available by the company.',
      'An enquiry or quotation does not constitute a confirmed booking. Availability, pricing and supplier arrangements must first be reviewed and confirmed.',
      'A booking shall be considered confirmed only after the company has communicated its acceptance, the applicable advance payment has been received and the booking confirmation has been issued through WhatsApp or email.',
      'Customers are responsible for reviewing the confirmation, including traveller details, travel dates, package inclusions, exclusions and payment requirements. Any discrepancy should be reported promptly.',
      'The company may decline an enquiry or booking where the requested arrangements are unavailable or cannot reasonably be provided.',
    ],
  },
  {
    title: '4. Package Prices and Payments',
    content: [
      'Package prices are communicated through the applicable quotation or booking confirmation. Prices may vary depending on travel dates, group size, accommodation availability, transportation and supplier rates.',
      'The advance payment requirement is package-specific and shall be communicated before booking confirmation.',
      'The outstanding balance must be paid before departure within the deadline communicated by the company.',
      'Accepted payment methods may include UPI, cash and bank transfer. Card payments may be available depending on the payment facilities offered at the time of booking.',
      'Customers should make payments only through payment details or channels officially communicated by the company. Payment receipts and transaction references should be retained.',
      'Failure to meet a communicated payment deadline may result in the booking being placed on hold or cancelled, subject to the applicable booking terms and supplier commitments.',
      'Additional charges arising from customer-requested changes or services outside the confirmed package will be communicated before they are incurred.',
    ],
  },
  {
    title: '5. Package Inclusions and Exclusions',
    content: [
      'Each package has its own inclusions and exclusions. Customers should carefully review the itinerary and quotation before making a booking.',
      'Accommodation, meals, transportation, entry tickets, guides and activities are included only where expressly specified.',
      'Personal expenses, additional meals, optional activities, tips, purchases, travel to the designated starting point and services not listed as included shall remain the responsibility of the customer.',
      'Any special requests must be communicated in advance and are subject to feasibility, availability and additional charges where applicable.',
    ],
  },
  {
    title: '6. Itineraries and Travel Arrangements',
    content: [
      'Published itineraries are planned based on the information and availability reasonably available at the time of preparation.',
      'Actual schedules may be affected by traffic, weather, operational conditions, supplier availability, safety requirements or circumstances beyond reasonable control.',
      'The company reserves the ability to make reasonable itinerary adjustments where necessary for operational feasibility or traveller safety.',
      'Where a material change is necessary, customers will be informed and appropriate alternatives will be communicated wherever reasonably possible.',
      'Any material additional costs will be disclosed before customers are asked to accept the revised arrangement, except where immediate action is necessary for safety or legal compliance.',
    ],
  },
  {
    title: '7. Third-Party Service Providers',
    content: [
      'Certain travel services may be delivered by independent third-party providers, including hotels, transport operators, airlines, activity organisers and local guides.',
      'Such providers may have their own operational requirements, safety rules, booking conditions and cancellation policies.',
      'The company coordinates these arrangements as part of the confirmed package. The nature of the relationship and responsibility for individual services will depend on the applicable booking arrangement and law.',
      'Where a third-party provider changes, delays or cannot provide a service, the company will make reasonable efforts to communicate the situation and coordinate suitable alternatives.',
      'Nothing in these terms excludes liability that cannot legally be excluded under applicable law.',
    ],
  },
  {
    title: '8. Customer Responsibilities',
    content: [
      'Customers must provide accurate and complete information when submitting enquiries and confirming bookings.',
      'All travellers must carry valid government-issued identification and any additional documents required by the destination, accommodation provider or activity organiser.',
      'Customers are responsible for arriving at designated pickup points at the communicated time and following the confirmed itinerary.',
      'Travellers must comply with applicable laws, local regulations, safety instructions and reasonable directions issued by authorised tour personnel or service providers.',
      'Customers should behave respectfully towards fellow travellers, local communities, service personnel and the environment.',
      'Any relevant medical, accessibility, dietary or special requirements should be disclosed before booking so that feasibility can be assessed.',
      'Customers are responsible for their personal belongings and valuables throughout the journey, subject to applicable legal rights.',
    ],
  },
  {
    title: '9. Health, Safety and Travel Insurance',
    content: [
      'Travellers should assess their personal fitness and suitability for the activities included in their chosen itinerary.',
      'Certain activities, destinations or service providers may impose additional health, age, fitness or safety requirements.',
      'Travel insurance is strongly recommended for all travellers. Customers should consider appropriate coverage for medical emergencies, trip interruption, cancellations, baggage and other travel-related risks.',
      'Insurance may be mandatory where required by a particular destination, supplier or activity.',
      'The company does not represent that every travel-related loss or medical expense will be covered by its own arrangements. Customers should review their insurance coverage independently.',
    ],
  },
  {
    title: '10. Cancellation, Refunds and Rescheduling',
    content: [
      'All cancellation requests, refund calculations and rescheduling requests shall be handled in accordance with the company’s Cancellation & Refund Policy and the specific terms communicated at booking.',
      'Cancellation charges may depend on the time remaining before departure and applicable non-refundable supplier commitments.',
      'Rescheduling requests should preferably be submitted at least seven days before departure. Approval is subject to availability, supplier conditions and applicable charges.',
      'Customers should submit cancellation or modification requests through the official communication channel used for their booking.',
      'The applicable cancellation and refund provisions shall be interpreted consistently with mandatory consumer protection requirements.',
    ],
  },
  {
    title: '11. Delays, Disruptions and Unforeseen Events',
    content: [
      'Travel arrangements may be affected by severe weather, natural disasters, government restrictions, public disturbances, transport disruptions, strikes, health emergencies or other circumstances beyond reasonable control.',
      'Where such circumstances arise, the company will make reasonable efforts to communicate relevant information and coordinate alternative arrangements where feasible.',
      'Changes, cancellations and refunds arising from such events will be handled according to the applicable supplier conditions, confirmed booking terms and applicable law.',
      'The company shall not be required to guarantee the continuation of an itinerary where doing so would create an unreasonable safety risk or violate applicable restrictions.',
    ],
  },
  {
    title: '12. Limitation of Liability',
    content: [
      'The company will exercise reasonable care in coordinating the travel services described in the confirmed booking.',
      'To the extent permitted by applicable law, the company shall not be responsible for losses arising from inaccurate information supplied by customers, failure to follow safety instructions, independent third-party conduct or circumstances beyond reasonable control.',
      'The company shall not be liable for indirect or consequential losses except where such exclusion is prohibited by law.',
      'Nothing in these Terms and Conditions limits liability for fraud, wilful misconduct, gross negligence or any liability that cannot legally be limited or excluded.',
      'Any specific responsibility arising from a confirmed package or mandatory legal requirement shall prevail over a general provision in this section.',
    ],
  },
  {
    title: '13. Website Use and Intellectual Property',
    content: [
      'Website text, branding, design elements, photographs and other materials are owned by or used with permission by their respective rights holders.',
      'Visitors may use the website for legitimate personal travel enquiries and information purposes.',
      'Users must not reproduce, distribute, modify or commercially exploit website content without appropriate authorisation.',
      'Users must not misuse the website, attempt unauthorised access or interfere with its security or operation.',
      'Package information, photographs and illustrative content are provided for informational purposes. The confirmed itinerary and quotation shall govern the actual booking.',
    ],
  },
  {
    title: '14. Privacy and Personal Information',
    content: [
      'Personal information collected through enquiries and bookings will be handled in accordance with our Privacy Policy and applicable data protection laws.',
      'Information may be used to respond to enquiries, prepare quotations, coordinate bookings, communicate travel updates and arrange relevant services.',
      'Where necessary, information may be shared with relevant travel service providers for the fulfilment of confirmed arrangements.',
    ],
  },
  {
    title: '15. Complaints and Dispute Resolution',
    content: [
      'Customers are encouraged to contact the company promptly if they have a concern regarding a booking or travel service so that the matter can be reviewed.',
      'The company will make reasonable efforts to acknowledge and address complaints through its available customer support channels.',
      'Nothing in these terms restricts a customer’s right to approach an appropriate consumer commission, regulatory authority or court under applicable law.',
    ],
  },
  {
    title: '16. Governing Law and Jurisdiction',
    content: [
      'These Terms and Conditions shall be governed by the laws of India, subject to applicable consumer protection and other mandatory legal provisions.',
      'Any dispute shall be subject to the jurisdiction of courts or competent forums having jurisdiction under applicable Indian law. Nothing in this clause limits a consumer’s statutory right to approach a competent consumer dispute redressal forum.',
    ],
  },
  {
    title: '17. Amendments and General Provisions',
    content: [
      'The company may update these Terms and Conditions when operational requirements, services or applicable laws change.',
      'Updated terms will be published on this website with a revised effective date. Changes will not retrospectively remove rights already available under a confirmed booking or applicable law.',
      'If any provision is found unenforceable, the remaining provisions shall continue to apply to the extent permitted by law.',
      'Where a confirmed booking contains specific written terms that differ from these general website terms, the specific booking terms shall apply to that booking to the extent they are lawful.',
    ],
  },
]

function Terms() {
  return (
    <div className="min-h-screen bg-[#FEFAF4] text-[#66705D]">
      <Navbar />

      <main>
        <section className="bg-[#F3EFE5] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-360 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5E8DC] text-[#536747]">
              <FileText size={26} />
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#71834F]">
              Important Information
            </p>

            <h1 className="font-serif text-4xl leading-tight text-[#2E3D24] sm:text-5xl lg:text-6xl">
              Terms &
              <span className="block italic text-[#71834F]">
                Conditions
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#66705D] sm:text-base">
              Please review the terms governing our travel services,
              bookings and arrangements before confirming your journey
              with Sahyadri Tour Company.
            </p>

            <p className="mt-6 text-xs text-[#89917D]">
              Effective date: To be confirmed before publication
            </p>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
            <aside className="h-fit rounded-2xl border border-[#EAE5D9] bg-white p-6 lg:sticky lg:top-24">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#71834F]">
                On This Page
              </p>

              <nav className="space-y-3">
                {sections.map((section) => (
                  <a
                    key={section.title}
                    href={`#${section.title.split('.')[0]}`}
                    className="block text-sm leading-6 text-[#66705D] transition-colors hover:text-[#2E3D24]"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className="mt-7 border-t border-[#EAE5D9] pt-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#414B3A]">
                  <ShieldCheck size={17} />
                  Your Travel Matters
                </div>
                <p className="mt-2 text-xs leading-6 text-[#89917D]">
                  We aim to maintain transparent and responsible
                  travel arrangements.
                </p>
              </div>
            </aside>

            <article className="min-w-0">
              <div className="mb-10 rounded-2xl border border-[#EAE5D9] bg-white p-6 sm:p-8">
                <p className="text-sm leading-7 text-[#66705D]">
                  These Terms and Conditions explain the responsibilities
                  of Sahyadri Tour Company and its customers in connection
                  with website usage, travel enquiries, bookings and
                  related services. Please read them carefully before
                  proceeding with a booking.
                </p>
              </div>

              <div className="space-y-10">
                {sections.map((section) => {
                  const number = section.title.split('.')[0]

                  return (
                    <section
                      key={section.title}
                      id={number}
                      className="scroll-mt-28"
                    >
                      <h2 className="mb-4 font-serif text-2xl leading-snug text-[#2E3D24] sm:text-3xl">
                        {section.title}
                      </h2>

                      <div className="space-y-4">
                        {section.content.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-sm leading-8 text-[#66705D] sm:text-base"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>

              <div className="mt-12 rounded-2xl bg-[#F3EFE5] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Scale size={22} className="text-[#71834F]" />
                  <h2 className="font-serif text-xl text-[#2E3D24]">
                    Need clarification?
                  </h2>
                </div>

                <p className="mt-3 text-sm leading-7 text-[#66705D]">
                  For questions concerning these Terms and Conditions
                  or your booking, please contact our team through
                  our official communication channels.
                </p>

                <div className="mt-5 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/919769003745?text=Hello%2C%20I%20have%20a%20question%20about%20your%20Terms%20and%20Conditions."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#414B3A] px-5 py-3 text-sm font-semibold text-white/80! transition hover:bg-[#2E3D24]"
                  >
                    Contact Support
                    <CalendarCheck size={16} />
                  </a>
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

export default Terms