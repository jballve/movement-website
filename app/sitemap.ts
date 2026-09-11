import type { MetadataRoute } from 'next'
import { team } from '@/data/content'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/team`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    ...team.map((member) => ({
      url: `${siteUrl}/team/${member.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
