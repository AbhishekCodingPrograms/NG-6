import React from 'react';
import { ChevronRight } from 'lucide-react';
import { WPPost, formatTimeAgo } from '@/lib/api';

interface MenuGridSectionProps {
  title: string;
  href: string;
  widgetColor?: string;
  posts?: WPPost[];
}

export default function MenuGridSection({ 
  title, 
  href, 
  widgetColor = "bg-blue-600",
  posts = []
}: MenuGridSectionProps) {
  
  const textColorClass = widgetColor.replace('bg-', 'text-');

  if (!posts || posts.length === 0) {
    return (
      <section className="container mx-auto px-4 my-16 font-sans">
        <div className="flex items-center mb-6 pb-2 border-b-2 border-gray-900 dark:border-white">
          <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white flex-1">{title}</h2>
        </div>
        <div className="text-center py-8 text-gray-500 italic">No posts available in this section yet.</div>
      </section>
    );
  }

  // Take up to 4 posts for the grid
  const gridPosts = posts.slice(0, 4);

  return (
    <section className="container mx-auto px-4 my-16 font-sans">
      
      {/* Section Header */}
      <div className="flex items-center mb-6 pb-2 border-b-2 border-gray-900 dark:border-white">
        <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white flex-1">{title}</h2>
        <a href={href} className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          More <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-6 divide-y md:divide-y-0 divide-gray-200 dark:divide-gray-800">
        
        {gridPosts.map((post, idx) => (
          <a key={post.id} href={`/article/${post.slug}`} className="group flex justify-between md:block py-4 md:py-0 cursor-pointer gap-4 items-center md:items-start first:pt-0 last:pb-0">
            
            <div className="flex flex-col justify-between flex-1 order-1 md:order-2">
              <div className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${textColorClass} mb-1 md:mb-2`}>
                {post.category_names && post.category_names.length > 0 ? post.category_names[0] : 'Article'}
              </div>

              <h3 className="text-lg md:text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 md:mb-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.title.rendered }}>
              </h3>
              
              <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
                {formatTimeAgo(post.date)}
              </div>
            </div>

            <div className="w-20 h-20 md:aspect-[4/3] md:w-full md:h-auto flex-shrink-0 bg-gray-100 dark:bg-gray-800 overflow-hidden md:mb-4 relative rounded-md border border-gray-200 dark:border-gray-800 order-2 md:order-1">
              <img 
                src={post.featured_image_url || `https://images.unsplash.com/photo-[RANDOM]?w=400&q=80&random=${title.length + idx}`.replace('[RANDOM]', ['1516321497487-e288fb19713f', '1498050108023-c5249f4df085', '1454165804606-c3d57bc86b40', '1522202176988-66273c2fd55f'][idx % 4])} 
                alt="Thumbnail" 
                loading="lazy"
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
              />
            </div>
          </a>
        ))}

      </div>
    </section>
  );
}
