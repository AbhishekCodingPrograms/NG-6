import { getPageBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  if (!page) return {};
  
  return {
    title: `${page.title.rendered} | NotesGallery`,
    alternates: {
      canonical: `https://notesgallery.com/${params.slug}`,
    },
  };
}

export default async function StandardPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 mt-12 max-w-4xl mb-24">
      <h1 
        className="text-4xl md:text-5xl font-serif font-black leading-tight mb-8 border-b-4 border-primary pb-4"
        dangerouslySetInnerHTML={{ __html: page.title.rendered }}
      />

      <div 
        className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content?.rendered || page.excerpt.rendered }}
      />
    </div>
  );
}
