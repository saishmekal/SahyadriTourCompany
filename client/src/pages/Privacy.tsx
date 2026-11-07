import { useEffect } from 'react'
import {
  ShieldCheck,
  Database,
  LockKeyhole,
  UserRound,
  Share2,
  Clock,
  Mail,
  MessageCircle,
  FileText,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const sections = [
  { id: 'information', title: '1. Information We Collect' },
  { id: 'usage', title: '2. How We Use Your Information' },
  { id: 'storage', title: '3. Data Storage and Security' },
  { id: 'sharing', title: '4. Sharing of Information' },
  { id: 'retention', title: '5. Data Retention' },
  { id: 'cookies', title: '6. Cookies and Website Technologies' },
  { id: 'rights', title: '7. Your Privacy Rights' },
  { id: 'third-party', title: '8. Third-Party Services and Links' },
  { id: 'children', title: "9. Children's Privacy" },
  { id: 'changes', title: '10. Changes to This Policy' },
  { id: 'contact', title: '11. Contact Us' },
]

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Sahyadri Tour Company'
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
                Your Privacy Matters
              </div>

              <h1 className="font-serif text-4xl font-medium tracking-tight text-[#2E3D24] sm:text-5xl lg:text-6xl">
                Privacy Policy
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#66705D] sm:text-base">
                We value your trust and are committed to handling your
                personal information responsibly. This policy explains
                how Sahyadri Tour Company collects, uses, stores and
                protects information when you interact with our website
                and travel services.
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

              <nav aria-label="Privacy policy sections">
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

              <div className="rounded-2xl border border-[#EAE5D9] bg-white/60 p-5 sm:p-7">
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 shrink-0 text-[#5D7141]" size={21} />
                  <div>
                    <h2 className="font-serif text-xl text-[#2E3D24]">
                      Introduction
                    </h2>
                    <p className="mt-3 text-sm leading-7">
                      Sahyadri Tour Company ("we", "our" or "us") respects
                      the privacy of visitors, prospective travellers and
                      customers. This Privacy Policy applies to information
                      collected through our website, enquiry forms and
                      communications relating to our travel services.
                    </p>
                    <p className="mt-3 text-sm leading-7">
                      By using our website or submitting your information
                      through our enquiry channels, you acknowledge that
                      you have read this policy. Where consent is required
                      under applicable law, we will seek it appropriately.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1 */}
              <section id="information" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <UserRound className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    1. Information We Collect
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  We collect information that you voluntarily provide
                  when making an enquiry, requesting a customised trip
                  or communicating with our team.
                </p>

                <h3 className="mt-5 text-sm font-semibold text-[#2E3D24]">
                  A. Enquiry Information
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
                  <li>Your name.</li>
                  <li>Contact number or phone number.</li>
                  <li>Selected travel package, where applicable.</li>
                  <li>Message or other details you include in your enquiry.</li>
                </ul>

                <h3 className="mt-5 text-sm font-semibold text-[#2E3D24]">
                  B. Booking and Travel Information
                </h3>
                <p className="mt-2 text-sm leading-7">
                  If you proceed with a booking, we may need additional
                  information such as email address, traveller names,
                  identification details, travel preferences and payment
                  references, where reasonably necessary to arrange and
                  manage your trip or meet legal requirements.
                </p>

                <h3 className="mt-5 text-sm font-semibold text-[#2E3D24]">
                  C. Technical Information
                </h3>
                <p className="mt-2 text-sm leading-7">
                  Our website infrastructure or hosting providers may
                  process technical information such as browser type,
                  device information, IP address and server logs for
                  security, troubleshooting and website operations.
                </p>
              </section>

              {/* 2 */}
              <section id="usage" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <MessageCircle className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    2. How We Use Your Information
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  We use personal information only for legitimate
                  business purposes connected with enquiries, bookings
                  and travel services, including:
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
                  <li>Responding to enquiries and travel-related questions.</li>
                  <li>Preparing customised travel plans and quotations.</li>
                  <li>Processing and managing confirmed bookings.</li>
                  <li>Coordinating accommodation, transportation and sightseeing.</li>
                  <li>Sending booking updates and important travel information.</li>
                  <li>Providing customer assistance and resolving complaints.</li>
                  <li>Maintaining business, accounting and legally required records.</li>
                  <li>Improving website functionality and preventing misuse.</li>
                </ul>

                <p className="mt-4 text-sm leading-7">
                  We do not sell your personal information to third parties.
                  We will not use your contact details for unrelated
                  promotional communications without an appropriate
                  lawful basis or consent where required.
                </p>
              </section>

              {/* 3 */}
              <section id="storage" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <Database className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    3. Data Storage and Security
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Enquiry information submitted through our website is
                  stored in our business database so that authorised
                  personnel can review and respond to enquiries.
                </p>

                <p className="mt-3 text-sm leading-7">
                  We use reasonable technical and organisational
                  safeguards designed to protect information against
                  unauthorised access, alteration, disclosure, loss
                  or misuse.
                </p>

                <p className="mt-3 text-sm leading-7">
                  Access to administrative information is restricted
                  through authentication and access controls. However,
                  no internet transmission or electronic storage method
                  can be guaranteed to be completely secure.
                </p>
              </section>

              {/* 4 */}
              <section id="sharing" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <Share2 className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    4. Sharing of Information
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  We may share relevant information with third parties
                  only where reasonably necessary to provide requested
                  or confirmed travel services, operate our website
                  or meet applicable legal obligations.
                </p>

                <h3 className="mt-5 text-sm font-semibold text-[#2E3D24]">
                  Travel and Service Partners
                </h3>
                <p className="mt-2 text-sm leading-7">
                  Depending on your booking, relevant details may be
                  shared with hotels, transport operators, tour guides,
                  activity organisers and other service providers
                  involved in your travel arrangements.
                </p>

                <h3 className="mt-5 text-sm font-semibold text-[#2E3D24]">
                  Technology and Infrastructure Providers
                </h3>
                <p className="mt-2 text-sm leading-7">
                  We may use hosting, database, communication and
                  technical service providers to operate our website
                  and manage business information. Such providers may
                  process information on our behalf as necessary
                  to provide their services.
                </p>

                <h3 className="mt-5 text-sm font-semibold text-[#2E3D24]">
                  Legal Requirements
                </h3>
                <p className="mt-2 text-sm leading-7">
                  Information may be disclosed where required by law,
                  a valid legal process or a competent government
                  authority, or where necessary to protect legitimate
                  legal interests.
                </p>
              </section>

              {/* 5 */}
              <section id="retention" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <Clock className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    5. Data Retention
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  We retain personal information only for as long as
                  reasonably necessary to respond to enquiries,
                  manage bookings, provide customer support, maintain
                  business records and comply with applicable legal
                  obligations.
                </p>

                <p className="mt-3 text-sm leading-7">
                  When information is no longer required for these
                  purposes, we will take reasonable steps to delete
                  or anonymise it, subject to any applicable legal
                  retention requirements.
                </p>
              </section>

              {/* 6 */}
              <section id="cookies" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <LockKeyhole className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    6. Cookies and Website Technologies
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Our website may use essential browser storage,
                  cookies or similar technologies required for
                  functionality, security and administrative
                  authentication.
                </p>

                <p className="mt-3 text-sm leading-7">
                  Third-party services embedded or linked through
                  our website may use their own technologies,
                  subject to their respective privacy policies.
                  You can manage cookies through your browser
                  settings, although disabling certain technologies
                  may affect website functionality.
                </p>
              </section>

              {/* 7 */}
              <section id="rights" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheck className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    7. Your Privacy Rights
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Subject to applicable Indian data protection laws,
                  you may have the right to:
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
                  <li>Request information about personal data we process.</li>
                  <li>Request correction or updating of inaccurate information.</li>
                  <li>Request deletion of personal information where legally permissible.</li>
                  <li>Withdraw consent where processing is based on consent.</li>
                  <li>Raise a concern or grievance regarding the handling of your information.</li>
                </ul>

                <p className="mt-4 text-sm leading-7">
                  Certain information may need to be retained where
                  required by law or necessary to complete contractual
                  and business obligations.
                </p>
              </section>

              {/* 8 */}
              <section id="third-party" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <Share2 className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    8. Third-Party Services and Links
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Our website may contain links to external websites
                  or services, including WhatsApp and travel-related
                  service providers. When you access these services,
                  their own terms and privacy policies apply.
                </p>

                <p className="mt-3 text-sm leading-7">
                  We are not responsible for the privacy practices,
                  content or security of third-party websites.
                  We encourage you to review their policies before
                  sharing personal information with them.
                </p>
              </section>

              {/* 9 */}
              <section id="children" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <UserRound className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    9. Children's Privacy
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  Our website is intended for individuals who can
                  lawfully use our services. We do not knowingly
                  collect personal information directly from
                  children without appropriate consent or
                  authorisation where required by applicable law.
                </p>

                <p className="mt-3 text-sm leading-7">
                  If you believe that a child has provided personal
                  information to us inappropriately, please contact
                  us so that we can review the matter and take
                  appropriate action.
                </p>
              </section>

              {/* 10 */}
              <section id="changes" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <FileText className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    10. Changes to This Policy
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  We may update this Privacy Policy from time to
                  time to reflect changes in our services, website
                  practices or applicable legal requirements.
                  Updated versions will be published on this page
                  with a revised effective date.
                </p>
              </section>

              {/* 11 */}
              <section id="contact" className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <Mail className="text-[#5D7141]" size={21} />
                  <h2 className="font-serif text-2xl text-[#2E3D24]">
                    11. Contact Us
                  </h2>
                </div>

                <p className="text-sm leading-7">
                  If you have questions, concerns or requests
                  regarding this Privacy Policy or the handling
                  of your personal information, you can contact
                  Sahyadri Tour Company through the following
                  channels:
                </p>

                <div className="mt-5 rounded-2xl border border-[#EAE5D9] bg-white/60 p-5 sm:p-6">
                  <h3 className="font-serif text-lg font-semibold text-[#2E3D24]">
                    Sahyadri Tour Company
                  </h3>

                  <p className="mt-3 text-sm text-[#66705D]">
                    General and privacy-related enquiries
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

              <div className="border-t border-[#EAE5D9] pt-6">
                <p className="text-xs leading-6 text-[#858B78]">
                  This policy should be reviewed and finalised before
                  commercial publication to ensure it reflects the
                  company's actual data practices and applicable
                  legal requirements.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}