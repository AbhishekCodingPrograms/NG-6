import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CategoryPost {
  title: string;
  image: string;
  date: string;
  author: string;
}

interface CategorySectionProps {
  title: string;
  href: string;
  accentColor: string; // e.g., 'border-blue-500', 'text-blue-500'
  posts?: CategoryPost[];
}

export default function CategorySection({ title, href, accentColor, posts }: CategorySectionProps) {
  // Premium Dummy Data if no posts provided
  const dummyPosts: CategoryPost[] = [
    {
      title: `Latest Updates in ${title}: Everything You Need to Know`,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
      date: "Oct 24, 2026",
      author: "NotesGallery Desk"
    },
    {
      title: `Top 5 Strategies to Succeed in ${title} This Year`,
      image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&q=80",
      date: "Oct 23, 2026",
      author: "Expert Review"
    },
    {
      title: `Why ${title} is Becoming the Most Discussed Topic on Campus`,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
      date: "Oct 22, 2026",
      author: "Student Council"
    },
    {
      title: `A Comprehensive Guide to Getting Started with ${title}`,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
      date: "Oct 21, 2026",
      author: "Guest Author"
    }
  ];

  const displayPosts = posts && posts.length > 0 ? posts : dummyPosts;
  
  // Extract the color name from the accentColor class (e.g., 'border-blue-500' -> 'text-blue-500')
  const textColorClass = accentColor.replace('border-', 'text-');

  return (
    <section className="container mx-auto px-4 my-16">
      {/* Section Header */}
      <div className={`flex items-center justify-between border-b-2 border-gray-200 dark:border-gray-800 pb-3 mb-8 relative`}>
        <div className={`absolute bottom-[-2px] left-0 w-32 border-b-2 ${accentColor}`}></div>
        <h2 className="text-3xl font-bold font-serif tracking-tight flex items-center gap-3">
          {title}
        </h2>
        <a 
          href={href} 
          className={`text-sm font-bold uppercase tracking-wider flex items-center gap-1 hover:underline ${textColorClass}`}
        >
          View All <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayPosts.map((post, idx) => (
          <a href="#" key={idx} className="group block cursor-pointer flex flex-col h-full">
            {/* Image Container with hover effects */}
            <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 mb-4 overflow-hidden relative rounded-xl shadow-sm">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
            </div>
            
            {/* Meta data */}
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              <span>{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span>{post.date}</span>
            </div>
            
            {/* Title */}
            <h3 className={`text-lg md:text-xl font-bold leading-snug group-hover:${textColorClass} transition-colors line-clamp-3 text-slate-900 dark:text-slate-100`}>
              {post.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}
