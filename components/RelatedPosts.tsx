import React from 'react';
import { WPPost } from '@/lib/api';

interface RelatedPostsProps {
  posts?: WPPost[];
}

export default function RelatedPosts({ posts = [] }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Ensure we only show up to 3 posts
  const displayPosts = posts.slice(0, 3);

  return (
    <div className="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black font-serif uppercase tracking-tight">Read Next</h3>
        <a href="/" className="text-xs font-bold text-primary uppercase tracking-wider hover:underline">
          View All
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <a key={post.id} href={`/article/${post.slug}`} className="group block">
            <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-4 border border-gray-200 dark:border-gray-800">
              <img 
                src={post.featured_image_url || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80&random=${post.id}`} 
                alt={post.title.rendered} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary mb-2">
              {post.category_names && post.category_names.length > 0 ? post.category_names[0] : 'Article'}
            </div>
            <h4 
              className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
