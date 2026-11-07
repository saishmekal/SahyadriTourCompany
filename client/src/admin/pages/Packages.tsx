import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../../services/api'

type ItineraryItem = {
  day: number
  title: string
  description: string
}

type PackageItem = {
  _id: string
  title: string
  slug: string
  duration: string
  category: string
  description: string
  image: string
  itinerary: ItineraryItem[]
  inclusions: string[]
  exclusions: string[]
  isPublished: boolean
  createdAt?: string
}

type PackageForm = {
  title: string
  slug: string
  duration: string
  category: string
  description: string
  image: string
  itinerary: ItineraryItem[]
  inclusions: string
  exclusions: string
  isPublished: boolean
}

type PackagesResponse = {
  status: string
  results: number
  data: {
    packages: PackageItem[]
  }
}

const createEmptyForm = (): PackageForm => ({
  title: '',
  slug: '',
  duration: '',
  category: '',
  description: '',
  image: '',
  itinerary: [{ day: 1, title: '', description: '' }],
  inclusions: '',
  exclusions: '',
  isPublished: false,
})

function Packages() {
  const [packages, setPackages] = useState<PackageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null)
  const [form, setForm] = useState<PackageForm>(createEmptyForm)

  // Refresh packages after create, edit, publish or delete.
  const fetchPackages = useCallback(async () => {
    try {
      setError('')

      const response = await apiRequest<PackagesResponse>('/packages/admin')
      setPackages(response.data.packages)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load packages.',
      )
    }
  }, [])

  // Initial package loading.
  useEffect(() => {
    let isMounted = true

    const loadPackages = async () => {
      try {
        const response = await apiRequest<PackagesResponse>('/packages/admin')

        if (isMounted) {
          setPackages(response.data.packages)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Unable to load packages.',
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadPackages()

    return () => {
      isMounted = false
    }
  }, [])

  // Search and filter.
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesSearch = pkg.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesFilter =
        filter === 'all' ||
        (filter === 'published' && pkg.isPublished) ||
        (filter === 'draft' && !pkg.isPublished)

      return matchesSearch && matchesFilter
    })
  }, [packages, search, filter])

  // Open create modal.
  const openCreateModal = () => {
    setEditingPackage(null)
    setForm(createEmptyForm())
    setError('')
    setSuccess('')
    setIsModalOpen(true)
  }

  // Open edit modal.
  const openEditModal = (pkg: PackageItem) => {
    setEditingPackage(pkg)

    setForm({
      title: pkg.title,
      slug: pkg.slug,
      duration: pkg.duration,
      category: pkg.category,
      description: pkg.description,
      image: pkg.image,
      itinerary: pkg.itinerary?.length
        ? pkg.itinerary.map((item) => ({ ...item }))
        : [{ day: 1, title: '', description: '' }],
      inclusions: pkg.inclusions?.join('\n') || '',
      exclusions: pkg.exclusions?.join('\n') || '',
      isPublished: pkg.isPublished,
    })

    setError('')
    setSuccess('')
    setIsModalOpen(true)
  }

  // Update form fields.
  const updateField = <K extends keyof PackageForm>(
    field: K,
    value: PackageForm[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  // Update itinerary.
  const updateItinerary = (
    index: number,
    field: keyof ItineraryItem,
    value: string | number,
  ) => {
    setForm((previous) => ({
      ...previous,
      itinerary: previous.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  const addItineraryDay = () => {
    setForm((previous) => ({
      ...previous,
      itinerary: [
        ...previous.itinerary,
        {
          day: previous.itinerary.length + 1,
          title: '',
          description: '',
        },
      ],
    }))
  }

  const removeItineraryDay = (index: number) => {
    setForm((previous) => ({
      ...previous,
      itinerary: previous.itinerary
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, day: i + 1 })),
    }))
  }

  // Create or update package.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim().toLowerCase(),
      duration: form.duration.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      itinerary: form.itinerary.map((item) => ({
        day: Number(item.day),
        title: item.title.trim(),
        description: item.description.trim(),
      })),
      inclusions: form.inclusions
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      exclusions: form.exclusions
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      isPublished: form.isPublished,
    }

    try {
      setSaving(true)

      if (editingPackage) {
        await apiRequest(`/packages/${editingPackage._id}`, {
          method: 'PATCH',
          csrf: true,
          body: JSON.stringify(payload),
        })

        setSuccess('Package updated successfully.')
      } else {
        await apiRequest('/packages', {
          method: 'POST',
          csrf: true,
          body: JSON.stringify(payload),
        })

        setSuccess('Package created successfully.')
      }

      setIsModalOpen(false)
      await fetchPackages()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to save package.',
      )
    } finally {
      setSaving(false)
    }
  }

  // Publish or unpublish package.
  const togglePublish = async (pkg: PackageItem) => {
    const action = pkg.isPublished ? 'unpublish' : 'publish'

    if (!window.confirm(`Are you sure you want to ${action} "${pkg.title}"?`)) {
      return
    }

    try {
      setError('')
      setSuccess('')

      await apiRequest(`/packages/${pkg._id}`, {
        method: 'PATCH',
        csrf: true,
        body: JSON.stringify({ isPublished: !pkg.isPublished }),
      })

      setSuccess(`Package ${action}ed successfully.`)
      await fetchPackages()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to update status.',
      )
    }
  }

  // Delete package.
  const handleDelete = async (pkg: PackageItem) => {
    if (
      !window.confirm(
        `Delete "${pkg.title}"? Its associated enquiries will also be deleted. This action cannot be undone.`,
      )
    ) {
      return
    }

    try {
      setError('')
      setSuccess('')

      await apiRequest(`/packages/${pkg._id}`, {
        method: 'DELETE',
        csrf: true,
      })

      setSuccess('Package deleted successfully.')
      await fetchPackages()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to delete package.',
      )
    }
  }

  return (
    <div className="space-y-7 text-[#66705D]">

      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-[#A1A58E]">
            CONTENT MANAGEMENT
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-[#414B3A]">
            Packages
          </h1>
          <p className="mt-2 text-sm text-[#858B7B]">
            Create, update and manage your tour packages.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="rounded-xl bg-[#66705D] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#505B48]"
        >
          + Add New Package
        </button>
      </div>

      {/* Status messages */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
          <p className="text-sm text-[#858B7B]">Total Packages</p>
          <p className="mt-2 text-3xl font-semibold text-[#414B3A]">
            {packages.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
          <p className="text-sm text-[#858B7B]">Published</p>
          <p className="mt-2 text-3xl font-semibold text-green-700">
            {packages.filter((pkg) => pkg.isPublished).length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
          <p className="text-sm text-[#858B7B]">Drafts</p>
          <p className="mt-2 text-3xl font-semibold text-amber-600">
            {packages.filter((pkg) => !pkg.isPublished).length}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#EAE5D9] bg-white p-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search packages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-[#EAE5D9] bg-[#FEFAF4] px-4 py-3 text-sm outline-none focus:border-[#89947A]"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-[#EAE5D9] bg-[#FEFAF4] px-4 py-3 text-sm outline-none focus:border-[#89947A]"
        >
          <option value="all">All Packages</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {/* Package list */}
      <div className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white">
        <div className="border-b border-[#EAE5D9] px-5 py-4">
          <h2 className="font-semibold text-[#414B3A]">
            All Packages ({filteredPackages.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-[#858B7B]">
            Loading packages...
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-medium text-[#414B3A]">No packages found</p>
            <p className="mt-2 text-sm text-[#858B7B]">
              Try changing your search or add a new package.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F0ECE3]">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="flex flex-col gap-4 p-5 transition hover:bg-[#FEFAF4]/60 sm:flex-row sm:items-center"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-20 w-full rounded-xl bg-[#F3EFE5] object-cover sm:w-28"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#414B3A]">
                    {pkg.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#858B7B]">
                    {pkg.category} · {pkg.duration}
                  </p>
                  <p className="mt-1 truncate text-xs text-[#A1A58E]">
                    /{pkg.slug}
                  </p>
                </div>

                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      pkg.isPublished
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {pkg.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => openEditModal(pkg)}
                    className="rounded-lg border border-[#DCDDCF] px-3 py-2 text-xs font-medium hover:bg-[#F5F2E9]"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => void togglePublish(pkg)}
                    className="rounded-lg border border-[#DCDDCF] px-3 py-2 text-xs font-medium hover:bg-[#F5F2E9]"
                  >
                    {pkg.isPublished ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    onClick={() => void handleDelete(pkg)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:p-8">
          <div className="my-auto w-full max-w-3xl rounded-2xl bg-[#FEFAF4] shadow-2xl">

            <div className="flex items-center justify-between border-b border-[#EAE5D9] px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-[#414B3A]">
                  {editingPackage ? 'Edit Package' : 'Create Package'}
                </h2>
                <p className="mt-1 text-sm text-[#858B7B]">
                  Enter the details of your tour package.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg px-3 py-2 text-xl text-[#858B7B] hover:bg-[#F0ECE3]"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6">

              {/* Basic details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Package Title *
                  </label>
                  <input
                    required
                    maxLength={150}
                    value={form.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full rounded-xl border border-[#E0DDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#89947A]"
                    placeholder="Kalsubai Trek"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Slug *
                  </label>
                  <input
                    required
                    maxLength={160}
                    value={form.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    className="w-full rounded-xl border border-[#E0DDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#89947A]"
                    placeholder="kalsubai-trek"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Duration *
                  </label>
                  <input
                    required
                    maxLength={100}
                    value={form.duration}
                    onChange={(e) => updateField('duration', e.target.value)}
                    className="w-full rounded-xl border border-[#E0DDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#89947A]"
                    placeholder="2 Days / 1 Night"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Category *
                  </label>
                  <input
                    required
                    maxLength={100}
                    value={form.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full rounded-xl border border-[#E0DDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#89947A]"
                    placeholder="Trekking"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description *
                </label>
                <textarea
                  required
                  maxLength={5000}
                  rows={4}
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full rounded-xl border border-[#E0DDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#89947A]"
                  placeholder="Describe the travel experience..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Image URL *
                </label>
                <input
                  required
                  type="url"
                  maxLength={2048}
                  value={form.image}
                  onChange={(e) => updateField('image', e.target.value)}
                  className="w-full rounded-xl border border-[#E0DDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#89947A]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Itinerary */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#414B3A]">Itinerary</h3>

                  <button
                    type="button"
                    onClick={addItineraryDay}
                    className="text-sm font-medium text-[#66705D] hover:underline"
                  >
                    + Add Day
                  </button>
                </div>

                {form.itinerary.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-3 rounded-xl border border-[#E0DDCF] bg-white p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        Day {item.day}
                      </span>

                      {form.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(index)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      required
                      maxLength={150}
                      value={item.title}
                      onChange={(e) =>
                        updateItinerary(index, 'title', e.target.value)
                      }
                      placeholder="Day title"
                      className="w-full rounded-lg border border-[#E0DDCF] px-3 py-2 text-sm outline-none focus:border-[#89947A]"
                    />

                    <textarea
                      required
                      rows={2}
                      maxLength={1000}
                      value={item.description}
                      onChange={(e) =>
                        updateItinerary(index, 'description', e.target.value)
                      }
                      placeholder="Describe the activities for this day"
                      className="w-full rounded-lg border border-[#E0DDCF] px-3 py-2 text-sm outline-none focus:border-[#89947A]"
                    />
                  </div>
                ))}
              </div>

              {/* Inclusions and exclusions */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Inclusions
                  </label>
                  <textarea
                    rows={4}
                    value={form.inclusions}
                    onChange={(e) => updateField('inclusions', e.target.value)}
                    className="w-full rounded-xl border border-[#E0DDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#89947A]"
                    placeholder={'Breakfast\nTransport\nGuide'}
                  />
                  <p className="mt-1 text-xs text-[#858B7B]">
                    Enter one item per line.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Exclusions
                  </label>
                  <textarea
                    rows={4}
                    value={form.exclusions}
                    onChange={(e) => updateField('exclusions', e.target.value)}
                    className="w-full rounded-xl border border-[#E0DDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#89947A]"
                    placeholder={'Personal expenses\nExtra meals'}
                  />
                  <p className="mt-1 text-xs text-[#858B7B]">
                    Enter one item per line.
                  </p>
                </div>
              </div>

              {/* Publish option */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E0DDCF] bg-white p-4">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) =>
                    updateField('isPublished', e.target.checked)
                  }
                  className="h-4 w-4 accent-[#66705D]"
                />

                <span>
                  <span className="block text-sm font-medium">
                    Publish this package
                  </span>
                  <span className="mt-1 block text-xs text-[#858B7B]">
                    Published packages will be visible on the public website.
                  </span>
                </span>
              </label>

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Form actions */}
              <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#EAE5D9] pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="rounded-xl border border-[#DCDDCF] px-5 py-3 text-sm font-medium hover:bg-[#F0ECE3] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#66705D] px-6 py-3 text-sm font-medium text-white hover:bg-[#505B48] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? 'Saving...'
                    : editingPackage
                      ? 'Save Changes'
                      : 'Create Package'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Packages