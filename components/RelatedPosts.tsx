import React from 'react';

export default function RelatedPosts() {
  // Dummy data for related posts
  const relatedPosts = [
    {
      title: "Why every developer should learn these 5 skills in 2026",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
      date: "2 Hours Ago",
      category: "Tech News"
    },
    {
      title: "The complete guide to landing top-tier internships",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80",
      date: "5 Hours Ago",
      category: "Career"
    },
    {
      title: "How artificial intelligence is reshaping the modern workplace",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
      date: "1 Day Ago",
      category: "AI & Tech"
    }
  ];

  return (
    <div className="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black font-serif uppercase tracking-tight">Read Next</h3>
        <a href="/" className="text-xs font-bold text-primary uppercase tracking-wider hover:underline">
          View All
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, idx) => (
          <a key={idx} href="/article/dummy-post" className="group block">
            <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-4">
              <img 
                src={post.image} 
                alt={post.title} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary mb-2">
              {post.category}
            </div>
            <h4 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-3">
              {post.title}
            </h4>
          </a>
        ))}
      </div>
    </div>
  );
}
