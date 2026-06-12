import { searchPosts, formatTimeAgo } from '@/lib/api';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Search Results | NotesGallery",
  robots: {
    index: false,
    follow: true,
  }
};

async function SearchResults({ query }: { query: string }) {
  let posts = query ? await searchPosts(query, 20) : [];

  return (
    <>
      <p className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-8">
        {posts.length} {posts.length === 1 ? 'Article' : 'Articles'} Found
      </p>
      
      {/* Grid Layout (Magazine Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id} className="group border-b lg:border-b-0 lg:border-r border-border pb-8 lg:pb-0 lg:pr-8 last:border-r-0">
              <a href={`/article/${post.slug}`} className="block">
                {post.featured_image_url && (
                  <div className="w-full h-48 bg-gray-200 dark:bg-slate-800 mb-4 overflow-hidden relative">
                    <img 
                      src={post.featured_image_url} 
                      alt={post.title.rendered} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="text-primary font-bold text-xs uppercase mb-2 tracking-wider">
                  {post.category_names?.[0] || 'News'} • {formatTimeAgo(post.date)}
                </div>
                <h2 
                  className="text-2xl font-serif font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div 
                  className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </a>
            </article>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            {query ? (
              <p className="text-xl">We couldn't find any articles matching your search.</p>
            ) : (
              <p className="text-xl">Enter a search term to find articles.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function SearchSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 mb-8 rounded"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border-b lg:border-b-0 lg:border-r border-border pb-8 lg:pb-0 lg:pr-8 last:border-r-0">
            <div className="w-full h-48 bg-gray-200 dark:bg-slate-800 mb-4 rounded-sm"></div>
            <div className="h-3 w-24 bg-gray-200 dark:bg-slate-800 mb-3 rounded"></div>
            <div className="h-6 w-full bg-gray-200 dark:bg-slate-800 mb-2 rounded"></div>
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-800 mb-4 rounded"></div>
            <div className="h-3 w-full bg-gray-200 dark:bg-slate-800 mb-2 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-200 dark:bg-slate-800 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';

  return (
    <div className="container mx-auto px-4 mt-8 max-w-7xl mb-24">
      {/* Search Header */}
      <div className="border-b-4 border-foreground pb-6 mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-foreground">
          {query ? `Search Results for "${query}"` : "Search"}
        </h1>
      </div>

      <Suspense key={query} fallback={<SearchSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
