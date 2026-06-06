import React from 'react';

interface CategoryPageTemplateProps {
  title: string;
  description: string;
  color: string;
}

export default function CategoryPageTemplate({ title, description, color }: CategoryPageTemplateProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      
      {/* Category Header */}
      <div className={`${color} text-white py-16 md:py-24 px-4`}>
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex items-center justify-between border-b-2 border-black dark:border-white pb-2 mb-8">
          <h2 className="text-2xl font-bold font-serif">Latest in {title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <a href="#" key={item} className="group cursor-pointer flex flex-col h-full border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-white dark:bg-slate-900">
              <div className="w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                <img 
                  src={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&random=${item}`} 
                  alt={title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                  <span className={color.replace('bg-', 'text-')}>{title}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Today</span>
                </div>
                <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                  Top 10 Insights You Need to Know About {title} Right Now
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-auto">
                  A comprehensive overview of the latest trends, strategies, and updates in this sector.
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
