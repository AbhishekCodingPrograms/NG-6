'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, ArrowLeft, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-foreground hover:text-primary transition-colors"
        aria-label="Open Search"
      >
        <Search size={20} className="font-bold" />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 w-full h-[100dvh] md:h-auto md:bottom-auto bg-background md:bg-background/95 md:backdrop-blur border-b border-border shadow-lg z-[100] flex flex-col md:block"
            >
              {/* Desktop Layout */}
              <div className="hidden md:flex container mx-auto max-w-4xl items-center p-6">
                <form onSubmit={handleSearch} className="flex-1 flex items-center">
                  <Search size={24} className="text-gray-400 mr-4" />
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles, notes, updates..."
                    className="w-full bg-transparent border-none outline-none text-2xl font-serif text-foreground placeholder-gray-500"
                    autoFocus
                  />
                </form>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="ml-6 p-2 text-gray-500 hover:text-foreground transition-colors bg-gray-100 dark:bg-gray-800 rounded-full flex-shrink-0"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col h-full bg-background">
                <div className="flex items-center px-4 py-3 border-b border-border gap-3 shadow-sm">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-foreground p-1"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <form onSubmit={handleSearch} className="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                    <Search size={18} className="text-gray-500 mr-2" />
                    <input 
                      type="text" 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search notes, jobs, articles..."
                      className="w-full bg-transparent border-none outline-none text-base text-foreground placeholder-gray-500"
                      autoFocus
                    />
                    {query && (
                      <button type="button" onClick={() => setQuery('')} className="text-gray-500">
                        <X size={16} />
                      </button>
                    )}
                  </form>
                </div>
                
                {/* Mobile Trending/Suggestions Empty State */}
                {!query && (
                  <div className="p-6 flex-1 overflow-y-auto">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <TrendingUp size={16} /> Trending Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['Govt Jobs 2026', 'Internships', 'Hackathon', 'Free Courses', 'Notes'].map((tag) => (
                        <button 
                          key={tag}
                          onClick={() => {
                            setQuery(tag);
                          }}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-foreground hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
