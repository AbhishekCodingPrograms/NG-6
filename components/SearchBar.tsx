'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

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

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full bg-background border-b border-border shadow-lg z-[100] p-6"
          >
            <div className="container mx-auto max-w-4xl flex items-center">
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
                className="ml-6 p-2 text-gray-500 hover:text-foreground transition-colors bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
