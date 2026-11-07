import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Search,
  RefreshCw,
  Eye,
  X,
  Phone,
  MessageSquare,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Loader2,
} from 'lucide-react'
import { apiRequest } from '../../services/api'

type EnquiryStatus = 'new' | 'contacted' | 'closed'
type StatusFilter = 'all' | EnquiryStatus

type Enquiry = {
  _id: string
  name: string
  phone: string
  packageSlug: string
  message: string
  status: EnquiryStatus
  createdAt: string
  updatedAt: string
}

type EnquiryResponse = {
  status: string
  results: number
  pagination: {
    currentPage: number
    limit: number
    totalEnquiries: number
    totalPages: number
  }
  data: {
    enquiries: Enquiry[]
  }
}

type SingleEnquiryResponse = {
  status: string
  data: {
    enquiry: Enquiry
  }
}

const PAGE_SIZE = 10

const statusStyles: Record<EnquiryStatus, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-100',
  contacted: 'bg-amber-50 text-amber-700 border-amber-100',
  closed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}

function Enquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEnquiries, setTotalEnquiries] = useState(0)

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Fetch function used by the refresh button and after status updates.
  const fetchEnquiries = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
      })

      if (statusFilter !== 'all') {
        params.set('status', statusFilter)
      }

      const response = await apiRequest<EnquiryResponse>(
        `/enquiries?${params.toString()}`,
      )

      setEnquiries(response.data.enquiries)
      setTotalPages(Math.max(response.pagination.totalPages, 1))
      setTotalEnquiries(response.pagination.totalEnquiries)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load enquiries.',
      )
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter])

  // Initial and dependency-driven data fetching.
  useEffect(() => {
    let ignore = false

    const loadEnquiries = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
        })

        if (statusFilter !== 'all') {
          params.set('status', statusFilter)
        }

        const response = await apiRequest<EnquiryResponse>(
          `/enquiries?${params.toString()}`,
        )

        if (!ignore) {
          setEnquiries(response.data.enquiries)
          setTotalPages(Math.max(response.pagination.totalPages, 1))
          setTotalEnquiries(response.pagination.totalEnquiries)
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : 'Unable to load enquiries.',
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    void loadEnquiries()

    return () => {
      ignore = true
    }
  }, [page, statusFilter])

  // Search within the currently loaded page.
  const filteredEnquiries = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return enquiries

    return enquiries.filter((enquiry) =>
      [
        enquiry.name,
        enquiry.phone,
        enquiry.packageSlug,
        enquiry.message,
      ].some((value) => value.toLowerCase().includes(term)),
    )
  }, [enquiries, search])

  // Fetch complete details for a selected enquiry.
  const openDetails = async (id: string) => {
    setDetailsLoading(true)
    setSelectedEnquiry(null)
    setError('')

    try {
      const response = await apiRequest<SingleEnquiryResponse>(
        `/enquiries/${id}`,
      )

      setSelectedEnquiry(response.data.enquiry)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load enquiry details.',
      )
    } finally {
      setDetailsLoading(false)
    }
  }

  // Update enquiry status through the protected API.
  const updateStatus = async (
    id: string,
    status: EnquiryStatus,
  ) => {
    setUpdatingId(id)
    setError('')
    setSuccess('')

    try {
      const response = await apiRequest<SingleEnquiryResponse>(
        `/enquiries/${id}`,
        {
          method: 'PATCH',
          csrf: true,
          body: JSON.stringify({ status }),
        },
      )

      const updatedEnquiry = response.data.enquiry

      setEnquiries((current) =>
        current
          .map((item) =>
            item._id === id ? updatedEnquiry : item,
          )
          .filter((item) =>
            statusFilter === 'all' ? true : item.status === statusFilter,
          ),
      )

      setSelectedEnquiry((current) =>
        current?._id === id ? updatedEnquiry : current,
      )

      setSuccess('Enquiry status updated successfully.')

      await fetchEnquiries()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to update enquiry.',
      )
    } finally {
      setUpdatingId(null)
    }
  }

  // Counts on the currently loaded page.
  const statCounts = useMemo(
    () => ({
      all: totalEnquiries,
      new: enquiries.filter((item) => item.status === 'new').length,
      contacted: enquiries.filter((item) => item.status === 'contacted').length,
      closed: enquiries.filter((item) => item.status === 'closed').length,
    }),
    [enquiries, totalEnquiries],
  )

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-[#929985]">
            Customer Management
          </p>

          <h1 className="text-2xl font-bold text-[#414B3A] sm:text-3xl">
            Enquiries
          </h1>

          <p className="mt-2 text-sm text-[#858C7D]">
            Manage customer enquiries and follow up on tour requests.
          </p>
        </div>

        <button
          onClick={() => void fetchEnquiries()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EAE5D9] bg-white px-4 py-3 text-sm font-semibold text-[#66705D] transition hover:bg-[#F8F5ED] disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Feedback */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          {
            label: 'Total Enquiries',
            value: statCounts.all,
            description: 'Matching current filter',
          },
          {
            label: 'New',
            value: statCounts.new,
            description: 'On this page',
          },
          {
            label: 'Contacted',
            value: statCounts.contacted,
            description: 'On this page',
          },
          {
            label: 'Closed',
            value: statCounts.closed,
            description: 'On this page',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#EAE5D9] bg-white p-5"
          >
            <p className="text-sm font-medium text-[#858C7D]">
              {stat.label}
            </p>

            <p className="mt-3 text-3xl font-bold text-[#414B3A]">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-[#A0A493]">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Search and filters */}
      <div className="rounded-2xl border border-[#EAE5D9] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A493]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, phone, package..."
              className="w-full rounded-xl border border-[#EAE5D9] bg-[#FEFAF4] py-3 pl-11 pr-4 text-sm text-[#414B3A] outline-none transition placeholder:text-[#A0A493] focus:border-[#899579]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              ['all', 'new', 'contacted', 'closed'] as StatusFilter[]
            ).map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status)
                  setPage(1)
                }}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${
                  statusFilter === status
                    ? 'bg-[#66705D] text-white'
                    : 'bg-[#F5F3EC] text-[#66705D] hover:bg-[#EAE8DF]'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry table */}
      <div className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white">
        <div className="flex flex-col gap-2 border-b border-[#EAE5D9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-bold text-[#414B3A]">
            Customer Enquiries
          </h2>

          <p className="text-xs text-[#929985]">
            {filteredEnquiries.length} shown · {totalEnquiries} matching records
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-[#858C7D]">
            <Loader2 className="animate-spin" size={20} />
            Loading enquiries...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <Inbox size={36} className="mb-3 text-[#B0B5A5]" />

            <h3 className="font-semibold text-[#414B3A]">
              No enquiries found
            </h3>

            <p className="mt-1 text-sm text-[#929985]">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-212.5 text-left">
                <thead className="bg-[#FAF8F2] text-xs uppercase tracking-wide text-[#929985]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Customer</th>
                    <th className="px-5 py-4 font-semibold">Package</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#F0EDE5]">
                  {filteredEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="transition hover:bg-[#FEFCF7]"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#414B3A]">
                          {enquiry.name}
                        </p>

                        <p className="mt-1 text-xs text-[#929985]">
                          {enquiry.phone}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-[#F5F3EC] px-3 py-1.5 text-xs font-medium text-[#66705D]">
                          {enquiry.packageSlug}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#858C7D]">
                        {formatDate(enquiry.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={enquiry.status} />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => void openDetails(enquiry._id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#EAE5D9] px-3 py-2 text-xs font-semibold text-[#66705D] transition hover:bg-[#F5F3EC]"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-[#EAE5D9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#929985]">
                Page {page} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setPage((current) => Math.max(1, current - 1))
                  }
                  disabled={page <= 1 || loading}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#EAE5D9] px-3 py-2 text-sm text-[#66705D] transition hover:bg-[#F5F3EC] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <button
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  disabled={page >= totalPages || loading}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#EAE5D9] px-3 py-2 text-sm text-[#66705D] transition hover:bg-[#F5F3EC] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Enquiry details modal */}
      {(selectedEnquiry || detailsLoading) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => {
            if (!detailsLoading) setSelectedEnquiry(null)
          }}
        >
          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-[#FEFAF4] p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#929985]">
                  Customer Information
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#414B3A]">
                  Enquiry Details
                </h2>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                disabled={detailsLoading}
                className="rounded-lg p-2 text-[#858C7D] transition hover:bg-[#EEEAE0]"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            {detailsLoading ? (
              <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-[#858C7D]">
                <Loader2 size={20} className="animate-spin" />
                Loading details...
              </div>
            ) : selectedEnquiry ? (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#EAE5D9] bg-white p-4">
                    <p className="text-xs text-[#929985]">
                      Customer Name
                    </p>

                    <p className="mt-2 font-semibold text-[#414B3A]">
                      {selectedEnquiry.name}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#EAE5D9] bg-white p-4">
                    <p className="text-xs text-[#929985]">
                      Phone Number
                    </p>

                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="mt-2 inline-flex items-center gap-2 font-semibold text-[#66705D] hover:underline"
                    >
                      <Phone size={15} />
                      {selectedEnquiry.phone}
                    </a>
                  </div>

                  <div className="rounded-xl border border-[#EAE5D9] bg-white p-4">
                    <p className="text-xs text-[#929985]">
                      Selected Package
                    </p>

                    <p className="mt-2 font-semibold text-[#414B3A]">
                      {selectedEnquiry.packageSlug}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#EAE5D9] bg-white p-4">
                    <p className="text-xs text-[#929985]">
                      Submitted On
                    </p>

                    <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#414B3A]">
                      <CalendarDays size={15} />
                      {formatDateTime(selectedEnquiry.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#EAE5D9] bg-white p-4">
                  <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#929985]">
                    <MessageSquare size={15} />
                    Customer Message
                  </p>

                  <p className="whitespace-pre-wrap text-sm leading-7 text-[#66705D]">
                    {selectedEnquiry.message}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#414B3A]">
                    Update Enquiry Status
                  </label>

                  <select
                    value={selectedEnquiry.status}
                    disabled={updatingId === selectedEnquiry._id}
                    onChange={(event) =>
                      void updateStatus(
                        selectedEnquiry._id,
                        event.target.value as EnquiryStatus,
                      )
                    }
                    className="w-full rounded-xl border border-[#EAE5D9] bg-white px-4 py-3 text-sm text-[#414B3A] outline-none focus:border-[#899579] disabled:opacity-50"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>

                  {updatingId === selectedEnquiry._id && (
                    <p className="mt-2 flex items-center gap-2 text-xs text-[#858C7D]">
                      <Loader2 size={14} className="animate-spin" />
                      Updating status...
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default Enquiries