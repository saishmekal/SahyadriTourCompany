import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Plus,
  Search,
  MapPin,
  Pencil,
  Trash2,
  X,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { apiRequest } from '../../services/api'

type Destination = {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  location: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

type DestinationForm = {
  name: string
  slug: string
  description: string
  image: string
  location: string
  isPublished: boolean
}

type DestinationResponse = {
  status: string
  results: number
  data: {
    destinations: Destination[]
  }
}

type MutationResponse = {
  status: string
  message: string
  data?: {
    destination: Destination
  }
}

const emptyForm: DestinationForm = {
  name: '',
  slug: '',
  description: '',
  image: '',
  location: '',
  isPublished: false,
}

type FilterType = 'all' | 'published' | 'draft'

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null)

  const [form, setForm] = useState<DestinationForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [formError, setFormError] = useState('')

  const fetchDestinations = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const response = await apiRequest<DestinationResponse>(
        '/destinations/admin',
      )

      setDestinations(response.data.destinations)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load destinations.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    async function loadDestinations() {
      try {
        const response = await apiRequest<DestinationResponse>(
          '/destinations/admin',
        )

        if (mounted) {
          setDestinations(response.data.destinations)
          setError('')
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load destinations.',
          )
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    void loadDestinations()

    return () => {
      mounted = false
    }
  }, [])

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const searchMatch =
        destination.name.toLowerCase().includes(search.toLowerCase()) ||
        destination.location.toLowerCase().includes(search.toLowerCase()) ||
        destination.slug.toLowerCase().includes(search.toLowerCase())

      const filterMatch =
        filter === 'all' ||
        (filter === 'published' && destination.isPublished) ||
        (filter === 'draft' && !destination.isPublished)

      return searchMatch && filterMatch
    })
  }, [destinations, search, filter])

  const publishedCount = destinations.filter(
    (destination) => destination.isPublished,
  ).length

  const draftCount = destinations.length - publishedCount

  function openCreateModal() {
    setEditingDestination(null)
    setForm(emptyForm)
    setFormError('')
    setIsModalOpen(true)
  }

  function openEditModal(destination: Destination) {
    setEditingDestination(destination)

    setForm({
      name: destination.name,
      slug: destination.slug,
      description: destination.description,
      image: destination.image,
      location: destination.location,
      isPublished: destination.isPublished,
    })

    setFormError('')
    setIsModalOpen(true)
  }

  function closeModal() {
    if (saving) return

    setIsModalOpen(false)
    setEditingDestination(null)
    setForm(emptyForm)
    setFormError('')
  }

  function updateField<K extends keyof DestinationForm>(
    field: K,
    value: DestinationForm[K],
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    const normalizedSlug = form.slug.trim().toLowerCase()

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedSlug)) {
      setFormError(
        'Slug must contain lowercase letters, numbers and hyphens only.',
      )
      return
    }

    const payload: DestinationForm = {
      ...form,
      name: form.name.trim(),
      slug: normalizedSlug,
      description: form.description.trim(),
      image: form.image.trim(),
      location: form.location.trim(),
    }

    setSaving(true)

    try {
      if (editingDestination) {
        await apiRequest<MutationResponse>(
          `/destinations/${editingDestination._id}`,
          {
            method: 'PATCH',
            body: JSON.stringify(payload),
            csrf: true,
          },
        )
      } else {
        await apiRequest<MutationResponse>('/destinations', {
          method: 'POST',
          body: JSON.stringify(payload),
          csrf: true,
        })
      }

      closeModal()
      await fetchDestinations()
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : 'Unable to save destination.',
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleTogglePublish(destination: Destination) {
    setTogglingId(destination._id)
    setError('')

    try {
      await apiRequest<MutationResponse>(
        `/destinations/${destination._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            isPublished: !destination.isPublished,
          }),
          csrf: true,
        },
      )

      await fetchDestinations()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update publication status.',
      )
    } finally {
      setTogglingId(null)
    }
  }

  async function handleDelete(destination: Destination) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${destination.name}"? This action cannot be undone.`,
    )

    if (!confirmed) return

    setDeletingId(destination._id)
    setError('')

    try {
      await apiRequest<MutationResponse>(
        `/destinations/${destination._id}`,
        {
          method: 'DELETE',
          csrf: true,
        },
      )

      setDestinations((previous) =>
        previous.filter((item) => item._id !== destination._id),
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete destination.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-[#9A9F88]">
            CONTENT MANAGEMENT
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-[#414B3A] sm:text-3xl">
            Destinations
          </h1>

          <p className="mt-2 text-sm text-[#929784]">
            Manage the beautiful destinations featured on your website.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#66705D] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#414B3A]"
        >
          <Plus size={18} />
          Add Destination
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
          <p className="text-sm text-[#929784]">Total Destinations</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#414B3A]">
            {destinations.length}
          </h2>
          <p className="mt-1 text-xs text-[#A1A493]">
            All destinations
          </p>
        </div>

        <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
          <p className="text-sm text-[#929784]">Published</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#66705D]">
            {publishedCount}
          </h2>
          <p className="mt-1 text-xs text-[#A1A493]">
            Visible on the website
          </p>
        </div>

        <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
          <p className="text-sm text-[#929784]">Drafts</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#B18A55]">
            {draftCount}
          </h2>
          <p className="mt-1 text-xs text-[#A1A493]">
            Not published yet
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#EAE5D9] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A493]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search destinations..."
            className="w-full rounded-xl border border-[#EAE5D9] bg-[#FEFAF4] py-3 pl-11 pr-4 text-sm text-[#414B3A] outline-none transition focus:border-[#66705D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'published', 'draft'] as FilterType[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                filter === item
                  ? 'bg-[#66705D] text-white'
                  : 'bg-[#FEFAF4] text-[#7C836F] hover:bg-[#F0EEE5]'
              }`}
            >
              {item === 'all' ? 'All' : item}
            </button>
          ))}

          <button
            type="button"
            onClick={() => void fetchDestinations()}
            disabled={loading}
            title="Refresh destinations"
            className="rounded-lg border border-[#EAE5D9] p-2.5 text-[#66705D] transition hover:bg-[#FEFAF4] disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? 'animate-spin' : ''}
            />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError('')}
            aria-label="Dismiss error"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Destination List */}
      {loading ? (
        <div className="flex min-h-64 items-center justify-center gap-3 rounded-2xl border border-[#EAE5D9] bg-white text-sm text-[#66705D]">
          <Loader2 size={20} className="animate-spin" />
          Loading destinations...
        </div>
      ) : filteredDestinations.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCD8CA] bg-white px-6 text-center">
          <MapPin size={32} className="mb-3 text-[#A1A493]" />

          <h3 className="text-lg font-medium text-[#414B3A]">
            {search || filter !== 'all'
              ? 'No matching destinations'
              : 'No destinations yet'}
          </h3>

          <p className="mt-2 max-w-sm text-sm text-[#929784]">
            {search || filter !== 'all'
              ? 'Try changing your search or filter.'
              : 'Start by adding your first destination.'}
          </p>

          {!search && filter === 'all' && (
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 rounded-xl bg-[#66705D] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#414B3A]"
            >
              Add Destination
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <div
              key={destination._id}
              className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white transition hover:shadow-md"
            >
              {/* Image */}
              <div className="relative h-48 bg-[#F0EEE5]">
                {destination.image ? (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#A1A493]">
                    <ImageIcon size={35} />
                  </div>
                )}

                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
                    destination.isPublished
                      ? 'bg-[#E6F0E5] text-[#55734F]'
                      : 'bg-[#F5EBDD] text-[#A17A45]'
                  }`}
                >
                  {destination.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 p-5">
                <div>
                  <h3 className="text-lg font-semibold text-[#414B3A]">
                    {destination.name}
                  </h3>

                  <p className="mt-1 flex items-center gap-1.5 text-sm text-[#929784]">
                    <MapPin size={14} />
                    {destination.location}
                  </p>
                </div>

                <p className="line-clamp-2 min-h-10 text-sm leading-5 text-[#858B79]">
                  {destination.description}
                </p>

                <p className="truncate rounded-lg bg-[#FEFAF4] px-3 py-2 text-xs text-[#929784]">
                  Slug: {destination.slug}
                </p>

                <div className="flex items-center justify-between border-t border-[#F0EEE5] pt-4">
                  <button
                    type="button"
                    onClick={() => void handleTogglePublish(destination)}
                    disabled={togglingId === destination._id}
                    className="text-sm font-medium text-[#66705D] transition hover:text-[#414B3A] disabled:opacity-50"
                  >
                    {togglingId === destination._id
                      ? 'Updating...'
                      : destination.isPublished
                        ? 'Unpublish'
                        : 'Publish'}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(destination)}
                      title="Edit destination"
                      className="rounded-lg border border-[#EAE5D9] p-2.5 text-[#66705D] transition hover:bg-[#FEFAF4]"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => void handleDelete(destination)}
                      disabled={deletingId === destination._id}
                      title="Delete destination"
                      className="rounded-lg border border-red-100 p-2.5 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === destination._id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal()
          }}
        >
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-[#FEFAF4] p-5 shadow-2xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wider text-[#9A9F88]">
                  DESTINATION MANAGEMENT
                </p>

                <h2 className="mt-2 text-xl font-semibold text-[#414B3A]">
                  {editingDestination
                    ? 'Edit Destination'
                    : 'Add New Destination'}
                </h2>

                <p className="mt-1 text-sm text-[#929784]">
                  Enter the destination details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-[#66705D] transition hover:bg-[#F0EEE5]"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#414B3A]">
                    Destination Name *
                  </label>

                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(event) => {
                      const name = event.target.value
                      setForm((previous) => ({
                        ...previous,
                        name,
                        ...(!editingDestination
                          ? { slug: createSlug(name) }
                          : {}),
                      }))
                    }}
                    placeholder="e.g. Lonavala"
                    className="w-full rounded-xl border border-[#EAE5D9] bg-white px-4 py-3 text-sm text-[#414B3A] outline-none focus:border-[#66705D]"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#414B3A]">
                    URL Slug *
                  </label>

                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.slug}
                    onChange={(event) =>
                      updateField('slug', event.target.value.toLowerCase())
                    }
                    placeholder="e.g. lonavala"
                    className="w-full rounded-xl border border-[#EAE5D9] bg-white px-4 py-3 text-sm text-[#414B3A] outline-none focus:border-[#66705D]"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#414B3A]">
                  Location *
                </label>

                <input
                  type="text"
                  required
                  maxLength={150}
                  value={form.location}
                  onChange={(event) =>
                    updateField('location', event.target.value)
                  }
                  placeholder="e.g. Maharashtra, India"
                  className="w-full rounded-xl border border-[#EAE5D9] bg-white px-4 py-3 text-sm text-[#414B3A] outline-none focus:border-[#66705D]"
                />
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#414B3A]">
                  Destination Image URL *
                </label>

                <input
                  type="url"
                  required
                  maxLength={2048}
                  value={form.image}
                  onChange={(event) =>
                    updateField('image', event.target.value)
                  }
                  placeholder="https://example.com/destination.jpg"
                  className="w-full rounded-xl border border-[#EAE5D9] bg-white px-4 py-3 text-sm text-[#414B3A] outline-none focus:border-[#66705D]"
                />

                {form.image && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-[#EAE5D9] bg-white">
                    <img
                      src={form.image}
                      alt="Destination preview"
                      className="h-40 w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#414B3A]">
                  Description *
                </label>

                <textarea
                  required
                  maxLength={2000}
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    updateField('description', event.target.value)
                  }
                  placeholder="Write a short description about this destination..."
                  className="w-full resize-y rounded-xl border border-[#EAE5D9] bg-white px-4 py-3 text-sm text-[#414B3A] outline-none focus:border-[#66705D]"
                />

                <p className="mt-1 text-right text-xs text-[#A1A493]">
                  {form.description.length}/2000
                </p>
              </div>

              {/* Publish */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#EAE5D9] bg-white p-4">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(event) =>
                    updateField('isPublished', event.target.checked)
                  }
                  className="h-4 w-4 accent-[#66705D]"
                />

                <div>
                  <p className="text-sm font-medium text-[#414B3A]">
                    Publish this destination
                  </p>
                  <p className="mt-1 text-xs text-[#929784]">
                    Make this destination visible on the public website.
                  </p>
                </div>
              </label>

              {/* Form Error */}
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {formError}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#EAE5D9] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-[#EAE5D9] bg-white px-5 py-3 text-sm font-medium text-[#66705D] transition hover:bg-[#F0EEE5] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#66705D] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#414B3A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <Loader2 size={17} className="animate-spin" />
                  )}

                  {saving
                    ? 'Saving...'
                    : editingDestination
                      ? 'Save Changes'
                      : 'Create Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Destinations