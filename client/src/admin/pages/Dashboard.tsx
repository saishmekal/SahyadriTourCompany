import { useEffect, useState } from 'react'
import {
  Package,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Inbox,
  RefreshCw,
  LayoutDashboard,
} from 'lucide-react'
import { apiRequest } from '../../services/api'

type DashboardStatistics = {
  totalPackages: number
  publishedPackages: number
  totalDestinations: number
  publishedDestinations: number
  totalEnquiries: number
  newEnquiries: number
}

type DashboardResponse = {
  status: string
  data: {
    statistics: DashboardStatistics
  }
}

const initialStats: DashboardStatistics = {
  totalPackages: 0,
  publishedPackages: 0,
  totalDestinations: 0,
  publishedDestinations: 0,
  totalEnquiries: 0,
  newEnquiries: 0,
}

function Dashboard() {
  const [stats, setStats] = useState(initialStats)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadDashboard() {
      try {
        const response = await apiRequest<DashboardResponse>(
          '/admin/dashboard',
        )

        if (active) {
          setStats(response.data.statistics)
          setError('')
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load dashboard statistics.',
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadDashboard()

    return () => {
      active = false
    }
  }, [])

  const statCards = [
    {
      title: 'Total Packages',
      value: stats.totalPackages,
      subtitle: `${stats.publishedPackages} published`,
      icon: Package,
    },
    {
      title: 'Published Packages',
      value: stats.publishedPackages,
      subtitle: 'Available on website',
      icon: CheckCircle2,
    },
    {
      title: 'Total Destinations',
      value: stats.totalDestinations,
      subtitle: `${stats.publishedDestinations} published`,
      icon: MapPin,
    },
    {
      title: 'Published Destinations',
      value: stats.publishedDestinations,
      subtitle: 'Visible to visitors',
      icon: CheckCircle2,
    },
    {
      title: 'Total Enquiries',
      value: stats.totalEnquiries,
      subtitle: 'All customer enquiries',
      icon: MessageSquare,
    },
    {
      title: 'New Enquiries',
      value: stats.newEnquiries,
      subtitle: 'Awaiting follow-up',
      icon: Inbox,
    },
  ]

  return (
    <div className="space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#92978B] text-sm mb-2">
            <LayoutDashboard size={16} />
            <span>Admin / Dashboard</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-[#354331]">
            Dashboard Overview
          </h1>

          <p className="text-sm text-[#92978B] mt-2">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8E5DA] bg-white text-sm font-medium text-[#536449] hover:bg-[#F5F4EE] transition disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>


      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
          {error}
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon

          return (
            <div
              key={card.title}
              className="bg-white border border-[#E8E5DA] rounded-2xl p-6 hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-medium text-[#92978B]">
                  {card.title}
                </p>

                <div className="w-11 h-11 rounded-xl bg-[#E9EDE4] flex items-center justify-center">
                  <Icon size={21} className="text-[#66705D]" />
                </div>
              </div>

              <h2 className="text-3xl font-semibold text-[#354331]">
                {loading ? '...' : card.value.toLocaleString('en-IN')}
              </h2>

              <p className="text-xs text-[#92978B] mt-2">
                {card.subtitle}
              </p>
            </div>
          )
        })}
      </div>


      <div className="bg-white border border-[#E8E5DA] rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-[#354331]">
          Business Overview
        </h2>

        <p className="text-sm text-[#92978B] mt-2">
          Your dashboard statistics are retrieved directly from your
          Sahyadri Tour Company database.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#FEFAF4]">
            <p className="text-sm text-[#92978B]">Package Publishing</p>
            <p className="text-xl font-semibold text-[#536449] mt-1">
              {loading
                ? '...'
                : `${stats.publishedPackages} / ${stats.totalPackages}`}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FEFAF4]">
            <p className="text-sm text-[#92978B]">Destination Publishing</p>
            <p className="text-xl font-semibold text-[#536449] mt-1">
              {loading
                ? '...'
                : `${stats.publishedDestinations} / ${stats.totalDestinations}`}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard