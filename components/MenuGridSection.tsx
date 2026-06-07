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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {gridPosts.map((post, idx) => (
          <a key={post.id} href={`/article/${post.slug}`} className="group block cursor-pointer">
            <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-4 relative rounded-md border border-gray-200 dark:border-gray-800">
              <img 
                src={post.featured_image_url || `https://images.unsplash.com/photo-[RANDOM]?w=400&q=80&random=${title.length + idx}`.replace('[RANDOM]', ['1516321497487-e288fb19713f', '1498050108023-c5249f4df085', '1454165804606-c3d57bc86b40', '1522202176988-66273c2fd55f'][idx % 4])} 
                alt="Thumbnail" 
                loading="lazy"
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
              />
            </div>
            
            <div className={`text-xs font-bold uppercase tracking-widest ${textColorClass} mb-2`}>
              {post.category_names && post.category_names.length > 0 ? post.category_names[0] : 'Article'}
            </div>

            <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.title.rendered }}>
            </h3>
            
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-3">
              {formatTimeAgo(post.date)}
            </div>
          </a>
        ))}

      </div>
    </section>
  );
}
