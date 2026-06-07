import React from 'react';
import { ChevronRight } from 'lucide-react';
import { WPPost, formatTimeAgo } from '@/lib/api';

interface MenuListSectionProps {
  title: string;
  href: string;
  widgetColor?: string;
  posts?: WPPost[];
}

export default function MenuListSection({ 
  title, 
  href, 
  widgetColor = "bg-blue-600",
  posts = []
}: MenuListSectionProps) {
  
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

  // Take up to 6 posts for the list
  const listPosts = posts.slice(0, 6);

  return (
    <section className="container mx-auto px-4 my-16 font-sans">
      
      {/* Section Header */}
      <div className="flex items-center mb-6 pb-2 border-b-2 border-gray-900 dark:border-white">
        <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white flex-1">{title}</h2>
        <a href={href} className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          More <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
        
        {listPosts.map((post, idx) => (
          <a key={post.id} href={`/article/${post.slug}`} className="group flex gap-4 items-start">
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm ${widgetColor}`}>
              {idx + 1}
            </div>
            <div>
              <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }}>
              </h3>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <span className={textColorClass}>{post.category_names && post.category_names.length > 0 ? post.category_names[0] : 'Update'}</span>
                <span>•</span>
                <span>{formatTimeAgo(post.date)}</span>
              </div>
            </div>
          </a>
        ))}

      </div>
    </section>
  );
}
