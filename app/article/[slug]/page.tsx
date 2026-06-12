import { getPostBySlug, formatTimeAgo, getLatestPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import TableOfContents from '@/components/TableOfContents';
import FloatingSocialBar from '@/components/FloatingSocialBar';
import ArticleActionBar from '@/components/ArticleActionBar';
import RelatedPosts from '@/components/RelatedPosts';
import CommentsSection from '@/components/CommentsSection';
import HeaderShareButtons from '@/components/HeaderShareButtons';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | NotesGallery',
    };
  }
  
  // Clean up WordPress excerpt (remove HTML tags and entities)
  let cleanExcerpt = post.excerpt.rendered
    .replace(/<[^>]+>/g, '')
    .replace(/\[&hellip;\]/g, '...')
    .replace(/&nbsp;/g, ' ')
    .trim();
    
  if (cleanExcerpt.length > 155) {
    cleanExcerpt = cleanExcerpt.substring(0, 150) + '...';
  }

  const articleUrl = `https://notesgallery.in/article/${params.slug}`;

  return {
    title: post.title.rendered,
    description: cleanExcerpt,
    openGraph: {
      title: post.title.rendered,
      description: cleanExcerpt,
      url: articleUrl,
      type: 'article',
      publishedTime: post.date,
      authors: ['NotesGallery Bureau'],
      images: post.featured_image_url ? [
        {
          url: post.featured_image_url,
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.rendered,
      description: cleanExcerpt,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
    alternates: {
      canonical: articleUrl,
      types: {
        'amphtml': `${articleUrl}/amp`,
      },
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const [post, recentPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getLatestPosts(4)
  ]);

  if (!post) {
    return notFound();
  }

  // Filter out the current post to use as 'Related'
  const relatedPosts = recentPosts.filter(p => p.id !== post.id).slice(0, 3);

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
      url: 'https://notesgallery.in/author/ng-bureau'
    }],
    publisher: {
      '@type': 'Organization',
      name: 'NotesGallery',
      logo: {
        '@type': 'ImageObject',
        url: 'https://notesgallery.in/icon-512x512.png'
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
      
      <div className="container mx-auto px-4 mt-8 max-w-7xl pb-16 md:pb-24">
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
            className="text-3xl md:text-6xl font-serif font-black leading-snug md:leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="flex flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs md:text-sm">
                NG
              </div>
              <div>
                <p className="font-bold text-xs md:text-sm uppercase tracking-wide">NotesGallery</p>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium">{formatTimeAgo(post.date)}</p>
              </div>
            </div>
            
            {/* Social Share Buttons (Functional) */}
            <div className="scale-90 md:scale-100 origin-right">
              <HeaderShareButtons 
                url={`https://notesgallery.in/article/${post.slug}`} 
                title={post.title.rendered} 
              />
            </div>
          </div>
        </div>

        {/* Article Body & Sidebars */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative">
          
          <FloatingSocialBar url={`https://notesgallery.in/article/${post.slug}`} title={post.title.rendered} />

          {/* Main Content Area */}
          <article className="lg:flex-1 max-w-3xl">
            {post.featured_image_url && (
              <figure className="mb-6 -mx-4 md:mx-0 w-[calc(100%+2rem)] md:w-full">
                <img 
                  src={post.featured_image_url} 
                  alt={post.title.rendered}
                  className="w-full h-auto object-cover"
                />
                <figcaption className="text-[10px] md:text-xs text-gray-500 mt-2 italic border-l-2 border-primary pl-2 mx-4 md:mx-0">
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
            <RelatedPosts posts={relatedPosts} />

            {/* Comments Section Target */}
            <CommentsSection postId={post.id} />
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
