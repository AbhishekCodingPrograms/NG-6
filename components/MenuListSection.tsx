import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuListSectionProps {
  title: string;
  href: string;
  widgetColor?: string;
}

export default function MenuListSection({ 
  title, 
  href, 
  widgetColor = "bg-blue-600"
}: MenuListSectionProps) {
  
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
        
        {[1, 2, 3, 4, 5, 6].map((item, idx) => (
          <a key={idx} href="/article/dummy-post" className="group flex gap-4 items-start">
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm ${widgetColor}`}>
              {idx + 1}
            </div>
            <div>
              <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 line-clamp-2">
                {idx === 0 && `UPSC Prelims Result 2026 Declared: Check your score now`}
                {idx === 1 && `SSC CGL Notification Released for 10,000+ vacancies`}
                {idx === 2 && `IBPS PO Mains Admit Card available for download`}
                {idx === 3 && `RRB NTPC Final Merit List announced today`}
                {idx === 4 && `State Police Constable Recruitment Drive 2026 starts`}
                {idx === 5 && `Important changes to ${title} application process`}
              </h3>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <span className={textColorClass}>Update</span>
                <span>•</span>
                <span>{idx === 0 ? 'Just Now' : `${idx} Hrs Ago`}</span>
              </div>
            </div>
          </a>
        ))}

      </div>
    </section>
  );
}
