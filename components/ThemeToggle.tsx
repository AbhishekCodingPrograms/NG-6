'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; // Placeholder to prevent layout shift
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center overflow-hidden"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0 : 1
        }}
        transition={{ duration: 0.3, type: "spring" }}
        className="absolute"
      >
        <Sun size={18} className="font-bold" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0
        }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <Moon size={18} className="font-bold" />
      </motion.div>
    </button>
  );
}
