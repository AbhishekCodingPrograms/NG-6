import React from 'react';

interface Post {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  featured_image_url?: string | null;
  category_names?: string[];
}

interface LatestPostsCarouselProps {
  posts: Post[];
}

export default function LatestPostsCarousel({ posts }: LatestPostsCarouselProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full relative mb-12">
      <div className="flex items-center justify-between border-b-2 border-foreground pb-2 mb-6">
        <h2 className="font-bold uppercase tracking-wider text-lg md:text-xl">Latest News & Updates</h2>
        <div className="flex gap-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-widest hidden md:inline-block">Swipe to explore</span>
          <span className="w-4 h-4 rounded-full bg-primary animate-pulse hidden md:inline-block"></span>
        </div>
      </div>

      {/* Scrollable Container */}
      <div 
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 pb-6 pt-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="snap-start shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw] relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 group"
          >
            <a href={`/article/${post.slug}`} className="block relative w-full h-[320px] md:h-[420px]">
              {/* Image */}
              {post.featured_image_url ? (
                <img 
                  src={post.featured_image_url} 
                  alt={post.title.rendered.replace(/<[^>]+>/g, '')}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <span className="text-white/50 font-serif">NotesGallery</span>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end transform transition-transform duration-300 group-hover:-translate-y-2">
                {post.category_names && post.category_names.length > 0 && (
                  <span className="bg-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-3 shadow-md">
                    {post.category_names[0]}
                  </span>
                )}
                
                <h2 
                  className="text-xl md:text-2xl font-serif font-bold text-white leading-snug mb-2 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                
                <div className="flex items-center text-gray-300 text-[10px] md:text-xs font-medium mt-2">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="mx-2">•</span>
                  <span>NotesGallery Bureau</span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      
      {/* Global styles for hiding scrollbar if style inline fails */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
