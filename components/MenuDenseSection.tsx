import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuDenseSectionProps {
  title: string;
  href: string;
  widgetTitle?: string;
  widgetText?: string;
  widgetColor?: string;
  buttonTextColor?: string;
}

export default function MenuDenseSection({ 
  title, 
  href, 
  widgetColor = "bg-blue-600"
}: MenuDenseSectionProps) {
  
  // Extract text color class for accents
  const textColorClass = widgetColor.replace('bg-', 'text-');

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
          <a href="/article/dummy-post" className="block">
            <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-4 relative rounded-md">
              <img 
                src={`https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&random=${title.length}`} 
                alt={title} 
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
              />
              <div className={`absolute top-4 left-4 ${widgetColor} text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm`}>
                Featured
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
              The definitive guide to mastering {title} this year
            </h3>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed font-medium">
              Discover the most effective strategies, tips, and tricks to excel in {title}. Experts reveal what it takes to succeed in today's highly competitive landscape.
            </p>
            
            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <span className={textColorClass}>By NotesGallery</span>
              <span>•</span>
              <span>12 Hours Ago</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                14
              </span>
            </div>
          </a>
        </div>

        {/* Latest List (Right Side) */}
        <div className="lg:w-1/3 flex flex-col gap-0 divide-y divide-gray-200 dark:divide-gray-800">
          
          {[1, 2, 3, 4].map((item, idx) => (
            <a key={idx} href="/article/dummy-post" className="group flex justify-between gap-4 py-5 first:pt-0 last:pb-0">
              <div className="flex flex-col justify-between flex-1">
                <h4 className="text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3 mb-2">
                  {idx === 0 && `Breaking: Major Updates Announced for ${title} Sector`}
                  {idx === 1 && `Expert Opinion: How to Leverage ${title} for Growth`}
                  {idx === 2 && `New Policies Bring Major Shifts to ${title} Ecosystem`}
                  {idx === 3 && `Exclusive Interview: Leaders Discuss the Future`}
                </h4>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {idx === 0 ? 'Just Now' : `${idx * 2} Hrs Ago`}
                </div>
              </div>
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 flex-shrink-0 rounded-md overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&q=80&random=${title.length + item}`} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </a>
          ))}
          
        </div>

      </div>
    </section>
  );
}
