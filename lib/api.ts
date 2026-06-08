// Define TypeScript interfaces for our WordPress Data
export interface WPPost {
  id: number;
  title: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  link: string;
  slug: string;
  // Custom fields added via our Headless Plugin
  featured_image_url?: string;
  category_names?: string[];
}

export interface WPTrendingPost {
  id: number;
  title: string;
  link: string;
  comment_count: number;
}

export interface WPMenu {
  id: number;
  title: string;
  url: string;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface WPComment {
  id: number;
  post: number;
  author_name: string;
  author_avatar_urls?: { [size: string]: string };
  date: string;
  content: {
    rendered: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8000/wp-json';

/**
 * Universal fetcher with error handling and Next.js ISR cache tagging.
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const wpUsername = process.env.WP_API_USERNAME;
  const wpPassword = process.env.WP_API_PASSWORD;

  let headers = options.headers || {};

  if (wpUsername && wpPassword) {
    const encodedCredentials = Buffer.from(`${wpUsername}:${wpPassword}`).toString('base64');
    headers = {
      ...headers,
      'Authorization': `Basic ${encodedCredentials}`,
    };
  }

  const defaultOptions = {
    // Next.js standard data cache. Revalidate every 60 seconds.
    next: { revalidate: 60 },
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers,
    });

    if (!res.ok) {
      console.error(`Failed to fetch API: ${endpoint} (Status: ${res.status})`);
      return null;
    }

    let jsonString = await res.text();
    // Force HTTPS for all media URLs coming from WordPress to prevent mixed-content blocking on mobile
    jsonString = jsonString.replace(/http:\/\/ivory-parrot/g, 'https://ivory-parrot');
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(`Network error fetching API: ${endpoint}`, error);
    // Return null so the UI can render gracefully with fallbacks
    return null;
  }
}

export async function getLatestPosts(limit = 5): Promise<WPPost[]> {
  const data = await fetchAPI(`/wp/v2/posts?per_page=${limit}&_embed`);
  return data || [];
}

export async function getSpotlightPost(): Promise<WPPost | null> {
  // Fetch the 1 most recent post (could be changed to sticky=true in the future)
  const data = await fetchAPI(`/wp/v2/posts?per_page=1&_embed`);
  return data && data.length > 0 ? data[0] : null;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await fetchAPI(`/wp/v2/posts?slug=${slug}&_embed`);
  return data && data.length > 0 ? data[0] : null;
}

export async function getPageBySlug(slug: string): Promise<WPPost | null> {
  const data = await fetchAPI(`/wp/v2/pages?slug=${slug}&_embed`);
  return data && data.length > 0 ? data[0] : null;
}

export async function getMenu(location: string): Promise<WPMenu[]> {
  const data = await fetchAPI(`/ng/v1/menu?location=${location}`);
  return data || [];
}

export async function getTopCategoriesAsMenu(): Promise<WPMenu[]> {
  // Fetch top 10 categories with the most posts (the ones we scrape and post to)
  const data = await fetchAPI(`/wp/v2/categories?per_page=12&orderby=count&order=desc`);
  if (!data || !Array.isArray(data)) return [];
  
  return data
    .filter((cat: any) => cat.count > 0 && cat.name !== 'Uncategorized')
    .map((cat: any) => ({
      id: cat.id,
      title: cat.name,
      url: `/category/${cat.slug}`,
    }));
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const data = await fetchAPI(`/wp/v2/categories?slug=${slug}`);
  return data && data.length > 0 ? data[0] : null;
}

export async function getPostsByCategory(categoryId: number, limit: number = 10): Promise<WPPost[]> {
  const data = await fetchAPI(`/wp/v2/posts?categories=${categoryId}&per_page=${limit}&_embed`);
  return data || [];
}

export async function getPostsByCategorySlug(slug: string, limit: number = 10): Promise<WPPost[]> {
  const category = await getCategoryBySlug(slug);
  if (!category) return [];
  return await getPostsByCategory(category.id, limit);
}

export async function searchPosts(query: string, limit: number = 10): Promise<WPPost[]> {
  const data = await fetchAPI(`/wp/v2/posts?search=${encodeURIComponent(query)}&per_page=${limit}&_embed`);
  return data || [];
}

export async function getTrendingPosts(): Promise<WPTrendingPost[]> {
  // Uses our custom REST API endpoint from notesgallery-headless.php
  const data = await fetchAPI(`/ng/v1/trending`);
  return data || [];
}

export async function getCommentsByPostId(postId: number): Promise<WPComment[]> {
  const data = await fetchAPI(`/wp/v2/comments?post=${postId}&order=asc`);
  return data || [];
}

export async function createComment(postId: number, name: string, email: string, content: string): Promise<boolean> {
  const data = await fetchAPI(`/wp/v2/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post: postId,
      author_name: name,
      author_email: email,
      content: content,
    }),
  });
  
  return data !== null;
}

/**
 * Helper to format WordPress ISO dates into relative "X Mins Ago" or standard dates.
 */
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} Mins Ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} Hrs Ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
