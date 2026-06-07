import React from 'react';
import { ChevronRight } from 'lucide-react';
import { WPPost, formatTimeAgo } from '@/lib/api';

interface MenuHeroSectionProps {
  title: string;
  href: string;
  widgetColor?: string;
  posts?: WPPost[];
}

export default function MenuHeroSection({ 
  title, 
  href, 
  widgetColor = "bg-blue-600",
  posts = []
}: MenuHeroSectionProps) {
  
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

  const featuredPost = posts[0];
  const listPosts = posts.slice(1, 5);

  return (
    <section className="container mx-auto px-4 my-16 font-sans">
      
      {/* Section Header */}
      <div className="flex items-center mb-6 pb-2 border-b-2 border-gray-900 dark:border-white">
        <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white flex-1">{title}</h2>
        <a href={href} className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          More <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Main Featured Article (Left Side) */}
        <div className="lg:w-2/3 group cursor-pointer">
          <a href={`/article/${featuredPost.slug}`} className="block">
            <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-4 relative rounded-md border border-gray-200 dark:border-gray-800">
              <img 
                src={featuredPost.featured_image_url || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&random=${title.length}`} 
                alt="Featured Image" 
                loading="lazy"
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
              />
              <div className={`absolute top-4 left-4 ${widgetColor} text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm`}>
                Featured
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3" dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}>
            </h3>
            
            <div className="text-lg text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }} />
            
            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <span className={textColorClass}>By NotesGallery</span>
              <span>•</span>
              <span>{formatTimeAgo(featuredPost.date)}</span>
            </div>
          </a>
        </div>

        {/* Latest List (Right Side) */}
        {listPosts.length > 0 && (
          <div className="lg:w-1/3 flex flex-col gap-0 divide-y divide-gray-200 dark:divide-gray-800">
            {listPosts.map((post, idx) => (
              <a key={post.id} href={`/article/${post.slug}`} className="group flex justify-between gap-4 py-5 first:pt-0 last:pb-0">
                <div className="flex flex-col justify-between flex-1">
                  <h4 className="text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3 mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }}>
                  </h4>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {formatTimeAgo(post.date)}
                  </div>
                </div>
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img 
                    src={post.featured_image_url || `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&q=80&random=${title.length + idx}`} 
                    alt="Thumbnail" 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
