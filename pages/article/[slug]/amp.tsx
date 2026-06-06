import Head from 'next/head';
import { getPostBySlug, getLatestPosts } from '@/lib/api';
import * as cheerio from 'cheerio';

export const config = {
  amp: true,
};

// Next.js Pages Router data fetching
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return { notFound: true };
  }

  // AMP HTML Sanitization: Convert WordPress HTML into valid AMP HTML
  const $ = cheerio.load(post.content?.rendered || post.excerpt.rendered, null, false);
  
  // Convert <img> to <amp-img>
  $('img').each(function() {
    const $img = $(this);
    const src = $img.attr('src') || '';
    const alt = $img.attr('alt') || 'Image';
    const width = $img.attr('width') || '800';
    const height = $img.attr('height') || '450';
    
    const ampImg = `<amp-img src="${src}" alt="${alt}" width="${width}" height="${height}" layout="responsive"></amp-img>`;
    $img.replaceWith(ampImg);
  });

  // Convert <iframe> to <amp-iframe>
  $('iframe').each(function() {
    const $iframe = $(this);
    const src = $iframe.attr('src') || '';
    const width = $iframe.attr('width') || '800';
    const height = $iframe.attr('height') || '450';
    
    // AMP iframes require HTTPS and specific layouts
    if (src.startsWith('https://')) {
      const ampIframe = `<amp-iframe width="${width}" height="${height}" layout="responsive" sandbox="allow-scripts allow-same-origin" src="${src}"></amp-iframe>`;
      $iframe.replaceWith(ampIframe);
    } else {
      $iframe.remove(); // Strip insecure iframes
    }
  });

  const ampContent = $.html();

  return {
    props: {
      post: {
        ...post,
        ampContent
      }
    },
    // Revalidate every 60 seconds (ISR)
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Pre-render top 5 posts, fallback to blocking for others
  const posts = await getLatestPosts(5);
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export default function AmpArticle({ post }: { post: any }) {
  return (
    <>
      <Head>
        <title>{post.title.rendered} | NotesGallery AMP</title>
        <link rel="canonical" href={`https://notesgallery.com/article/${post.slug}`} />
        <style amp-custom="">{`
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 0; margin: 0; background: #fff; color: #333; }
          .header { background: #fff; padding: 16px; border-bottom: 4px solid #333; text-align: center; }
          .header h1 { font-family: Georgia, serif; margin: 0; font-size: 24px; font-weight: 900; }
          .container { padding: 16px; max-width: 600px; margin: 0 auto; }
          .breadcrumbs { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 16px; font-weight: bold; }
          .title { font-family: Georgia, serif; font-size: 32px; font-weight: 900; line-height: 1.2; margin-bottom: 16px; }
          .meta { font-size: 12px; color: #888; margin-bottom: 24px; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 8px 0; }
          .featured-image { margin-bottom: 24px; background: #f5f5f5; }
          .content { font-size: 18px; line-height: 1.6; font-family: Georgia, serif; }
          .content p { margin-bottom: 20px; }
          .content h2 { font-family: inherit; font-size: 24px; margin-top: 32px; margin-bottom: 16px; }
          .content a { color: #d32f2f; text-decoration: none; }
          .footer { background: #333; color: #fff; text-align: center; padding: 32px 16px; margin-top: 48px; }
          
          /* Ad Placeholder */
          .ad-placeholder { background: #f5f5f5; border: 1px dashed #ccc; padding: 16px; text-align: center; margin: 24px 0; color: #999; font-size: 12px; text-transform: uppercase; }
        `}</style>
      </Head>

      <header className="header">
        <h1>NotesGallery</h1>
      </header>

      <main className="container">
        <div className="breadcrumbs">
          Home / {post.category_names?.[0] || 'News'} / AMP
        </div>

        <h1 className="title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

        <div className="meta">
          <strong>NotesGallery Bureau</strong> | Published: {new Date(post.date).toLocaleDateString()}
        </div>

        {post.featured_image_url && (
          <div className="featured-image">
            <amp-img 
              src={post.featured_image_url} 
              alt="Featured Image" 
              width="800" 
              height="450" 
              layout="responsive"
            ></amp-img>
          </div>
        )}

        <div className="ad-placeholder">
          Google AdSense - AMP Inline
        </div>

        <article className="content" dangerouslySetInnerHTML={{ __html: post.ampContent }} />

      </main>

      <footer className="footer">
        <p>&copy; 2026 NotesGallery AMP Engine.</p>
      </footer>
    </>
  );
}
