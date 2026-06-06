'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Select all H2 and H3 elements inside the article content area
    const elements = Array.from(document.querySelectorAll('.article-content h2, .article-content h3'));
    
    const items: TOCItem[] = elements.map((elem, index) => {
      // Ensure element has an ID for anchoring
      if (!elem.id) {
        elem.id = `heading-${index}`;
      }
      return {
        id: elem.id,
        text: elem.textContent || '',
        level: Number(elem.tagName.substring(1)),
      };
    });

    setHeadings(items);

    // Setup Intersection Observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 bg-background border border-border p-6 shadow-sm hidden md:block">
      <h3 className="font-bold uppercase tracking-wider text-sm mb-4 border-b border-foreground pb-2">
        In This Article
      </h3>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li 
            key={heading.id} 
            className={`text-sm transition-colors ${heading.level === 3 ? 'ml-4' : ''}`}
          >
            <a 
              href={`#${heading.id}`}
              className={`hover:text-primary block ${activeId === heading.id ? 'text-primary font-bold' : 'text-gray-600'}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
