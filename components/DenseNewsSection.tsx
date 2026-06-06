import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function DenseNewsSection() {
  return (
    <section className="container mx-auto px-4 my-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Top Grid: Bonds Corner (Left) and Politics (Right) */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
        
        {/* LEFT COLUMN (2/3 width) - Bonds Corner */}
        <div className="lg:w-[65%]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b-2 border-black dark:border-white pb-2 mb-4">
            <h2 className="text-3xl font-bold font-serif">Bonds Corner</h2>
            <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold flex items-center gap-1 mt-1">
              Powered by <span className="text-[#f5a623] font-bold">JIRAAF</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Story (Col 1) */}
            <div className="col-span-1 pr-4 md:border-r border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold font-serif leading-tight mb-3 hover:text-blue-600 cursor-pointer">
                Govt scraps capital gains tax on foreign investment in bonds
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-400 leading-snug mb-4">
                India has eliminated long-term capital gains tax on FII investments in government securities, effective April 1,...
              </p>
              
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-4">
                <a href="#" className="block text-[15px] font-bold hover:text-blue-600 leading-snug">
                  Tax-cut hopes lift Indian bonds but RBI hike fears loom
                </a>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex gap-3 cursor-pointer group">
                <h4 className="text-[15px] font-bold leading-snug group-hover:text-blue-600 flex-1">
                  IIFL Finance nets $500 million in overseas bond sales
                </h4>
                <div className="w-20 h-14 bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=200&q=80" alt="Finance" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              </div>
            </div>

            {/* List Stories (Col 2) */}
            <div className="col-span-1 pr-4 md:border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-800 cursor-pointer group">
                  <h4 className="text-sm font-semibold leading-snug group-hover:text-blue-600 flex-1">
                    RBI calls off T-Bill auction on higher-yield demand
                  </h4>
                  <div className="w-16 h-12 bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80" alt="Bank" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                <a href="#" className="block pb-4 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold leading-snug hover:text-blue-600">
                  India bonds end flat as RBI policy caution offsets cooler oil
                </a>
                
                <a href="#" className="block pb-4 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold leading-snug hover:text-blue-600">
                  Indian bonds steady as U.S.-Iran tensions linger; RBI policy review due Friday
                </a>

                <a href="#" className="block text-sm font-semibold leading-snug hover:text-blue-600">
                  India bonds slip ahead of RBI policy as war risks lift oil
                </a>
              </div>
              
              <div className="text-right mt-4">
                <a href="#" className="text-xs font-bold text-red-600 uppercase tracking-wider hover:underline inline-flex items-center">
                  More Bonds News <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* CTA Widget (Col 3) */}
            <div className="col-span-1">
              <div className="bg-[#0b3b71] text-white p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-2">Find Your First Bond</h3>
                <p className="text-sm text-blue-100 mb-6">Discover bonds that meet your investment goals.</p>
                
                <select className="w-full p-3 bg-white text-gray-900 font-semibold mb-4 outline-none appearance-none cursor-pointer">
                  <option>&lt;= INR 10,000</option>
                  <option>INR 10,000 - 50,000</option>
                  <option>&gt; INR 50,000</option>
                </select>
                
                <select className="w-full p-3 bg-white text-gray-900 font-semibold mb-auto outline-none appearance-none cursor-pointer">
                  <option>Less than 1 Year</option>
                  <option>1 - 3 Years</option>
                  <option>More than 3 Years</option>
                </select>
                
                <button className="w-full mt-6 bg-white text-[#0b3b71] font-bold py-3 px-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  Invest with <span className="text-[#f5a623]">JIRAAF</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (1/3 width) - Politics */}
        <div className="lg:w-[35%]">
          {/* Header */}
          <div className="flex items-center gap-1 border-b-2 border-black dark:border-white pb-2 mb-4">
            <h2 className="text-2xl font-bold font-serif">Politics</h2>
            <ChevronRight className="w-5 h-5 text-red-600 mt-1" />
          </div>
          
          <div className="mb-6 cursor-pointer group">
            <div className="w-full aspect-[4/3] bg-gray-200 mb-3 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&q=80" alt="Politics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-[22px] font-bold font-serif leading-tight group-hover:text-blue-600">
              Karnataka minister Ramalinga Reddy has withdrawn resignation: AICC general secretary RS Surjewala
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center group cursor-pointer border-b border-gray-200 dark:border-gray-800 pb-4">
              <h4 className="text-sm font-semibold leading-snug flex-1 group-hover:text-blue-600">
                Mehbooba's AIIMS review sparks row
              </h4>
              <div className="w-20 h-14 bg-gray-200 overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1575320181282-9afab399332c?w=200&q=80" alt="News" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex gap-4 items-center group cursor-pointer border-b border-gray-200 dark:border-gray-800 pb-4">
              <h4 className="text-sm font-semibold leading-snug flex-1 group-hover:text-blue-600">
                Kushwaha's son waits as NDA finalises MLC picks
              </h4>
              <div className="w-20 h-14 bg-gray-200 overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=200&q=80" alt="News" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex gap-4 items-center group cursor-pointer border-b border-gray-200 dark:border-gray-800 pb-4">
              <h4 className="text-sm font-semibold leading-snug flex-1 group-hover:text-blue-600">
                Annamalai's 'We the Leaders' becomes instant hit as 13 lakh+ people join within 24 hours
              </h4>
              <div className="w-20 h-14 bg-gray-200 overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1541872526868-615f7b03b6d0?w=200&q=80" alt="News" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM GRID: You May Like */}
      <div>
        <div className="border-b-2 border-black dark:border-white pb-2 mb-6">
          <h2 className="text-2xl font-bold font-serif">You May Like</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="group cursor-pointer flex flex-col">
            <div className="w-full aspect-[16/10] bg-gray-200 mb-3 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" alt="Real Estate" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">SPONSORED</div>
            </div>
            <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-blue-600">
              Ekanam by Great Value in Sector 107, Noida
            </h3>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500 font-semibold uppercase">Great Value Realty</span>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group cursor-pointer flex flex-col">
            <div className="w-full aspect-[16/10] bg-gray-200 mb-3 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1613490900233-08ddc3bea290?w=600&q=80" alt="Residences" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">SPONSORED</div>
            </div>
            <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-blue-600">
              Invest in 3, 4 BHK Grand Residences in Noida
            </h3>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500 font-semibold uppercase">Great Value Realty</span>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group cursor-pointer flex flex-col">
            <div className="w-full aspect-[16/10] bg-gray-200 mb-3 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1628109641120-1e59247dceab?w=600&q=80" alt="Health" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">SPONSORED</div>
            </div>
            <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-blue-600">
              High Blood Sugar? Eat This One Food Before Bed (Doctors Are Stunned)
            </h3>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500 font-semibold uppercase">Wellness Waves</span>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
