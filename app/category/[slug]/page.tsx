import { getCategoryBySlug, getPostsByCategory, formatTimeAgo } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return {};
  
  return {
    title: `${category.name} Archives | NotesGallery`,
    description: category.description || `Read the latest articles in ${category.name}`,
    alternates: {
      canonical: `https://notesgallery.com/category/${params.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id, 20); // fetch up to 20

  return (
    <div className="container mx-auto px-4 mt-8 max-w-7xl mb-24">
      {/* Category Header */}
      <div className="border-b-4 border-primary pb-6 mb-12">
        <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight text-foreground">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-4 text-xl text-gray-500 max-w-2xl">
            {category.description}
          </p>
        )}
      </div>

      {/* Grid Layout (Magazine Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id} className="group border-b lg:border-b-0 lg:border-r border-border pb-8 lg:pb-0 lg:pr-8 last:border-r-0">
              <a href={`/article/${post.slug}`} className="block">
                {post.featured_image_url && (
                  <div className="w-full h-48 bg-gray-200 mb-4 overflow-hidden relative">
                    <img 
                      src={post.featured_image_url} 
                      alt={post.title.rendered} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="text-primary font-bold text-xs uppercase mb-2 tracking-wider">
                  {formatTimeAgo(post.date)}
                </div>
                <h2 
                  className="text-2xl font-serif font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div 
                  className="text-sm text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </a>
            </article>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            <p className="text-xl">No articles found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
