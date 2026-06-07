import { getPostBySlug, formatTimeAgo } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import TableOfContents from '@/components/TableOfContents';
import FloatingSocialBar from '@/components/FloatingSocialBar';
import ArticleActionBar from '@/components/ArticleActionBar';
import RelatedPosts from '@/components/RelatedPosts';
import HeaderShareButtons from '@/components/HeaderShareButtons';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Demo Article | NotesGallery',
    };
  }
  
  return {
    title: post.title.rendered,
    alternates: {
      canonical: `https://notesgallery.com/article/${params.slug}`,
      types: {
        'amphtml': `https://notesgallery.com/article/${params.slug}/amp`,
      },
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  // Construct JSON-LD Schema for Google Discover
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title.rendered,
    image: post.featured_image_url ? [post.featured_image_url] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: [{
      '@type': 'Person',
      name: 'NotesGallery Bureau',
      url: 'https://notesgallery.com/author/ng-bureau'
    }],
    publisher: {
      '@type': 'Organization',
      name: 'NotesGallery',
      logo: {
        '@type': 'ImageObject',
        url: 'https://notesgallery.com/icon-512x512.png'
      }
    }
  };

  return (
    <>
      {/* Inject JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProgressBar />
      
      <div className="container mx-auto px-4 mt-8 max-w-7xl">
        {/* Article Header (Economic Times Dense Magazine Style) */}
        <div className="border-b-4 border-foreground pb-6 mb-8">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            {post.category_names && post.category_names.length > 0 ? (
              <a href="#" className="hover:text-primary transition-colors">{post.category_names[0]}</a>
            ) : (
              <a href="#" className="hover:text-primary transition-colors">News</a>
            )}
            <span>/</span>
            <span className="text-foreground truncate max-w-xs">{post.title.rendered}</span>
          </div>

          <h1 
            className="text-4xl md:text-6xl font-serif font-black leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                NG
              </div>
              <div>
                <p className="font-bold text-sm uppercase tracking-wide">NotesGallery Bureau</p>
                <p className="text-xs text-gray-500 font-medium">Published: {formatTimeAgo(post.date)}</p>
              </div>
            </div>
            
            {/* Social Share Buttons (Functional) */}
            <HeaderShareButtons 
              url={`https://notesgallery.com/article/${post.slug}`} 
              title={post.title.rendered} 
            />
          </div>
        </div>

        {/* Article Body & Sidebars */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative">
          
          <FloatingSocialBar url={`https://notesgallery.com/article/${post.slug}`} title={post.title.rendered} />

          {/* Main Content Area */}
          <article className="lg:flex-1 max-w-3xl">
            {post.featured_image_url && (
              <figure className="mb-6">
                <img 
                  src={post.featured_image_url} 
                  alt={post.title.rendered}
                  className="w-full h-auto object-cover"
                />
                <figcaption className="text-xs text-gray-500 mt-2 italic border-l-2 border-primary pl-2">
                  Image via NotesGallery Publishers
                </figcaption>
              </figure>
            )}

            {/* Mobile Action Bar (Hidden on extra large screens) */}
            <ArticleActionBar />

            {/* Inline Ad Slot Placeholder */}
            <div className="w-full bg-gray-100 border border-gray-200 p-4 text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-10 h-32 flex flex-col justify-center">
              <span>Advertisement Slot</span>
              <span className="text-[0.6rem] font-normal">Google AdSense - Inline Article Banner</span>
            </div>

            {/* Typography Prose wrapper for WordPress HTML payload */}
            <div 
              className="article-content prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content?.rendered || post.excerpt.rendered }}
            />

            {/* Related Posts Section */}
            <RelatedPosts />

            {/* Comments Section Target */}
            <div id="comments-section" className="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold font-serif mb-6">Discussion</h3>
              <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
                <p className="text-gray-500 font-medium">Comments are loading...</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">
                  Join the Conversation
                </button>
              </div>
            </div>
          </article>

          {/* Right Sidebar (TOC & Ads) */}
          <aside className="hidden lg:block w-80 flex-shrink-0 space-y-8 sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar pb-8">
            <TableOfContents />

            {/* Sidebar Ad Slot Placeholder */}
            <div className="w-full bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 text-center text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest h-[600px] flex flex-col justify-center rounded-xl">
              <span>Advertisement Slot</span>
              <span className="text-[0.6rem] font-normal">Google AdSense - Sidebar Vertical</span>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}
