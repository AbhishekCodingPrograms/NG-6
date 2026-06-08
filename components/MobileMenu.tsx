'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { WPMenu } from '@/lib/api';

interface MobileMenuProps {
  menuItems: WPMenu[];
}

export default function MobileMenu({ menuItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors"
      >
        <Menu size={28} strokeWidth={2.5} />
      </button>

      {/* Slide Over Menu - Rendered via Portal to avoid CSS containing block issues */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div 
            className={`absolute top-0 left-0 bottom-0 h-[100dvh] w-4/5 max-w-sm bg-background border-r border-border shadow-2xl transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-background">
              <h2 className="text-2xl font-serif font-black tracking-tighter text-foreground">
                NotesGallery<span className="text-primary">.</span>
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto h-[calc(100dvh-85px)] bg-background">
              <ul className="space-y-6">
                {menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <li key={item.id}>
                      <a 
                        href={item.url} 
                        className="block text-lg font-bold text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li><a href="/" className="block text-lg font-bold text-primary">Home</a></li>
                    <li><a href="/free-courses" className="block text-lg font-bold text-foreground">Free Courses</a></li>
                    <li><a href="/internships" className="block text-lg font-bold text-foreground">Internships</a></li>
                    <li><a href="/blog" className="block text-lg font-bold text-foreground">Blog</a></li>
                    <li><a href="/recruitment" className="block text-lg font-bold text-foreground">Recruitment</a></li>
                    <li><a href="/govt-jobs" className="block text-lg font-bold text-foreground">Govt Job</a></li>
                    <li><a href="/hackathon" className="block text-lg font-bold text-foreground">Hackathon</a></li>
                    <li><a href="/jobs" className="block text-lg font-bold text-foreground">Jobs</a></li>
                  </>
                )}
              </ul>
              
              <div className="mt-12 pt-8 border-t border-border">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  Today's Weather
                </div>
                <div className="text-sm font-bold">
                  Lucknow, UP 38°C
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
