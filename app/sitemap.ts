import { MetadataRoute } from 'next';
import { getLatestPosts, getAllCategories } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://notesgallery.in';

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-use'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'always' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.5,
  }));

  // 2. Dynamic Categories
  const categories = await getAllCategories(100);
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Dynamic Posts
  const posts = await getLatestPosts(100);
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/article/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }));

  return [
    ...staticRoutes,
    ...categoryUrls,
    ...postUrls,
  ];
}
