const rawSiteUrl = import.meta.env.VITE_SITE_URL?.trim()

export const SITE_URL = rawSiteUrl
  ? rawSiteUrl.replace(/\/+$/, '')
  : ''

export const getCanonicalUrl = (path: string): string | null => {
  if (!SITE_URL) return null

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}