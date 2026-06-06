'use client';

import React, { useState } from 'react';
import { Share2, Bookmark, ThumbsUp, MessageSquare, User, Sparkles, Check } from 'lucide-react';

interface FloatingSocialBarProps {
  url: string;
  title: string;
}

export default function FloatingSocialBar({ url, title }: FloatingSocialBarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  const scrollToComments = () => {
    const element = document.getElementById('comments-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden xl:flex flex-col gap-4 sticky top-32 h-fit items-center w-16 flex-shrink-0 z-10 pt-4">
      {/* Top Sparkle */}
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-2">
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Share Button */}
      <div className="relative group">
        <button 
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center shadow-md hover:scale-110 transition-all text-gray-900"
          title="Share this article"
        >
          {showShareTooltip ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
        </button>
        {showShareTooltip && (
          <div className="absolute left-14 top-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in-up">
            Link copied!
          </div>
        )}
      </div>

      {/* Bookmark Button */}
      <button 
        onClick={() => setIsBookmarked(!isBookmarked)}
        className={`w-10 h-10 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center shadow-md hover:scale-110 transition-all ${isBookmarked ? 'text-blue-600 ring-2 ring-blue-500' : 'text-gray-900'}`}
        title="Save for later"
      >
        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
      </button>

      {/* Like Button */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className={`w-10 h-10 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center shadow-md hover:scale-110 transition-all ${isLiked ? 'text-pink-600 ring-2 ring-pink-500' : 'text-gray-900'}`}
        title="Like this article"
      >
        <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
      </button>

      {/* Comment Button */}
      <button 
        onClick={scrollToComments}
        className="w-10 h-10 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center shadow-md hover:scale-110 transition-all text-gray-900"
        title="Jump to comments"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* User Profile */}
      <a 
        href="/profile"
        className="w-10 h-10 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center shadow-md hover:scale-110 transition-all mt-2 text-gray-900"
        title="View your profile"
      >
        <User className="w-5 h-5" />
      </a>
    </aside>
  );
}
