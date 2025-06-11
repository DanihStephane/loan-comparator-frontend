import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meilleurtaux.com'
  
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
  ]
  
  const routes = []
  
  for (const locale of ['fr', 'en']) {
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    }
  }
  
  return routes
}
