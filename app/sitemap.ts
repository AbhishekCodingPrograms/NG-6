import { MetadataRoute } from 'next';
import { getLatestPosts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://notesgallery.com';

  // Get the latest posts from WordPress (e.g., 100 for the sitemap)
  // Note: getLatestPosts currently defaults to 5, so we can pass 100 to get a larger batch
  const posts = await getLatestPosts(100);

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/article/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    ...postUrls,
  ];
}
