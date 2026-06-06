"use client";

import React, { useState } from 'react';

interface HeaderShareButtonsProps {
  url: string;
  title: string;
}

export default function HeaderShareButtons({ url, title }: HeaderShareButtonsProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      alert('Article saved to your reading list!');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={handleShare}
        className="bg-foreground text-background px-4 py-2 text-xs font-bold uppercase hover:bg-primary hover:text-white transition-colors"
      >
        Share
      </button>
      <button 
        onClick={handleSave}
        className={`border-2 border-foreground px-4 py-2 text-xs font-bold uppercase transition-colors ${
          isSaved 
            ? 'bg-foreground text-background hover:bg-gray-800' 
            : 'hover:bg-foreground hover:text-background'
        }`}
      >
        {isSaved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
}
